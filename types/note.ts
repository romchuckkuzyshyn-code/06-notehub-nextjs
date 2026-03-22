export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  tag: tags;
}

export type tags = 'Work' | 'Personal' | 'Meeting' | 'Shopping' | 'Todo';
