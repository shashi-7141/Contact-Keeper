'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';

export interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  category: string;
  tags: string[];
  notes: string;
  isFavorite: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface ContactContextType {
  contacts: Contact[];
  addContact: (contact: Omit<Contact, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateContact: (id: string, contact: Partial<Contact>) => void;
  deleteContact: (id: string) => void;
  toggleFavorite: (id: string) => void;
  searchContacts: (query: string) => Contact[];
  filterByCategory: (category: string) => Contact[];
  filterByTag: (tag: string) => Contact[];
  getCategories: () => string[];
  getAllTags: () => string[];
}

const ContactContext = createContext<ContactContextType | undefined>(undefined);

const INITIAL_CONTACTS: Contact[] = [
  {
    id: '1',
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah.johnson@example.com',
    phone: '+1 (555) 123-4567',
    category: 'Work',
    tags: ['developer', 'team-lead'],
    notes: 'Senior Developer at Tech Corp',
    isFavorite: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    firstName: 'Michael',
    lastName: 'Chen',
    email: 'michael.chen@example.com',
    phone: '+1 (555) 234-5678',
    category: 'Work',
    tags: ['designer', 'creative'],
    notes: 'UI/UX Designer',
    isFavorite: true,
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-20'),
  },
  {
    id: '3',
    firstName: 'Emily',
    lastName: 'Rodriguez',
    email: 'emily.r@example.com',
    phone: '+1 (555) 345-6789',
    category: 'Personal',
    tags: ['friend', 'yoga'],
    notes: 'College friend, fitness enthusiast',
    isFavorite: false,
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-02-01'),
  },
];

export function ContactProvider({ children }: { children: React.ReactNode }) {
  const [contacts, setContacts] = useState<Contact[]>(INITIAL_CONTACTS);

  const addContact = useCallback(
    (contact: Omit<Contact, 'id' | 'createdAt' | 'updatedAt'>) => {
      const newContact: Contact = {
        ...contact,
        id: Date.now().toString(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setContacts((prev) => [newContact, ...prev]);
    },
    []
  );

  const updateContact = useCallback((id: string, updates: Partial<Contact>) => {
    setContacts((prev) =>
      prev.map((contact) =>
        contact.id === id
          ? { ...contact, ...updates, updatedAt: new Date() }
          : contact
      )
    );
  }, []);

  const deleteContact = useCallback((id: string) => {
    setContacts((prev) => prev.filter((contact) => contact.id !== id));
  }, []);

  const toggleFavorite = useCallback((id: string) => {
    setContacts((prev) =>
      prev.map((contact) =>
        contact.id === id
          ? { ...contact, isFavorite: !contact.isFavorite }
          : contact
      )
    );
  }, []);

  const searchContacts = useCallback(
    (query: string): Contact[] => {
      const lowerQuery = query.toLowerCase();
      return contacts.filter(
        (contact) =>
          contact.firstName.toLowerCase().includes(lowerQuery) ||
          contact.lastName.toLowerCase().includes(lowerQuery) ||
          contact.email.toLowerCase().includes(lowerQuery) ||
          contact.phone.includes(query) ||
          contact.notes.toLowerCase().includes(lowerQuery)
      );
    },
    [contacts]
  );

  const filterByCategory = useCallback(
    (category: string): Contact[] => {
      return contacts.filter((contact) => contact.category === category);
    },
    [contacts]
  );

  const filterByTag = useCallback(
    (tag: string): Contact[] => {
      return contacts.filter((contact) => contact.tags.includes(tag));
    },
    [contacts]
  );

  const getCategories = useCallback((): string[] => {
    return Array.from(new Set(contacts.map((c) => c.category))).sort();
  }, [contacts]);

  const getAllTags = useCallback((): string[] => {
    const tags = new Set<string>();
    contacts.forEach((contact) => {
      contact.tags.forEach((tag) => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, [contacts]);

  const value: ContactContextType = {
    contacts,
    addContact,
    updateContact,
    deleteContact,
    toggleFavorite,
    searchContacts,
    filterByCategory,
    filterByTag,
    getCategories,
    getAllTags,
  };

  return (
    <ContactContext.Provider value={value}>{children}</ContactContext.Provider>
  );
}

export function useContacts() {
  const context = useContext(ContactContext);
  if (!context) {
    throw new Error('useContacts must be used within ContactProvider');
  }
  return context;
}
