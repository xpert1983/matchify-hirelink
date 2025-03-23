
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { 
  MessageSquare, 
  Edit, 
  Trash2, 
  ThumbsUp, 
  Clock 
} from 'lucide-react';
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

interface Comment {
  id: string;
  text: string;
  author: {
    name: string;
    avatar?: string;
  };
  createdAt: string;
  likes: number;
  isLiked?: boolean;
  isEditing?: boolean;
}

interface CommentSystemProps {
  entityId: string;
  entityType: 'vacancy' | 'candidate' | 'match';
  comments?: Comment[];
}

const CommentSystem: React.FC<CommentSystemProps> = ({
  entityId,
  entityType,
  comments: initialComments = []
}) => {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState('');
  const [editingComment, setEditingComment] = useState<string | null>(null);
  const [editText, setEditText] = useState('');
  const [deleteId, setDeleteId] = useState<string | null>(null);
  
  const handleAddComment = () => {
    if (!newComment.trim()) return;
    
    const comment: Comment = {
      id: Date.now().toString(),
      text: newComment,
      author: {
        name: 'Иван Петров',
        avatar: '/placeholder.svg'
      },
      createdAt: new Date().toISOString(),
      likes: 0
    };
    
    setComments([comment, ...comments]);
    setNewComment('');
    
    toast.success('Комментарий добавлен');
  };
  
  const handleEditComment = (id: string) => {
    const comment = comments.find(c => c.id === id);
    if (comment) {
      setEditingComment(id);
      setEditText(comment.text);
    }
  };
  
  const handleSaveEdit = (id: string) => {
    if (!editText.trim()) return;
    
    setComments(comments.map(comment => 
      comment.id === id 
        ? { ...comment, text: editText } 
        : comment
    ));
    
    setEditingComment(null);
    toast.success('Комментарий обновлен');
  };
  
  const handleDeleteComment = (id: string) => {
    setDeleteId(id);
  };
  
  const confirmDelete = () => {
    if (deleteId) {
      setComments(comments.filter(comment => comment.id !== deleteId));
      setDeleteId(null);
      toast.success('Комментарий удален');
    }
  };
  
  const handleLikeComment = (id: string) => {
    setComments(comments.map(comment => 
      comment.id === id 
        ? { 
            ...comment, 
            likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
            isLiked: !comment.isLiked
          } 
        : comment
    ));
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ru-RU', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Комментарии и заметки</h3>
        <span className="text-sm text-muted-foreground">{comments.length} комментариев</span>
      </div>
      
      <Card>
        <CardContent className="p-3">
          <div className="flex gap-3">
            <Avatar>
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback>ИП</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <Textarea
                placeholder="Добавьте комментарий или заметку..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="min-h-[100px] resize-none"
              />
              <div className="flex justify-end mt-2">
                <Button onClick={handleAddComment} disabled={!newComment.trim()}>
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Добавить комментарий
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {comments.length > 0 ? (
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            {comments.map((comment) => (
              <Card key={comment.id} className="overflow-hidden">
                <CardContent className="p-3">
                  <div className="flex items-start gap-3">
                    <Avatar>
                      <AvatarImage src={comment.author.avatar} />
                      <AvatarFallback>
                        {comment.author.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{comment.author.name}</p>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Clock className="h-3 w-3 mr-1" />
                            {formatDate(comment.createdAt)}
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8"
                            onClick={() => handleEditComment(comment.id)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8"
                            onClick={() => handleDeleteComment(comment.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      {editingComment === comment.id ? (
                        <div className="mt-2 space-y-2">
                          <Textarea
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                            className="min-h-[80px]"
                          />
                          <div className="flex justify-end gap-2">
                            <Button 
                              variant="outline"
                              size="sm"
                              onClick={() => setEditingComment(null)}
                            >
                              Отмена
                            </Button>
                            <Button 
                              size="sm"
                              onClick={() => handleSaveEdit(comment.id)}
                              disabled={!editText.trim()}
                            >
                              Сохранить
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <p className="mt-2 text-sm">{comment.text}</p>
                          
                          <div className="mt-3 flex items-center gap-2">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className={`h-7 px-2 gap-1 text-xs ${comment.isLiked ? 'bg-secondary' : ''}`}
                              onClick={() => handleLikeComment(comment.id)}
                            >
                              <ThumbsUp className={`h-3 w-3 ${comment.isLiked ? 'fill-current' : ''}`} />
                              {comment.likes > 0 && <span>{comment.likes}</span>}
                            </Button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      ) : (
        <div className="text-center p-6 border rounded-lg">
          <MessageSquare className="h-10 w-10 mx-auto text-muted-foreground" />
          <p className="mt-2 text-muted-foreground">
            Нет комментариев. Будьте первым, кто оставит комментарий!
          </p>
        </div>
      )}
      
      <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Вы уверены?</AlertDialogTitle>
            <AlertDialogDescription>
              Вы действительно хотите удалить этот комментарий? Это действие нельзя отменить.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Отмена</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>Удалить</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default CommentSystem;
