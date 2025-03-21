
import React from 'react';
import Layout from '@/components/layout/Layout';
import VacancyList from '@/components/vacancies/VacancyList';
import { vacanciesData } from '@/lib/data';

const Vacancies = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Vacancies</h1>
          <p className="text-muted-foreground mt-1">Manage and track your open positions.</p>
        </div>
        
        <VacancyList vacancies={vacanciesData} />
      </div>
    </Layout>
  );
};

export default Vacancies;
