import React from 'react';
import { Button } from '@base-ui/react';

import './BaseUIExample.css';

export interface BaseUIExampleProps {
  /** Button label */
  label?: string;
  /** Optional click handler */
  onClick?: () => void;
}

/**
 * Base UIを使用したサンプルコンポーネント
 * Base UIのButtonコンポーネントを使用しています
 */
export const BaseUIExample = ({
  label = 'Base UIボタン',
  onClick,
}: BaseUIExampleProps) => {
  return (
    <div className="base-ui-example">
      <Button className="base-ui-example-button" onClick={onClick}>
        {label}
      </Button>
    </div>
  );
};
