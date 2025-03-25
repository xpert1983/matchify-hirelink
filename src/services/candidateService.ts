
import { supabase } from "@/integrations/supabase/client";

export interface Candidate {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  experience_years?: number;
  skills?: string[];
  resume_url?: string;
  status?: string;
  created_at?: string;
  updated_at?: string;
}

export async function getCandidates() {
  const { data, error } = await supabase
    .from('candidates')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching candidates:', error);
    throw error;
  }
  
  return data || [];
}

export async function getCandidate(id: string) {
  const { data, error } = await supabase
    .from('candidates')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) {
    console.error('Error fetching candidate:', error);
    throw error;
  }
  
  return data;
}

export async function createCandidate(candidate: Omit<Candidate, 'id' | 'created_at' | 'updated_at'>) {
  const { data, error } = await supabase
    .from('candidates')
    .insert(candidate)
    .select()
    .single();
  
  if (error) {
    console.error('Error creating candidate:', error);
    throw error;
  }
  
  return data;
}

export async function updateCandidate(id: string, candidate: Partial<Candidate>) {
  const { data, error } = await supabase
    .from('candidates')
    .update(candidate)
    .eq('id', id)
    .select()
    .single();
  
  if (error) {
    console.error('Error updating candidate:', error);
    throw error;
  }
  
  return data;
}

export async function deleteCandidate(id: string) {
  const { error } = await supabase
    .from('candidates')
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error('Error deleting candidate:', error);
    throw error;
  }
  
  return true;
}
