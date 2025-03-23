
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from 'sonner';
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Check, ChevronLeft, Plus, X } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent } from '@/components/ui/card';

// Define form schema
const formSchema = z.object({
  title: z.string().min(3, { message: "Название должно содержать не менее 3 символов" }),
  company: z.string().min(2, { message: "Укажите название компании" }),
  location: z.string().min(2, { message: "Укажите местоположение" }),
  employmentType: z.enum(["full-time", "part-time", "contract", "remote"]),
  experience: z.enum(["junior", "middle", "senior", "lead"]),
  salary: z.object({
    min: z.string().optional(),
    max: z.string().optional(),
  }),
  description: z.string().min(10, { message: "Описание должно содержать не менее 10 символов" }),
  skills: z.array(z.string()).min(1, { message: "Укажите хотя бы один навык" }),
  status: z.enum(["active", "draft", "closed"]),
  isUrgent: z.boolean().default(false),
});

type FormValues = z.infer<typeof formSchema>;

const VacancyForm = () => {
  const navigate = useNavigate();
  const [skills, setSkills] = React.useState<string[]>([]);
  const [newSkill, setNewSkill] = React.useState('');

  // Initialize form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      company: "",
      location: "",
      employmentType: "full-time",
      experience: "middle",
      salary: {
        min: "",
        max: "",
      },
      description: "",
      skills: [],
      status: "active",
      isUrgent: false,
    },
  });

  // Add a new skill to the list
  const handleAddSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      const updatedSkills = [...skills, newSkill.trim()];
      setSkills(updatedSkills);
      form.setValue('skills', updatedSkills);
      setNewSkill('');
    }
  };

  // Remove a skill from the list
  const handleRemoveSkill = (skillToRemove: string) => {
    const updatedSkills = skills.filter(skill => skill !== skillToRemove);
    setSkills(updatedSkills);
    form.setValue('skills', updatedSkills);
  };

  // Form submission handler
  const onSubmit = (data: FormValues) => {
    console.log('Form data submitted:', data);
    toast.success('Вакансия успешно создана!', {
      description: `${data.title} - ${data.company}`
    });
    navigate('/vacancies');
  };

  // Return to vacancies list
  const handleCancel = () => {
    navigate('/vacancies');
  };

  return (
    <Layout>
      <div className="space-y-6 container mx-auto px-4 max-w-4xl">
        <div className="flex items-center">
          <Button 
            variant="outline" 
            size="sm" 
            className="mr-2" 
            onClick={handleCancel}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Назад
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">Новая вакансия</h1>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <Card>
              <CardContent className="pt-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormLabel>Название вакансии*</FormLabel>
                        <FormControl>
                          <Input placeholder="Например: Senior React Developer" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="company"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Компания*</FormLabel>
                        <FormControl>
                          <Input placeholder="Название компании" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Местоположение*</FormLabel>
                        <FormControl>
                          <Input placeholder="Например: Москва, удаленно" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="employmentType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Тип занятости*</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Выберите тип занятости" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="full-time">Полная занятость</SelectItem>
                            <SelectItem value="part-time">Частичная занятость</SelectItem>
                            <SelectItem value="contract">Контракт</SelectItem>
                            <SelectItem value="remote">Удаленная работа</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="experience"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Опыт*</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Выберите уровень опыта" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="junior">Junior (1-2 года)</SelectItem>
                            <SelectItem value="middle">Middle (3-4 года)</SelectItem>
                            <SelectItem value="senior">Senior (5+ лет)</SelectItem>
                            <SelectItem value="lead">Lead/Manager</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex gap-4 col-span-2">
                    <FormField
                      control={form.control}
                      name="salary.min"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>Зарплата от</FormLabel>
                          <FormControl>
                            <Input placeholder="Мин. сумма" type="number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="salary.max"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>Зарплата до</FormLabel>
                          <FormControl>
                            <Input placeholder="Макс. сумма" type="number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormLabel>Описание вакансии*</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Опишите требования, обязанности и условия работы" 
                            className="min-h-32" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="col-span-2">
                    <FormItem className="space-y-2">
                      <FormLabel>Требуемые навыки*</FormLabel>
                      <div className="flex gap-2 mb-2">
                        <Input
                          placeholder="Добавить навык"
                          value={newSkill}
                          onChange={(e) => setNewSkill(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSkill())}
                          className="flex-1"
                        />
                        <Button type="button" onClick={handleAddSkill} size="sm">
                          <Plus className="h-4 w-4 mr-1" />
                          Добавить
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {skills.map((skill) => (
                          <div 
                            key={skill} 
                            className="bg-secondary text-secondary-foreground px-3 py-1 rounded-md flex items-center gap-1"
                          >
                            {skill}
                            <button 
                              type="button" 
                              onClick={() => handleRemoveSkill(skill)}
                              className="text-muted-foreground hover:text-destructive"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        ))}
                        {skills.length === 0 && (
                          <p className="text-muted-foreground text-sm">Добавьте хотя бы один навык</p>
                        )}
                      </div>
                      {form.formState.errors.skills && (
                        <p className="text-sm font-medium text-destructive">
                          {form.formState.errors.skills.message}
                        </p>
                      )}
                    </FormItem>
                  </div>

                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Статус вакансии*</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Выберите статус" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="active">Активная</SelectItem>
                            <SelectItem value="draft">Черновик</SelectItem>
                            <SelectItem value="closed">Закрыта</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="isUrgent"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 pt-6">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Срочная вакансия</FormLabel>
                          <FormDescription>
                            Отметьте, если необходимо срочное закрытие вакансии
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end gap-4">
              <Button variant="outline" type="button" onClick={handleCancel}>
                Отмена
              </Button>
              <Button type="submit">
                <Check className="h-4 w-4 mr-1" />
                Создать вакансию
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </Layout>
  );
};

export default VacancyForm;
