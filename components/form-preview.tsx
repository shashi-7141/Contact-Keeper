'use client';

import { useFormBuilder } from '@/lib/form-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card } from '@/components/ui/card';

interface ViewMode {
  name: string;
  width: string;
  height: string;
}

const VIEW_MODES: ViewMode[] = [
  { name: 'Mobile', width: '375px', height: 'auto' },
  { name: 'Tablet', width: '768px', height: 'auto' },
  { name: 'Desktop', width: '100%', height: 'auto' },
];

interface FormPreviewProps {
  viewMode?: ViewMode;
}

export function FormPreview({ viewMode = VIEW_MODES[2] }: FormPreviewProps) {
  const { form } = useFormBuilder();

  const getButtonStyle = () => ({
    backgroundColor: form.primaryColor,
    color: 'white',
  });

  const inputStyle = {
    borderColor: form.primaryColor,
    outlineColor: form.primaryColor,
  };

  return (
    <div
      className={`mx-auto p-4 transition-all duration-300 ${
        form.theme === 'dark' ? 'bg-slate-900 text-white' : 'bg-white text-black'
      }`}
      style={{ width: viewMode.width, height: viewMode.height }}
    >
      <Card className={`p-8 ${form.theme === 'dark' ? 'bg-slate-800' : 'bg-white'}`}>
        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          {form.fields.map((field) => {
            if (field.type === 'submit') {
              return (
                <Button
                  key={field.id}
                  type="submit"
                  className="w-full"
                  style={getButtonStyle()}
                >
                  {field.label}
                </Button>
              );
            }

            if (field.type === 'text' || field.type === 'email') {
              return (
                <div key={field.id} className="space-y-2">
                  <Label htmlFor={field.id}>{field.label}</Label>
                  <Input
                    id={field.id}
                    type={field.type}
                    placeholder={field.placeholder}
                    defaultValue={field.defaultValue || ''}
                    required={field.required}
                    style={inputStyle}
                    className="border-2"
                  />
                </div>
              );
            }

            if (field.type === 'textarea') {
              return (
                <div key={field.id} className="space-y-2">
                  <Label htmlFor={field.id}>{field.label}</Label>
                  <Textarea
                    id={field.id}
                    placeholder={field.placeholder}
                    defaultValue={field.defaultValue || ''}
                    required={field.required}
                    style={inputStyle}
                    className="border-2"
                    rows={4}
                  />
                </div>
              );
            }

            if (field.type === 'select') {
              return (
                <div key={field.id} className="space-y-2">
                  <Label htmlFor={field.id}>{field.label}</Label>
                  <Select>
                    <SelectTrigger id={field.id} style={inputStyle} className="border-2">
                      <SelectValue placeholder={field.placeholder} />
                    </SelectTrigger>
                    <SelectContent>
                      {field.options?.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              );
            }

            if (field.type === 'checkbox') {
              return (
                <div key={field.id} className="space-y-3">
                  <Label>{field.label}</Label>
                  <div className="space-y-2">
                    {field.options?.map((option) => (
                      <div key={option} className="flex items-center gap-2">
                        <Checkbox id={`${field.id}-${option}`} />
                        <Label
                          htmlFor={`${field.id}-${option}`}
                          className="font-normal cursor-pointer"
                        >
                          {option}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              );
            }

            if (field.type === 'radio') {
              return (
                <div key={field.id} className="space-y-3">
                  <Label>{field.label}</Label>
                  <RadioGroup>
                    {field.options?.map((option) => (
                      <div key={option} className="flex items-center gap-2">
                        <RadioGroupItem value={option} id={`${field.id}-${option}`} />
                        <Label
                          htmlFor={`${field.id}-${option}`}
                          className="font-normal cursor-pointer"
                        >
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              );
            }

            return null;
          })}
        </form>
      </Card>
    </div>
  );
}
