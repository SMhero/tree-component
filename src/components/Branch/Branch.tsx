import Node from "components/Node/Node";
import { IdealizedTree } from "hooks/useTree";
import { FC, useState } from "react";

interface Props {
  data: IdealizedTree | undefined;
  level?: number;
}

const Branch: FC<Props> = ({ data, level = 0 }) => {
  const [isSelected, setIsSelected] = useState(data?.isSelected ?? false);
  const hasChildren = Boolean(data?.children && data?.children.length !== 0);

  const renderBranches = () => {
    if (hasChildren) {
      const newLevel = level + 1;

      return data?.children?.map(child => (
        <Branch
          key={child.id}
          data={{ ...child, isSelected }}
          level={newLevel}
        />
      ));
    }

    return null;
  };

  const onToggle = event => {
    event.stopPropagation();
    setIsSelected(prevValue => !prevValue);
  };

  return (
    <>
      <Node
        data={data}
        isSelected={isSelected}
        hasChildren={hasChildren}
        onToggle={onToggle}
      >
        {isSelected ? renderBranches() : null}
      </Node>
    </>
  );
};

export default Branch;
