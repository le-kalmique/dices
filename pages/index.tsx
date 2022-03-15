import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";

import { CreateRoom } from "../containers/CreateRoom";

export default function Home() {
  return (
    <>
      <Head>
        <title>Dices</title>
      </Head>

      <CreateRoom />
    </>
  );
}
