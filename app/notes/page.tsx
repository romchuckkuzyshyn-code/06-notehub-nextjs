import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import { fetchNotes } from '@/lib/api';
import NotesClient from './Notes.client';

async function Page() {
  const page = 1;
  const perPage = 12;
  const value = '';

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['fetchNotes', page, perPage, value],
    queryFn: () => fetchNotes(page, perPage, value),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient />
    </HydrationBoundary>
  );
}

export default Page;
