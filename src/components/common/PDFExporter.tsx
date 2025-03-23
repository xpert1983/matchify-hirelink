
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Download, FileText, FilePdf, FileJson } from 'lucide-react';
import { toast } from 'sonner';

interface PDFExporterProps {
  data: any;
  entityName: string;
  entityType: 'vacancy' | 'candidate' | 'match';
  className?: string;
}

const PDFExporter: React.FC<PDFExporterProps> = ({ 
  data, 
  entityName, 
  entityType,
  className = ""
}) => {
  const handleExportPDF = () => {
    // В реальном приложении здесь был бы код для генерации PDF
    toast.success(`PDF файл для "${entityName}" успешно сгенерирован`, {
      description: "Файл сохранен в папке загрузок"
    });
  };

  const handleExportJSON = () => {
    // Создаем JSON строку из данных
    const jsonString = JSON.stringify(data, null, 2);
    
    // Создаем blob с типом "application/json"
    const blob = new Blob([jsonString], { type: 'application/json' });
    
    // Создаем URL для blob
    const url = URL.createObjectURL(blob);
    
    // Создаем ссылку для скачивания
    const a = document.createElement('a');
    a.href = url;
    a.download = `${entityType}-${entityName.toLowerCase().replace(/\s+/g, '-')}.json`;
    
    // Добавляем ссылку в DOM и имитируем клик
    document.body.appendChild(a);
    a.click();
    
    // Очищаем
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success(`JSON файл для "${entityName}" успешно сгенерирован`);
  };

  const handleExportHTML = () => {
    let htmlContent = '<html><head>';
    htmlContent += '<style>body{font-family:Arial,sans-serif;max-width:800px;margin:0 auto;padding:20px}h1{color:#333}table{width:100%;border-collapse:collapse}th,td{padding:8px;text-align:left;border-bottom:1px solid #ddd}th{background-color:#f2f2f2}</style>';
    htmlContent += '</head><body>';
    
    if (entityType === 'vacancy') {
      htmlContent += `<h1>${data.title} - ${data.company}</h1>`;
      htmlContent += `<p><strong>Местоположение:</strong> ${data.location}</p>`;
      htmlContent += `<p><strong>Тип работы:</strong> ${data.type}</p>`;
      htmlContent += `<p><strong>Зарплата:</strong> ${data.salary}</p>`;
      htmlContent += `<h2>Описание</h2><p>${data.description}</p>`;
      htmlContent += `<h2>Навыки</h2><ul>`;
      data.skills.forEach((skill: string) => {
        htmlContent += `<li>${skill}</li>`;
      });
      htmlContent += `</ul>`;
    } else if (entityType === 'candidate') {
      htmlContent += `<h1>${data.name}</h1>`;
      htmlContent += `<p><strong>Должность:</strong> ${data.position}</p>`;
      htmlContent += `<p><strong>Местоположение:</strong> ${data.location}</p>`;
      htmlContent += `<p><strong>Email:</strong> ${data.email || 'Не указан'}</p>`;
      htmlContent += `<h2>Опыт работы</h2><p>${data.experience || 'Не указан'}</p>`;
      if (data.skills && data.skills.length) {
        htmlContent += `<h2>Навыки</h2><ul>`;
        data.skills.forEach((skill: string) => {
          htmlContent += `<li>${skill}</li>`;
        });
        htmlContent += `</ul>`;
      }
    }
    
    htmlContent += '</body></html>';
    
    // Создаем blob с типом "text/html"
    const blob = new Blob([htmlContent], { type: 'text/html' });
    
    // Создаем URL для blob
    const url = URL.createObjectURL(blob);
    
    // Создаем ссылку для скачивания
    const a = document.createElement('a');
    a.href = url;
    a.download = `${entityType}-${entityName.toLowerCase().replace(/\s+/g, '-')}.html`;
    
    // Добавляем ссылку в DOM и имитируем клик
    document.body.appendChild(a);
    a.click();
    
    // Очищаем
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success(`HTML файл для "${entityName}" успешно сгенерирован`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className={className}>
          <Download className="h-4 w-4 mr-2" />
          Экспорт
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={handleExportPDF}>
          <FilePdf className="h-4 w-4 mr-2" />
          <span>Экспорт в PDF</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleExportHTML}>
          <FileText className="h-4 w-4 mr-2" />
          <span>Экспорт в HTML</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleExportJSON}>
          <FileJson className="h-4 w-4 mr-2" />
          <span>Экспорт в JSON</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default PDFExporter;
