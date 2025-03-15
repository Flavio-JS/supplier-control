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

  // Filtrar fornecedores com base no termo de busca
  const fornecedoresFiltrados = useMemo(() => {
    if (termoBusca.trim() === "") {
      return fornecedores;
    } else {
      return fornecedores.filter((fornecedor) =>
        fornecedor.nome.toLowerCase().includes(termoBusca.toLowerCase())
      );
    }
  }, [termoBusca, fornecedores]);

  // Calcular o total de páginas com base nos fornecedores filtrados
  const totalPages = useMemo(() => {
    return Math.ceil(fornecedoresFiltrados.length / limitPerPage);
  }, [fornecedoresFiltrados, limitPerPage]);

  // Obter os fornecedores da página atual
  const fornecedoresPaginados = useMemo(() => {
    const startIndex = (currentPage - 1) * limitPerPage;
    const endIndex = startIndex + limitPerPage;
    return fornecedoresFiltrados.slice(startIndex, endIndex);
  }, [fornecedoresFiltrados, currentPage, limitPerPage]);

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  const salvarFornecedor = (fornecedor: Fornecedor) => {
    if (fornecedor.id) {
      axios
        .put(`${dbUrl}/fornecedores/${fornecedor.id}`, fornecedor)
        .then(() => {
          const fornecedoresAtualizados = fornecedores.map((f) =>
            f.id === fornecedor.id ? fornecedor : f
          );
          setFornecedores(fornecedoresAtualizados);
          setCurrentPage(1);
        })
        .catch((error) => {
          console.error("Erro ao editar fornecedor:", error);
        });
    } else {
      axios
        .post(`${dbUrl}/fornecedores`, {
          ...fornecedor,
          id: uuidv4(),
        })
        .then((response) => {
          const novoFornecedor = response.data;
          const fornecedoresAtualizados = [novoFornecedor, ...fornecedores];
          setFornecedores(fornecedoresAtualizados);
          setCurrentPage(1);
        })
        .catch((error) => {
          console.error("Erro ao adicionar fornecedor:", error);
        });
    }
  };

  const excluirFornecedor = (id: string) => {
    axios
      .delete(`${dbUrl}/fornecedores/${id}`)
      .then(() => {
        const fornecedoresAtualizados = fornecedores.filter((f) => f.id !== id);
        setFornecedores(fornecedoresAtualizados);
        setCurrentPage(1);
      })
      .catch((error) => {
        console.error("Erro ao excluir fornecedor:", error);
      });
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
