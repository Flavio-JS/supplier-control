import React from "react";
import { useTheme } from "../../context/theme-context";
import styled from "styled-components";
import { Sun, Moon } from "lucide-react";
import * as SwitchPrimitives from "@radix-ui/react-switch";

const SwitchRoot = styled(SwitchPrimitives.Root)`
  width: 42px;
  height: 24px;
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: 9999px;
  position: relative;
  border: 2px solid ${({ theme }) => theme.colors.primary};
  cursor: pointer;

  &[data-state="checked"] {
    background-color: ${({ theme }) => theme.colors.primary};
  }
`;

const SwitchThumb = styled(SwitchPrimitives.Thumb)`
  display: block;
  width: 20px;
  height: 20px;
  background-color: ${({ theme }) => theme.colors.textOnPrimary};
  border-radius: 9999px;
  transition: transform 100ms;
  transform: translateX(2px);
  will-change: transform;

  &[data-state="checked"] {
    transform: translateX(18px);
  }
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const ThemeToggleButton: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <IconContainer>
        <Sun size={16} />
      </IconContainer>
      <SwitchRoot checked={theme === "dark"} onCheckedChange={toggleTheme}>
        <SwitchThumb />
      </SwitchRoot>
      <IconContainer>
        <Moon size={16} />
      </IconContainer>
    </div>
  );
};

export default ThemeToggleButton;
