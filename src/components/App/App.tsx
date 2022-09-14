import { FC } from "react";
import List from "components/List/List";

import styles from "./styles.css";

const App: FC = () => (
  <main className={styles.root}>
    <List />
  </main>
);

export default App;
