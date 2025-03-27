import React from "react";
import { ThemeName, useTheme } from "../../context/theme-context";
import styled from "styled-components";

const Select = styled.select`
  padding: 8px;
  border-radius: 4px;
  width: max-content;
  border: 2px solid ${({ theme }) => theme.colors.primary};
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.textPrimary};
  cursor: pointer;
`;

const ThemeToggleButton: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const handleThemeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTheme(event.target.value as ThemeName);
  };

  return (
    <Select value={theme} onChange={handleThemeChange}>
      <option value="light">Tema Primário (Claro)</option>
      <option value="dark">Tema Primário (Escuro)</option>
      <option value="light2">Tema Secundário (Claro)</option>
      <option value="dark2">Tema Secundário (Escuro)</option>
    </Select>
  );
};

export default ThemeToggleButton;
