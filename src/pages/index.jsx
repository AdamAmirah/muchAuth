import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import EditProfile from "./home";
import { getSession, useSession } from "next-auth/react";

export default function Home() {
  // handle session
  const { data: session } = useSession();
  const reloadSession = () => {
    const event = new Event("visibilitychange");
    document.dispatchEvent(event);
  };
  // handle sign out

  // Guest page
  const Guest = () => {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-indigo-400 to-indigo-700 text-white">
        <h1 className="text-4xl font-bold mb-8">Welcome to Much Auth</h1>
        <p className="text-lg mb-12">Made by Amirah, in one one day</p>
        <div>
          <Link
            className="px-6 py-3 bg-indigo-500 hover:bg-indigo-600 rounded-lg text-white text-lg"
            href="/login"
          >
            Sign In{" "}
          </Link>
        </div>
      </div>
    );
  };

  return (
    <div className="">
      <Head>
        <title>Much Auth</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {Guest()}
    </div>
  );
}
