import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getUsers, getUserLookupId } from '@/lib/services/sharepointClient';
import { getSession, signIn } from 'next-auth/react';

interface AuditFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  initialData?: any;
  columns: any[]; // Assuming columns data from SharePoint
}

const AuditFormDialog: React.FC<AuditFormDialogProps> = ({ isOpen, onClose, onSubmit, initialData, columns }) => {
  const [formData, setFormData] = useState(initialData || {
    Title: '',
    Internal_x0020_Audit_x0020_Type: '',
    Status: '',
    InternalAuditors: '',
    AuditDate: '',
    Shift: '',
    _x0023_Findings: 0,
    ProcessOwner: ''
  });
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        InternalAuditors: initialData.InternalAuditors ? initialData.InternalAuditors.results.map((user: any) => user.LookupId) : ''
      });
    }
  }, [initialData]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await getUsers();
        setUsers(usersData);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData: any) => ({ ...prevData, [name]: value }));
  };

  const handleSelectChange = (name: string, value: any) => {
    setFormData((prevData: any) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const session = await getSession();
      if (!session) {
        await signIn();
        return;
      }
      const accessToken = session.accessToken as string;

      // Ensure formData.InternalAuditors is a string representing the display name
      const displayName = typeof formData.InternalAuditors === 'object' ? formData.InternalAuditors.value : formData.InternalAuditors;

      const lookupId = await getUserLookupId(displayName, accessToken);

      const updatedFormData = { ...formData, InternalAuditors: { results: [{ LookupId: lookupId }] } };
      onSubmit(updatedFormData);
      onClose();
    } catch (error) {
      console.error('Error fetching user lookup ID:', error);
    }
  };
  const getColumnChoices = (columnName: string) => {
    const column = columns.find(col => col.name === columnName);
    return column ? column.choice?.choices || [] : [];
  };

  return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent>
          <DialogTitle>{initialData ? 'Update Audit' : 'Create Audit'}</DialogTitle>
          <DialogDescription>
            Fill in the details below.
          </DialogDescription>
          <form>
            <Input name="Title" placeholder="Title" value={formData.Title} onChange={handleChange} />
            <Select name="Internal_x0020_Audit_x0020_Type" value={formData.Internal_x0020_Audit_x0020_Type} onValueChange={(value) => handleSelectChange('Internal_x0020_Audit_x0020_Type', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Internal Audit Type" />
              </SelectTrigger>
              <SelectContent>
                {getColumnChoices('Internal_x0020_Audit_x0020_Type').map((choice: string) => (
                    <SelectItem key={choice} value={choice}>{choice}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select name="Status" value={formData.Status} onValueChange={(value) => handleSelectChange('Status', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                {getColumnChoices('Status').map((choice: string) => (
                    <SelectItem key={choice} value={choice}>{choice}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input name="AuditDate" placeholder="Audit Date" type="date" value={formData.AuditDate} onChange={handleChange} />
            <Select name="Shift" value={formData.Shift} onValueChange={(value) => handleSelectChange('Shift', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Shift" />
              </SelectTrigger>
              <SelectContent>
                {getColumnChoices('Shift').map((choice: string) => (
                    <SelectItem key={choice} value={choice}>{choice}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select name="InternalAuditors" value={formData.InternalAuditors} onValueChange={(value) => handleSelectChange('InternalAuditors', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Internal Auditors" />
              </SelectTrigger>
              <SelectContent>
                {users.map((user: any) => (
                    <SelectItem key={user.id} value={user.displayName}>{user.displayName}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input name="_x0023_Findings" placeholder="# Findings" type="number" value={formData._x0023_Findings} onChange={handleChange} />
            <Select name="ProcessOwner" value={formData.ProcessOwner} onValueChange={(value) => handleSelectChange('ProcessOwner', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Process Owner" />
              </SelectTrigger>
              <SelectContent>
                {getColumnChoices('ProcessOwner').map((choice: string) => (
                    <SelectItem key={choice} value={choice}>{choice}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </form>
          <DialogFooter>
            <Button onClick={handleSubmit}>{initialData ? 'Update' : 'Create'}</Button>
            <DialogClose asChild>
              <Button variant="outline" onClick={onClose}>Cancel</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
  );
};

export default AuditFormDialog;
