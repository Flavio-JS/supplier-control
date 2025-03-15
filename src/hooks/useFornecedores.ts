import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { Fornecedor } from "../components/Fornecedores/fornecedor.type";

export function useFornecedores() {
  const [fornecedores, setFornecedores] = useState<Fornecedor[]>([]);
  const [termoBusca, setTermoBusca] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const limitPerPage = import.meta.env.VITE_LIMIT_PER_PAGE
    ? parseInt(import.meta.env.VITE_LIMIT_PER_PAGE)
    : 5;
  const dbUrl = import.meta.env.VITE_DB_URL ? import.meta.env.VITE_DB_URL : "";

  // Buscar todos os fornecedores
  useEffect(() => {
    const fetchFornecedores = async () => {
      try {
        const response = await axios.get(`${dbUrl}/fornecedores`);
        setFornecedores(response.data.reverse());
      } catch (error) {
        console.error("Erro ao buscar fornecedores:", error);
      }
    };

    fetchFornecedores();
  }, [dbUrl]);

  const fornecedoresFiltrados = useMemo(() => {
    if (termoBusca.trim() === "") {
      return fornecedores;
    } else {
      return fornecedores.filter((fornecedor) =>
        fornecedor.nome.toLowerCase().includes(termoBusca.toLowerCase())
      );
    }
  }, [termoBusca, fornecedores]);

  const totalPages = useMemo(() => {
    return Math.ceil(fornecedoresFiltrados.length / limitPerPage);
  }, [fornecedoresFiltrados, limitPerPage]);

  const fornecedoresPaginados = useMemo(() => {
    const startIndex = (currentPage - 1) * limitPerPage;
    const endIndex = startIndex + limitPerPage;
    return fornecedoresFiltrados.slice(startIndex, endIndex);
  }, [fornecedoresFiltrados, currentPage, limitPerPage]);

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  const salvarFornecedor = async (fornecedor: Fornecedor): Promise<void> => {
    try {
      if (fornecedor.id) {
        await axios.put(`${dbUrl}/fornecedores/${fornecedor.id}`, fornecedor);
        setFornecedores((prev) =>
          prev.map((f) => (f.id === fornecedor.id ? fornecedor : f))
        );
      } else {
        const response = await axios.post(`${dbUrl}/fornecedores`, {
          ...fornecedor,
          id: uuidv4(),
        });
        setFornecedores((prev) => [response.data, ...prev]);
      }
      setCurrentPage(1);
    } catch (error) {
      console.error("Erro ao salvar fornecedor:", error);
      throw error;
    }
  };

  const excluirFornecedor = async (id: string): Promise<void> => {
    try {
      await axios.delete(`${dbUrl}/fornecedores/${id}`);
      setFornecedores((prev) => prev.filter((f) => f.id !== id));
      setCurrentPage(1);
    } catch (error) {
      console.error("Erro ao excluir fornecedor:", error);
      throw error;
    }
  };

  return {
    fornecedores: fornecedoresPaginados,
    fornecedoresFiltrados,
    termoBusca,
    setTermoBusca,
    salvarFornecedor,
    excluirFornecedor,
    currentPage,
    totalPages,
    goToPage,
  };
}
