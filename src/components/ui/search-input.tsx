import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";

interface CarSearchInputProps {
  setQuery: (query: string) => void;
}

export const CarSearchInput = ({ setQuery }: CarSearchInputProps) => {
  const [search, setSearch] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setQuery(search.trim());
    }, 500);

    return () => clearTimeout(timeout);
  }, [search, setQuery]);

  return (
    <Input
      className="w-64"
      placeholder="Search by Brand or Model"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  );
};
