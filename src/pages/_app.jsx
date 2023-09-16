"use client";
import "../../styles/globals.css";
import { NextUIProvider } from "@nextui-org/react";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";

function MyApp({ Component, pageProps }) {
  console.log(pageProps);
  return (
    <SessionProvider session={pageProps.session}>
      <NextUIProvider>
        <Toaster />
        <Component {...pageProps} />
      </NextUIProvider>
    </SessionProvider>
  );
}

export default MyApp;
