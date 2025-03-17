import { useSuppliers } from "../../hooks/useSuppliers";
import styled from "styled-components";
import { SearchBar } from "../SearchBar/search-bar";
import { NewSupplierButton } from "../NewSupplierButton/new-supplier-button";
import { SuppliersTable } from "../SuppliersTable/suppliers-table";
import { SupplierModal } from "../SupplierModal/supplier-modal";
import { ConfirmationModal } from "../ConfirmationModal/confirmation-modal";
import { CustomAlertDialog } from "../CustomAlertDialog/custom-alert-dialog";
import { SuppliersPagination } from "../SuppliersPagination/suppliers-pagination";
import { ModalView } from "../ModalView/modal-view";
import { ExportOptionsPopover } from "../ExportOptionsPopover/export-options-popover";

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
    currentPage,
    totalPages,
    modalOpen,
    modalDeleteOpen,
    modalViewOpen,
    supplierSelected,
    currentSupplier,
    alertOpen,
    alertTitle,
    alertMessage,
    alertType,
    openModal,
    openModalDelete,
    openModalView,
    closeModal,
    closeModalDelete,
    closeModalView,
    saveSupplier,
    deleteSupplier,
    setSearchTerm,
    goToPage,
    exportToCSV,
    exportToExcel,
    setAlertOpen,
  } = useSuppliers();

  return (
    <Container>
      <SearchContainer>
        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        <div style={{ display: "flex", gap: "1rem" }}>
          <NewSupplierButton onClick={() => openModal()} />
          <ExportOptionsPopover
            onExportCSV={exportToCSV}
            onExportExcel={exportToExcel}
          />
        </div>
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
        onSave={saveSupplier}
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
        onConfirm={() => deleteSupplier(currentSupplier?.id)}
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
  );
}
