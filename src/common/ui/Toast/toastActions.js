import { toast } from 'react-toastify';

export default {
  success: (message) => toast.success(message),
  error: (info) => {
    let message = info;
    if (info instanceof Error) {
      message = info.message;
    }
    toast.error(message);
  },
};
