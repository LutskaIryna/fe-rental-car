import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/useDebounce";
import { useState, useEffect } from "react";

interface CarSearchInputProps {
  setQuery: (query: string) => void;
}

export const CarSearchInput = ({ setQuery }: CarSearchInputProps) => {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    setQuery(debouncedSearch.trim());
  }, [debouncedSearch, setQuery]);

  return (
    <Input
      className="w-64"
      placeholder="Search by Brand or Model"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  );
};
