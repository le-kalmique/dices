import { useState } from "react";
import { useRouter } from "next/router";
import {
  Input,
  useTheme,
  Card,
  Text,
  Spacer,
  Button,
  Container,
} from "@nextui-org/react";
import uniqid from "uniqid";
import styles from "./CreateRoom.module.scss";
import { addRoom, addUserToRoom } from "../../lib/rooms";
import useUser from "../../lib/useUser";
import fetchJson from "../../lib/fetchJson";
import { User } from "../../pages/api/user";

const CreateRoom: React.FC = () => {
  const theme = useTheme();
  const router = useRouter();

  const { mutateUser } = useUser();

  const [roomId, setRoomId] = useState("");
  const [name_j, setNameJ] = useState("");
  const [name_c, setNameC] = useState("");

  const createRoom = async () => {
    const roomId = uniqid();

    await addRoom(roomId, name_c);
    router.push(`/room/${roomId}`);
  };

  const joinRoom = async () => {


    await addUserToRoom(roomId, name_j);
    router.push(`/room/${roomId}`);
  };

  return (
    <div className={styles.createRoom}>
      <Card css={{ mw: 400, textAlign: "center" }}>
        <Text
          h3
          size={40}
          css={{
            textGradient: "45deg, $blue500 -20%, $pink500 50%",
            textAlign: "center",
          }}
          weight="bold"
        >
          Join room
        </Text>
        <Spacer />
        <Input
          underlined={theme.isDark}
          placeholder="Your name"
          value={name_j}
          onChange={(e) => setNameJ(e.target.value)}
        />
        <Spacer y={0.5} />
        <Input
          underlined={theme.isDark}
          placeholder="Room number"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
        />
        <Spacer y={0.5} />
        <Button color="gradient" onClick={joinRoom}>
          Go
        </Button>
      </Card>
      <Card css={{ mw: 400 }} animated>
        <Text
          h3
          size={40}
          css={{
            textGradient: "45deg, $blue500 -20%, $pink500 50%",
            textAlign: "center",
          }}
          weight="bold"
        >
          Create room
        </Text>
        <Spacer />
        <Container
          display="flex"
          direction="column"
          justify="center"
          alignItems="center"
          fluid
          css={{ gap: 10, p: 0, h: "100%" }}
        >
          <Input
            underlined={theme.isDark}
            placeholder="Your name"
            css={{ w: "100%", m: 0 }}
            value={name_c}
            onChange={(e) => setNameC(e.target.value)}
          />
          <Button
            color="gradient"
            css={{ w: "100%", m: 0 }}
            onClick={createRoom}
          >
            Go
          </Button>
        </Container>
      </Card>
    </div>
  );
};

export { CreateRoom };
