import React, { memo, useMemo } from "react";
import { Card, Text, Avatar } from "@nextui-org/react";
import styles from "./User.module.scss";

interface IProps {
  name: string;
  active?: boolean;
}

const colors = ["primary", "secondary", "success", "warning", "error"];
export const User: React.FC<IProps> = memo(({ name, active }) => {
  const color = useMemo(
    () => colors[Math.floor(Math.random() * (colors.length - 1))],
    []
  );

  return (
    <Card className={styles.card}>
      <Avatar
        bordered
        text={name}
        // @ts-ignore
        color={color}
      />
      <Text css={{ fontWeight: "$bold" }}>{name}</Text>
      {active && (
        <Text css={{ marginLeft: "auto", color: "$green700" }}>active</Text>
      )}
    </Card>
  );
});
