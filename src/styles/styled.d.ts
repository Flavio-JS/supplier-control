import "styled-components";
import { lightTheme } from "./themes";

type Theme = typeof lightTheme;

declare module "styled-components" {
  export type DefaultTheme = Theme
}
