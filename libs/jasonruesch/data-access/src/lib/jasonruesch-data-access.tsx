import styles from './jasonruesch-data-access.module.css';

/* eslint-disable-next-line */
export interface JasonrueschDataAccessProps {}

export function JasonrueschDataAccess(props: JasonrueschDataAccessProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to JasonrueschDataAccess!</h1>
    </div>
  );
}

export default JasonrueschDataAccess;
