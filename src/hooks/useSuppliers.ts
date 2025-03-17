import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { Supplier } from "../components/Suppliers/supplier.type";
import * as XLSX from "xlsx";

export function useSuppliers() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
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

  const limitPerPage = import.meta.env.VITE_LIMIT_PER_PAGE
    ? parseInt(import.meta.env.VITE_LIMIT_PER_PAGE)
    : 5;
  const dbUrl = import.meta.env.VITE_DB_URL ? import.meta.env.VITE_DB_URL : "";

  // Buscar todos os fornecedores
  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await axios.get(`${dbUrl}/suppliers`);
        setSuppliers(response.data.reverse());
      } catch (error) {
        console.error("Erro ao buscar fornecedores:", error);
      }
    };

    fetchSuppliers();
  }, [dbUrl]);

  const filteredSuppliers = useMemo(() => {
    if (searchTerm.trim() === "") {
      return suppliers;
    } else {
      return suppliers.filter((supplier) =>
        supplier.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  }, [searchTerm, suppliers]);

  const totalPages = useMemo(() => {
    return Math.ceil(filteredSuppliers.length / limitPerPage);
  }, [filteredSuppliers, limitPerPage]);

  const pagedSuppliers = useMemo(() => {
    const startIndex = (currentPage - 1) * limitPerPage;
    const endIndex = startIndex + limitPerPage;
    return filteredSuppliers.slice(startIndex, endIndex);
  }, [filteredSuppliers, currentPage, limitPerPage]);

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  const saveSupplier = async (supplier: Supplier): Promise<void> => {
    try {
      if (supplier.id) {
        await axios.put(`${dbUrl}/suppliers/${supplier.id}`, supplier);
        setSuppliers((prev) =>
          prev.map((f) => (f.id === supplier.id ? supplier : f))
        );
      } else {
        const response = await axios.post(`${dbUrl}/suppliers`, {
          ...supplier,
          id: uuidv4(),
        });
        setSuppliers((prev) => [response.data, ...prev]);
      }
      setCurrentPage(1);
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
      throw error;
    }
  };

  const deleteSupplier = async (id: string | undefined): Promise<void> => {
    if (!id) {
      console.error("ID do fornecedor não encontrado");
      return;
    }

    try {
      await axios.delete(`${dbUrl}/suppliers/${id}`);
      setSuppliers((prev) => prev.filter((f) => f.id !== id));
      setCurrentPage(1);
      showAlert("Sucesso", "Fornecedor excluído com sucesso!", "success");
    } catch (error) {
      console.error("Erro ao excluir fornecedor:", error);
      showAlert(
        "Erro",
        "Falha ao excluir fornecedor. Tente novamente.",
        "error"
      );
      throw error;
    }
  };

  const exportToCSV = () => {
    const headers = [
      "ID",
      "Nome",
      "Descrição",
      "CEP",
      "Estado",
      "Cidade",
      "Rua",
      "Número",
      "Referência",
      "Contatos (Nome)",
      "Contatos (Telefone)",
    ];

    const rows = suppliers.map((supplier) => {
      const contactNames = supplier.contacts
        .map((contact) => contact.name)
        .join(";");
      const contactPhones = supplier.contacts
        .map((contact) => contact.telephone)
        .join(";");

      return [
        supplier.id,
        supplier.name,
        supplier.description || "",
        supplier.address.zipCode,
        supplier.address.state,
        supplier.address.city,
        supplier.address.street,
        supplier.address.number,
        supplier.address.reference || "",
        contactNames,
        contactPhones,
      ]
        .map((value) => `"${value}"`)
        .join("\t");
    });

    const csvContent = `\uFEFF${headers
      .map((h) => `"${h}"`)
      .join("\t")}\n${rows.join("\n")}`;

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "fornecedores.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportToExcel = () => {
    const headers = [
      "ID",
      "Nome",
      "Descrição",
      "CEP",
      "Estado",
      "Cidade",
      "Rua",
      "Número",
      "Referência",
      "Contatos (Nome)",
      "Contatos (Telefone)",
    ];

    const data = suppliers.map((supplier) => {
      const contactNames = supplier.contacts
        .map((contact) => contact.name)
        .join("; ");
      const contactPhones = supplier.contacts
        .map((contact) => contact.telephone)
        .join("; ");

      return [
        supplier.id,
        supplier.name,
        supplier.description || "",
        supplier.address.zipCode,
        supplier.address.state,
        supplier.address.city,
        supplier.address.street,
        supplier.address.number,
        supplier.address.reference || "",
        contactNames,
        contactPhones,
      ];
    });

    const worksheet = XLSX.utils.aoa_to_sheet([headers, ...data]);

    const columnWidths = headers.map((header) => ({ wch: header.length + 5 }));
    worksheet["!cols"] = columnWidths;

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Fornecedores");

    XLSX.writeFile(workbook, "fornecedores.xlsx");
  };

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

  return {
    suppliers: pagedSuppliers,
    searchTerm,
    setSearchTerm,
    saveSupplier,
    deleteSupplier,
    currentPage,
    totalPages,
    goToPage,
    exportToCSV,
    exportToExcel,
    modalOpen,
    modalDeleteOpen,
    modalViewOpen,
    supplierSelected,
    currentSupplier,
    alertOpen,
    setAlertOpen,
    alertTitle,
    alertMessage,
    alertType,
    openModal,
    openModalDelete,
    openModalView,
    closeModal,
    closeModalDelete,
    closeModalView,
    showAlert,
  };
}
