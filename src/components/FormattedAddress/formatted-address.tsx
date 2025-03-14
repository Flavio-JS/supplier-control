import { useState, useEffect } from "react";
import { Info } from "lucide-react";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "../ui/Tooltip/tooltip";
import { Endereco } from "../Fornecedores/fornecedor.type";

export const FormattedAddress = ({ value }: { value: Endereco }) => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  let endereco = `${value.logradouro}, ${value.numero} - ${value.referencia} - ${value.cidade} - ${value.estado} - ${value.cep}`;

  if (endereco.length > 20 && screenWidth < 1024) {
    endereco = endereco.slice(0, 20).concat("...");
  }

  return (
    <>
      {endereco}
      {screenWidth < 1024 && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div style={{ minWidth: "16px" }}>
                <Info size={16} style={{ cursor: "pointer" }} />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <div>
                <strong>CEP:</strong> {value.cep}
                <br />
                <strong>Logradouro:</strong> {value.logradouro}
                <br />
                <strong>Número:</strong> {value.numero}
                <br />
                <strong>Cidade:</strong> {value.cidade}
                <br />
                <strong>Estado:</strong> {value.estado}
                <br />
                <strong>Referência:</strong> {value.referencia || "-"}
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </>
  );
};
