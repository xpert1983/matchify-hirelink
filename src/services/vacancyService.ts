
import { supabase } from "@/integrations/supabase/client";

export interface Vacancy {
  id: string;
  title: string;
  description: string;
  requirements?: string;
  location?: string;
  salary_min?: number;
  salary_max?: number;
  department?: string;
  status?: string;
  created_at?: string;
  updated_at?: string;
}

export async function getVacancies() {
  const { data, error } = await supabase
    .from('vacancies')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching vacancies:', error);
    throw error;
  }
  
  return data || [];
}

export async function getVacancy(id: string) {
  const { data, error } = await supabase
    .from('vacancies')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) {
    console.error('Error fetching vacancy:', error);
    throw error;
  }
  
  return data;
}

export async function createVacancy(vacancy: Omit<Vacancy, 'id' | 'created_at' | 'updated_at'>) {
  const { data, error } = await supabase
    .from('vacancies')
    .insert(vacancy)
    .select()
    .single();
  
  if (error) {
    console.error('Error creating vacancy:', error);
    throw error;
  }
  
  return data;
}

export async function updateVacancy(id: string, vacancy: Partial<Vacancy>) {
  const { data, error } = await supabase
    .from('vacancies')
    .update(vacancy)
    .eq('id', id)
    .select()
    .single();
  
  if (error) {
    console.error('Error updating vacancy:', error);
    throw error;
  }
  
  return data;
}

export async function deleteVacancy(id: string) {
  const { error } = await supabase
    .from('vacancies')
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error('Error deleting vacancy:', error);
    throw error;
  }
  
  return true;
}
