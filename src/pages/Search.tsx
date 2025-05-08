
import React from "react";
import AppNavigation from "@/components/AppNavigation";
import { Input } from "@/components/ui/input";
import { Search as SearchIcon } from "lucide-react";

const Search = () => {
  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <div className="max-w-md mx-auto px-4 py-6">
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-center">Search</h1>
        </header>
        
        <div className="relative">
          <SearchIcon className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search products, ingredients..."
            className="pl-10 rounded-full h-12"
          />
        </div>
        
        <div className="mt-8 text-center text-muted-foreground">
          <p>Search for products or ingredients to see how they affect your skin</p>
        </div>
      </div>
      
      <AppNavigation />
    </div>
  );
};

export default Search;
