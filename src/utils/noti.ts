import { toast } from 'react-toastify'
interface INotiProps {
  type: 'error' | 'warning' | 'success';
  message: string;
}
export default function noti({ type, message }: INotiProps) {
  const t = (toast[type] || toast.info).bind(toast)
  t(message)
}
