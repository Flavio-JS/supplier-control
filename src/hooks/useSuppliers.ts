import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { Supplier } from "../components/Suppliers/supplier.type";

export function useSuppliers() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
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
    } catch (error) {
      console.error("Erro ao salvar fornecedor:", error);
      throw error;
    }
  };

  const deleteSupplier = async (id: string): Promise<void> => {
    try {
      await axios.delete(`${dbUrl}/suppliers/${id}`);
      setSuppliers((prev) => prev.filter((f) => f.id !== id));
      setCurrentPage(1);
    } catch (error) {
      console.error("Erro ao excluir fornecedor:", error);
      throw error;
    }
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
  };
}
