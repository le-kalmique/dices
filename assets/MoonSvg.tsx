import { useTheme } from "@nextui-org/react";

export const MoonSvg: React.FC = () => {
  const theme = useTheme();
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 11.807C9.34899 9.155 8.69999 5.261 10.049 2C8.17399 2.37 6.38299 3.281 4.92899 4.735C1.02399 8.64 1.02399 14.972 4.92899 18.877C8.83499 22.783 15.166 22.782 19.072 18.877C20.526 17.423 21.436 15.633 21.807 13.758C18.545 15.106 14.651 14.458 12 11.807Z"
        fill="white"
      />
    </svg>
  );
};
