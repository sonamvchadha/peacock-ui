import { useId, type InputHTMLAttributes } from 'react';
import styles from './Input.module.css';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Always visible. The placeholder is not a label. */
  label: string;
  /** Help text, or the error message when invalid is true. */
  hint?: string;
  invalid?: boolean;
}

/** A single-line text field with a visible label. */
export function Input({ label, hint, invalid = false, id, className, ...rest }: InputProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const hintId = hint ? `${inputId}-hint` : undefined;
  const classes = [styles.input, invalid && styles.input_invalid, className].filter(Boolean).join(' ');
  return (
    <div className={classes}>
      <label className={styles.input__label} htmlFor={inputId}>{label}</label>
      <input id={inputId} className={styles.input__field} aria-invalid={invalid || undefined} aria-describedby={hintId} {...rest} />
      {hint && <span id={hintId} className={styles.input__hint}>{hint}</span>}
    </div>
  );
}
