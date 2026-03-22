import { ErrorMessage, Field, Form, Formik, type FormikHelpers } from 'formik';
import css from './NoteForm.module.css';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import * as Yup from 'yup';
import { createNote } from '@/lib/api';

const scheme = Yup.object().shape({
  title: Yup.string().min(3).max(50).required(),
  content: Yup.string().max(500),
  tag: Yup.mixed<Tag>()
    .oneOf(['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'])
    .required(),
});

interface NoteFormProps {
  closeModal: () => void;
}

export type Tag = 'Todo' | 'Work' | 'Personal' | 'Meeting' | 'Shopping';

export interface NotesFormValues {
  title: string;
  content: string;
  tag: Tag;
}

const initialValues: NotesFormValues = {
  title: '',
  content: '',
  tag: 'Todo',
};

const NoteForm = ({ closeModal }: NoteFormProps) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fetchNotes'] });
    },
  });
  const handleSubmit = (
    values: NotesFormValues,
    actions: FormikHelpers<NotesFormValues>
  ) => {
    mutate(values, {
      onSuccess: () => {
        actions.resetForm();
        closeModal();
      },
    });
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={scheme}
    >
      {({ isSubmitting }) => {
        return (
          <Form className={css.form}>
            <div className={css.formGroup}>
              <label htmlFor="title">Title</label>
              <Field
                id="title"
                type="text"
                name="title"
                className={css.input}
              />
              <ErrorMessage
                name="title"
                component="span"
                className={css.error}
              />
            </div>

            <div className={css.formGroup}>
              <label htmlFor="content">Content</label>
              <Field
                as="textarea"
                id="content"
                name="content"
                rows={8}
                className={css.textarea}
              />
              <ErrorMessage
                name="content"
                component="span"
                className={css.error}
              />
            </div>

            <div className={css.formGroup}>
              <label htmlFor="tag">Tag</label>
              <Field id="tag" name="tag" className={css.select} as="select">
                <option value="Todo">Todo</option>
                <option value="Work">Work</option>
                <option value="Personal">Personal</option>
                <option value="Meeting">Meeting</option>
                <option value="Shopping">Shopping</option>
              </Field>
              <ErrorMessage name="tag" component="span" className={css.error} />
            </div>

            <div className={css.actions}>
              <button
                type="button"
                className={css.cancelButton}
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                type="submit"
                className={css.submitButton}
                disabled={isSubmitting}
              >
                Create note
              </button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default NoteForm;
