import { useSelector } from "react-redux";
import Link from "next/link";
import styles from "./statsbar.module.css";

interface Stats {
  stats: Stat[];
}

interface Stat {
  lessonId: number;
  score: number;
  outOf: number;
  userId: number;
}

function Statsbar() {
  const state = useSelector((state: any) => state.user);

  const stats: Stat[] = state.stats;

  const renderCurrentLesson = (stats: Stat[]) => {
    const highestLessonIdObject = stats.reduce(
      (maxObj: Stat, currentObj: Stat) => {
        if (currentObj.lessonId > maxObj.lessonId) {
          return currentObj;
        }
        return maxObj;
      }
    );
    return highestLessonIdObject;
  };

  const formatCurrentLesson = (stats: Stat[]) => {
    const stringId = renderCurrentLesson(stats).lessonId.toString();
    if (stringId[0] === "0") {
      return stringId[1];
    } else {
      return stringId[0];
    }
  };

  const renderPoints = (stats: Stat[]) => {
    const pointsEarned = stats.reduce((total: number, currentObj: Stat) => {
      return total + currentObj.score;
    }, 0);
    return pointsEarned;
  };

  const renderOutOfs = (stats: Stat[]) => {
    const pointsPossible = stats.reduce((total: number, currentObj: Stat) => {
      return total + currentObj.outOf;
    }, 0);
    return pointsPossible;
  };

  const getPct = () => {
    const pointsEarned = renderPoints(stats);
    const pointsPossible = renderOutOfs(stats);
    const pct = ((pointsEarned / pointsPossible) * 100).toFixed(1);
    return pct;
  };

  console.log(stats);

  return (
    <>
      {state?.user?.username && state.user && (
        <div className={styles.statsbar}>
          <div>
            <strong>{state.user.username}</strong>
          </div>
          <div>Unit: {formatCurrentLesson(stats)}/20</div>
          <div>
            Points: {renderPoints(stats)}/{renderOutOfs(stats)}
          </div>
          <div>{getPct()}%</div>
          <Link className={styles.link} href="/flashcards">
            Flashcards
          </Link>
        </div>
      )}
    </>
  );
}

export default Statsbar;
