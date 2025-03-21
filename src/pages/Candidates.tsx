
import React from 'react';
import Layout from '@/components/layout/Layout';
import CandidateList from '@/components/candidates/CandidateList';
import { candidatesData } from '@/lib/data';

const Candidates = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Candidates</h1>
          <p className="text-muted-foreground mt-1">Manage and track potential hires.</p>
        </div>
        
        <CandidateList candidates={candidatesData} />
      </div>
    </Layout>
  );
};

export default Candidates;
