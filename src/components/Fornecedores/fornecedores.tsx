import { useState } from "react";
import { useFornecedores } from "../../hooks/useFornecedores";
import { Fornecedor } from "./fornecedor.type";
import styled from "styled-components";
import { SearchBar } from "../SearchBar/search-bar";
import { NewSupplierButton } from "../NewSupplierButton/new-supplier-button";
import { TabelaFornecedores } from "../TabelaFornecedores/tabela-fornecedores";
import { ModalFornecedor } from "../ModalFornecedor/modal-fornecedor";
import { ModalConfirmacao } from "../ModalConfirmacao/modal-confirmacao";
import { CustomAlertDialog } from "../CustomAlertDialog/custom-alert-dialog";
import { FornecedoresPagination } from "../FornecedoresPagination/fornecedores-pagination";
import { ModalVisualizacao } from "../ModalVisualizacao/modal-visualizacao";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.textPrimary};
  padding: 1.5rem;
  border-radius: 8px;
`;

const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: ${({ theme }) => theme.colors.surface};
  padding: 1rem;
  border-radius: 8px;

  @media (min-width: 640px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

export function Fornecedores() {
  const {
    fornecedores: fornecedoresPaginados,
    termoBusca,
    setTermoBusca,
    salvarFornecedor,
    excluirFornecedor,
    currentPage,
    totalPages,
    goToPage,
  } = useFornecedores();

  const [modalAberto, setModalAberto] = useState(false);
  const [modalExclusaoAberto, setModalExclusaoAberto] = useState(false);
  const [modalVisualizacaoAberto, setModalVisualizacaoAberto] = useState(false);
  const [fornecedorSelecionado, setFornecedorSelecionado] =
    useState<Fornecedor | null>(null);

  const [fornecedorAtual, setFornecedorAtual] = useState<Fornecedor | null>(
    null
  );

  const [alertAberto, setAlertAberto] = useState(false);
  const [alertTitulo, setAlertTitulo] = useState("");
  const [alertMensagem, setAlertMensagem] = useState("");
  const [alertTipo, setAlertTipo] = useState<"sucesso" | "erro">("sucesso");

  const abrirModal = (fornecedor: Fornecedor | null = null) => {
    setFornecedorAtual(fornecedor);
    setModalAberto(true);
  };

  const abrirModalExclusao = (fornecedor: Fornecedor) => {
    setFornecedorAtual(fornecedor);
    setModalExclusaoAberto(true);
  };

  const abrirModalVisualizacao = (fornecedor: Fornecedor) => {
    setFornecedorSelecionado(fornecedor);
    setModalVisualizacaoAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
    setFornecedorAtual(null);
  };

  const fecharModalExclusao = () => {
    setModalExclusaoAberto(false);
    setFornecedorAtual(null);
  };

  const fecharModalVisualizacao = () => {
    setModalVisualizacaoAberto(false);
    setFornecedorSelecionado(null);
  };

  const exibirAlert = (
    titulo: string,
    mensagem: string,
    tipo: "sucesso" | "erro"
  ) => {
    setAlertTitulo(titulo);
    setAlertMensagem(mensagem);
    setAlertTipo(tipo);
    setAlertAberto(true);

    setTimeout(() => {
      setAlertAberto(false);
    }, 3000);
  };

  const handleSalvarFornecedor = async (fornecedor: Fornecedor) => {
    try {
      await salvarFornecedor(fornecedor);
      fecharModal();
      exibirAlert(
        "Sucesso",
        fornecedor.id
          ? "Fornecedor editado com sucesso!"
          : "Fornecedor adicionado com sucesso!",
        "sucesso"
      );
    } catch (error) {
      console.error("Erro ao salvar fornecedor:", error);
      exibirAlert(
        "Erro",
        "Falha ao salvar fornecedor. Tente novamente.",
        "erro"
      );
    }
  };

  const handleExcluirFornecedor = async () => {
    if (fornecedorAtual) {
      try {
        await excluirFornecedor(fornecedorAtual.id);
        fecharModalExclusao();
        exibirAlert("Sucesso", "Fornecedor excluído com sucesso!", "sucesso");
      } catch (error) {
        console.error("Erro ao excluir fornecedor:", error);
        exibirAlert(
          "Erro",
          "Falha ao excluir fornecedor. Tente novamente.",
          "erro"
        );
      }
    }
  };

  const handleSearch = (value: string) => {
    goToPage(1);
    setTermoBusca(value);
  };

  return (
    <>
      <Container>
        <SearchContainer>
          <SearchBar termoBusca={termoBusca} onSearchChange={handleSearch} />
          <NewSupplierButton onClick={() => abrirModal()} />
        </SearchContainer>

        <FornecedoresPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={goToPage}
        />

        <TabelaFornecedores
          fornecedores={fornecedoresPaginados}
          onEditar={abrirModal}
          onExcluir={abrirModalExclusao}
          onVisualizar={abrirModalVisualizacao}
        />

        <ModalFornecedor
          aberto={modalAberto}
          onFechar={fecharModal}
          onSalvar={handleSalvarFornecedor}
          fornecedor={fornecedorAtual}
        />

        <ModalVisualizacao
          aberto={modalVisualizacaoAberto}
          onFechar={fecharModalVisualizacao}
          fornecedor={fornecedorSelecionado}
        />

        <ModalConfirmacao
          aberto={modalExclusaoAberto}
          onFechar={fecharModalExclusao}
          onConfirmar={handleExcluirFornecedor}
          titulo="Excluir Fornecedor"
          mensagem={`Tem certeza que deseja excluir o fornecedor "${fornecedorAtual?.nome}"? Esta ação não pode ser desfeita.`}
        />

        <CustomAlertDialog
          aberto={alertAberto}
          onOpenChange={setAlertAberto}
          titulo={alertTitulo}
          mensagem={alertMensagem}
          tipo={alertTipo}
        />
      </Container>
    </>
  );
}
