import { NextUIProvider, createTheme } from "@nextui-org/react";
import Head from "next/head";
import io, { Socket } from "socket.io-client";
import { useEffect, useState } from "react";
import { Header } from "../containers/Header";
import { Loading } from "../containers/Loading";
import { usePageLoading } from "../hooks";
import "../styles/global.scss";

const socket: Socket = io();

export default function App({ Component, pageProps }) {
  const isLoading = usePageLoading();
  const [theme, setTheme] = useState("light");
  const darkTheme = createTheme({
    type: theme,
  });

  useEffect(() => {
    socket.on("now", (data) => {
      console.log(data);
    });
  }, []);

  return (
    <NextUIProvider theme={darkTheme}>
      <Head>
        <title>Dices</title>
      </Head>
      {/* Header */}
      <Header onThemeChanged={(theme) => setTheme(theme)} />

      {/* Body */}
      {isLoading ? <Loading /> : <Component {...pageProps} />}
    </NextUIProvider>
  );
}

export { socket };
