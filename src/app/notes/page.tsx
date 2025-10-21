import ProtectedRoute from "@/components/ProtectedRoute";
import NoteList from "@/components/NoteList";

export default function NotesPage() {
  return (
    <ProtectedRoute>
      <div>
        <NoteList />
      </div>
    </ProtectedRoute>
  );
}
