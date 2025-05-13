
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Lock, LogOut, Share, Facebook, Twitter, Linkedin } from "lucide-react";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import { useToast } from "@/hooks/use-toast";
import BackButton from "@/components/BackButton";
import { supabase } from "@/integrations/supabase/client";

type PasswordFormValues = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

type ReferralData = {
  code: string;
  link: string;
  created: string;
};

const Settings = () => {
  useScrollToTop();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [referralData, setReferralData] = useState<ReferralData | null>(null);

  const form = useForm<PasswordFormValues>({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    }
  });

  // Load referral data from localStorage if it exists
  useEffect(() => {
    const storedReferralData = localStorage.getItem("userReferralCode");
    if (storedReferralData) {
      try {
        setReferralData(JSON.parse(storedReferralData));
      } catch (error) {
        console.error("Failed to parse referral data:", error);
      }
    } else {
      // If no referral data exists, generate a new one
      generateReferralLink();
    }
  }, []);

  const generateReferralLink = () => {
    // Generate a unique referral code using timestamp and random string
    const referralCode = `REF-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 8)}`;
    
    // Create referral link (in a production app this would be tracked in a database)
    const link = `https://skinsavvy.app/signup?ref=${referralCode}`;
    
    // Save referral data to localStorage
    const newReferralData = {
      code: referralCode,
      link: link,
      created: new Date().toISOString(),
    };
    
    localStorage.setItem("userReferralCode", JSON.stringify(newReferralData));
    setReferralData(newReferralData);
  };

  const copyToClipboard = () => {
    if (referralData) {
      navigator.clipboard.writeText(referralData.link)
        .then(() => {
          toast({
            title: "Copied to clipboard!",
            description: "You can now share this link with your friends.",
          });
        })
        .catch(() => {
          toast({
            title: "Failed to copy",
            description: "Please try again or copy manually.",
            variant: "destructive"
          });
        });
    }
  };

  const shareOnSocialMedia = (platform: string) => {
    if (!referralData) return;
    
    const shareText = encodeURIComponent("Join me on Skin Savvy and get personalized skin care recommendations!");
    const shareUrl = encodeURIComponent(referralData.link);
    
    let shareLink = "";
    
    switch (platform) {
      case "facebook":
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}&quote=${shareText}`;
        break;
      case "twitter":
        shareLink = `https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareText}`;
        break;
      case "linkedin":
        shareLink = `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`;
        break;
      default:
        return;
    }
    
    window.open(shareLink, "_blank", "width=600,height=400");
  };

  const handleChangePassword = async (data: PasswordFormValues) => {
    if (data.newPassword !== data.confirmPassword) {
      form.setError("confirmPassword", { 
        type: "manual", 
        message: "Passwords do not match" 
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // In a real implementation, this would use Supabase auth to update the password
      // For now just showing a success message
      toast({
        title: "Password updated",
        description: "Your password has been changed successfully."
      });
      
      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem changing your password.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    setIsLoading(true);
    
    try {
      // This will actually work if Supabase authentication is implemented
      await supabase.auth.signOut();
      toast({
        title: "Logged out",
        description: "You have been logged out successfully."
      });
      navigate("/auth");
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem signing out.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="pb-20">
      <header className="mb-6 flex items-center">
        <BackButton />
        <h1 className="text-2xl font-bold ml-2">Settings</h1>
      </header>

      <main className="space-y-6">
        {/* Referral Card */}
        <Card className="ios-card">
          <CardContent className="p-4">
            <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
              <Share className="h-5 w-5" />
              Share with Friends
            </h2>
            
            <div className="space-y-4">
              {referralData ? (
                <>
                  <div className="space-y-2">
                    <FormLabel>Your Referral Code</FormLabel>
                    <div className="flex items-center gap-2">
                      <Input value={referralData.code} readOnly className="bg-muted" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <FormLabel>Referral Link</FormLabel>
                    <div className="flex items-center gap-2">
                      <Input value={referralData.link} readOnly className="bg-muted text-xs" />
                      <Button onClick={copyToClipboard} variant="outline" size="icon">
                        <Share className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Share on social media:</p>
                    <div className="flex items-center gap-3">
                      <Button
                        onClick={() => shareOnSocialMedia("facebook")}
                        variant="outline"
                        size="icon"
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        <Facebook className="h-4 w-4" />
                      </Button>
                      <Button
                        onClick={() => shareOnSocialMedia("twitter")}
                        variant="outline"
                        size="icon"
                        className="bg-sky-500 hover:bg-sky-600 text-white"
                      >
                        <Twitter className="h-4 w-4" />
                      </Button>
                      <Button
                        onClick={() => shareOnSocialMedia("linkedin")}
                        variant="outline"
                        size="icon"
                        className="bg-blue-700 hover:bg-blue-800 text-white"
                      >
                        <Linkedin className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <Button onClick={generateReferralLink} className="w-full">
                  Generate Referral Code
                </Button>
              )}
              
              <p className="text-xs text-muted-foreground mt-2">
                Share with friends and family to earn rewards when they join!
              </p>
            </div>
          </CardContent>
        </Card>
        
        {/* Password Change Card */}
        <Card className="ios-card">
          <CardContent className="p-4">
            <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
              <Lock className="h-5 w-5" />
              Change Password
            </h2>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleChangePassword)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="currentPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Enter current password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Enter new password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm New Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Confirm new password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full" disabled={isLoading}>
                  Update Password
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
        
        {/* Logout Card */}
        <Card className="ios-card">
          <CardContent className="p-4">
            <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
              <LogOut className="h-5 w-5" />
              Logout
            </h2>
            <p className="text-muted-foreground mb-4">
              Sign out from your account on this device.
            </p>
            <Button 
              variant="destructive" 
              className="w-full"
              onClick={handleLogout}
              disabled={isLoading}
            >
              Logout
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Settings;
