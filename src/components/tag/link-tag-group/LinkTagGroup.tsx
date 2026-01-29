import type { LinkTagProps } from '../link-tag';
import { LinkTag } from '../link-tag';
import styles from './link-tag-group.module.css';

export interface LinkTagGroupProps {
  /**
   * 表示するタグの配列
   */
  tags: Array<LinkTagProps>;
}

export const LinkTagGroup = ({ tags }: LinkTagGroupProps) => {
  return (
    <div className={styles.container}>
      {tags.map((tag, index) => (
        <LinkTag key={index} {...tag} />
      ))}
    </div>
  );
};
