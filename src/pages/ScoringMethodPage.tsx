
import React from "react";
import BackButton from "@/components/BackButton";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";

const ScoringMethodPage = () => {
  // External health authority links
  const healthAuthorities = [
    {
      name: "The National Institute of Health",
      url: "https://www.nih.gov/"
    },
    {
      name: "The World Health Organization",
      url: "https://www.who.int/"
    },
    {
      name: "The American Heart Association",
      url: "https://www.heart.org/"
    },
    {
      name: "The European Food Safety Authority",
      url: "https://www.efsa.europa.eu/en"
    }
  ];

  return (
    <div className="pb-32">
      <header className="mb-6 flex items-center">
        <BackButton />
        <h1 className="text-2xl font-bold">How we calculate scores</h1>
      </header>

      <div className="space-y-6">
        <div>
          <p className="text-lg mb-4">
            Our recommendations are strictly based on guidelines taken from the following national and international health authorities:
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Sources</h2>
          <Card className="overflow-hidden rounded-lg">
            {healthAuthorities.map((authority, index) => (
              <React.Fragment key={authority.name}>
                <a 
                  href={authority.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block"
                >
                  <CardContent className="p-4 flex items-center justify-between hover:bg-slate-50">
                    <span className="text-lg">{authority.name}</span>
                    <ChevronRight className="h-6 w-6 text-gray-400" />
                  </CardContent>
                </a>
                {index < healthAuthorities.length - 1 && (
                  <div className="border-t border-gray-200"></div>
                )}
              </React.Fragment>
            ))}
          </Card>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Our Methodology</h2>
          <Card>
            <CardContent className="p-4">
              <p className="mb-3">Our scoring system evaluates products and activities based on multiple factors:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Ingredient safety profiles from regulatory databases</li>
                <li>Scientific research on effectiveness for skin health</li>
                <li>Aggregate user reporting from our community</li>
                <li>Personalized factors based on your skin type and concerns</li>
              </ul>
              <p className="mt-4">
                Scores range from 0-100, with higher scores indicating better compatibility and effectiveness for skin health.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ScoringMethodPage;
