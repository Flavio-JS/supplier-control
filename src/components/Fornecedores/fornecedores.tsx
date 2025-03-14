import { useState, useEffect, SetStateAction } from "react";
import { Plus, Search } from "lucide-react";
import { TabelaFornecedores } from "../TabelaFornecedores/tabela-fornecedores";
import { Fornecedor } from "./fornecedor.type";
import { ModalFornecedor } from "../ModalFornecedor/modal-fornecedor";
import { ModalConfirmacao } from "../ModalConfirmacao/modal-confirmacao";
import { Input } from "../ui/Input/input";
import { Button } from "../ui/Button/button";
import styled from "styled-components";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

// Estilos para o container principal
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

// Estilos para o container de busca e botão
const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (min-width: 640px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

// Estilos para o campo de busca
const SearchInputContainer = styled.div`
  position: relative;
  width: 100%;

  @media (min-width: 640px) {
    width: 20rem;
  }
`;

const SearchIcon = styled(Search)`
  position: absolute;
  left: 0.625rem;
  top: 50%;
  transform: translateY(-50%);
  height: 1rem;
  width: 1rem;
  color: #6b7280;
`;

const StyledInput = styled(Input)`
  padding-left: 2rem;
`;

// Estilos para o botão de novo fornecedor
const NewButton = styled(Button)`
  width: 100%;

  @media (min-width: 640px) {
    width: auto;
  }
`;

export function Fornecedores() {
  const [fornecedores, setFornecedores] = useState<Fornecedor[]>([]);
  const [fornecedoresFiltrados, setFornecedoresFiltrados] = useState<
    Fornecedor[]
  >([]);
  const [termoBusca, setTermoBusca] = useState("");
  const [modalAberto, setModalAberto] = useState(false);
  const [modalExclusaoAberto, setModalExclusaoAberto] = useState(false);
  const [fornecedorAtual, setFornecedorAtual] = useState<Fornecedor | null>(
    null
  );

  // Carregar dados iniciais da API do json-server
  useEffect(() => {
    axios
      .get("http://localhost:3001/fornecedores")
      .then((response) => {
        setFornecedores(response.data);
        setFornecedoresFiltrados(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar fornecedores:", error);
      });
  }, []);

  // Filtrar fornecedores com base no termo de busca
  useEffect(() => {
    if (termoBusca.trim() === "") {
      setFornecedoresFiltrados(fornecedores);
    } else {
      const filtrados = fornecedores.filter((fornecedor) =>
        fornecedor.nome.toLowerCase().includes(termoBusca.toLowerCase())
      );
      setFornecedoresFiltrados(filtrados);
    }
  }, [termoBusca, fornecedores]);

  const abrirModal = (fornecedor: Fornecedor | null = null) => {
    setFornecedorAtual(fornecedor);
    setModalAberto(true);
  };

  const abrirModalExclusao = (fornecedor: Fornecedor) => {
    setFornecedorAtual(fornecedor);
    setModalExclusaoAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
    setFornecedorAtual(null);
  };

  const fecharModalExclusao = () => {
    setModalExclusaoAberto(false);
    setFornecedorAtual(null);
  };

  const salvarFornecedor = (fornecedor: Fornecedor) => {
    if (fornecedor.id) {
      // Editar fornecedor existente
      axios
        .put(`http://localhost:3001/fornecedores/${fornecedor.id}`, fornecedor)
        .then(() => {
          const fornecedoresAtualizados = fornecedores.map((f) =>
            f.id === fornecedor.id ? fornecedor : f
          );
          setFornecedores(fornecedoresAtualizados);
          setFornecedoresFiltrados(fornecedoresAtualizados);
          fecharModal(); // Fechar o modal após a edição
        })
        .catch((error) => {
          console.error("Erro ao editar fornecedor:", error);
        });
    } else {
      // Adicionar novo fornecedor
      axios
        .post("http://localhost:3001/fornecedores", {
          ...fornecedor,
          id: uuidv4(),
        })
        .then((response) => {
          const novoFornecedor = response.data;
          const fornecedoresAtualizados = [...fornecedores, novoFornecedor];
          setFornecedores(fornecedoresAtualizados); // Atualiza o estado local
          setFornecedoresFiltrados(fornecedoresAtualizados); // Atualiza a lista filtrada
          fecharModal(); // Fechar o modal após a criação
        })
        .catch((error) => {
          console.error("Erro ao adicionar fornecedor:", error);
        });
    }
  };

  const excluirFornecedor = () => {
    if (fornecedorAtual) {
      axios
        .delete(`http://localhost:3001/fornecedores/${fornecedorAtual.id}`)
        .then(() => {
          const fornecedoresAtualizados = fornecedores.filter(
            (f) => f.id !== fornecedorAtual.id
          );
          setFornecedores(fornecedoresAtualizados); // Atualiza o estado local
          setFornecedoresFiltrados(fornecedoresAtualizados); // Atualiza a lista filtrada
          fecharModalExclusao(); // Fechar o modal após a exclusão
        })
        .catch((error) => {
          console.error("Erro ao excluir fornecedor:", error);
        });
    }
  };

  return (
    <Container>
      <SearchContainer>
        <SearchInputContainer>
          <SearchIcon />
          <StyledInput
            type="text"
            placeholder="Buscar por nome..."
            value={termoBusca}
            onChange={(e: { target: { value: SetStateAction<string> } }) =>
              setTermoBusca(e.target.value)
            }
          />
        </SearchInputContainer>
        <NewButton onClick={() => abrirModal()}>
          <Plus /> Novo Fornecedor
        </NewButton>
      </SearchContainer>

      <TabelaFornecedores
        fornecedores={fornecedoresFiltrados}
        onEditar={abrirModal}
        onExcluir={abrirModalExclusao}
      />

      <ModalFornecedor
        aberto={modalAberto}
        onFechar={fecharModal}
        onSalvar={salvarFornecedor}
        fornecedor={fornecedorAtual}
      />

      <ModalConfirmacao
        aberto={modalExclusaoAberto}
        onFechar={fecharModalExclusao}
        onConfirmar={excluirFornecedor}
        titulo="Excluir Fornecedor"
        mensagem={`Tem certeza que deseja excluir o fornecedor "${fornecedorAtual?.nome}"? Esta ação não pode ser desfeita.`}
      />
    </Container>
  );
}
