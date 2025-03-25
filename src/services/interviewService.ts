
import { supabase } from "@/integrations/supabase/client";

export interface Interview {
  id: string;
  vacancy_id: string;
  candidate_id: string;
  interview_date: string;
  interviewer?: string;
  location?: string;
  notes?: string;
  status?: string;
  created_at?: string;
  updated_at?: string;
}

export async function getInterviews() {
  const { data, error } = await supabase
    .from('interviews')
    .select(`
      *,
      candidates(*),
      vacancies(*)
    `)
    .order('interview_date', { ascending: true });
  
  if (error) {
    console.error('Error fetching interviews:', error);
    throw error;
  }
  
  return data || [];
}

export async function getInterview(id: string) {
  const { data, error } = await supabase
    .from('interviews')
    .select(`
      *,
      candidates(*),
      vacancies(*)
    `)
    .eq('id', id)
    .single();
  
  if (error) {
    console.error('Error fetching interview:', error);
    throw error;
  }
  
  return data;
}

export async function createInterview(interview: Omit<Interview, 'id' | 'created_at' | 'updated_at'>) {
  const { data, error } = await supabase
    .from('interviews')
    .insert(interview)
    .select()
    .single();
  
  if (error) {
    console.error('Error creating interview:', error);
    throw error;
  }
  
  return data;
}

export async function updateInterview(id: string, interview: Partial<Interview>) {
  const { data, error } = await supabase
    .from('interviews')
    .update(interview)
    .eq('id', id)
    .select()
    .single();
  
  if (error) {
    console.error('Error updating interview:', error);
    throw error;
  }
  
  return data;
}

export async function deleteInterview(id: string) {
  const { error } = await supabase
    .from('interviews')
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error('Error deleting interview:', error);
    throw error;
  }
  
  return true;
}
