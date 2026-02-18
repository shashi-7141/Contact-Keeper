'use client';

import { Contact, useContacts } from '@/lib/contact-context';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Mail,
  Phone,
  Star,
  MoreVertical,
  Edit2,
  Trash2,
  MessageSquare,
} from 'lucide-react';
import { useState } from 'react';
import { ContactFormDialog } from './contact-form-dialog';
import { DeleteContactDialog } from './delete-contact-dialog';
import { ContactDetailsModal } from './contact-details-modal';

interface ContactCardProps {
  contact: Contact;
  layout: 'grid' | 'list';
}

export function ContactCard({ contact, layout }: ContactCardProps) {
  const { toggleFavorite } = useContacts();
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  if (layout === 'list') {
    return (
      <>
        <div className="flex items-center justify-between rounded-lg border border-border bg-card p-4 transition-all hover:shadow-md">
          <div
            className="flex flex-1 cursor-pointer items-center gap-4"
            onClick={() => setShowDetailsModal(true)}
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-lg font-semibold text-primary">
              {contact.firstName[0]}
              {contact.lastName[0]}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-foreground">
                {contact.firstName} {contact.lastName}
              </h3>
              <p className="text-sm text-muted-foreground truncate">
                {contact.email}
              </p>
            </div>
          </div>

          <div className="ml-4 flex items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleFavorite(contact.id);
              }}
              className="p-2 hover:bg-accent rounded-md transition-colors"
            >
              <Star
                className={`h-5 w-5 transition-colors ${
                  contact.isFavorite
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-muted-foreground'
                }`}
              />
            </button>

            <DropdownMenu>
              <DropdownMenuTrigger
                onClick={(e) => e.stopPropagation()}
                className="p-2 hover:bg-accent rounded-md transition-colors"
              >
                <MoreVertical className="h-5 w-5 text-muted-foreground" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setShowDetailsModal(true)}>
                  <MessageSquare className="mr-2 h-4 w-4" />
                  View Details
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setShowEditDialog(true)}>
                  <Edit2 className="mr-2 h-4 w-4" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setShowDeleteDialog(true)}
                  className="text-destructive"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {showDetailsModal && (
          <ContactDetailsModal
            contact={contact}
            onClose={() => setShowDetailsModal(false)}
          />
        )}
        {showEditDialog && (
          <ContactFormDialog
            contact={contact}
            onClose={() => setShowEditDialog(false)}
          />
        )}
        {showDeleteDialog && (
          <DeleteContactDialog
            contact={contact}
            onClose={() => setShowDeleteDialog(false)}
          />
        )}
      </>
    );
  }

  return (
    <>
      <Card className="relative overflow-hidden transition-all hover:shadow-lg">
        <button
          onClick={() => toggleFavorite(contact.id)}
          className="absolute right-3 top-3 p-2 hover:bg-accent rounded-md transition-colors"
        >
          <Star
            className={`h-5 w-5 transition-colors ${
              contact.isFavorite
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-muted-foreground'
            }`}
          />
        </button>

        <CardHeader
          className="cursor-pointer pb-3"
          onClick={() => setShowDetailsModal(true)}
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
              {contact.firstName[0]}
              {contact.lastName[0]}
            </div>
            <div className="flex-1 min-w-0">
              <CardTitle className="truncate">
                {contact.firstName} {contact.lastName}
              </CardTitle>
              <CardDescription className="truncate">
                {contact.category}
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-3">
          <div className="space-y-2 text-sm">
            <a
              href={`mailto:${contact.email}`}
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <Mail className="h-4 w-4" />
              <span className="truncate">{contact.email}</span>
            </a>
            <a
              href={`tel:${contact.phone}`}
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <Phone className="h-4 w-4" />
              <span>{contact.phone}</span>
            </a>
          </div>

          {contact.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {contact.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          {contact.notes && (
            <p className="text-xs text-muted-foreground line-clamp-2">
              {contact.notes}
            </p>
          )}

          <div className="flex gap-2 pt-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowEditDialog(true);
              }}
              className="flex-1 px-3 py-2 rounded-md text-sm font-medium bg-secondary text-secondary-foreground hover:bg-accent transition-colors"
            >
              <Edit2 className="mr-1 inline h-4 w-4" />
              Edit
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowDeleteDialog(true);
              }}
              className="flex-1 px-3 py-2 rounded-md text-sm font-medium bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors"
            >
              <Trash2 className="mr-1 inline h-4 w-4" />
              Delete
            </button>
          </div>
        </CardContent>
      </Card>

      {showDetailsModal && (
        <ContactDetailsModal
          contact={contact}
          onClose={() => setShowDetailsModal(false)}
        />
      )}
      {showEditDialog && (
        <ContactFormDialog
          contact={contact}
          onClose={() => setShowEditDialog(false)}
        />
      )}
      {showDeleteDialog && (
        <DeleteContactDialog
          contact={contact}
          onClose={() => setShowDeleteDialog(false)}
        />
      )}
    </>
  );
}
