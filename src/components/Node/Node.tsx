import React, { FC } from "react";
import cn from "classnames";
import useTree, { IdealizedTree } from "hooks/useTree";

import styles from "./styles.css";

interface Props {
  children: React.ReactNode[] | null | undefined;
  data: IdealizedTree | undefined;
  hasChildren: boolean;
  isSelected: boolean;
  onToggle: (event: React.SyntheticEvent) => void;
}

const Node: FC<Props> = ({
  children,
  data,
  hasChildren,
  isSelected,
  onToggle,
}) => {
  const { id } = useTree();

  return (
    <div
      className={cn(styles.root, styles.level, {
        [styles.rootSelected]: isSelected,
        [styles.highlighted]: data?.id === id,
      })}
      onClick={onToggle}
    >
      <span className={styles.title}>{data?.title}</span>
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
      {hasChildren && <div>{children}</div>}
    </div>
  );
};

export default Node;
