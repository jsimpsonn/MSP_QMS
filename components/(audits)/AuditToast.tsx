import { useToast } from '@/components/ui/use-toast'; // Ensure this is the correct path
import { ToastProvider, Toast } from '@/components/ui/toast';

export const showToast = (toast: any, message: string, type: 'success' | 'error' = 'success') => {
  toast({
    title: message,
    status: type,
    duration: 4000,
    isClosable: true,
  });
};

const ToastNotifications: React.FC = () => {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map((toast: any, index: number) => (
        <Toast key={index} {...toast} />
      ))}
    </ToastProvider>
  );
};

export default ToastNotifications;