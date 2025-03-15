import styled from "styled-components";
import { Fornecedores } from "./components/Fornecedores/fornecedores";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./styles/themes";
import { useTheme } from "./context/theme-context";
import ThemeToggleButton from "./components/ThemeToggleButton/theme-toggle-button";

const MainContainer = styled.main`
  width: 100%;
  min-height: 100vh;
  margin: 0 auto;
  padding: 2.5rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) =>
    theme.colors.textPrimary};
`;

// Estilos para o título
const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) =>
    theme.colors.textPrimary};
`;

function App() {
  const { theme } = useTheme();

  return (
    <StyledThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <MainContainer>
        <Title>Gerenciamento de Fornecedores</Title>
        <ThemeToggleButton />
        <Fornecedores />
      </MainContainer>
    </StyledThemeProvider>
  );
}

export default App;
