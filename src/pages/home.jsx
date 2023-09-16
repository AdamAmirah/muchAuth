import { Avatar } from "@nextui-org/avatar";
import Button from "../components/Button";
import Input from "../components/Input";
import {
  HiAtSymbol,
  HiFingerPrint,
  HiOutlineUser,
  HiPhone,
} from "react-icons/hi";
import { FaSignOutAlt } from "react-icons/fa";
import { BsPersonWorkspace } from "react-icons/bs";
import { useState, useEffect } from "react";
import { signOut } from "next-auth/react";
import { edit_validation } from "../libs/validation";
import { useFormik } from "formik";
import useCurrentUser from "../hooks/useCurrentUser";
import axios from "axios";
import { toast } from "react-hot-toast";
import { getSession, useSession } from "next-auth/react";
import { RingLoader } from "react-spinners";

const EditProfile = ({ children }) => {
  const [show, setShow] = useState({
    password: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({});

  const { data: currentUser } = useCurrentUser();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: user.name || "",
      email: user.email || "",
      password: "",
      jobTitle: user.jobTitle || "",
      phoneNumber: user.phoneNumber || "",
    },
    validate: edit_validation,
    onSubmit: async () => {
      try {
        setIsLoading(true);
        const response = await axios.patch("/api/edit", {
          email: formik.values.email,
          password: formik.values.password,
          name: formik.values.name,
          jobTitle: formik.values.jobTitle,
          phoneNumber: formik.values.phoneNumber,
        });

        if (response.status !== 200) {
          throw new Error(response.status);
        }
        toast.success("Profile updated.");
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong.");
      } finally {
        setIsLoading(false);
      }
    },
  });

  useEffect(() => {
    if (!currentUser) return;
    setUser(currentUser);
  }, [currentUser]);
  return (
    <div className="flex h-screen bg-gradient-to-b from-indigo-400 to-indigo-700">
      <div className="m-auto rounded-md w-4/5 h-3/4 grid lg:grid-cols-3">
        <div className="relative overflow-hidden rounded-l-md">
          <div className="flex flex-col items-center w-11/12	h-1/2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg">
            <div className="h-2"></div>
            <Avatar
              src="assets/avatar.png"
              className="w-24 h-24 mt-10 bg-white rounded-full mx-auto"
            />
            <h2 className="my-6 text-white text-2xl font-semibold text-center">
              {user.name}
            </h2>
            <button className="w-1/2 mt-4 bg-gray-50 rounded-md py-3 text-blue-500 text-lg">
              Update Profile Image
            </button>
          </div>
        </div>

        <div className="w-full col-span-2 right flex flex-col justify-evenly overflow-hidden bg-slate-50">
          <section className="w-3/4 h-full mx-auto flex flex-col gap-4">
            <h1 className="text-gray-800 text-3xl font-bold pb-4 my-12 border-b">
              Edit Profile
            </h1>

            <form className="flex flex-col gap-6" action="">
              <div>
                <span
                  className={`flex items-start text-rose-600 ${
                    formik.errors.name && formik.touched.name
                      ? "text-rose-600"
                      : ""
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
                  {...formik.getFieldProps("password")}
                  disabled={isLoading}
                  placeholder="Update your password"
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
              <Button onClick={formik.handleSubmit}>
                {isLoading ? (
                  <RingLoader color="#fff" loading={isLoading} size={24} />
                ) : (
                  "Update"
                )}
              </Button>
            </form>
          </section>
        </div>
      </div>
      <div className="flex justify-end items-start m-10">
        <button
          onClick={() => signOut()}
          className="text-black hover:text-blue-600"
        >
          <FaSignOutAlt size={20} />
        </button>
      </div>
    </div>
  );
};

export default EditProfile;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  return {
    props: {
      session,
    },
  };
}
