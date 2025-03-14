import { Search } from "lucide-react";
import { Input } from "../ui/Input/input";
import styled from "styled-components";

const SearchInputContainer = styled.div`
  position: relative;
  width: 100%;

  @media (min-width: 640px) {
    width: 20rem;
  }
`;

const SearchIcon = styled(Search)`
  position: absolute;
  left: 0.625rem;
  top: 50%;
  transform: translateY(-50%);
  height: 1rem;
  width: 1rem;
  color: #6b7280;
`;

const StyledInput = styled(Input)`
  padding-left: 2rem;
`;

interface SearchBarProps {
  termoBusca: string;
  onSearchChange: (value: string) => void;
}

export function SearchBar({ termoBusca, onSearchChange }: SearchBarProps) {
  return (
    <SearchInputContainer>
      <SearchIcon />
      <StyledInput
        type="text"
        placeholder="Buscar por nome..."
        value={termoBusca}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </SearchInputContainer>
  );
}
