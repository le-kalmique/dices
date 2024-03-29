import { Container, Text, Switch, ThemeType } from "@nextui-org/react";
import Link from "next/link";
import { MoonSvg, SunSvg } from "../../assets";

interface IProps {
  onThemeChanged: (theme: ThemeType) => void;
}

export const Header: React.FC<IProps> = ({ onThemeChanged }) => {
  return (
    <Container
      display="flex"
      alignItems="center"
      justify="space-between"
      css={{ m: 0, mw: "100%" }}
    >
      <Link href={'/'}>
        <Text
          h1
          size={55}
          css={{
            textGradient: "45deg, $blue500 0%, $pink500 70%",
            cursor: 'pointer'
          }}
          weight="bold"
        >
          DICES
        </Text>
      </Link>
      <Switch
        size="md"
        shadow
        color="secondary"
        onChange={(e) => onThemeChanged(e.target.checked ? "dark" : "light")}
        iconOn={<MoonSvg />}
        iconOff={<SunSvg />}
      />
    </Container>
  );
};
