import React, { FC } from "react";

interface Props {
  data: string[];
  onChange: (event: React.SyntheticEvent<HTMLSelectElement>) => void;
}

const Select: FC<Props> = ({ data, onChange }) => (
  <select style={{ width: "200px" }} onChange={onChange}>
    {data.map(item => (
      <option key={item} value={item}>
        {item}
      </option>
    ))}
  </select>
);

export default Select;
