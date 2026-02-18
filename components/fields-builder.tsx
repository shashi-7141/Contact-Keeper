'use client';

import React from "react"

import { useFormBuilder, type FormField } from '@/lib/form-context';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { GripVertical, Trash2 } from 'lucide-react';
import { useState } from 'react';

export function FieldsBuilder() {
  const { form, selectedFieldId, setSelectedFieldId, removeField, updateField } = useFormBuilder();
  const [draggedId, setDraggedId] = useState<string | null>(null);

  const handleDragStart = (id: string) => {
    setDraggedId(id);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (targetId: string) => {
    if (!draggedId || draggedId === targetId) return;

    const fromIndex = form.fields.findIndex((f) => f.id === draggedId);
    const toIndex = form.fields.findIndex((f) => f.id === targetId);

    if (fromIndex !== -1 && toIndex !== -1) {
      const newFields = [...form.fields];
      const [moved] = newFields.splice(fromIndex, 1);
      newFields.splice(toIndex, 0, moved);

      form.fields.forEach((field, index) => {
        updateField(field.id, {});
      });
    }

    setDraggedId(null);
  };

  const getFieldIcon = (type: string) => {
    const icons: Record<string, string> = {
      text: '📝',
      email: '✉️',
      textarea: '📄',
      select: '▼',
      checkbox: '☑️',
      radio: '◯',
      submit: '▶️',
    };
    return icons[type] || '📋';
  };

  if (form.fields.length === 0) {
    return (
      <Card className="p-8 text-center">
        <p className="text-muted-foreground">No fields yet. Add fields from the palette to get started.</p>
      </Card>
    );
  }

  return (
    <div className="space-y-2">
      {form.fields.map((field) => (
        <div
          key={field.id}
          draggable
          onDragStart={() => handleDragStart(field.id)}
          onDragOver={handleDragOver}
          onDrop={() => handleDrop(field.id)}
          className={`cursor-move transition-all ${
            draggedId === field.id ? 'opacity-50' : ''
          }`}
        >
          <Card
            onClick={() => setSelectedFieldId(field.id)}
            className={`p-3 cursor-pointer transition-all ${
              selectedFieldId === field.id
                ? 'ring-2 ring-primary bg-primary/5'
                : 'hover:bg-muted'
            }`}
          >
            <div className="flex items-center gap-3">
              <GripVertical className="h-4 w-4 text-muted-foreground" />
              <span className="text-lg">{getFieldIcon(field.type)}</span>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm truncate">{field.label}</div>
                <div className="text-xs text-muted-foreground">
                  {field.type}
                  {field.required && ' • Required'}
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  removeField(field.id);
                }}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        </div>
      ))}
    </div>
  );
}
