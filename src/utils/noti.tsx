import { toast } from "react-toastify";
export default function noti({ type, message }) {
  toast[type] || toast.info;
  message;
}
