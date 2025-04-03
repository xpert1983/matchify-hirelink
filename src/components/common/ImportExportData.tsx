import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';
import { Upload, Download, FileText, Database, ChevronDown } from 'lucide-react';
interface ImportExportDataProps {
  entityType: 'vacancies' | 'candidates' | 'matches';
  onImport?: (data: any) => void;
  onExport?: () => any;
}
const ImportExportData: React.FC<ImportExportDataProps> = ({
  entityType,
  onImport,
  onExport
}) => {
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
  const [importFile, setImportFile] = useState<File | null>(null);
  const [isImporting, setIsImporting] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const entityName = {
    vacancies: 'вакансий',
    candidates: 'кандидатов',
    matches: 'совпадений'
  }[entityType] || '';
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImportFile(e.target.files[0]);
    }
  };
  const handleImport = async () => {
    if (!importFile) {
      toast.error('Выберите файл для импорта');
      return;
    }
    setIsImporting(true);
    try {
      // Здесь будет логика импорта файла
      const reader = new FileReader();
      reader.onload = event => {
        try {
          if (event.target?.result) {
            const data = JSON.parse(event.target.result as string);
            if (onImport) {
              onImport(data);
            }
            toast.success(`Импорт данных ${entityName} успешно завершен`);
            setIsImportDialogOpen(false);
            setImportFile(null);
          }
        } catch (error) {
          console.error('Error parsing file:', error);
          toast.error('Ошибка при обработке файла. Проверьте формат данных.');
        }
      };
      reader.onerror = () => {
        toast.error('Ошибка при чтении файла');
      };
      reader.readAsText(importFile);
    } catch (error) {
      console.error('Import error:', error);
      toast.error('Произошла ошибка при импорте данных');
    } finally {
      setIsImporting(false);
    }
  };
  const handleExport = async (format: 'json' | 'csv' | 'excel') => {
    if (!onExport) return;
    setIsExporting(true);
    try {
      const data = onExport();
      let content: string = '';
      let mimeType: string = '';
      let fileExtension: string = '';
      if (format === 'json') {
        content = JSON.stringify(data, null, 2);
        mimeType = 'application/json';
        fileExtension = 'json';
      } else if (format === 'csv') {
        // Простая реализация экспорта в CSV
        const headers = Object.keys(data[0]).join(',');
        const rows = data.map((item: any) => Object.values(item).join(','));
        content = [headers, ...rows].join('\n');
        mimeType = 'text/csv';
        fileExtension = 'csv';
      } else if (format === 'excel') {
        // Для Excel нужна была бы библиотека, здесь заглушка
        content = JSON.stringify(data, null, 2);
        mimeType = 'application/json';
        fileExtension = 'json';
        toast.info('Экспорт в Excel требует дополнительных библиотек');
      }
      const blob = new Blob([content], {
        type: mimeType
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `export-${entityType}-${new Date().toISOString().slice(0, 10)}.${fileExtension}`;
      document.body.appendChild(a);
      a.click();
      URL.revokeObjectURL(url);
      document.body.removeChild(a);
      toast.success(`Данные ${entityName} успешно экспортированы`);
    } catch (error) {
      console.error('Export error:', error);
      toast.error('Произошла ошибка при экспорте данных');
    } finally {
      setIsExporting(false);
    }
  };
  return <div className="flex items-center gap-2">
      <Dialog open={isImportDialogOpen} onOpenChange={setIsImportDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" className="mx-0 px-0 font-extralight text-xs rounded-none">
            <Upload className="h-4 w-4 mr-2" />
            Импорт
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Импорт данных {entityName}</DialogTitle>
            <DialogDescription>
              Загрузите файл в формате JSON, CSV или Excel для импорта данных {entityName}.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="importFile" className="text-sm font-medium">
                Выберите файл
              </label>
              <Input id="importFile" type="file" accept=".json,.csv,.xlsx" onChange={handleFileChange} />
              {importFile && <p className="text-xs text-muted-foreground">
                  Выбран файл: {importFile.name}
                </p>}
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsImportDialogOpen(false)}>
              Отмена
            </Button>
            <Button onClick={handleImport} disabled={!importFile || isImporting}>
              {isImporting ? 'Импорт...' : 'Импортировать'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" disabled={isExporting}>
            <Download className="h-4 w-4 mr-2" />
            Экспорт
            <ChevronDown className="h-4 w-4 ml-2" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => handleExport('json')}>
            <FileText className="h-4 w-4 mr-2" />
            Экспорт в JSON
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleExport('csv')}>
            <FileText className="h-4 w-4 mr-2" />
            Экспорт в CSV
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleExport('excel')}>
            <Database className="h-4 w-4 mr-2" />
            Экспорт в Excel
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>;
};
export default ImportExportData;