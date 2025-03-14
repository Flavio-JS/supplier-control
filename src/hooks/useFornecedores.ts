import { useState, useEffect } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { Fornecedor } from "../components/Fornecedores/fornecedor.type";

export function useFornecedores() {
  const [fornecedores, setFornecedores] = useState<Fornecedor[]>([]);
  const [fornecedoresFiltrados, setFornecedoresFiltrados] = useState<
    Fornecedor[]
  >([]);
  const [termoBusca, setTermoBusca] = useState("");

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

  const salvarFornecedor = (fornecedor: Fornecedor) => {
    if (fornecedor.id) {
      axios
        .put(`http://localhost:3001/fornecedores/${fornecedor.id}`, fornecedor)
        .then(() => {
          const fornecedoresAtualizados = fornecedores.map((f) =>
            f.id === fornecedor.id ? fornecedor : f
          );
          setFornecedores(fornecedoresAtualizados);
          setFornecedoresFiltrados(fornecedoresAtualizados);
        })
        .catch((error) => {
          console.error("Erro ao editar fornecedor:", error);
        });
    } else {
      axios
        .post("http://localhost:3001/fornecedores", {
          ...fornecedor,
          id: uuidv4(),
        })
        .then((response) => {
          const novoFornecedor = response.data;
          const fornecedoresAtualizados = [...fornecedores, novoFornecedor];
          setFornecedores(fornecedoresAtualizados);
          setFornecedoresFiltrados(fornecedoresAtualizados);
        })
        .catch((error) => {
          console.error("Erro ao adicionar fornecedor:", error);
        });
    }
  };

  const excluirFornecedor = (id: string) => {
    axios
      .delete(`http://localhost:3001/fornecedores/${id}`)
      .then(() => {
        const fornecedoresAtualizados = fornecedores.filter((f) => f.id !== id);
        setFornecedores(fornecedoresAtualizados);
        setFornecedoresFiltrados(fornecedoresAtualizados);
      })
      .catch((error) => {
        console.error("Erro ao excluir fornecedor:", error);
      });
  };

  return {
    fornecedores,
    fornecedoresFiltrados,
    termoBusca,
    setTermoBusca,
    salvarFornecedor,
    excluirFornecedor,
  };
}
