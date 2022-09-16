import { useCallback, useState, useEffect } from "react";

type RawTree = {
  entities: Record<
    string,
    {
      anchors?: string[];
      disqus_id: string;
      children: string[];
      id: string;
      level: number;
      parentId?: string;
      title: string;
      url: string;
    }
  >;
  topLevelIds: string[];
};

export type IdealizedTree = {
  anchors?: string[];
  disqus_id: string;
  children: IdealizedTree[];
  isSelected?: boolean;
  id: string;
  level: number;
  parentId?: string;
  title: string;
  url: string;
};

const useTree = () => {
  const [rawTree, setRawTree] = useState<RawTree>({
    entities: {},
    topLevelIds: [],
  });

  const getTree = useCallback(
    (pages?: string[]): IdealizedTree[] => {
      const newTree = pages || rawTree.topLevelIds || [];

      return newTree.map(name => {
        const { pages, ...rest } = rawTree.entities.pages[name];

        return {
          title: name,
          ...rest,
          children: pages ? getTree(pages) : [],
        };
      });
    },
    [rawTree.entities.pages, rawTree.topLevelIds],
  );

  const [idealizedTree, setIdealizedTree] = useState<IdealizedTree[]>([]);

  const [id, setId] = useState<string>("");

  const getTreeIds = () => {
    if (!idealizedTree.length) {
      return [];
    }

    const result = [];

    const flatten = (acc: string[], tree: IdealizedTree[]) => {
      tree.forEach(node => {
        acc.push(node.id);

        flatten(result, node.children || []);
      });
    };

    flatten(result, idealizedTree);

    return result;
  };

  useEffect(() => {
    setIdealizedTree(getTree());
  }, [getTree]);

  return {
    id,
    setId,
    idealizedTree,
    setRawTree,
    getTreeIds,
  };
};

export default useTree;
