'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';

export type FieldType = 'text' | 'email' | 'textarea' | 'select' | 'checkbox' | 'radio' | 'submit';

export interface ValidationRule {
  type?: 'email' | 'text' | 'custom';
  pattern?: string;
}

export interface FormField {
  id: string;
  type: FieldType;
  label: string;
  placeholder: string;
  required: boolean;
  defaultValue?: string;
  options?: string[];
  validation?: ValidationRule;
  name?: string;
}

export interface FormConfig {
  fields: FormField[];
  theme: 'light' | 'dark';
  primaryColor: string;
  secondaryColor: string;
}

interface FormContextType {
  form: FormConfig;
  selectedFieldId: string | null;
  setForm: (form: FormConfig) => void;
  setSelectedFieldId: (id: string | null) => void;
  addField: (field: FormField) => void;
  updateField: (id: string, updates: Partial<FormField>) => void;
  removeField: (id: string) => void;
  reorderFields: (fromIndex: number, toIndex: number) => void;
  setTheme: (theme: 'light' | 'dark') => void;
  setPrimaryColor: (color: string) => void;
  setSecondaryColor: (color: string) => void;
  resetForm: () => void;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

const DEFAULT_FORM: FormConfig = {
  fields: [
    {
      id: '1',
      type: 'text',
      label: 'Full Name',
      placeholder: 'Enter your full name',
      required: true,
      name: 'fullName',
    },
    {
      id: '2',
      type: 'email',
      label: 'Email Address',
      placeholder: 'Enter your email',
      required: true,
      name: 'email',
      validation: { type: 'email' },
    },
    {
      id: '3',
      type: 'textarea',
      label: 'Message',
      placeholder: 'Enter your message',
      required: true,
      name: 'message',
    },
    {
      id: '4',
      type: 'submit',
      label: 'Send Message',
      placeholder: '',
      required: false,
      name: 'submit',
    },
  ],
  theme: 'light',
  primaryColor: '#6366f1',
  secondaryColor: '#e0e7ff',
};

export function FormProvider({ children }: { children: React.ReactNode }) {
  const [form, setForm] = useState<FormConfig>(DEFAULT_FORM);
  const [selectedFieldId, setSelectedFieldId] = useState<string | null>(null);

  const addField = useCallback((field: FormField) => {
    setForm((prev) => ({
      ...prev,
      fields: [...prev.fields, field],
    }));
  }, []);

  const updateField = useCallback((id: string, updates: Partial<FormField>) => {
    setForm((prev) => ({
      ...prev,
      fields: prev.fields.map((f) => (f.id === id ? { ...f, ...updates } : f)),
    }));
  }, []);

  const removeField = useCallback((id: string) => {
    setForm((prev) => ({
      ...prev,
      fields: prev.fields.filter((f) => f.id !== id),
    }));
    setSelectedFieldId(null);
  }, []);

  const reorderFields = useCallback((fromIndex: number, toIndex: number) => {
    setForm((prev) => {
      const newFields = [...prev.fields];
      const [removed] = newFields.splice(fromIndex, 1);
      newFields.splice(toIndex, 0, removed);
      return { ...prev, fields: newFields };
    });
  }, []);

  const setTheme = useCallback((theme: 'light' | 'dark') => {
    setForm((prev) => ({ ...prev, theme }));
  }, []);

  const setPrimaryColor = useCallback((color: string) => {
    setForm((prev) => ({ ...prev, primaryColor: color }));
  }, []);

  const setSecondaryColor = useCallback((color: string) => {
    setForm((prev) => ({ ...prev, secondaryColor: color }));
  }, []);

  const resetForm = useCallback(() => {
    setForm(DEFAULT_FORM);
    setSelectedFieldId(null);
  }, []);

  return (
    <FormContext.Provider
      value={{
        form,
        selectedFieldId,
        setForm,
        setSelectedFieldId,
        addField,
        updateField,
        removeField,
        reorderFields,
        setTheme,
        setPrimaryColor,
        setSecondaryColor,
        resetForm,
      }}
    >
      {children}
    </FormContext.Provider>
  );
}

export function useFormBuilder() {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormBuilder must be used within FormProvider');
  }
  return context;
}
