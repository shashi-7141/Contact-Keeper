'use client';

import { useState } from 'react';
import { FormProvider } from '@/lib/form-context';
import { FieldPalette } from '@/components/field-palette';
import { FieldsBuilder } from '@/components/fields-builder';
import { FieldEditor } from '@/components/field-editor';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { ResponsivePreview } from '@/components/responsive-preview';
import { ExportModal } from '@/components/export-modal';
import { Button } from '@/components/ui/button';
import { Code2, RotateCcw } from 'lucide-react';
import { useFormBuilder } from '@/lib/form-context';

function BuilderContent() {
  const [exportOpen, setExportOpen] = useState(false);
  const { resetForm } = useFormBuilder();

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Formify</h1>
            <p className="text-sm text-muted-foreground">Responsive Contact Form Builder</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={resetForm}
              className="gap-2 bg-transparent"
            >
              <RotateCcw className="h-4 w-4" />
              Reset
            </Button>
            <Button
              size="sm"
              onClick={() => setExportOpen(true)}
              className="gap-2"
            >
              <Code2 className="h-4 w-4" />
              Export
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <FieldPalette />
            <ThemeSwitcher />
          </div>

          <div className="lg:col-span-1 space-y-4">
            <div>
              <h2 className="text-lg font-semibold mb-4 text-foreground">Form Fields</h2>
              <FieldsBuilder />
            </div>
            <div>
              <h2 className="text-lg font-semibold mb-4 text-foreground">Settings</h2>
              <FieldEditor />
            </div>
          </div>

          <div className="lg:col-span-2">
            <h2 className="text-lg font-semibold mb-4 text-foreground">Live Preview</h2>
            <div className="h-[600px] border rounded-lg bg-muted overflow-hidden flex flex-col">
              <ResponsivePreview />
            </div>
          </div>
        </div>
      </main>

      <ExportModal open={exportOpen} onOpenChange={setExportOpen} />
    </div>
  );
}

export default function Home() {
  return (
    <FormProvider>
      <BuilderContent />
    </FormProvider>
  );
}
