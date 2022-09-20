import { FC } from "react";
import Branch from "components/Branch/Branch";
import Node from "components/Node/Node";
import useTree, { ITree } from "hooks/useTree";

import styles from "./styles.css";

interface Props {
  data: ITree[];
  id?: string;
  isLoading?: boolean;
  query?: string;
  title?: string;
}

const Tree: FC<Props> = ({ data, id, isLoading, query, title }) => {
  const { getNodeById, getNodesByQuery } = useTree();

  const renderTree = () => {
    if (query) {
      const branchesWithQuery = getNodesByQuery(query);

      if (!branchesWithQuery?.length) {
        return <div className={styles.message}>Title not found...</div>;
      }

      return (
        <div className={styles.tree}>
          {branchesWithQuery.map(item => (
            <Branch key={item.id} data={item} level={item.level} />
          ))}
        </div>
      );
    }

    if (id) {
      const nodeWithId = getNodeById(id);

      if (!nodeWithId) {
        return <div className={styles.message}>Id not found...</div>;
      }

      return (
        <>
          {title && <h3 className={styles.title}>{title}</h3>}
          <div className={styles.tree}>
            <Node data={{ ...nodeWithId }} />
          </div>
        </>
      );
    }

    return (
      <>
        {title && <h3 className={styles.title}>{title}</h3>}
        <div className={styles.tree}>
          {data.map(item => (
            <Branch key={item.id} data={item} level={item.level} />
          ))}
        </div>
      </>
    );
  };

  return (
    <div>
      {isLoading ? (
        <div>
          <svg
            className={styles.preload}
            xmlns="http://www.w3.org/2000/svg"
            width="200"
            viewBox="0 0 224 97"
          >
            <g fill="#ebebeb" fillRule="evenodd">
              <path d="M23 28h201v13H23zM23 84h201v13H23zM23 56h178v13H23zM0 0h201v13H0z" />
            </g>
          </svg>
          <svg
            className={styles.preload}
            xmlns="http://www.w3.org/2000/svg"
            width="200"
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
