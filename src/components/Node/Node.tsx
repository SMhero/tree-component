import { FC } from "react";
import cn from "classnames";
import { ITree } from "hooks/useTree";

import styles from "./styles.css";

interface Props {
  data: ITree;
  hasChildren?: boolean;
  isSelected?: boolean;
  onToggle?: (event: React.SyntheticEvent) => void;
}

const rootLevelStyles = {
  0: styles.levelZero,
  1: styles.levelFirst,
  2: styles.levelSecond,
  3: styles.levelThird,
  4: styles.levelFourth,
  5: styles.rootSelected,
};

const Node: FC<Props> = ({ data, hasChildren, isSelected, onToggle }) => (
  <div
    className={cn(styles.root, data?.level && rootLevelStyles[data?.level], {
      [styles.rootSelected]: isSelected,
    })}
    onClick={onToggle}
  >
    {hasChildren && (
      <button className={styles.button}>
        <svg
          className={cn(styles.icon, {
            [styles.iconSelected]: isSelected,
          })}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 8 5"
          height="12"
          width="12"
        >
          <path
            fill="#000000"
            fillRule="evenodd"
            d="M7.797 3.898a.27.27 0 0 1-.078.18l-.39.39a.254.254 0 0 1-.18.079.27.27 0 0 1-.18-.078l-3.07-3.07-3.07 3.07a.27.27 0 0 1-.18.078.27.27 0 0 1-.18-.078l-.39-.39A.27.27 0 0 1 0 3.898a.27.27 0 0 1 .078-.18l3.64-3.64A.27.27 0 0 1 3.899 0a.27.27 0 0 1 .18.078l3.64 3.64a.27.27 0 0 1 .079.18Z"
          />
        </svg>
      </button>
    )}
    <span className={styles.title}>{data.title}</span>
  </div>
);

export default Node;
