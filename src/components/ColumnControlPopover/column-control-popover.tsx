import { PopoverArrow } from "@radix-ui/react-popover";
import { Button } from "../ui/Button/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/Popover/popover";
import styled from "styled-components";
import { Checkbox } from "../ui/Checkbox/checkbox";

const ColumnList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ColumnItem = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
`;

interface ColumnControlPopoverProps {
  columns: { id: string; label: string; visible: boolean }[];
  onToggleColumn: (columnId: string) => void;
}

export function ColumnControlPopover({
  columns,
  onToggleColumn,
}: ColumnControlPopoverProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button style={{ margin: "16px" }} variant="outline">Colunas</Button>
      </PopoverTrigger>
      <PopoverContent side="bottom" align="end">
        <PopoverArrow />
        <ColumnList>
          {columns.map((column) => (
            <ColumnItem key={column.id}>
              <Checkbox
                checked={column.visible}
                onCheckedChange={() => onToggleColumn(column.id)}
              />
              <span>{column.label}</span>
            </ColumnItem>
          ))}
        </ColumnList>
      </PopoverContent>
    </Popover>
  );
}
