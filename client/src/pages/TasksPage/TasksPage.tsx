import { useState } from 'react';
import { useTasks } from '../../hooks/useTasks';
import type { TaskStatus } from '../../types';
import TaskForm from '../../components/TaskForm/TaskForm';
import TaskCard from '../../components/TaskCard/TaskCard';
import StatusFilter from '../../components/StatusFilter/StatusFilter';
import styles from './TasksPage.module.css';

const TasksPage = () => {
  const [filter, setFilter] = useState<TaskStatus | ''>('');
  
  const { data: tasks, isLoading, isError } = useTasks(filter || undefined);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Your Tasks</h1>
        <p className={styles.subtitle}>Organize your day with task</p>
      </header>

      <div className={styles.formSection}>
        <TaskForm />
      </div>

      <div className={styles.filterSection}>
        <StatusFilter currentStatus={filter} onChange={setFilter} />
      </div>

      <div className={styles.tasksSection}>
        {isLoading && <div className={styles.stateMessage}>Loading your tasks...</div>}
        {isError && <div className={styles.stateMessage}>Failed to load tasks.</div>}
        
        {!isLoading && !isError && tasks?.length === 0 && (
          <div className={styles.emptyState}>
            <div className={styles.emptyIllustration}></div>
            <p>No tasks found. Time to chill, or add a new one.</p>
          </div>
        )}

        <div className={styles.grid}>
          {tasks?.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TasksPage;
