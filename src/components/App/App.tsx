import React, { ChangeEvent, FC } from "react";
import { useQuery } from "react-query";

import Tree from "components/Tree/Tree";
import Input from "components/Input/Input";
import Select from "components/Select/Select";
import useTree from "hooks/useTree";
import { loadTree } from "api/tree";

import styles from "./styles.css";

const App: FC = () => {
  const { idealizedTree, setRawTree, getTreeIds, id, setId } = useTree();

  const { isLoading, isError, error } = useQuery(["tree"], loadTree, {
    onSuccess: response => setRawTree(response),
    retry: false,
    refetchOnWindowFocus: false,
  });

  const onSelectChange = ({
    target,
  }: React.SyntheticEvent<HTMLSelectElement>) => {
    setId((target as HTMLSelectElement).value);
  };

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <main className={styles.root}>
      <div className={styles.wrapper}>
        <Tree data={idealizedTree} isLoading={isLoading} id={id} />
        <div>
          <Input label="Search" onChange={() => null} />
          <Select data={getTreeIds()} onChange={onSelectChange} />
        </div>
      </div>
    </main>
  );
};

export default App;
