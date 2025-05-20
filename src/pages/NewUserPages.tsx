
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import BackButton from "@/components/BackButton";
import BottomTemplate from "@/components/BottomTemplate";

const NewUserPages = () => {
  const pages = [
    {
      title: "Home - New User",
      description: "Empty home screen for new users",
      path: "/home-new-user"
    },
    {
      title: "FYP - New User",
      description: "Empty For You Page for new users",
      path: "/fyp-new-user"
    },
    {
      title: "Skin - New User",
      description: "Empty Skin page for new users",
      path: "/skin-new-user"
    },
    {
      title: "Products - New User",
      description: "Empty Products page for new users",
      path: "/products-new-user"
    }
  ];

  return (
    <div>
      <header className="mb-6">
        <BackButton />
        <h1 className="text-2xl font-bold">New User Pages</h1>
        <p className="text-muted-foreground">Preview empty states for new users</p>
      </header>
      
      <main className="space-y-4">
        {pages.map((page) => (
          <Card key={page.path} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <Link to={page.path} className="flex justify-between items-center">
                <div>
                  <h2 className="font-medium">{page.title}</h2>
                  <p className="text-sm text-muted-foreground">{page.description}</p>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </Link>
            </CardContent>
          </Card>
        ))}
        
        <div className="pt-4">
          <Button asChild className="w-full">
            <Link to="/onboarding">Start Onboarding Flow</Link>
          </Button>
        </div>
      </main>
      
      <BottomTemplate pageTitle="New User Pages" />
    </div>
  );
};

export default NewUserPages;
