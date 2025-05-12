
import { supabase } from '@/integrations/supabase/client';
import { v4 as uuidv4 } from 'uuid';

export interface SelfieMetadata {
  id: string;
  user_id: string;
  filename: string;
  file_path: string;
  type: 'am' | 'pm';
  created_at: string;
  date: string;
  index: number;
  public_url: string;
}

export interface SaveSelfieOptions {
  userId: string;
  file: File;
  type: 'am' | 'pm';
  index: number;
}

export interface DeleteSelfieOptions {
  userId: string;
  filePath: string;
  selfieId?: string;
}

export const saveSelfie = async ({ userId, file, type, index }: SaveSelfieOptions): Promise<SelfieMetadata> => {
  try {
    // Create a unique file path
    const date = new Date().toISOString().split('T')[0];
    const fileExt = file.name.split('.').pop();
    const uuid = uuidv4();
    const filePath = `${userId}/${type}/${date}/${index}-${uuid}.${fileExt}`;
    
    // Upload file to Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('selfies')
      .upload(filePath, file, {
        upsert: true
      });
      
    if (uploadError) {
      console.error('Error uploading selfie:', uploadError.message);
      throw uploadError;
    }
    
    // Get the public URL
    const { data: { publicUrl } } = supabase.storage
      .from('selfies')
      .getPublicUrl(filePath);
    
    // Store metadata in the database
    const selfieMetadata: Omit<SelfieMetadata, 'id'> = {
      user_id: userId,
      filename: file.name,
      file_path: filePath,
      type,
      created_at: new Date().toISOString(),
      date,
      index,
      public_url: publicUrl
    };
    
    const { data: metadataData, error: metadataError } = await supabase
      .from('selfies_metadata')
      .insert(selfieMetadata)
      .select()
      .single();
      
    if (metadataError) {
      console.error('Error saving selfie metadata:', metadataError.message);
      throw metadataError;
    }
    
    return metadataData;
  } catch (error) {
    console.error('Error in saveSelfie:', error);
    throw error;
  }
};

export const deleteSelfie = async ({ userId, filePath, selfieId }: DeleteSelfieOptions): Promise<void> => {
  try {
    // Delete the file from Storage
    const { error: storageError } = await supabase.storage
      .from('selfies')
      .remove([filePath]);
      
    if (storageError) {
      console.error('Error deleting selfie from storage:', storageError.message);
      throw storageError;
    }
    
    // Delete the metadata if selfieId is provided
    if (selfieId) {
      const { error: metadataError } = await supabase
        .from('selfies_metadata')
        .delete()
        .eq('id', selfieId)
        .eq('user_id', userId);
        
      if (metadataError) {
        console.error('Error deleting selfie metadata:', metadataError.message);
        throw metadataError;
      }
    } else {
      // If selfieId is not provided, delete by file_path
      const { error: metadataError } = await supabase
        .from('selfies_metadata')
        .delete()
        .eq('file_path', filePath)
        .eq('user_id', userId);
        
      if (metadataError) {
        console.error('Error deleting selfie metadata by path:', metadataError.message);
        throw metadataError;
      }
    }
  } catch (error) {
    console.error('Error in deleteSelfie:', error);
    throw error;
  }
};

export const getSelfiesByDate = async (userId: string, date: string): Promise<SelfieMetadata[]> => {
  try {
    const { data, error } = await supabase
      .from('selfies_metadata')
      .select('*')
      .eq('user_id', userId)
      .eq('date', date)
      .order('type, index');
      
    if (error) {
      console.error('Error fetching selfies:', error.message);
      throw error;
    }
    
    return data || [];
  } catch (error) {
    console.error('Error in getSelfiesByDate:', error);
    throw error;
  }
};

export const getAllSelfies = async (userId: string): Promise<SelfieMetadata[]> => {
  try {
    const { data, error } = await supabase
      .from('selfies_metadata')
      .select('*')
      .eq('user_id', userId)
      .order('date, type, index');
      
    if (error) {
      console.error('Error fetching all selfies:', error.message);
      throw error;
    }
    
    return data || [];
  } catch (error) {
    console.error('Error in getAllSelfies:', error);
    throw error;
  }
};
