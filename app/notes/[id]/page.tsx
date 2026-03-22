import { Note } from '@/types/note';
import css from '@/app/notes/[id]/NoteDetails.module.css';
import { QueryClient } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';

interface PageProps {
  params: Promise<{ id: string }>;
}

const NoteDetails = async ({ params }: PageProps) => {
  const { id } = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['fetchNoteById', id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note.title}</h2>
        </div>
        <p className={css.tag}>{note.tag}</p>
        <p className={css.content}>{note.content}</p>
        <p className={css.date}>{note.createdAt}</p>
      </div>
    </div>
  );
};

export default NoteDetails;
