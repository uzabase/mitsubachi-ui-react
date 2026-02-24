import styles from './label-unit.module.css';

export interface LabelUnitProps {
  /** ラベルテキスト */
  text: string;
  /** 必須表示 */
  required?: boolean;
  /** 補足テキスト */
  supportText?: string;
  /** htmlFor（対応する入力要素のid） */
  htmlFor?: string;
  /** 無効化状態 */
  disabled?: boolean;
}

/**
 * フォーム用コンポーネントが「何を入力・選択するためのものか」を
 * 明確に伝えるためのラベルコンポーネントです。
 */
export const LabelUnit = ({
  text,
  required = false,
  supportText,
  htmlFor,
  disabled = false,
}: LabelUnitProps) => {
  const containerClassName = [styles.container, disabled && styles.disabled]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={containerClassName}>
      <div className={styles.labelRow}>
        <label className={styles.label} htmlFor={htmlFor}>
          {text}
        </label>
        {required && <span className={styles.required}>必須</span>}
      </div>
      {supportText && <p className={styles.supportText}>{supportText}</p>}
    </div>
  );
};
