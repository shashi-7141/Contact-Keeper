'use client';

import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import type { FieldType } from '@/lib/form-context';
import { useFormBuilder } from '@/lib/form-context';
import { v4 as uuidv4 } from 'uuid';

interface FieldTemplate {
  type: FieldType;
  label: string;
  icon: string;
}

const FIELD_TEMPLATES: FieldTemplate[] = [
  { type: 'text', label: 'Text Input', icon: '📝' },
  { type: 'email', label: 'Email', icon: '✉️' },
  { type: 'textarea', label: 'Textarea', icon: '📄' },
  { type: 'select', label: 'Dropdown', icon: '▼' },
  { type: 'checkbox', label: 'Checkbox', icon: '☑️' },
  { type: 'radio', label: 'Radio', icon: '◯' },
];

function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

export function FieldPalette() {
  const { addField } = useFormBuilder();

  const handleAddField = (template: FieldTemplate) => {
    const id = generateId();
    addField({
      id,
      type: template.type,
      label: template.label,
      placeholder: `Enter ${template.label.toLowerCase()}`,
      required: false,
      name: `field_${id}`,
      ...(template.type === 'select' && { options: ['Option 1', 'Option 2'] }),
      ...(template.type === 'radio' && { options: ['Option 1', 'Option 2'] }),
      ...(template.type === 'checkbox' && { options: ['Option 1'] }),
    });
  };

  return (
    <Card className="p-4">
      <h3 className="font-semibold mb-4 text-foreground">Add Fields</h3>
      <div className="grid grid-cols-1 gap-2">
        {FIELD_TEMPLATES.map((template) => (
          <Button
            key={template.type}
            variant="outline"
            className="justify-start gap-3 h-auto py-2 bg-transparent"
            onClick={() => handleAddField(template)}
          >
            <span>{template.icon}</span>
            <span>{template.label}</span>
            <Plus className="ml-auto h-4 w-4" />
          </Button>
        ))}
      </div>
    </Card>
  );
}
