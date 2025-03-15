import { useTheme } from "../context/theme-context";
import {
  lightTheme,
  darkTheme,
  lightTheme2,
  darkTheme2,
} from "../styles/themes";

const useGetTheme = () => {
  const { theme } = useTheme();

  const getTheme = () => {
    switch (theme) {
      case "light":
        return lightTheme;
      case "dark":
        return darkTheme;
      case "light2":
        return lightTheme2;
      case "dark2":
        return darkTheme2;
      default:
        return lightTheme;
    }
  };

  return { getTheme };
};

export default useGetTheme;
