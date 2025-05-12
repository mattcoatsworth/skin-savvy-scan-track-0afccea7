
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Lock, LogOut } from "lucide-react";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import { useToast } from "@/hooks/use-toast";
import BackButton from "@/components/BackButton";
import { supabase } from "@/integrations/supabase/client";

type PasswordFormValues = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

const Settings = () => {
  useScrollToTop();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<PasswordFormValues>({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    }
  });

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
