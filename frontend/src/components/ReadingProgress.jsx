import { useScrollProgress } from '../hooks/useScrollProgress';
import '../styles/ReadingProgress.css';

const ReadingProgress = () => {
  const progress = useScrollProgress();

  return (
    <div
      className="reading-progress"
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Progreso de lectura de la página"
    >
      <div className="reading-progress-bar" style={{ width: `${progress}%` }} />
    </div>
  );
};

export default ReadingProgress;
