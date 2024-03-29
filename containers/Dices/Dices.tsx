import React, { useEffect, useState } from "react";

import { Dice } from "../../components/Dice";
import { Dices as DicesWrapper } from "../../components/Dices";

import { RollState } from "../../types/enums";
import { IDice } from "../../types/interfaces";

interface IProps {
  onNext: () => void;


  dices: IDice[];
  setDices: (a: React.SetStateAction<IDice[]>) => void;
  state: RollState;
  setState: (state: RollState) => void;
  rolls: number;
  setRolls: (rolls: number) => void;
}

export const Dices: React.FC<IProps> = ({
  state,
  setState,
  onNext,
  dices,
  setDices,
  rolls,
  setRolls,
}) => {
  const [rollAllTrigger, setRollAllTrigger] = useState(false);

  useEffect(() => {
    switch (state) {
      case RollState.Roll:
        setDices((d) => d.map((dice) => ({ ...dice, disabled: false })));
        break;
      case RollState.Choose:
        setDices((d) => d.map((dice) => ({ ...dice, disabled: true })));
        break;
      case RollState.Results:
        setDices((d) =>
          d.map((dice) => ({ ...dice, saved: false, disabled: true }))
        );
    }
  }, [state]);

  useEffect(() => {
    if (rolls === 3) {
      setState(RollState.Results);
    }
  }, [rolls]);

  useEffect(() => {
    if (
      state === RollState.Roll &&
      dices.every((dice) => dice.disabled || dice.saved)
    ) {
      setRolls(rolls + 1);
      setState(RollState.Choose);
    }
  }, [dices]);

  const onRollDice = (index: number, value: number) => {
    setDices((prevDices) => {
      const newDices = [...prevDices];
      newDices[index] = {
        value,
        disabled: true,
      };
      return newDices;
    });
  };
  const onSaveDice = (index: number, saved: boolean) => {
    setDices((prevDices) => {
      const newDices = [...prevDices];
      newDices[index] = {
        ...newDices[index],
        saved,
      };
      return newDices;
    });
  };

  return (
    <DicesWrapper
      state={state}
      onRoll={() => setRollAllTrigger(!rollAllTrigger)}
      onSave={() => setState(RollState.Roll)}
      onStop={() => setState(RollState.Results)}
      onNext={() => {
        onNext();
        setDices((d) =>
          d.map(() => ({ value: 0, saved: false, disabled: false }))
        );
        setRolls(0);
      }}
    >
      {dices.map((dice, i) => (
        <Dice
          key={i}
          state={state}
          onRoll={(res) => onRollDice(i, res)}
          onSave={(saved) => onSaveDice(i, saved)}
          disabled={dice.disabled}
          saved={dice.saved}
          triggerRoll={rollAllTrigger}
        />
      ))}
    </DicesWrapper>
  );
};
