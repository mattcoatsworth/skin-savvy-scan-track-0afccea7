
import React from "react";
import { Input } from "@/components/ui/input";
import { Search as SearchIcon } from "lucide-react";
import BackButton from "@/components/BackButton";

const Search = () => {
  return (
    <>
      <header className="mb-6 flex items-center">
        <BackButton />
        <h1 className="text-2xl font-bold">Search</h1>
      </header>
      
      <div className="relative">
        <SearchIcon className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
        <Input
          placeholder="Search products, ingredients..."
          className="pl-10 h-12 rounded-xl"
        />
      </div>
      
      <div className="mt-8 text-center text-muted-foreground">
        <p>Search for products or ingredients to see how they affect your skin</p>
      </div>
    </>
  );
};

export default Search;
