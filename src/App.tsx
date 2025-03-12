import styled from "styled-components";
import { Fornecedores } from "./components/Fornecedores/fornecedores";

// Estilos para o container principal
const MainContainer = styled.main`
  width: 100%;
  margin: 0 auto;
  padding: 2.5rem 1rem;
`;

// Estilos para o título
const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 2rem;
`;

function App() {
  return (
    <MainContainer>
      <Title>Gerenciamento de Fornecedores</Title>
      <Fornecedores />
    </MainContainer>
  );
}

export default App;
