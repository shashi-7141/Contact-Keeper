'use client';

import React from "react"

import { ContactProvider } from '@/lib/contact-context';
import { ThemeProvider } from '@/components/theme-provider';

export function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <ContactProvider>{children}</ContactProvider>
    </ThemeProvider>
  );
}
