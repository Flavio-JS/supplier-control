import { useState, useEffect, SetStateAction } from "react";
import { Plus, Search } from "lucide-react";
import { TabelaFornecedores } from "../TabelaFornecedores/tabela-fornecedores";
import { Fornecedor } from "./fornecedor.type";
import { ModalFornecedor } from "../ModalFornecedor/modal-fornecedor";
import { ModalConfirmacao } from "../ModalConfirmacao/modal-confirmacao";
import { Input } from "../ui/Input/input";
import { Button } from "../ui/Button/button";
import styled from "styled-components";

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

  // Carregar dados iniciais (simulando uma API)
  useEffect(() => {
    const dadosIniciais: Fornecedor[] = [
      {
        id: 1,
        nome: "Distribuidora ABC",
        email: "contato@abc.com",
        telefone: "(11) 99999-1111",
        endereco: "Av. Paulista, 1000",
        cnpj: "12.345.678/0001-90",
      },
      {
        id: 2,
        nome: "Suprimentos XYZ",
        email: "vendas@xyz.com",
        telefone: "(11) 99999-2222",
        endereco: "Rua Augusta, 500",
        cnpj: "98.765.432/0001-10",
      },
      {
        id: 3,
        nome: "Materiais Rápidos",
        email: "contato@rapidos.com",
        telefone: "(11) 99999-3333",
        endereco: "Av. Rebouças, 200",
        cnpj: "45.678.901/0001-23",
      },
    ];
    setFornecedores(dadosIniciais);
    setFornecedoresFiltrados(dadosIniciais);
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

  const fecharModal = () => {
    setModalAberto(false);
    setFornecedorAtual(null);
  };

  const abrirModalExclusao = (fornecedor: Fornecedor) => {
    setFornecedorAtual(fornecedor);
    setModalExclusaoAberto(true);
  };

  const fecharModalExclusao = () => {
    setModalExclusaoAberto(false);
    setFornecedorAtual(null);
  };

  const salvarFornecedor = (fornecedor: Fornecedor) => {
    if (fornecedor.id) {
      // Editar fornecedor existente
      setFornecedores(
        fornecedores.map((f) => (f.id === fornecedor.id ? fornecedor : f))
      );
    } else {
      // Adicionar novo fornecedor
      const novoFornecedor = {
        ...fornecedor,
        id: Math.max(0, ...fornecedores.map((f) => f.id)) + 1,
      };
      setFornecedores([...fornecedores, novoFornecedor]);
    }
    fecharModal();
  };

  const excluirFornecedor = () => {
    if (fornecedorAtual) {
      setFornecedores(fornecedores.filter((f) => f.id !== fornecedorAtual.id));
      fecharModalExclusao();
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
