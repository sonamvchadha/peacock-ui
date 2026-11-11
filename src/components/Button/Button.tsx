import type { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './Button.module.css';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** The visible label. Keep it to a verb and an object, like "Pay invoice". */
  children: ReactNode;
  /** Small buttons are for dense tables and toolbars. */
  size?: 'md' | 'sm';
}

/** The primary action on a page or panel. Use one per view. */
export function Button({ children, size = 'md', className, type = 'button', ...rest }: ButtonProps) {
  const classes = [styles.button, size === 'sm' && styles.button_size_sm, className].filter(Boolean).join(' ');
  return (
    <button type={type} className={classes} {...rest}>
      {children}
    </button>
  );
}
