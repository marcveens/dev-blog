import { breakpoints } from '@/styles/theme.css';
import * as styles from './container.css';

type ContainerProps = {
  children: React.ReactNode;
  maxWidth: keyof typeof breakpoints;
};

export const Container = (props: ContainerProps) => {
  const { children, maxWidth } = props;

  return <div className={`${styles.container} ${styles.containerMaxWidth[maxWidth]}`}>{children}</div>;
};
