"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function NoteList() {
  const [notes, setNotes] = useState<any[]>([]);
  const [newNote, setNewNote] = useState({ title: "", content: "" });

  // Fetch notes
  const fetchNotes = async () => {
    const { data, error } = await supabase
      .from("notes")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) console.error(error);
    else setNotes(data || []);
  };

  useEffect(() => {
    fetchNotes();

    // Realtime listener
    const channel = supabase
      .channel("notes-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "notes" },
        () => fetchNotes()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Add new note
  const addNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.title.trim() || !newNote.content.trim()) return;

    const { error } = await supabase.from("notes").insert([
      {
        title: newNote.title,
        content: newNote.content,
      },
    ]);

    if (error) console.error(error);
    setNewNote({ title: "", content: "" });
  };

  // Delete note
  const deleteNote = async (id: number) => {
    const { error } = await supabase.from("notes").delete().eq("id", id);
    if (error) console.error(error);
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h3 className="text-xl font-semibold mb-4">Your Notes</h3>

      {/* Add Note Form */}
      <form onSubmit={addNote} className="flex flex-col space-y-2 mb-5">
        <input
          type="text"
          value={newNote.title}
          onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
          placeholder="Note title..."
          className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <textarea
          value={newNote.content}
          onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
          placeholder="Write your note..."
          className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 h-24"
        />
        <button
          type="submit"
          className="self-end px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Add Note
        </button>
      </form>

      {/* Notes List */}
      <div className="space-y-3">
        {notes.map((note) => (
          <div
            key={note.id}
            className="p-3 border rounded-lg bg-white shadow-sm"
          >
            <h4 className="font-semibold text-lg">{note.title}</h4>
            <p className="text-gray-700 whitespace-pre-wrap">{note.content}</p>
            <button
              onClick={() => deleteNote(note.id)}
              className="mt-2 text-sm text-red-600 hover:underline"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
