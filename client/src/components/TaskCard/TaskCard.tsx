import type { Task, TaskStatus } from '../../types';
import { useUpdateTask, useDeleteTask } from '../../hooks/useTasks';
import styles from './TaskCard.module.css';

interface Props {
  task: Task;
}

const TaskCard = ({ task }: Props) => {
  const { mutate: updateTask } = useUpdateTask();
  const { mutate: deleteTask, isPending: isDeleting } = useDeleteTask();

  const handleStatusChange = (status: TaskStatus) => {
    if (task.status !== status) {
      updateTask({ id: task.id, data: { status } });
    }
  };

  const statusConfig = {
    todo: { label: 'To Do', className: styles.statusTodo },
    in_progress: { label: 'In Progress', className: styles.statusInProgress },
    done: { label: 'Done', className: styles.statusDone },
  };

  return (
    <div className={`${styles.card} ${task.status === 'done' ? styles.isDone : ''}`}>
      <div className={styles.content}>
        <h3 className={styles.title}>{task.title}</h3>
        {task.description && <p className={styles.description}>{task.description}</p>}
        
        <div className={styles.actions}>
          <div className={styles.statusGroup}>
            {(['todo', 'in_progress', 'done'] as TaskStatus[]).map((status) => (
              <button
                key={status}
                onClick={() => handleStatusChange(status)}
                className={`${styles.statusBtn} ${task.status === status ? statusConfig[status].className : ''}`}
              >
                {statusConfig[status].label}
              </button>
            ))}
          </div>
          
          <button 
            onClick={() => deleteTask(task.id)} 
            disabled={isDeleting}
            className={styles.deleteBtn}
            title="Delete task"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 6h18"></path>
              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
