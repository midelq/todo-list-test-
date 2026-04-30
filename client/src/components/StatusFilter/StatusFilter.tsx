import type { TaskStatus } from '../../types';
import styles from './StatusFilter.module.css';

interface Props {
  currentStatus?: TaskStatus | '';
  onChange: (status: TaskStatus | '') => void;
}

const filters: { label: string; value: TaskStatus | '' }[] = [
  { label: 'All', value: '' },
  { label: 'To Do', value: 'todo' },
  { label: 'In Progress', value: 'in_progress' },
  { label: 'Done', value: 'done' },
];

const StatusFilter = ({ currentStatus, onChange }: Props) => {
  return (
    <div className={styles.container}>
      {filters.map((f) => (
        <button
          key={f.value}
          className={`${styles.filterBtn} ${currentStatus === f.value ? styles.active : ''}`}
          onClick={() => onChange(f.value)}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
};

export default StatusFilter;
