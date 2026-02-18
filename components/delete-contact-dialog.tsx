'use client';

import { Contact, useContacts } from '@/lib/contact-context';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

interface DeleteContactDialogProps {
  contact: Contact;
  onClose: () => void;
}

export function DeleteContactDialog({
  contact,
  onClose,
}: DeleteContactDialogProps) {
  const { deleteContact } = useContacts();

  const handleDelete = () => {
    deleteContact(contact.id);
    onClose();
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            <DialogTitle>Delete Contact</DialogTitle>
          </div>
          <DialogDescription>
            Are you sure you want to delete {contact.firstName}{' '}
            {contact.lastName}? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <div className="flex gap-3">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            className="flex-1"
          >
            Delete Contact
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
