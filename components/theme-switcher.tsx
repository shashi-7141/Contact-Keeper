'use client';

import { useFormBuilder } from '@/lib/form-context';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Moon, Sun } from 'lucide-react';
import { Input } from '@/components/ui/input';

export function ThemeSwitcher() {
  const { form, setTheme, setPrimaryColor, setSecondaryColor } = useFormBuilder();

  return (
    <Card className="p-4 space-y-4">
      <h3 className="font-semibold text-foreground">Customize Theme</h3>

      <div className="space-y-3">
        <div>
          <Label className="text-sm font-medium mb-2 block">Form Theme</Label>
          <div className="flex gap-2">
            <Button
              variant={form.theme === 'light' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTheme('light')}
              className="flex-1 gap-2"
            >
              <Sun className="h-4 w-4" />
              Light
            </Button>
            <Button
              variant={form.theme === 'dark' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTheme('dark')}
              className="flex-1 gap-2"
            >
              <Moon className="h-4 w-4" />
              Dark
            </Button>
          </div>
        </div>

        <div>
          <Label htmlFor="primary" className="text-sm font-medium block mb-2">
            Primary Color
          </Label>
          <div className="flex gap-2">
            <Input
              id="primary"
              type="color"
              value={form.primaryColor}
              onChange={(e) => setPrimaryColor(e.target.value)}
              className="h-10 w-12 cursor-pointer"
            />
            <Input
              type="text"
              value={form.primaryColor}
              onChange={(e) => setPrimaryColor(e.target.value)}
              placeholder="#6366f1"
              className="flex-1"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="secondary" className="text-sm font-medium block mb-2">
            Secondary Color
          </Label>
          <div className="flex gap-2">
            <Input
              id="secondary"
              type="color"
              value={form.secondaryColor}
              onChange={(e) => setSecondaryColor(e.target.value)}
              className="h-10 w-12 cursor-pointer"
            />
            <Input
              type="text"
              value={form.secondaryColor}
              onChange={(e) => setSecondaryColor(e.target.value)}
              placeholder="#e0e7ff"
              className="flex-1"
            />
          </div>
        </div>
      </div>
    </Card>
  );
}
