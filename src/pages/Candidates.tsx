
import React from 'react';
import Layout from '@/components/layout/Layout';
import CandidateList from '@/components/candidates/CandidateList';
import { candidatesData } from '@/lib/data';
import { CandidateProps } from '@/components/candidates/CandidateCard';

const Candidates = () => {
  // Convert candidatesData to match CandidateProps type
  const typedCandidates: CandidateProps[] = candidatesData.map(candidate => ({
    ...candidate,
    status: candidate.status as "Available" | "Interviewing" | "Hired" | "Not Available"
  }));

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Кандидаты</h1>
          <p className="text-muted-foreground mt-1">Управление и отслеживание потенциальных сотрудников.</p>
        </div>
        
        <CandidateList candidates={typedCandidates} />
      </div>
    </Layout>
  );
};

export default Candidates;
