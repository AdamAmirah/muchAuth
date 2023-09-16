import Button from "../components/Button";
import Input from "../components/Input";
import AuthLayout from "../layout/AuthLayout";
import Link from "next/link";
import Image from "next/image";
import { HiAtSymbol, HiFingerPrint } from "react-icons/hi";
import { useCallback, useState } from "react";
import { signIn } from "next-auth/react";
import { authOptions } from "./api/auth/[...nextauth]";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import { login_validation } from "../libs/validation";
import { toast } from "react-hot-toast";
import { getSession, useSession } from "next-auth/react";

const Login = () => {
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: login_validation,
    onSubmit: async () => {
      try {
        setIsLoading(true);
        const response = await signIn("credentials", {
          email: formik.values.email,
          password: formik.values.password,
          redirect: false,
        });

        if (response.status !== 200) {
          toast.error("Error : The email or the password is wrong!");
        }
      } catch (error) {
        toast.error("Error : The email or the password is wrong!");
        console.log("error : ", error.message);
      } finally {
        setIsLoading(false);
        router.push("/home");
      }
    },
  });

  return (
    <AuthLayout>
      <section className="w-3/4 mx-auto flex flex-col gap-10">
        <div className="title">
          <h1 className="text-gray-800 text-4xl font-bold py-4">Login</h1>
          <p className="w-3/4 mx-auto text-gray-400">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aut
          </p>
        </div>

        <form className="flex flex-col gap-5" action="">
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
                disabled={isLoading}
                required
                {...formik.getFieldProps("email")}
              />
              <span
                className="icon flex items-center px-4 group-focus:text-blue-400"
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
                type={`${show ? "text" : "password"}`}
                name="password"
                placeholder="Password"
                {...formik.getFieldProps("password")}
                disabled={isLoading}
                required
              />
              <span
                className="icon flex items-center px-4 cursor-pointer"
                onClick={() => setShow(!show)}
                style={{ color: `${show ? "#6366f1" : "#CBD5E1"}` }}
              >
                <HiFingerPrint size={25} />
              </span>
            </div>
          </div>
          <div>
            <Button onClick={formik.handleSubmit}>Login</Button>
          </div>

          <div>
            <button
              className="w-full border py-3 flex justify-center gap-2 hover:bg-gray-200"
              type="button"
            >
              Sign In with Google{" "}
              <Image src={"/assets/google.svg"} width="20" height={20}></Image>
            </button>
          </div>
        </form>

        <p className="text-center text-gray-400">
          don't have an account yet?{" "}
          <Link className="text-blue-700" href={"/register"}>
            Sign Up
          </Link>
        </p>
      </section>
    </AuthLayout>
  );
};

export default Login;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  console.log(session);
  if (session) {
    return {
      redirect: {
        destination: "/home",
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
