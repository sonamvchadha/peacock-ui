import type { HTMLAttributes, ReactNode } from 'react';
import styles from './Tag.module.css';

export interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
}

/** A short status label, like "Due soon". Not interactive. */
export function Tag({ children, className, ...rest }: TagProps) {
  return (
    <span className={[styles.tag, className].filter(Boolean).join(' ')} {...rest}>
      {children}
    </span>
  );
}
