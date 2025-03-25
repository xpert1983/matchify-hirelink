
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
import { Check, ChevronLeft, Plus, X, Calendar } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { createCandidate } from '@/services/candidateService';

// Define form schema
const formSchema = z.object({
  name: z.string().min(2, { message: "Имя должно содержать не менее 2 символов" }),
  position: z.string().min(2, { message: "Укажите должность" }),
  email: z.string().email({ message: "Введите корректный email" }),
  phone: z.string().min(5, { message: "Введите корректный номер телефона" }),
  location: z.string().min(2, { message: "Укажите местоположение" }),
  experience: z.number().min(0).max(50),
  salary: z.string().optional(),
  skills: z.array(z.string()).min(1, { message: "Укажите хотя бы один навык" }),
  availableFrom: z.date().optional(),
  status: z.enum(["Available", "Interviewing", "Hired", "Not Available"]),
  resume: z.string().optional(),
  summary: z.string().min(10, { message: "Описание должно содержать не менее 10 символов" }),
});

type FormValues = z.infer<typeof formSchema>;

const CandidateForm = () => {
  const navigate = useNavigate();
  const [skills, setSkills] = React.useState<string[]>([]);
  const [newSkill, setNewSkill] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  // Initialize form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      position: "",
      email: "",
      phone: "",
      location: "",
      experience: 0,
      salary: "",
      skills: [],
      status: "Available",
      resume: "",
      summary: "",
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
  const onSubmit = async (data: FormValues) => {
    try {
      setIsSubmitting(true);
      
      // Create the candidate in the database
      const [firstName, ...lastNameParts] = data.name.split(' ');
      const lastName = lastNameParts.join(' ');
      
      await createCandidate({
        first_name: firstName,
        last_name: lastName || '',
        email: data.email,
        phone: data.phone,
        skills: data.skills,
        experience_years: data.experience,
        resume_url: data.resume,
        status: data.status
      });
      
      toast.success('Кандидат успешно добавлен!', {
        description: `${data.name} - ${data.position}`
      });
      navigate('/candidates');
    } catch (error) {
      console.error('Error creating candidate:', error);
      toast.error('Ошибка при добавлении кандидата', {
        description: 'Пожалуйста, попробуйте снова.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Return to candidates list
  const handleCancel = () => {
    navigate('/candidates');
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
          <h1 className="text-3xl font-bold tracking-tight">Новый кандидат</h1>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <Card>
              <CardContent className="pt-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormLabel>ФИО кандидата*</FormLabel>
                        <FormControl>
                          <Input placeholder="Иванов Иван Иванович" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="position"
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormLabel>Желаемая должность*</FormLabel>
                        <FormControl>
                          <Input placeholder="Например: Frontend Developer" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email*</FormLabel>
                        <FormControl>
                          <Input placeholder="email@example.com" type="email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Телефон*</FormLabel>
                        <FormControl>
                          <Input placeholder="+7 (___) ___-__-__" {...field} />
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
                          <Input placeholder="Например: Москва" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="experience"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Опыт работы (в годах)*</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            min={0} 
                            max={50}
                            {...field}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="salary"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ожидаемая зарплата</FormLabel>
                        <FormControl>
                          <Input placeholder="Например: 150000 руб." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="availableFrom"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Готов приступить к работе</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Выберите дату</span>
                                )}
                                <Calendar className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <CalendarComponent
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              initialFocus
                              className={cn("p-3 pointer-events-auto")}
                            />
                          </PopoverContent>
                        </Popover>
                        <FormDescription>
                          С какой даты кандидат готов приступить к работе
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Статус кандидата*</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Выберите статус" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Available">Доступен</SelectItem>
                            <SelectItem value="Interviewing">На собеседовании</SelectItem>
                            <SelectItem value="Hired">Нанят</SelectItem>
                            <SelectItem value="Not Available">Недоступен</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="col-span-2">
                    <FormItem className="space-y-2">
                      <FormLabel>Навыки*</FormLabel>
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
                    name="resume"
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormLabel>Ссылка на резюме</FormLabel>
                        <FormControl>
                          <Input placeholder="https://example.com/resume.pdf" {...field} />
                        </FormControl>
                        <FormDescription>
                          Ссылка на резюме кандидата (Google Drive, Dropbox и т.д.)
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="summary"
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormLabel>Краткое описание*</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Краткое описание опыта работы, ключевых навыков и достижений кандидата" 
                            className="min-h-32" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
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
                Добавить кандидата
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </Layout>
  );
};

export default CandidateForm;
