
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle 
} from '@/components/ui/alert-dialog';
import { toast } from 'sonner';
import { ChevronDown, Trash, Share, Copy, Archive, RefreshCw } from 'lucide-react';

interface VacancyBulkActionsProps {
  selectedIds: string[];
  onSelectAll: () => void;
  onClearSelection: () => void;
  totalCount: number;
  selectionCount: number;
}

const VacancyBulkActions: React.FC<VacancyBulkActionsProps> = ({
  selectedIds,
  onSelectAll,
  onClearSelection,
  totalCount,
  selectionCount
}) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  
  const handleDelete = () => {
    // Здесь будет логика удаления
    toast.success(`Удалено ${selectionCount} вакансий`);
    onClearSelection();
    setShowDeleteDialog(false);
  };
  
  const handleShare = () => {
    toast.success('Ссылки скопированы в буфер обмена');
    // Логика копирования ссылок
  };
  
  const handleDuplicate = () => {
    toast.success(`Создано ${selectionCount} копий вакансий`);
    // Логика дублирования
  };
  
  const handleArchive = () => {
    toast.success(`${selectionCount} вакансий архивировано`);
    // Логика архивирования
  };
  
  const handleChangeStatus = (status: string) => {
    toast.success(`Статус изменен на "${status}" для ${selectionCount} вакансий`);
    // Логика изменения статуса
  };

  if (selectionCount === 0) return null;

  return (
    <div className="bg-secondary/70 py-2 px-4 rounded-lg flex items-center justify-between mb-4 animate-fade-in">
      <div className="flex items-center gap-4">
        <Checkbox 
          checked={selectionCount === totalCount}
          onCheckedChange={() => selectionCount === totalCount ? onClearSelection() : onSelectAll()}
        />
        <span className="text-sm">
          Выбрано {selectionCount} из {totalCount}
        </span>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onClearSelection}
          className="text-xs h-7"
        >
          Очистить
        </Button>
      </div>
      
      <div className="flex items-center gap-2">
        <Button 
          variant="destructive" 
          size="sm" 
          className="h-8"
          onClick={() => setShowDeleteDialog(true)}
        >
          <Trash className="h-4 w-4 mr-1" />
          Удалить
        </Button>
        
        <Button 
          variant="outline" 
          size="sm" 
          className="h-8"
          onClick={handleShare}
        >
          <Share className="h-4 w-4 mr-1" />
          Поделиться
        </Button>
        
        <Button 
          variant="outline" 
          size="sm" 
          className="h-8"
          onClick={handleDuplicate}
        >
          <Copy className="h-4 w-4 mr-1" />
          Дублировать
        </Button>
        
        <Button 
          variant="outline" 
          size="sm" 
          className="h-8"
          onClick={handleArchive}
        >
          <Archive className="h-4 w-4 mr-1" />
          Архивировать
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="h-8">
              <RefreshCw className="h-4 w-4 mr-1" />
              Изменить статус
              <ChevronDown className="h-4 w-4 ml-1" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => handleChangeStatus('Активна')}>
              Активна
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleChangeStatus('На паузе')}>
              На паузе
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleChangeStatus('Закрыта')}>
              Закрыта
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Удалить вакансии</AlertDialogTitle>
            <AlertDialogDescription>
              Вы уверены, что хотите удалить {selectionCount} выбранных вакансий? Это действие нельзя отменить.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Отмена</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Удалить</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default VacancyBulkActions;
