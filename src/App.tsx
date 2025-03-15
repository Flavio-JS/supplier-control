import styled from "styled-components";
import { Fornecedores } from "./components/Fornecedores/fornecedores";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import ThemeToggleButton from "./components/ThemeToggleButton/theme-toggle-button";
import useGetTheme from "./hooks/useGetTheme";

const MainContainer = styled.main`
  width: 100%;
  min-height: 100vh;
  margin: 0 auto;
  padding: 2.5rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

function App() {
  const { getTheme } = useGetTheme();

  return (
    <StyledThemeProvider theme={getTheme()}>
      <MainContainer>
        <Title>Gerenciamento de Fornecedores</Title>
        <ThemeToggleButton />
        <Fornecedores />
      </MainContainer>
    </StyledThemeProvider>
  );
}

export default App;
