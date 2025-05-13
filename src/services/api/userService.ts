
/**
 * User service
 * Handles user-related API calls in a platform-agnostic way
 */
import { supabase } from "@/integrations/supabase/client";

export const userService = {
  /**
   * Get user profile data
   */
  getUserProfile: async (userId: string) => {
    try {
      // Use RPC function instead of direct table query for the "profiles" table
      // that doesn't exist in our database types
      const { data, error } = await supabase.rpc('get_user_profile', {
        user_id: userId
      });
      
      if (error) {
        console.error("RPC error:", error);
        // Fallback for development when the RPC function doesn't exist yet
        return { id: userId, name: "User " + userId };
      }
      
      return data;
    } catch (error) {
      console.error("Error fetching user profile:", error);
      throw error;
    }
  },

  /**
   * Get user skin logs
   */
  getUserSkinLogs: async (userId: string, limit = 10) => {
    try {
      const { data, error } = await supabase
        .from('skin_logs')
        .select('*')
        .eq('user_id', userId)
        .order('log_date', { ascending: false })
        .limit(limit);
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Error fetching user skin logs:", error);
      throw error;
    }
  },

  /**
   * Save skin log
   */
  saveSkinLog: async (userId: string, logData: any) => {
    try {
      const { data, error } = await supabase
        .from('skin_logs')
        .insert({
          user_id: userId,
          ...logData
        })
        .select();
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Error saving skin log:", error);
      throw error;
    }
  }
};
