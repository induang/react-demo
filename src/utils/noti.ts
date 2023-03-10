import { toast } from 'react-toastify'
export default function noti({ type, message }) {
  const t = (toast[type] || toast.info).bind(toast)
  t(message)
}
