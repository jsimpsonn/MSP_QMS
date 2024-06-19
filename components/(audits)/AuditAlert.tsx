// components/(audits)/AuditAlert.tsx

import React from 'react';
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogAction, AlertDialogCancel } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';

interface AuditDeleteAlertProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  itemTitle: string;
}

const AuditDeleteAlert: React.FC<AuditDeleteAlertProps> = ({ isOpen, onClose, onConfirm, itemTitle }) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogTitle>Delete Audit</AlertDialogTitle>
        <AlertDialogDescription>
          Are you sure you want to delete the audit titled &quot;{itemTitle}&quot;? This action cannot be undone.
        </AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button variant="outline" onClick={onClose}>Cancel</Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button variant="destructive" onClick={onConfirm}>Delete</Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AuditDeleteAlert;
