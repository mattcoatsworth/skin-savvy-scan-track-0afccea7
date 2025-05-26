import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface Product {
  id: string;
  name: string;
  brand: string;
  rating: number;
  impact: 'Positive' | 'Negative' | 'Neutral';
  description: string;
  benefits: string[];
}

const sampleProduct: Product = {
  id: "avocado-123",
  name: "Organic Avocado",
  brand: "Fresh & Natural",
  rating: 4.5,
  impact: "Positive" as const,
  description: "Rich in healthy fats and nutrients that support skin health and hydration.",
  benefits: [
    "High in vitamin E for skin protection",
    "Contains healthy monounsaturated fats",
    "Rich in antioxidants",
    "Supports skin hydration"
  ]
};

const AvocadoProductExample: React.FC = () => {
  return (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle>{sampleProduct.name}</CardTitle>
        <CardDescription>{sampleProduct.brand}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{sampleProduct.description}</p>
        <ul>
          {sampleProduct.benefits.map((benefit, index) => (
            <li key={index}>{benefit}</li>
          ))}
        </ul>
        <p>Rating: {sampleProduct.rating}</p>
        <p>Impact: {sampleProduct.impact}</p>
      </CardContent>
    </Card>
  );
};

export default AvocadoProductExample;
