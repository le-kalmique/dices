import { Progress } from "@nextui-org/react";

const Loading: React.FC = () => {
  return (
    <Progress indeterminated css={{ m: "auto", maxW: 300 }} color="gradient" />
  );
};

export { Loading };
