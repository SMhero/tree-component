import { FC, useState } from "react";
import debounce from "lodash.debounce";

import Tree from "components/Tree/Tree";
import Input from "components/Input/Input";
import Select from "components/Select/Select";
import useTree from "hooks/useTree";

import styles from "./styles.css";

const DEBOUNCE_TIMEOUT = 600;

const App: FC = () => {
  const [id, setId] = useState<string>("");
  const [query, setQuery] = useState<string>("");
  const { tree, isLoading, isError, getIds } = useTree();

  const onInputChange = debounce(
    ({ target }: React.SyntheticEvent<HTMLInputElement>) => {
      const { value } = target as HTMLInputElement;

      setQuery(value);
    },
    DEBOUNCE_TIMEOUT,
  );

  const onSelectChange = ({
    target,
  }: React.SyntheticEvent<HTMLSelectElement>) => {
    setId((target as HTMLSelectElement).value);
  };

  if (isError) {
    return <span>Something went wrong...</span>;
  }

  return (
    <main className={styles.root}>
      <div className={styles.wrapper}>
        <div className={styles.fields}>
          <Input
            label="Search"
            onChange={onInputChange}
            placeholder="Type title"
          />
          <Select label="Id's" data={getIds()} onChange={onSelectChange} />
        </div>
        <Tree data={tree} id={id} isLoading={isLoading} query={query} />
      </div>
    </main>
  );
};

export default App;
