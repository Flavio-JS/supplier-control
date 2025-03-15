import styled from "styled-components";
import { useTheme } from "../../context/theme-context";
import { Moon, Sun } from "lucide-react";
import { SwitchRoot, SwitchThumb } from "../ui/Switch/switch";

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: ${({ theme }) => theme.colors.text};
`;

export const ThemeToggleButton: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <>
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
    </>
  );
};
