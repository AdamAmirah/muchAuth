import axios from "axios";
import AuthLayout from "../layout/AuthLayout";
import Link from "next/link";
import Image from "next/image";
import {
  HiAtSymbol,
  HiFingerPrint,
  HiOutlineUser,
  HiPhone,
} from "react-icons/hi";
import { useCallback, useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import { BsPersonWorkspace } from "react-icons/bs";
import { toast } from "react-hot-toast";
import { signIn } from "next-auth/react";
import { useFormik } from "formik";
import { signup_validation } from "../libs/validation";
import { useRouter } from "next/router";

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [show, setShow] = useState({ password: false, confirmPassword: false });
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      jobTitle: "",
      phoneNumber: "",
      confirmPassword: "",
    },
    validate: signup_validation,
    onSubmit: async () => {
      try {
        setIsLoading(true);
        const response = await axios.post("/api/register", {
          email: formik.values.email,
          password: formik.values.password,
          name: formik.values.name,
          jobTitle: formik.values.jobTitle,
          phoneNumber: formik.values.phoneNumber,
        });

        if (response.status !== 200) {
          throw new Error(response.status);
        }

        toast.success("Account Created");
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
      } finally {
        setIsLoading(false);
        router.push("/login");
      }
    },
  });

  return (
    <AuthLayout>
      <section className="w-3/4 h-11/12 mx-auto flex flex-col gap-2">
        <div className="title">
          <h1 className="text-gray-800 text-3xl font-bold py-4">Sign Up</h1>
        </div>

        <form className="flex flex-col gap-4">
          <div>
            <span
              className={`flex items-start text-rose-600 ${
                formik.errors.name && formik.touched.name ? "text-rose-600" : ""
              }`}
            >
              {formik.errors.name && formik.touched.name
                ? formik.errors.name
                : ""}
            </span>
            <div
              className={`flex border rounded-xl relative ${
                formik.errors.name && formik.touched.name
                  ? "border-rose-600"
                  : ""
              }`}
            >
              <Input
                type="text"
                name="name"
                placeholder="Name"
                {...formik.getFieldProps("name")}
                disabled={isLoading}
              />
              <span
                className="icon flex items-center px-4 hover:text-blue-400"
                style={{ color: "#CBD5E1" }}
              >
                <HiOutlineUser size={25} />
              </span>
            </div>
          </div>
          <div>
            <span
              className={`flex items-start text-rose-600 ${
                formik.errors.jobTitle && formik.touched.jobTitle
                  ? "text-rose-600"
                  : ""
              }`}
            >
              {formik.errors.jobTitle && formik.touched.jobTitle
                ? formik.errors.jobTitle
                : ""}
            </span>
            <div
              className={`flex border rounded-xl relative ${
                formik.errors.jobTitle && formik.touched.jobTitle
                  ? "border-rose-600"
                  : ""
              }`}
            >
              <Input
                type="text"
                name="jobTitle"
                placeholder="job Title"
                {...formik.getFieldProps("jobTitle")}
                disabled={isLoading}
              />
              <span
                className="icon flex items-center px-4 hover:text-blue-400"
                style={{ color: "#CBD5E1" }}
              >
                <BsPersonWorkspace size={25} />
              </span>
            </div>
          </div>

          <div>
            <span
              className={`flex items-start text-rose-600 ${
                formik.errors.phoneNumber && formik.touched.phoneNumber
                  ? "text-rose-600"
                  : ""
              }`}
            >
              {formik.errors.phoneNumber && formik.touched.phoneNumber
                ? formik.errors.phoneNumber
                : ""}
            </span>
            <div className="flex border rounded-xl relative">
              <Input
                type="text"
                name="phoneNumber"
                placeholder="Mobile Number"
                {...formik.getFieldProps("phoneNumber")}
                disabled={isLoading}
              />
              <span
                className="icon flex items-center px-4 hover:text-blue-400"
                style={{ color: "#CBD5E1" }}
              >
                <HiPhone size={25} />
              </span>
            </div>
          </div>
          <div>
            <span
              className={`flex items-start text-rose-600 ${
                formik.errors.email && formik.touched.email
                  ? "text-rose-600"
                  : ""
              }`}
            >
              {formik.errors.email && formik.touched.email
                ? formik.errors.email
                : ""}
            </span>
            <div
              className={`flex border rounded-xl relative ${
                formik.errors.email && formik.touched.email
                  ? "border-rose-600"
                  : ""
              }`}
            >
              <Input
                type="email"
                name="email"
                placeholder="adam@gmail.com"
                {...formik.getFieldProps("email")}
                disabled={isLoading}
              />
              <span
                className="icon flex items-center px-4 hover:text-blue-400"
                style={{ color: "#CBD5E1" }}
              >
                <HiAtSymbol size={25} />
              </span>
            </div>
          </div>

          <div>
            <span
              className={`flex items-start text-rose-600 ${
                formik.errors.password && formik.touched.password
                  ? "text-rose-600"
                  : ""
              }`}
            >
              {formik.errors.password && formik.touched.password
                ? formik.errors.password
                : ""}
            </span>
            <div
              className={`flex border rounded-xl relative ${
                formik.errors.password && formik.touched.password
                  ? "border-rose-600"
                  : ""
              }`}
            >
              <Input
                type={`${show.password ? "text" : "password"}`}
                name="password"
                placeholder="Password"
                {...formik.getFieldProps("password")}
                disabled={isLoading}
              />
              <span
                className="icon flex items-center px-4 cursor-pointer hover:text-blue-400"
                onClick={() => setShow({ ...show, password: !show.password })}
                style={{
                  color: `${show.password ? "#6366f1" : "#CBD5E1"}`,
                }}
              >
                <HiFingerPrint size={25} />
              </span>
            </div>
          </div>

          <div>
            <span
              className={`flex items-start text-rose-600 ${
                formik.errors.confirmPassword && formik.touched.confirmPassword
                  ? "text-rose-600"
                  : ""
              }`}
            >
              {formik.errors.confirmPassword && formik.touched.confirmPassword
                ? formik.errors.confirmPassword
                : ""}
            </span>
            <div
              className={`flex border rounded-xl relative ${
                formik.errors.confirmPassword && formik.touched.confirmPassword
                  ? "border-rose-600"
                  : ""
              }`}
            >
              <Input
                type={`${show.confirmPassword ? "text" : "password"}`}
                name="confirmPassword"
                placeholder="Confirm Password"
                {...formik.getFieldProps("confirmPassword")}
                disabled={isLoading}
              />
              <span
                className="icon flex items-center px-4 cursor-pointer hover:text-blue-400"
                onClick={() =>
                  setShow({ ...show, confirmPassword: !show.confirmPassword })
                }
                style={{
                  color: `${show.confirmPassword ? "#6366f1" : "#CBD5E1"}`,
                }}
              >
                <HiFingerPrint size={25} />
              </span>
            </div>
          </div>
          <div>
            <Button onClick={formik.handleSubmit}>Create</Button>
          </div>
        </form>

        <p className="text-center mt-4 text-gray-400">
          You have an account?{" "}
          <Link className="text-blue-700" href={"/login"}>
            Login
          </Link>
        </p>
      </section>
    </AuthLayout>
  );
};

export default Register;
