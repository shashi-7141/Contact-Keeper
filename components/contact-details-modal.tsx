'use client';

import { Contact, useContacts } from '@/lib/contact-context';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Mail,
  Phone,
  Copy,
  Edit2,
  Trash2,
  Star,
  Calendar,
} from 'lucide-react';
import { useState } from 'react';
import { ContactFormDialog } from './contact-form-dialog';
import { DeleteContactDialog } from './delete-contact-dialog';

interface ContactDetailsModalProps {
  contact: Contact;
  onClose: () => void;
}

export function ContactDetailsModal({
  contact,
  onClose,
}: ContactDetailsModalProps) {
  const { toggleFavorite } = useContacts();
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [copiedField, setCopiedField] = useState<string>('');

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(''), 2000);
  };

  const handleFavoriteClick = () => {
    toggleFavorite(contact.id);
  };

  return (
    <>
      <Dialog open onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle>Contact Details</DialogTitle>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleFavoriteClick}
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
              </div>
            </div>
          </DialogHeader>

          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-2xl font-semibold text-primary">
                {contact.firstName[0]}
                {contact.lastName[0]}
              </div>
              <div>
                <h2 className="text-2xl font-bold">
                  {contact.firstName} {contact.lastName}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {contact.category}
                </p>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground mb-2">
                  Email
                </h3>
                <div className="flex items-center justify-between rounded-lg bg-card/50 p-3">
                  <a
                    href={`mailto:${contact.email}`}
                    className="text-foreground hover:text-primary transition-colors break-all"
                  >
                    {contact.email}
                  </a>
                  <button
                    onClick={() => handleCopy(contact.email, 'email')}
                    className="p-1.5 hover:bg-accent rounded-md transition-colors ml-2"
                  >
                    <Copy
                      className={`h-4 w-4 transition-colors ${
                        copiedField === 'email'
                          ? 'text-success'
                          : 'text-muted-foreground'
                      }`}
                    />
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-muted-foreground mb-2">
                  Phone
                </h3>
                <div className="flex items-center justify-between rounded-lg bg-card/50 p-3">
                  <a
                    href={`tel:${contact.phone}`}
                    className="text-foreground hover:text-primary transition-colors"
                  >
                    {contact.phone}
                  </a>
                  <button
                    onClick={() => handleCopy(contact.phone, 'phone')}
                    className="p-1.5 hover:bg-accent rounded-md transition-colors ml-2"
                  >
                    <Copy
                      className={`h-4 w-4 transition-colors ${
                        copiedField === 'phone'
                          ? 'text-success'
                          : 'text-muted-foreground'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            {contact.tags.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground mb-2">
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {contact.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {contact.notes && (
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground mb-2">
                  Notes
                </h3>
                <p className="text-sm leading-relaxed text-foreground bg-card/50 rounded-lg p-3">
                  {contact.notes}
                </p>
              </div>
            )}

            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-2">
                Added
              </h3>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>{contact.createdAt.toLocaleDateString()}</span>
              </div>
            </div>

            <Separator />

            <div className="flex gap-2">
              <Button
                onClick={() => setShowEditDialog(true)}
                className="flex-1"
                variant="default"
              >
                <Edit2 className="mr-2 h-4 w-4" />
                Edit Contact
              </Button>
              <Button
                onClick={() => setShowDeleteDialog(true)}
                variant="destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {showEditDialog && (
        <ContactFormDialog
          contact={contact}
          onClose={() => {
            setShowEditDialog(false);
            onClose();
          }}
        />
      )}

      {showDeleteDialog && (
        <DeleteContactDialog
          contact={contact}
          onClose={() => {
            setShowDeleteDialog(false);
            onClose();
          }}
        />
      )}
    </>
  );
}
