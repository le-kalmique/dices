import { useEffect, useState } from "react";
import Head from "next/head";
import { Text, Button, Spacer } from "@nextui-org/react";
import { Download } from "react-iconly";

import { User } from "../../components/User";
import { Game } from "../../containers/Game";

import { socket } from "../_app";
import { connect } from "../../lib/db";
import { saveToClipboard } from "../../utils";
import RoomModel from "../../models/Room";

import styles from "./room.module.scss";

const Room: React.FC<any> = ({ roomId, users }) => {
  const [currentUsers, setCurrentUsers] = useState(users);

  useEffect(() => {
    socket?.emit("UserConnected", {
      room: roomId,
      users,
    });

    socket?.on("UserAdd", ({ newUsers }) => {
      console.log("UserConnected - client", newUsers);
      if (users.length !== newUsers.length) {
        setCurrentUsers(newUsers);
      }
    });
  }, []);

  return (
    <>
      <Head>
        <title>Dices - Room</title>
      </Head>
      <div className={styles.wrapper}>
        <div className={styles.side}>
          <div className={styles.name}>
            <div className={styles.name__text}>
              <Text
                size={30}
                css={{
                  textGradient: "45deg, $yellow500 -20%, $red500 100%",
                  m: 0,
                }}
                span
              >
                Room
              </Text>
              <Text
                size={30}
                css={{
                  textGradient: "45deg, $red500 -20%, $yellow200 100%",
                  // m: "0 10px",
                }}
                weight="bold"
                span
              >
                {roomId}
              </Text>
            </div>
            <Button
              ghost
              animated
              color="warning"
              size="sm"
              iconRight={<Download set="curved" primaryColor="currentColor" />}
              onClick={() => saveToClipboard(roomId)}
            >
              Copy
            </Button>
          </div>

          <Spacer y={1} />
          <div className={styles.users}>
            {currentUsers?.map(({ name, id, active }) => (
              <User name={name} key={id} active={active} />
            ))}
          </div>
        </div>

        <div className={styles.body}>
          <Game
            room={roomId}
            currentUsers={currentUsers}
            setCurrentUsers={setCurrentUsers}
          />
        </div>
      </div>
    </>
  );
};

export default Room;

export async function getStaticPaths() {
  await connect();
  const rooms = await RoomModel.find({});
  const paths = rooms.map(({ id }) => ({ params: { id } }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  await connect();
  const room = await RoomModel.findOne({ id: params.id });
  return {
    props: {
      roomId: params.id,
      users: room.users.map((user) => ({
        name: user.name,
        id: user._id.toString(),
      })),
    },
  };
}
