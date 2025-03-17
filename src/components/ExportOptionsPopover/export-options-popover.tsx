import { ExternalLink } from "lucide-react";
import { Button } from "../ui/Button/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/Popover/popover";

interface ExportOptionsPopoverProps {
  onExportCSV: () => void;
  onExportExcel: () => void;
}

export function ExportOptionsPopover({
  onExportCSV,
  onExportExcel,
}: ExportOptionsPopoverProps) {
  return (
    <Popover>
      <PopoverTrigger variant="ghost" size="medium">
        <ExternalLink />
      </PopoverTrigger>
      <PopoverContent
        style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
      >
        <Button variant="ghost" style={{ gap: "0.5rem" }} onClick={onExportCSV}>
          <ExternalLink /> CSV
        </Button>
        <Button
          variant="ghost"
          style={{ gap: "0.5rem" }}
          onClick={onExportExcel}
        >
          <ExternalLink /> XLSX
        </Button>
      </PopoverContent>
    </Popover>
  );
}
