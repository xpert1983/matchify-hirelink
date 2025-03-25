
import React, { useState } from 'react';
import { Camera, CameraResultType } from '@capacitor/camera';
import { Button } from '@/components/ui/button';
import { CameraIcon, Upload } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from 'sonner';

interface NativeCameraProps {
  onImageCapture: (imageUrl: string) => void;
  defaultImage?: string;
  className?: string;
}

const NativeCamera: React.FC<NativeCameraProps> = ({ 
  onImageCapture, 
  defaultImage, 
  className = ""
}) => {
  const [imageUrl, setImageUrl] = useState<string | undefined>(defaultImage);

  const takePhoto = async () => {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.DataUrl
      });
      
      const imageUrl = image.dataUrl;
      
      if (imageUrl) {
        setImageUrl(imageUrl);
        onImageCapture(imageUrl);
        toast.success('Фото успешно сохранено');
      }
    } catch (error) {
      console.error('Error taking photo:', error);
      toast.error('Не удалось сделать фото');
    }
  };

  const uploadPhoto = async () => {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.DataUrl,
        source: 'PHOTOS'
      });
      
      const imageUrl = image.dataUrl;
      
      if (imageUrl) {
        setImageUrl(imageUrl);
        onImageCapture(imageUrl);
        toast.success('Фото успешно загружено');
      }
    } catch (error) {
      console.error('Error uploading photo:', error);
      toast.error('Не удалось загрузить фото');
    }
  };

  return (
    <div className={`flex flex-col items-center gap-4 ${className}`}>
      <Avatar className="w-32 h-32 border-2 border-primary/20">
        <AvatarImage src={imageUrl} />
        <AvatarFallback className="bg-secondary text-secondary-foreground text-xl">
          {!imageUrl ? 'Фото' : 'Ошибка'}
        </AvatarFallback>
      </Avatar>
      
      <div className="flex gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={takePhoto}
          className="flex items-center gap-2"
        >
          <CameraIcon className="h-4 w-4" />
          Камера
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={uploadPhoto}
          className="flex items-center gap-2"
        >
          <Upload className="h-4 w-4" />
          Загрузить
        </Button>
      </div>
    </div>
  );
};

export default NativeCamera;
