import { useId } from 'react';
import { LabelUnit } from '../../label-unit';
import { TextArea } from '../text-area';
import type { TextAreaProps } from '../text-area';
import styles from './text-area-unit.module.css';

export interface TextAreaUnitProps extends TextAreaProps {
  /** ラベルテキスト */
  label: string;
  /** 補足テキスト */
  supportText?: string;
}

/**
 * LabelUnit + TextArea を組み合わせたフォームフィールドコンポーネントです。
 */
export const TextAreaUnit = ({
  label,
  supportText,
  id,
  ...textAreaProps
}: TextAreaUnitProps) => {
  const generatedId = useId();
  const textareaId = id ?? generatedId;

  return (
    <div className={styles.container}>
      <LabelUnit
        text={label}
        required={textAreaProps.required}
        supportText={supportText}
        htmlFor={textareaId}
        disabled={textAreaProps.disabled}
      />
      <TextArea id={textareaId} {...textAreaProps} />
    </div>
  );
};
