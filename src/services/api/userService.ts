
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
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (error) throw error;
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
