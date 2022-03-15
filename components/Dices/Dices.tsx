import React, { useMemo } from "react";
import { Button } from "@nextui-org/react";
import { RollState } from "../../types/enums";
import styles from "./Dices.module.scss";

interface IProps {
  onRoll: () => void;
  onSave: () => void;
  onNext: () => void;
  onStop: () => void;
  state: RollState;
}

export const Dices: React.FC<IProps> = ({
  onRoll,
  onSave,
  onNext,
  onStop,
  state,
  children,
}) => {
  const message = useMemo(() => {
    switch (state) {
      case RollState.Roll:
        return "Бросай кубики";
      case RollState.Choose:
        return "Выбери, какие кубики оставить";
      case RollState.Results:
        return "Выбери, какое поле закрыть";
    }
  }, [state]);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div>{message}</div>
        {children}
      </div>
      <div className={styles.buttonsContainer}>
        {state === RollState.Roll && (
          <Button color="gradient" animated onClick={() => onRoll()}>
            Roll
          </Button>
        )}
        {state === RollState.Choose && (
          <>
            <Button color="gradient" animated onClick={() => onSave()}>
              Save
            </Button>
            <Button color="gradient" animated onClick={() => onStop()}>
              Stop
            </Button>
          </>
        )}
        {state === RollState.Results && (
          <Button color="gradient" animated onClick={() => onNext()}>
            Next
          </Button>
        )}
      </div>
    </div>
  );
};
