
import { supabase } from "@/integrations/supabase/client";

export interface CandidateVacancy {
  id: string;
  vacancy_id: string;
  candidate_id: string;
  stage?: string;
  notes?: string;
  created_at?: string;
  updated_at?: string;
}

export async function getMatches() {
  const { data, error } = await supabase
    .from('candidate_vacancies')
    .select(`
      *,
      candidates(*),
      vacancies(*)
    `)
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching matches:', error);
    throw error;
  }
  
  return data || [];
}

export async function getMatch(id: string) {
  const { data, error } = await supabase
    .from('candidate_vacancies')
    .select(`
      *,
      candidates(*),
      vacancies(*)
    `)
    .eq('id', id)
    .single();
  
  if (error) {
    console.error('Error fetching match:', error);
    throw error;
  }
  
  return data;
}

export async function createMatch(match: Omit<CandidateVacancy, 'id' | 'created_at' | 'updated_at'>) {
  const { data, error } = await supabase
    .from('candidate_vacancies')
    .insert(match)
    .select()
    .single();
  
  if (error) {
    console.error('Error creating match:', error);
    throw error;
  }
  
  return data;
}

export async function updateMatch(id: string, match: Partial<CandidateVacancy>) {
  const { data, error } = await supabase
    .from('candidate_vacancies')
    .update(match)
    .eq('id', id)
    .select()
    .single();
  
  if (error) {
    console.error('Error updating match:', error);
    throw error;
  }
  
  return data;
}

export async function deleteMatch(id: string) {
  const { error } = await supabase
    .from('candidate_vacancies')
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error('Error deleting match:', error);
    throw error;
  }
  
  return true;
}
