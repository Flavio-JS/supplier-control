import { useEffect, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../Tooltip/tooltip";
import { Info } from "lucide-react";

export const FormatedDescription = ({
  value,
}: {
  value: string | undefined;
}) => {
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

  const fullDescription = value;

  if (value && value.length > 20 && screenWidth < 1024) {
    value = value.slice(0, 20).concat("...");
  }

  return (
    <>
      {value || "-"}
      {value && value.length > 20 && screenWidth < 1024 && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div style={{ minWidth: "16px" }}>
                <Info size={16} style={{ cursor: "pointer" }} />
              </div>
            </TooltipTrigger>
            <TooltipContent>{fullDescription}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </>
  );
};
