import React, { useEffect, useState } from "react";
import { RollState } from "../../types/enums";
import { IUser } from "../../types/interfaces";

import { Dices } from "../Dices";
import { defaultDices } from "./constants";
import { socket } from "../../pages/_app";
import useUser from "../../lib/useUser";

interface IProps {
  room: number;
  currentUsers: IUser[];
  setCurrentUsers: (a: React.SetStateAction<IUser[]>) => void;
}

export const Game: React.FC<IProps> = ({ currentUsers, setCurrentUsers, room }) => {
  const { user } = useUser();

  const [rollState, setRollState] = useState(RollState.Roll);
  const [lvl, setLvl] = useState(0);
  const [playerRollsNum, setPlayerRollsNum] = useState(1);
  const [dices, setDices] = useState(defaultDices);


  useEffect(() => {
    socket?.on("DicesRoll", (dices) => {
      console.log('dices rolled', dices);
    })
  }, []);

  useEffect(() => {
    socket?.emit("DicesRoll", { dices, room });
  }, [dices]);


  const onNext = () => {
    setCurrentUsers(() => {
      const newUsers = [...currentUsers];
      const activeUserIndex = newUsers.findIndex((user) => user.active);
      newUsers[activeUserIndex] = {
        ...newUsers[activeUserIndex],
        active: false,
      };
      newUsers[(activeUserIndex + 1) % newUsers.length] = {
        ...newUsers[(activeUserIndex + 1) % newUsers.length],
        active: true,
      };
      if ((activeUserIndex + 1) % newUsers.length === 0) {
        setLvl((l) => l + 1);
      }
      return newUsers;
    });
    setRollState(RollState.Roll);
  };

  return (
    <div>
      User: {user?.login}
      <Dices
        onNext={onNext}

        dices={dices}
        setDices={setDices}
        state={rollState}
        setState={setRollState}
        rolls={playerRollsNum}
        setRolls={setPlayerRollsNum}
      />
    </div>
  );
};