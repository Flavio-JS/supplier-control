import { useState } from "react";
import { useSuppliers } from "../../hooks/useSuppliers";
import { Supplier } from "./supplier.type";
import styled from "styled-components";
import { SearchBar } from "../SearchBar/search-bar";
import { NewSupplierButton } from "../NewSupplierButton/new-supplier-button";
import { SuppliersTable } from "../SuppliersTable/suppliers-table.";
import { SupplierModal } from "../SupplierModal/supplier-modal";
import { ConfirmationModal } from "../ConfirmationModal/confirmation-modal";
import { CustomAlertDialog } from "../CustomAlertDialog/custom-alert-dialog";
import { SuppliersPagination } from "../SuppliersPagination/suppliers-pagination";
import { ModalView } from "../ModalView/modal-view";
import { Button } from "../ui/Button/button";

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

export function Suppliers() {
  const {
    suppliers,
    searchTerm,
    setSearchTerm,
    saveSupplier,
    deleteSupplier,
    currentPage,
    totalPages,
    goToPage,
    exportToCSV,
  } = useSuppliers();

  const [modalOpen, setModalOpen] = useState(false);
  const [modalDeleteOpen, setModalDeleteOpen] = useState(false);
  const [modalViewOpen, setModalViewOpen] = useState(false);
  const [supplierSelected, setSupplierSelected] = useState<Supplier | null>(
    null
  );

  const [currentSupplier, setCurrentSupplier] = useState<Supplier | null>(null);

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState<"success" | "error">("success");

  const openModal = (supplier: Supplier | null = null) => {
    setCurrentSupplier(supplier);
    setModalOpen(true);
  };

  const openModalDelete = (supplier: Supplier) => {
    setCurrentSupplier(supplier);
    setModalDeleteOpen(true);
  };

  const openModalView = (supplier: Supplier) => {
    setSupplierSelected(supplier);
    setModalViewOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setCurrentSupplier(null);
  };

  const closeModalDelete = () => {
    setModalDeleteOpen(false);
    setCurrentSupplier(null);
  };

  const closeModalView = () => {
    setModalViewOpen(false);
    setSupplierSelected(null);
  };

  const showAlert = (
    title: string,
    message: string,
    type: "success" | "error"
  ) => {
    setAlertTitle(title);
    setAlertMessage(message);
    setAlertType(type);
    setAlertOpen(true);

    setTimeout(() => {
      setAlertOpen(false);
    }, 3000);
  };

  const handleSaveSupplier = async (supplier: Supplier) => {
    try {
      await saveSupplier(supplier);
      closeModal();
      showAlert(
        "Sucesso",
        supplier.id
          ? "Fornecedor editado com sucesso!"
          : "Fornecedor adicionado com sucesso!",
        "success"
      );
    } catch (error) {
      console.error("Erro ao salvar fornecedor:", error);
      showAlert(
        "Erro",
        "Falha ao salvar fornecedor. Tente novamente.",
        "error"
      );
    }
  };

  const handleDeleteSupplier = async () => {
    if (currentSupplier) {
      try {
        await deleteSupplier(currentSupplier.id);
        closeModalDelete();
        showAlert("Sucesso", "Fornecedor excluído com sucesso!", "success");
      } catch (error) {
        console.error("Erro ao excluir fornecedor:", error);
        showAlert(
          "Erro",
          "Falha ao excluir fornecedor. Tente novamente.",
          "error"
        );
      }
    }
  };

  const handleSearch = (value: string) => {
    goToPage(1);
    setSearchTerm(value);
  };

  return (
    <>
      <Container>
        <SearchContainer>
          <SearchBar searchTerm={searchTerm} onSearchChange={handleSearch} />
          <NewSupplierButton onClick={() => openModal()} />
          <Button onClick={exportToCSV}>Exportar CSV</Button>
        </SearchContainer>

        <SuppliersTable
          suppliers={suppliers}
          onEdit={openModal}
          onDelete={openModalDelete}
          onView={openModalView}
        />

        <SupplierModal
          isOpen={modalOpen}
          onClose={closeModal}
          onSave={handleSaveSupplier}
          supplier={currentSupplier}
        />

        <SuppliersPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={goToPage}
        />

        <ModalView
          open={modalViewOpen}
          onClose={closeModalView}
          supplier={supplierSelected}
        />

        <ConfirmationModal
          isOpen={modalDeleteOpen}
          onClose={closeModalDelete}
          onConfirm={handleDeleteSupplier}
          title="Excluir Fornecedor"
          message={`Tem certeza que deseja excluir o fornecedor "${currentSupplier?.name}"? Esta ação não pode ser desfeita.`}
        />

        <CustomAlertDialog
          open={alertOpen}
          onOpenChange={setAlertOpen}
          title={alertTitle}
          message={alertMessage}
          type={alertType}
        />
      </Container>
    </>
  );
}
