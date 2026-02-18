'use client';

import { useFormBuilder, type FormField } from '@/lib/form-context';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Copy, Download } from 'lucide-react';
import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';

interface ExportModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ExportModal({ open, onOpenChange }: ExportModalProps) {
  const { form } = useFormBuilder();
  const [copied, setCopied] = useState(false);

  const generateHTML = () => {
    const fields = form.fields
      .map((field) => {
        if (field.type === 'submit') {
          return `    <button type="submit" style="background-color: ${form.primaryColor}; color: white; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer; font-weight: 600;">${field.label}</button>`;
        }

        if (field.type === 'text' || field.type === 'email') {
          return `    <div style="margin-bottom: 20px;">
      <label for="${field.name}" style="display: block; margin-bottom: 8px; font-weight: 500;">${field.label}</label>
      <input type="${field.type}" id="${field.name}" name="${field.name}" placeholder="${field.placeholder}" ${field.required ? 'required' : ''} style="width: 100%; padding: 10px; border: 1px solid ${form.primaryColor}; border-radius: 4px; font-family: inherit;" />
    </div>`;
        }

        if (field.type === 'textarea') {
          return `    <div style="margin-bottom: 20px;">
      <label for="${field.name}" style="display: block; margin-bottom: 8px; font-weight: 500;">${field.label}</label>
      <textarea id="${field.name}" name="${field.name}" placeholder="${field.placeholder}" ${field.required ? 'required' : ''} style="width: 100%; padding: 10px; border: 1px solid ${form.primaryColor}; border-radius: 4px; font-family: inherit; resize: vertical; min-height: 120px;"></textarea>
    </div>`;
        }

        if (field.type === 'select') {
          const options = field.options?.map((opt) => `        <option value="${opt}">${opt}</option>`).join('\n') || '';
          return `    <div style="margin-bottom: 20px;">
      <label for="${field.name}" style="display: block; margin-bottom: 8px; font-weight: 500;">${field.label}</label>
      <select id="${field.name}" name="${field.name}" ${field.required ? 'required' : ''} style="width: 100%; padding: 10px; border: 1px solid ${form.primaryColor}; border-radius: 4px; font-family: inherit;">
        <option value="">${field.placeholder}</option>
${options}
      </select>
    </div>`;
        }

        if (field.type === 'checkbox' || field.type === 'radio') {
          const options = field.options
            ?.map((opt) => `      <div style="margin-bottom: 8px;">
        <input type="${field.type}" id="${field.name}-${opt}" name="${field.name}" value="${opt}" />
        <label for="${field.name}-${opt}" style="margin-left: 8px; cursor: pointer;">${opt}</label>
      </div>`)
            .join('\n') || '';
          return `    <div style="margin-bottom: 20px;">
      <label style="display: block; margin-bottom: 8px; font-weight: 500;">${field.label}</label>
      <div>
${options}
      </div>
    </div>`;
        }

        return '';
      })
      .filter(Boolean)
      .join('\n');

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Contact Form</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
      background-color: ${form.theme === 'dark' ? '#1a1a1a' : '#f5f5f5'};
      color: ${form.theme === 'dark' ? '#ffffff' : '#000000'};
      padding: 20px;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: ${form.theme === 'dark' ? '#2d2d2d' : '#ffffff'};
      padding: 40px;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
    h1 {
      margin-bottom: 30px;
      text-align: center;
      color: ${form.primaryColor};
    }
    button:hover {
      opacity: 0.9;
    }
    @media (max-width: 640px) {
      .container {
        padding: 20px;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Contact Form</h1>
    <form method="POST" action="/submit">
${fields}
    </form>
  </div>
</body>
</html>`;
  };

  const html = generateHTML();

  const handleCopy = () => {
    navigator.clipboard.writeText(html);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/html;charset=utf-8,' + encodeURIComponent(html));
    element.setAttribute('download', 'form.html');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Export Form Code</DialogTitle>
          <DialogDescription>
            Copy or download the HTML/CSS code for your form
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="html" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="html">HTML</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>

          <TabsContent value="html" className="space-y-4">
            <Textarea
              value={html}
              readOnly
              className="font-mono text-sm min-h-96"
            />
            <div className="flex gap-2">
              <Button onClick={handleCopy} className="flex-1 gap-2">
                <Copy className="h-4 w-4" />
                {copied ? 'Copied!' : 'Copy Code'}
              </Button>
              <Button onClick={handleDownload} variant="outline" className="flex-1 gap-2 bg-transparent">
                <Download className="h-4 w-4" />
                Download
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="preview" className="space-y-4">
            <div className="bg-background border rounded p-4 max-h-96 overflow-auto">
              <div dangerouslySetInnerHTML={{ __html: html }} />
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
