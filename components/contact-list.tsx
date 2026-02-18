'use client';

import { useContacts, Contact } from '@/lib/contact-context';
import { ContactCard } from './contact-card';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function ContactList() {
  const { contacts, searchContacts, filterByCategory, getCategories } =
    useContacts();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  let displayedContacts = contacts;

  if (searchQuery) {
    displayedContacts = searchContacts(searchQuery);
  } else if (selectedCategory !== 'all') {
    displayedContacts = filterByCategory(selectedCategory);
  }

  const categories = getCategories();

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, email, phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'grid'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground hover:bg-accent'
              }`}
            >
              Grid
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'list'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground hover:bg-accent'
              }`}
            >
              List
            </button>
          </div>
        </div>
      </div>

      {displayedContacts.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border bg-card/50 py-12">
          <p className="text-lg font-medium text-muted-foreground">
            No contacts found
          </p>
          <p className="text-sm text-muted-foreground">
            {searchQuery
              ? 'Try a different search term'
              : 'Add your first contact to get started'}
          </p>
        </div>
      ) : (
        <div
          className={
            viewMode === 'grid'
              ? 'grid gap-4 sm:grid-cols-2 lg:grid-cols-3'
              : 'space-y-3'
          }
        >
          {displayedContacts.map((contact) => (
            <ContactCard
              key={contact.id}
              contact={contact}
              layout={viewMode}
            />
          ))}
        </div>
      )}

      <div className="rounded-lg border border-border bg-card/50 p-4 text-center text-sm text-muted-foreground">
        Showing {displayedContacts.length} of {contacts.length} contacts
      </div>
    </div>
  );
}
