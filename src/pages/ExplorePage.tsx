
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BackButton from "@/components/BackButton";

type ExploreItemType = {
  id: string;
  title: string;
  subtitle: string;
  content: string;
  image?: string;
  category: "article" | "tip" | "community";
};

const ExplorePage = () => {
  const [activeTab, setActiveTab] = useState<string>("all");
  
  // Sample data
  const exploreItems: ExploreItemType[] = [
    { 
      id: "skin-tips",
      title: "Skin Tips for Your Skin Type", 
      subtitle: "Personalized advice",
      content: "Understanding your combination skin can help you create a targeted skincare routine. Focus on balancing oil production while maintaining hydration.",
      category: "tip"
    },
    { 
      id: "vitamin-c-science",
      title: "Science Behind Vitamin C", 
      subtitle: "Research & benefits",
      content: "Vitamin C is a powerful antioxidant that can help brighten skin, reduce hyperpigmentation, and boost collagen production for firmer skin.",
      category: "article"
    },
    { 
      id: "new-community",
      title: "New in the Community", 
      subtitle: "Connect with others",
      content: "Join discussions about ingredient sensitivities and find others with similar skin concerns in our growing community.",
      category: "community"
    },
    { 
      id: "ceramides",
      title: "Understanding Ceramides", 
      subtitle: "Ingredient spotlight",
      content: "Ceramides are lipids that help form the skin's barrier and help skin retain moisture. They're essential for healthy skin function.",
      category: "article"
    },
    { 
      id: "routines",
      title: "Morning vs Evening Routines", 
      subtitle: "Daily practices",
      content: "Morning routines should focus on protection while evening routines should emphasize repair and recovery. Learn how to optimize both.",
      category: "tip"
    },
    { 
      id: "product-swap",
      title: "Product Swap Thread", 
      subtitle: "Community exchange",
      content: "Users are sharing their experiences switching from harsh to gentle exfoliants. Join the conversation!",
      category: "community"
    },
  ];

  // Filter items based on active tab
  const filteredItems = exploreItems.filter(item => {
    if (activeTab === "all") return true;
    if (activeTab === "tips" && item.category === "tip") return true;
    if (activeTab === "articles" && item.category === "article") return true;
    if (activeTab === "community" && item.category === "community") return true;
    return false;
  });

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <div className="max-w-md mx-auto px-4 py-6">
        <header className="mb-6 flex items-center">
          <BackButton />
          <h1 className="text-2xl font-bold">Explore</h1>
        </header>
        
        <Tabs defaultValue="all" className="w-full mb-6" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="tips">Tips</TabsTrigger>
            <TabsTrigger value="articles">Articles</TabsTrigger>
            <TabsTrigger value="community">Community</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="space-y-6">
          {filteredItems.map((item, index) => (
            <Link 
              key={index} 
              to={`/explore/${item.id}`}
              state={{ item }}
              className="block"
            >
              <Card className="ios-card overflow-hidden hover:shadow-md transition-all">
                <div className="h-32 bg-gradient-to-r from-skin-teal/40 to-skin-lavender/60 flex items-center justify-center">
                  {item.image ? (
                    <img src={item.image} alt={item.title} className="object-cover w-full h-full" />
                  ) : (
                    <div className="text-xl font-semibold text-white">✨</div>
                  )}
                </div>
                <CardContent className="p-4">
                  <h3 className="font-medium text-lg">{item.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{item.subtitle}</p>
                  <p className="text-sm">{item.content}</p>
                  <div className="text-skin-teal text-sm font-medium mt-3 inline-block">
                    Read more
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExplorePage;
