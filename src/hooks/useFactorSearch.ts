
import { useState } from 'react';

interface UseFactorSearchProps {
  category: string;
  defaultOptions: string[];
}

interface UseFactorSearchResult {
  searchValue: string;
  searchOpen: boolean;
  filteredOptions: string[];
  setSearchOpen: (open: boolean) => void;
  handleSearchChange: (value: string) => void;
  handleAddCustomFactor: (onAdd: (category: string, factor: string) => void) => void;
  resetSearch: () => void;
}

export function useFactorSearch({ 
  category, 
  defaultOptions 
}: UseFactorSearchProps): UseFactorSearchResult {
  const [searchValue, setSearchValue] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  
  const filteredOptions = defaultOptions.filter(option => 
    option.toLowerCase().includes(searchValue.toLowerCase())
  );
  
  const handleSearchChange = (value: string) => {
    setSearchValue(value);
  };
  
  const handleAddCustomFactor = (onAdd: (category: string, factor: string) => void) => {
    if (searchValue && !defaultOptions.includes(searchValue)) {
      onAdd(category, searchValue);
      resetSearch();
    }
  };
  
  const resetSearch = () => {
    setSearchValue('');
    setSearchOpen(false);
  };
  
  return {
    searchValue,
    searchOpen,
    filteredOptions,
    setSearchOpen,
    handleSearchChange,
    handleAddCustomFactor,
    resetSearch
  };
}
