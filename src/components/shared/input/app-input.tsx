import styles from "./app-input.module.css";

export interface AppInputProps {
  type?: string;
  placeholder?: string;
  value: string | number;
  name: string;
  isRequired?: boolean;
  onInput: (event: React.FormEvent<HTMLInputElement>) => void;
  onBlur?: () => Promise<void>;
}

export default function AppInput({
  type,
  placeholder,
  value,
  name,
  isRequired,
  onInput,
  onBlur,
}: AppInputProps) {
  return (
    <input
      className={styles.input}
      type={type ?? "text"}
      placeholder={placeholder}
      value={value ?? ""}
      name={name}
      onInput={onInput}
      onBlur={onBlur}
      required={isRequired ?? false}
    />
  );
}
