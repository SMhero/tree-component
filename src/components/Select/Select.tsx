import { FC, ChangeEvent } from "react";

import styles from "./styles.css";

interface Props {
  data: string[];
  label?: string;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

const Select: FC<Props> = ({ data, label, onChange }) => (
  <label className={styles.root}>
    {label && <span className={styles.label}>{label}</span>}
    <select className={styles.select} onChange={onChange}>
      <option value="">Not selected</option>
      {data.map(item => (
        <option key={item} value={item}>
          {item}
        </option>
      ))}
    </select>
  </label>
);

export default Select;
