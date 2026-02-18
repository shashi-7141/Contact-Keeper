'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { FormPreview } from './form-preview';
import { Smartphone, Tablet, Monitor } from 'lucide-react';

export function ResponsivePreview() {
  const [viewMode, setViewMode] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');

  const viewModes = {
    mobile: { width: '375px' },
    tablet: { width: '768px' },
    desktop: { width: '100%' },
  };

  const icons = {
    mobile: <Smartphone className="h-4 w-4" />,
    tablet: <Tablet className="h-4 w-4" />,
    desktop: <Monitor className="h-4 w-4" />,
  };

  return (
    <div className="space-y-4 h-full flex flex-col">
      <div className="flex gap-2 border-b pb-4">
        {Object.entries(viewModes).map(([mode]) => (
          <Button
            key={mode}
            variant={viewMode === mode ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode(mode as 'mobile' | 'tablet' | 'desktop')}
            className="gap-2"
          >
            {icons[mode as 'mobile' | 'tablet' | 'desktop']}
            {mode.charAt(0).toUpperCase() + mode.slice(1)}
          </Button>
        ))}
      </div>

      <div className="flex-1 overflow-auto bg-muted p-4 rounded-lg flex justify-center items-start">
        <div className="transition-all duration-300">
          <FormPreview
            viewMode={{
              name: viewMode,
              width: viewModes[viewMode].width,
              height: 'auto',
            }}
          />
        </div>
      </div>
    </div>
  );
}
