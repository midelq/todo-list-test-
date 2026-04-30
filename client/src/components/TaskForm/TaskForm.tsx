import { useState } from 'react';
import type { FormEvent } from 'react';
import { useCreateTask } from '../../hooks/useTasks';
import styles from './TaskForm.module.css';

const TaskForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { mutate: createTask, isPending } = useCreateTask();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    createTask(
      { title, description },
      {
        onSuccess: () => {
          setTitle('');
          setDescription('');
        },
      }
    );
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.inputGroup}>
        <input
          type="text"
          placeholder="add your task"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={styles.titleInput}
          maxLength={255}
          required
        />
        <input
          type="text"
          placeholder="Add a description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={styles.descInput}
        />
      </div>
      <button type="submit" disabled={isPending || !title.trim()} className={styles.submitBtn}>
        {isPending ? 'Adding...' : 'Add Task'}
      </button>
    </form>
  );
};

export default TaskForm;
