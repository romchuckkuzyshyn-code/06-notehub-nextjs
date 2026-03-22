import axios from 'axios';

import type { NotesFormValues } from '../components/NoteForm/NoteForm';
import { Note } from '@/types/note';

interface NotesResponse {
  notes: Note[];
  totalPages: number;
}
const baseUrl = 'https://notehub-public.goit.study/api';
const endPoint = '/notes';
const url = baseUrl + endPoint;

export const fetchNotes = async (
  page: number,
  perPage: number,
  search?: string
) => {
  const options = {
    params: { page, perPage, search },
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
    },
  };

  const res = await axios.get<NotesResponse>(url, options);
  return res.data;
};

export const deleteNote = async (id: Note['id']) => {
  const options = {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
    },
  };
  const res = await axios.delete<Note>(`${url}/${id}`, options);
  return res.data;
};

export const createNote = async (values: NotesFormValues) => {
  const options = {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
    },
  };
  const res = await axios.post<Note>(url, values, options);
  return res.data;
};

export const fetchNoteById = async (id: Note['id']) => {
  const options = {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
    },
  };
  const res = await axios.get<Note>(`${url} + ${id}`, options);
  return res.data;
};
