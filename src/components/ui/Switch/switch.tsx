import styled from "styled-components";
import * as SwitchPrimitives from "@radix-ui/react-switch";

const SwitchRoot = styled(SwitchPrimitives.Root)`
  width: 42px;
  height: 24px;
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 9999px;
  position: relative;
  border: 2px solid ${({ theme }) => theme.colors.text};
  cursor: pointer;

  &[data-state="checked"] {
    background-color: ${({ theme }) => theme.colors.primary};
  }
`;

const SwitchThumb = styled(SwitchPrimitives.Thumb)`
  display: block;
  width: 20px;
  height: 20px;
  background-color: ${({ theme }) => theme.colors.text};
  border-radius: 9999px;
  transition: transform 100ms;
  transform: translateX(2px);
  will-change: transform;

  &[data-state="checked"] {
    transform: translateX(18px);
  }
`;

export { SwitchRoot, SwitchThumb };
