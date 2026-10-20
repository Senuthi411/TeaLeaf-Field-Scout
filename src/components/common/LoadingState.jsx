import { LoaderCircle } from "lucide-react";
export default function LoadingState({ message = "Loading your workspace…" }) {
  return (
    <div className="app-loading" role="status">
      <LoaderCircle size={24} className="spin" aria-hidden="true" />
      <span>{message}</span>
    </div>
  );
}
