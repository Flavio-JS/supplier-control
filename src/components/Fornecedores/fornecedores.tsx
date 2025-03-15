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

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

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

  const fecharModal = () => {
    setModalAberto(false);
    setFornecedorAtual(null);
  };

  const fecharModalExclusao = () => {
    setModalExclusaoAberto(false);
    setFornecedorAtual(null);
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

  const handleSalvarFornecedor = (fornecedor: Fornecedor) => {
    salvarFornecedor(fornecedor);
    fecharModal();
    exibirAlert(
      "Sucesso",
      fornecedor.id
        ? "Fornecedor editado com sucesso!"
        : "Fornecedor adicionado com sucesso!",
      "sucesso"
    );
  };

  const handleExcluirFornecedor = () => {
    if (fornecedorAtual) {
      excluirFornecedor(fornecedorAtual.id);
      fecharModalExclusao();
      exibirAlert("Sucesso", "Fornecedor excluído com sucesso!", "sucesso");
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
        />

        <ModalFornecedor
          aberto={modalAberto}
          onFechar={fecharModal}
          onSalvar={handleSalvarFornecedor}
          fornecedor={fornecedorAtual}
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
