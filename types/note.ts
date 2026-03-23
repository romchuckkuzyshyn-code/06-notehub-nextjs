export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  tag: Tag;
}

export type Tag = 'Work' | 'Personal' | 'Meeting' | 'Shopping' | 'Todo';
