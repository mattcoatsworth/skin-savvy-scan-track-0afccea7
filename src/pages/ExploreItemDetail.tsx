import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import BackButton from "@/components/BackButton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type ExploreItemType = {
  id: string;
  title: string;
  subtitle: string;
  image?: string;
  content?: string;
  sections?: {
    title: string;
    content: string;
  }[];
  relatedItems?: {
    title: string;
    description: string;
  }[];
};

const ExploreItemDetail = () => {
  const { itemId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [item, setItem] = useState<ExploreItemType | null>(null);
  const [activeTab, setActiveTab] = useState("content");

  // Sample data - in a real app, this would come from an API
  const sampleItems: ExploreItemType[] = [
    {
      id: "skin-tips",
      title: "Skin Tips for Your Skin Type",
      subtitle: "Personalized advice",
      content: "Understanding your unique skin type is essential for creating an effective skincare routine. Below, we've compiled expert advice tailored to different skin types.",
      sections: [
        {
          title: "Dry Skin",
          content: "For dry skin, focus on hydrating ingredients like hyaluronic acid, glycerin, and ceramides. Avoid harsh cleansers that strip natural oils. Use a rich moisturizer daily and consider incorporating facial oils. Exfoliate gently once a week to remove dead skin cells."
        },
        {
          title: "Oily Skin",
          content: "If you have oily skin, use gentle foaming cleansers twice daily. Look for non-comedogenic products that won't clog pores. Incorporate salicylic acid to help with oil control and acne prevention. Don't skip moisturizer - opt for lightweight, oil-free formulations."
        },
        {
          title: "Combination Skin",
          content: "For combination skin, consider using different products on different zones of your face. Use gentle cleansers, and focus hydrating products on dry areas while using mattifying products on oily areas like the T-zone. Balance is key for your skin type."
        },
        {
          title: "Sensitive Skin",
          content: "With sensitive skin, opt for fragrance-free and hypoallergenic products. Patch test new products before full application. Look for soothing ingredients like aloe vera, chamomile, and oat extract. Avoid harsh exfoliants and extreme temperatures."
        }
      ],
      relatedItems: [
        {
          title: "Building Your Skincare Routine",
          description: "Step-by-step guide to creating a personalized routine"
        },
        {
          title: "Understanding Skin Barrier",
          description: "How to protect and repair your skin's natural barrier"
        }
      ]
    },
    {
      id: "vitamin-c-science",
      title: "Science Behind Vitamin C",
      subtitle: "Research & benefits",
      content: "Vitamin C (ascorbic acid) is one of the most well-researched and beneficial skincare ingredients available. As a powerful antioxidant, it offers multiple benefits for skin health and appearance.",
      sections: [
        {
          title: "Antioxidant Protection",
          content: "Vitamin C neutralizes free radicals from environmental stressors like UV radiation and pollution. This protection helps prevent premature aging and cellular damage. Studies show it works synergistically with vitamin E for enhanced protection."
        },
        {
          title: "Collagen Production",
          content: "Research demonstrates vitamin C's essential role in collagen synthesis. It activates the precursors to collagen and stabilizes collagen molecules. Regular use can help improve skin firmness and reduce the appearance of fine lines and wrinkles."
        },
        {
          title: "Hyperpigmentation Reduction",
          content: "Vitamin C inhibits the enzyme tyrosinase, which is responsible for melanin production. Clinical studies have shown significant improvement in hyperpigmentation, dark spots, and overall skin brightness with consistent application."
        },
        {
          title: "Optimal Concentration & Formulation",
          content: "Research indicates that vitamin C is most effective at concentrations between 10-20%. L-ascorbic acid is the most potent form but requires proper formulation at a pH of 3.5 or lower to penetrate the skin effectively. Derivatives like magnesium ascorbyl phosphate offer more stability with somewhat reduced potency."
        }
      ],
      relatedItems: [
        {
          title: "Combining Active Ingredients",
          description: "How to pair vitamin C with other skincare actives"
        },
        {
          title: "Morning vs. Evening Application",
          description: "When to apply vitamin C for optimal results"
        }
      ]
    },
    {
      id: "community",
      title: "New in the Community",
      subtitle: "Connect with others",
      content: "Join our growing skincare community to share experiences, learn from others, and discover new approaches to skin health. Our community features help you connect with people who have similar skin concerns and goals.",
      sections: [
        {
          title: "Trending Discussions",
          content: "Current hot topics include minimalist skincare routines, the impact of diet on acne, and experiences with prescription retinoids. Join these conversations to share your perspective and learn from others' experiences."
        },
        {
          title: "Product Reviews",
          content: "Community members are actively reviewing new sunscreen formulations, hydrating serums, and gentle exfoliants. Read honest opinions from real users with skin concerns similar to yours before making your next purchase."
        },
        {
          title: "Skincare Challenges",
          content: "Participate in community challenges like the 'Hydration Marathon' or '30 Days of SPF' to build healthy habits and see improvements in your skin. Members report better consistency and results when joining these group initiatives."
        },
        {
          title: "Expert Q&A Sessions",
          content: "Upcoming sessions include discussions with dermatologists, cosmetic chemists, and estheticians. Submit your questions in advance for the opportunity to receive professional advice tailored to your concerns."
        }
      ],
      relatedItems: [
        {
          title: "Creating Your Community Profile",
          description: "Customize your profile to connect with similar skin types"
        },
        {
          title: "Community Guidelines",
          description: "Our approach to supportive, scientific discussions"
        }
      ]
    }
  ];

  useEffect(() => {
    // Check if we have item data passed through location state
    if (location.state && location.state.item) {
      // Find full item data
      const fullItem = sampleItems.find(i => i.id === location.state.item.id || i.title === location.state.item.title);
      if (fullItem) {
        setItem(fullItem);
      } else {
        setItem(location.state.item);
      }
    } 
    // Otherwise look for the item by ID
    else if (itemId) {
      const foundItem = sampleItems.find(i => i.id === itemId);
      if (foundItem) {
        setItem(foundItem);
      } else {
        // If no item is found, navigate to explore page
        navigate("/explore");
      }
    }
  }, [location, itemId, navigate]);

  if (!item) {
    return (
      <div className="flex justify-center items-center h-48">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="pb-8">
      <header className="mb-6 flex items-center">
        <BackButton />
        <h1 className="text-2xl font-bold">{item.title}</h1>
      </header>

      {item.image ? (
        <div className="mb-6 rounded-lg overflow-hidden h-48">
          <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
        </div>
      ) : (
        <div className="mb-6 rounded-lg overflow-hidden h-48 bg-gradient-to-r from-skin-teal/40 to-skin-lavender/60 flex items-center justify-center">
          <div className="text-4xl">✨</div>
        </div>
      )}

      <div className="mb-4">
        <h2 className="text-xl font-semibold">{item.subtitle}</h2>
        <p className="text-muted-foreground">{item.content}</p>
      </div>

      <Tabs defaultValue={activeTab} className="w-full mb-10" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="related">Related</TabsTrigger>
        </TabsList>
        <TabsContent value="content">
          {item.sections && item.sections.length > 0 ? (
            <div className="space-y-4 mt-4">
              {item.sections.map((section, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2">{section.title}</h3>
                    <p className="text-sm">{section.content}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-4">
                <p>No detailed content available for this topic yet.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        <TabsContent value="related">
          {item.relatedItems && item.relatedItems.length > 0 ? (
            <div className="space-y-4 mt-4">
              {item.relatedItems.map((related, index) => (
                <Card key={index} className="cursor-pointer hover:shadow-md transition-all">
                  <CardContent className="p-4">
                    <h3 className="font-semibold">{related.title}</h3>
                    <p className="text-sm text-muted-foreground">{related.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-4">
                <p>No related items available.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ExploreItemDetail;
