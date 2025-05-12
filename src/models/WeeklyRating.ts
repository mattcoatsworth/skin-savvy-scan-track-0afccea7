
import { supabase } from '@/integrations/supabase/client';

export interface WeeklyRating {
  id: string;
  user_id: string;
  week_start_date: string;
  week_end_date: string;
  rating: number;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface SaveWeeklyRatingOptions {
  userId: string;
  weekStartDate: string;
  weekEndDate: string;
  rating: number;
  notes?: string;
}

export const saveWeeklyRating = async ({ userId, weekStartDate, weekEndDate, rating, notes }: SaveWeeklyRatingOptions): Promise<WeeklyRating> => {
  try {
    // Check if a rating for this week already exists
    const { data: existingRating, error: fetchError } = await supabase
      .from('weekly_ratings')
      .select('*')
      .eq('user_id', userId)
      .eq('week_start_date', weekStartDate)
      .single();
      
    if (fetchError && fetchError.code !== 'PGRST116') { // PGRST116 is the error code for "no rows returned"
      console.error('Error checking for existing rating:', fetchError.message);
      throw fetchError;
    }
    
    if (existingRating) {
      // Update the existing rating
      const { data: updatedRating, error: updateError } = await supabase
        .from('weekly_ratings')
        .update({
          rating,
          notes,
          updated_at: new Date().toISOString()
        })
        .eq('id', existingRating.id)
        .select()
        .single();
        
      if (updateError) {
        console.error('Error updating weekly rating:', updateError.message);
        throw updateError;
      }
      
      return updatedRating as WeeklyRating;
    } else {
      // Create a new rating
      const { data: newRating, error: insertError } = await supabase
        .from('weekly_ratings')
        .insert({
          user_id: userId,
          week_start_date: weekStartDate,
          week_end_date: weekEndDate,
          rating,
          notes
        })
        .select()
        .single();
        
      if (insertError) {
        console.error('Error creating weekly rating:', insertError.message);
        throw insertError;
      }
      
      return newRating as WeeklyRating;
    }
  } catch (error) {
    console.error('Error in saveWeeklyRating:', error);
    throw error;
  }
};

export const getWeeklyRatings = async (userId: string, limit = 10): Promise<WeeklyRating[]> => {
  try {
    const { data, error } = await supabase
      .from('weekly_ratings')
      .select('*')
      .eq('user_id', userId)
      .order('week_start_date', { ascending: false })
      .limit(limit);
      
    if (error) {
      console.error('Error fetching weekly ratings:', error.message);
      throw error;
    }
    
    return data || [];
  } catch (error) {
    console.error('Error in getWeeklyRatings:', error);
    throw error;
  }
};

export const getWeeklyRatingByDate = async (userId: string, date: string): Promise<WeeklyRating | null> => {
  try {
    const { data, error } = await supabase
      .from('weekly_ratings')
      .select('*')
      .eq('user_id', userId)
      .lte('week_start_date', date) // less than or equal to
      .gte('week_end_date', date)   // greater than or equal to
      .single();
      
    if (error) {
      if (error.code === 'PGRST116') { // no rows returned
        return null;
      }
      console.error('Error fetching weekly rating by date:', error.message);
      throw error;
    }
    
    return data as WeeklyRating;
  } catch (error) {
    console.error('Error in getWeeklyRatingByDate:', error);
    throw error;
  }
};
