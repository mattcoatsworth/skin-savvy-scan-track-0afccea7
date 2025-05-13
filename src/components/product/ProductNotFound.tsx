
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

const ProductNotFound: React.FC = () => {
  return (
    <div className="max-w-md mx-auto px-4 py-6">
      <header className="flex items-center mb-6">
        <h1 className="text-2xl font-bold">Product Not Found</h1>
      </header>
      <Card>
        <CardContent className="p-6">
          <p>Sorry, the product you're looking for couldn't be found.</p>
          <Link to="/insights" className="text-skin-teal flex items-center mt-4">
            Return to Insights
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductNotFound;
