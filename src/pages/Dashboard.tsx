
import React from 'react';
import Layout from '@/components/layout/Layout';
import DashboardStats from '@/components/dashboard/DashboardStats';
import RecentMatches from '@/components/dashboard/RecentMatches';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { vacanciesData, candidatesData } from '@/lib/data';
import { Progress } from '@/components/ui/progress';

const Dashboard = () => {
  // Calculate top skills based on vacancies
  const getTopSkills = () => {
    const skillsCount: Record<string, number> = {};
    
    vacanciesData.forEach(vacancy => {
      vacancy.skills.forEach(skill => {
        skillsCount[skill] = (skillsCount[skill] || 0) + 1;
      });
    });
    
    return Object.entries(skillsCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([skill, count]) => ({
        skill,
        count,
        percentage: Math.round((count / vacanciesData.length) * 100)
      }));
  };
  
  const topSkills = getTopSkills();

  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Welcome back!</h1>
            <p className="text-muted-foreground mt-1">Here's what's happening with your recruitment today.</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              New Vacancy
            </Button>
            <Button size="sm" className="bg-primary hover:bg-primary/90 text-white">
              <Plus className="h-4 w-4 mr-2" />
              New Candidate
            </Button>
          </div>
        </div>
        
        <DashboardStats />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <RecentMatches />
          </div>
          
          <div className="space-y-6">
            <Card className="animate-slide-in" style={{ animationDelay: '200ms' }}>
              <CardHeader className="pb-3">
                <CardTitle>Most Demanded Skills</CardTitle>
                <CardDescription>Top skills requested in open vacancies</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topSkills.map(({ skill, percentage }) => (
                    <div key={skill} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>{skill}</span>
                        <span className="text-muted-foreground">{percentage}%</span>
                      </div>
                      <Progress value={percentage} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card className="animate-slide-in" style={{ animationDelay: '300ms' }}>
              <CardHeader className="pb-3">
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Get started with these tasks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start text-left">
                    Review new candidate profiles
                  </Button>
                  <Button variant="outline" className="w-full justify-start text-left">
                    Update vacancy details
                  </Button>
                  <Button variant="outline" className="w-full justify-start text-left">
                    Schedule candidate interviews
                  </Button>
                  <Button variant="outline" className="w-full justify-start text-left">
                    Generate matching report
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
