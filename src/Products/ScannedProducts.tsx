
import React, { useState } from "react";
import { productItems } from "@/data/products";
import ProductCard from "./ProductCard";
import BackButton from "@/components/BackButton";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import { Input } from "@/components/ui/input";
import { Search, Filter } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Product } from "./types";
import { sortProducts, filterProductsBySearch } from "./utils";

const ScannedProducts = () => {
  // Add scroll to top functionality
  useScrollToTop();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("rating-high");
  
  // Filter and sort products
  const filteredProducts = filterProductsBySearch(productItems, searchTerm);
  const sortedProducts = sortProducts(filteredProducts, sortBy);
  
  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <div className="max-w-md mx-auto px-4 py-6">
        <header className="mb-6 flex items-center">
          <BackButton />
          <div>
            <h1 className="text-2xl font-bold">Scanned Products</h1>
            <p className="text-muted-foreground">Your scanned skincare products</p>
          </div>
        </header>
        
        <div className="mb-4 flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input 
              placeholder="Search products..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white"
            />
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={() => setSortBy("rating-high")}>
                Highest Rating
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("rating-low")}>
                Lowest Rating
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("name-asc")}>
                Name (A-Z)
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("name-desc")}>
                Name (Z-A)
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <div className="space-y-3">
          {sortedProducts.length > 0 ? (
            sortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} type="skincare" />
            ))
          ) : (
            <div className="text-center py-10 text-muted-foreground">
              No products found matching your search.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScannedProducts;
