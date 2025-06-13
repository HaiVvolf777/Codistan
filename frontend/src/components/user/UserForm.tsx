import { useUsers } from '../../context/UserContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

interface UserFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user?: any;
  isViewMode?: boolean;
}

const UserForm = ({ open, onOpenChange, user, isViewMode = false }: UserFormProps) => {
  const { createUser, updateUser } = useUsers();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        role: user.role,
      });
    } else {
      setFormData({
        name: '',
        email: '',
        role: '',
      });
    }
  }, [user]);

  const handleSubmit = async () => {
    try {
      if (user) {
        await updateUser({ id: user.id, ...formData });
        toast.success('User updated successfully');
      } else {
        await createUser(formData);
        toast.success('User created successfully');
      }
      onOpenChange(false);
    } catch (error) {
      toast.error(`Failed to ${user ? 'update' : 'create'} user`);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {isViewMode ? 'View User' : user ? 'Edit User' : 'Create User'}
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">Name</Label>
            {isViewMode ? (
              <div className="col-span-3 py-2 px-3 rounded-md border border-transparent bg-muted/50">
                {formData.name}
              </div>
            ) : (
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="col-span-3"
                disabled={isViewMode}
              />
            )}
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">Email</Label>
            {isViewMode ? (
              <div className="col-span-3 py-2 px-3 rounded-md border border-transparent bg-muted/50">
                {formData.email}
              </div>
            ) : (
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="col-span-3"
                disabled={isViewMode}
              />
            )}
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="role" className="text-right">Role</Label>
            {isViewMode ? (
              <div className="col-span-3 py-2 px-3 rounded-md border border-transparent bg-muted/50">
                {formData.role === 'ADMIN' ? 'Admin' : 'User'}
              </div>
            ) : (
              <Select
                value={formData.role}
                onValueChange={(value) => setFormData({ ...formData, role: value })}
                disabled={isViewMode}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ADMIN">Admin</SelectItem>
                  <SelectItem value="USER">User</SelectItem>
                </SelectContent>
              </Select>
            )}
          </div>
        </div>
        <div className="flex justify-end gap-2">
          {isViewMode ? (
            <Button onClick={() => onOpenChange(false)} className='text-black'>
              Close
            </Button>
          ) : (
            <>
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button onClick={handleSubmit} className='text-black'>
                {user ? 'Update User' : 'Create User'}
              </Button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserForm;


// Taiwlind + shadCn component 