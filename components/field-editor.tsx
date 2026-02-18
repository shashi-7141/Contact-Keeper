'use client';

import { useFormBuilder, type FormField } from '@/lib/form-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Trash2 } from 'lucide-react';

export function FieldEditor() {
  const { form, selectedFieldId, updateField, removeField } = useFormBuilder();

  const selectedField = form.fields.find((f) => f.id === selectedFieldId);

  if (!selectedField) {
    return (
      <Card className="p-4">
        <p className="text-sm text-muted-foreground">Select a field to edit its properties</p>
      </Card>
    );
  }

  const handleUpdateField = (key: keyof FormField, value: any) => {
    updateField(selectedFieldId!, { [key]: value });
  };

  const handleRemoveField = () => {
    removeField(selectedFieldId!);
  };

  return (
    <Card className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-foreground">Field Properties</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleRemoveField}
          className="text-destructive hover:text-destructive"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      <Separator />

      <div className="space-y-3">
        <div>
          <Label htmlFor="label" className="text-sm font-medium">
            Label
          </Label>
          <Input
            id="label"
            value={selectedField.label}
            onChange={(e) => handleUpdateField('label', e.target.value)}
            placeholder="Field label"
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="placeholder" className="text-sm font-medium">
            Placeholder
          </Label>
          <Input
            id="placeholder"
            value={selectedField.placeholder}
            onChange={(e) => handleUpdateField('placeholder', e.target.value)}
            placeholder="Field placeholder"
            className="mt-1"
          />
        </div>

        {selectedField.type !== 'textarea' && selectedField.type !== 'submit' && (
          <div>
            <Label htmlFor="defaultValue" className="text-sm font-medium">
              Default Value
            </Label>
            <Input
              id="defaultValue"
              value={selectedField.defaultValue || ''}
              onChange={(e) => handleUpdateField('defaultValue', e.target.value)}
              placeholder="Default value"
              className="mt-1"
            />
          </div>
        )}

        {selectedField.type === 'textarea' && (
          <div>
            <Label htmlFor="defaultValue" className="text-sm font-medium">
              Default Value
            </Label>
            <Textarea
              id="defaultValue"
              value={selectedField.defaultValue || ''}
              onChange={(e) => handleUpdateField('defaultValue', e.target.value)}
              placeholder="Default value"
              className="mt-1"
              rows={3}
            />
          </div>
        )}

        {['select', 'radio', 'checkbox'].includes(selectedField.type) && (
          <div>
            <Label htmlFor="options" className="text-sm font-medium">
              Options (one per line)
            </Label>
            <Textarea
              id="options"
              value={(selectedField.options || []).join('\n')}
              onChange={(e) =>
                handleUpdateField('options', e.target.value.split('\n').filter(Boolean))
              }
              placeholder="Option 1&#10;Option 2&#10;Option 3"
              className="mt-1"
              rows={4}
            />
          </div>
        )}

        <div className="flex items-center gap-2">
          <Checkbox
            id="required"
            checked={selectedField.required}
            onCheckedChange={(checked) => handleUpdateField('required', checked === true)}
          />
          <Label htmlFor="required" className="text-sm font-medium cursor-pointer">
            Required field
          </Label>
        </div>

        {selectedField.type === 'email' && (
          <div className="bg-muted p-3 rounded text-sm text-muted-foreground">
            Email validation is enabled for this field
          </div>
        )}
      </div>
    </Card>
  );
}
