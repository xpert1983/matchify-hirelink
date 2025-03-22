
import React from 'react';
import Layout from '@/components/layout/Layout';
import VacancyList from '@/components/vacancies/VacancyList';
import { vacanciesData } from '@/lib/data';
import { VacancyProps } from '@/components/vacancies/VacancyCard';

const Vacancies = () => {
  // Convert vacanciesData to match VacancyProps type
  const typedVacancies: VacancyProps[] = vacanciesData.map(vacancy => ({
    ...vacancy,
    type: vacancy.type as "Full-time" | "Part-time" | "Contract" | "Remote"
  }));

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Вакансии</h1>
          <p className="text-muted-foreground mt-1">Управление и отслеживание ваших открытых позиций.</p>
        </div>
        
        <VacancyList vacancies={typedVacancies} />
      </div>
    </Layout>
  );
};

export default Vacancies;
