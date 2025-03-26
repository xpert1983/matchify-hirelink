
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useTheme } from '@/hooks/use-theme';
import { Check, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

interface ThemeColor {
  name: string;
  variable: string;
  value: string;
}

const ThemeCustomizer: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const [colors, setColors] = useState<ThemeColor[]>([
    { name: 'Основной', variable: '--primary', value: isDark ? '#ffffff' : '#0f0f0f' },
    { name: 'Фон', variable: '--background', value: isDark ? '#0f0f0f' : '#ffffff' },
    { name: 'Карточка', variable: '--card', value: isDark ? '#0f0f0f' : '#ffffff' },
    { name: 'Акцент', variable: '--accent', value: isDark ? '#1f1f1f' : '#f4f4f5' },
    { name: 'Границы', variable: '--border', value: isDark ? '#1f1f1f' : '#e4e4e7' },
  ]);

  const applyTheme = () => {
    const root = document.documentElement;
    
    colors.forEach(color => {
      const hsl = hexToHSL(color.value);
      if (hsl) {
        root.style.setProperty(color.variable, `${hsl.h} ${hsl.s}% ${hsl.l}%`);
      }
    });
    
    toast.success('Тема успешно применена');
  };

  const resetTheme = () => {
    const root = document.documentElement;
    
    colors.forEach(color => {
      root.style.removeProperty(color.variable);
    });
    
    setColors(colors.map(color => ({
      ...color,
      value: isDark 
        ? ['--primary', '--primary-foreground'].includes(color.variable) ? '#ffffff' : '#0f0f0f'
        : ['--primary', '--primary-foreground'].includes(color.variable) ? '#0f0f0f' : '#ffffff'
    })));
    
    toast.success('Тема сброшена к значениям по умолчанию');
  };

  const handleColorChange = (index: number, value: string) => {
    const newColors = [...colors];
    newColors[index].value = value;
    setColors(newColors);
  };

  // Helper function to convert hex to HSL
  const hexToHSL = (hex: string): { h: number, s: number, l: number } | null => {
    // Remove the # if present
    hex = hex.replace(/^#/, '');

    // Parse the hex values
    let r, g, b;
    if (hex.length === 3) {
      r = parseInt(hex[0] + hex[0], 16) / 255;
      g = parseInt(hex[1] + hex[1], 16) / 255;
      b = parseInt(hex[2] + hex[2], 16) / 255;
    } else if (hex.length === 6) {
      r = parseInt(hex.substring(0, 2), 16) / 255;
      g = parseInt(hex.substring(2, 4), 16) / 255;
      b = parseInt(hex.substring(4, 6), 16) / 255;
    } else {
      return null;
    }

    // Find the min and max values to calculate lightness
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
      // Achromatic
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
        default: h = 0;
      }
      h /= 6;
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Настройка темы</CardTitle>
        <CardDescription>
          Настройте цвета интерфейса под свои предпочтения
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {colors.map((color, index) => (
          <div key={color.variable} className="grid grid-cols-3 items-center gap-4">
            <Label htmlFor={`color-${index}`} className="text-right">
              {color.name}
            </Label>
            <Input
              id={`color-${index}`}
              type="color"
              value={color.value}
              onChange={(e) => handleColorChange(index, e.target.value)}
              className="col-span-1 h-10"
            />
            <div className="w-full h-10 rounded-md" style={{ backgroundColor: color.value }} />
          </div>
        ))}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={resetTheme} className="flex items-center gap-2">
          <RefreshCw className="h-4 w-4" />
          Сбросить
        </Button>
        <Button onClick={applyTheme} className="flex items-center gap-2">
          <Check className="h-4 w-4" />
          Применить
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ThemeCustomizer;
