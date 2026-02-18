'use client';

import { useContacts } from '@/lib/contact-context';
import { ContactCard } from './contact-card';
import { Star } from 'lucide-react';

export function FavoritesSection() {
  const { contacts } = useContacts();

  const favoriteContacts = contacts.filter((c) => c.isFavorite);

  if (favoriteContacts.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
        <h2 className="text-lg font-semibold">Favorite Contacts</h2>
        <span className="text-sm text-muted-foreground">
          ({favoriteContacts.length})
        </span>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {favoriteContacts.map((contact) => (
          <ContactCard key={contact.id} contact={contact} layout="grid" />
        ))}
      </div>
    </div>
  );
}
