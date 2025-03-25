
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

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
  company?: string;
  type?: string;
  skills?: string[];
  logo?: string;
}

export async function getVacancies() {
  try {
    const { data, error } = await supabase
      .from('vacancies')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching vacancies:', error);
      toast.error('Не удалось загрузить вакансии');
      throw error;
    }
    
    return data || [];
  } catch (error) {
    console.error('Failed to fetch vacancies:', error);
    toast.error('Ошибка при получении данных');
    return [];
  }
}

export async function getVacancy(id: string) {
  try {
    const { data, error } = await supabase
      .from('vacancies')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error('Error fetching vacancy:', error);
      toast.error('Не удалось загрузить вакансию');
      throw error;
    }
    
    return data;
  } catch (error) {
    console.error('Failed to fetch vacancy:', error);
    toast.error('Ошибка при получении данных');
    throw error;
  }
}

export async function createVacancy(vacancy: Omit<Vacancy, 'id' | 'created_at' | 'updated_at'>) {
  try {
    const { data, error } = await supabase
      .from('vacancies')
      .insert(vacancy)
      .select()
      .single();
    
    if (error) {
      console.error('Error creating vacancy:', error);
      toast.error('Не удалось создать вакансию');
      throw error;
    }
    
    toast.success('Вакансия успешно создана');
    return data;
  } catch (error) {
    console.error('Failed to create vacancy:', error);
    toast.error('Ошибка при создании вакансии');
    throw error;
  }
}

export async function updateVacancy(id: string, vacancy: Partial<Vacancy>) {
  try {
    const { data, error } = await supabase
      .from('vacancies')
      .update(vacancy)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error('Error updating vacancy:', error);
      toast.error('Не удалось обновить вакансию');
      throw error;
    }
    
    toast.success('Вакансия успешно обновлена');
    return data;
  } catch (error) {
    console.error('Failed to update vacancy:', error);
    toast.error('Ошибка при обновлении вакансии');
    throw error;
  }
}

export async function deleteVacancy(id: string) {
  try {
    const { error } = await supabase
      .from('vacancies')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Error deleting vacancy:', error);
      toast.error('Не удалось удалить вакансию');
      throw error;
    }
    
    toast.success('Вакансия успешно удалена');
    return true;
  } catch (error) {
    console.error('Failed to delete vacancy:', error);
    toast.error('Ошибка при удалении вакансии');
    throw error;
  }
}

export async function getVacanciesByDepartment(department: string) {
  try {
    const { data, error } = await supabase
      .from('vacancies')
      .select('*')
      .eq('department', department)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching vacancies by department:', error);
      throw error;
    }
    
    return data || [];
  } catch (error) {
    console.error('Failed to fetch vacancies by department:', error);
    return [];
  }
}

export async function getVacanciesByStatus(status: string) {
  try {
    const { data, error } = await supabase
      .from('vacancies')
      .select('*')
      .eq('status', status)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching vacancies by status:', error);
      throw error;
    }
    
    return data || [];
  } catch (error) {
    console.error('Failed to fetch vacancies by status:', error);
    return [];
  }
}

export async function searchVacancies(query: string) {
  try {
    const { data, error } = await supabase
      .from('vacancies')
      .select('*')
      .or(`title.ilike.%${query}%,description.ilike.%${query}%`)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error searching vacancies:', error);
      throw error;
    }
    
    return data || [];
  } catch (error) {
    console.error('Failed to search vacancies:', error);
    return [];
  }
}
