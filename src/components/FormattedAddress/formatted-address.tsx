import { useState, useEffect } from "react";
import { Info } from "lucide-react";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "../ui/Tooltip/tooltip";
import { Address } from "../Suppliers/supplier.type";

export const FormattedAddress = ({ value }: { value: Address }) => {
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

  let address = `${value.street}, ${value.number} - ${value.reference} - ${value.city} - ${value.state} - ${value.zipCode}`;

  if (address.length > 20 && screenWidth < 1024) {
    address = address.slice(0, 20).concat("...");
  }

  return (
    <>
      {address}
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
                <strong>CEP:</strong> {value.zipCode}
                <br />
                <strong>Logradouro:</strong> {value.street}
                <br />
                <strong>Número:</strong> {value.number}
                <br />
                <strong>Cidade:</strong> {value.city}
                <br />
                <strong>Estado:</strong> {value.state}
                <br />
                <strong>Referência:</strong> {value.reference || "-"}
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </>
  );
};
