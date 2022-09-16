import { FC, useCallback } from "react";
import Branch from "components/Branch/Branch";
import { IdealizedTree } from "hooks/useTree";

import styles from "./styles.css";

interface Props {
  id?: string;
  data: IdealizedTree[];
  isLoading?: boolean;
  title?: string;
}

const Tree: FC<Props> = ({ data, id, isLoading, title }) => {
  const searchById = useCallback(
    (node: IdealizedTree, search: string): IdealizedTree | undefined | null => {
      if (node.id === search) {
        return node;
      }

      if (node?.children?.length) {
        return node.children.find(node => searchById(node, search));
      }

      return null;
    },
    [],
  );

  const renderTree = useCallback(() => {
    if (id) {
      const treeWithId: IdealizedTree | undefined = data.find(node =>
        searchById(node, id),
      );

      return (
        <>
          {title && <h3 className={styles.title}>{title}</h3>}
          {treeWithId && (
            <div className={styles.tree}>
              <Branch data={{ ...treeWithId, isSelected: true }} />
            </div>
          )}
        </>
      );
    }

    return (
      <>
        {title && <h3 className={styles.title}>{title}</h3>}
        <div className={styles.tree}>
          {data.map(item => (
            <Branch key={item.id} data={item} level={0} />
          ))}
        </div>
      </>
    );
  }, [data, id, searchById, title]);

  return (
    <div className={styles.root}>
      {isLoading ? (
        <div>
          <svg
            className={styles.preload}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 224 97"
          >
            <g fill="#ebebeb" fillRule="evenodd">
              <path d="M23 28h201v13H23zM23 84h201v13H23zM23 56h178v13H23zM0 0h201v13H0z" />
            </g>
          </svg>
          <svg
            className={styles.preload}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 224 97"
          >
            <g fill="#ebebeb" fillRule="evenodd">
              <path d="M23 28h201v13H23zM23 84h201v13H23zM23 56h178v13H23zM0 0h201v13H0z" />
            </g>
          </svg>
        </div>
      ) : (
        <>{renderTree()}</>
      )}
    </div>
  );
};

export default Tree;
