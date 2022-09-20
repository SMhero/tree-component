import { useCallback, useState } from "react";
import { useQuery } from "react-query";
import { loadTree } from "api/tree";

export type IRawTree = {
  entities: {
    pages: Record<
      string,
      {
        anchors?: string[];
        disqus_id: string;
        id: string;
        level: number;
        pages?: string[];
        parentId?: string;
        tabIndex: number;
        title: string;
        url: string;
      }
    >;
    anchors: Record<
      string,
      {
        anchor?: string[];
        disqus_id: string;
        id: string;
        level: number;
        parentId?: string;
        title: string;
        url: string;
      }
    >;
  };
  topLevelIds: string[];
};

export type ITree = {
  anchors?: string[];
  children?: ITree[];
  disqus_id: string;
  id: string;
  isSelected?: boolean;
  level: number;
  pages?: string[];
  parentId?: string;
  tabIndex: number;
  title: string;
  url: string;
};

const useTree = (): {
  getIds: () => string[];
  getNodeById: (id: string) => ITree | undefined;
  getNodesByQuery: (query: string) => ITree[] | undefined;
  isError: boolean;
  isLoading: boolean;
  tree: ITree[];
} => {
  const [tree, setTree] = useState<ITree[]>([]);

  const onSuccess = (data: IRawTree) => {
    const getFormattedTree = (pages?: string[]) => {
      const newTree = pages || data.topLevelIds || [];

      return newTree.map(name => {
        const { pages, ...rest } = data.entities.pages[name];

        return {
          ...rest,
          children: pages ? getFormattedTree(pages) : [],
        };
      });
    };

    setTree(getFormattedTree());
  };

  const { isLoading, isError, data } = useQuery<IRawTree>(["tree"], loadTree, {
    onSuccess: response => onSuccess(response),
    retry: false,
    refetchOnWindowFocus: false,
  });

  const getTreeToFlat = useCallback((result: string[], tree: ITree[]) => {
    tree.forEach(node => {
      result.push(node.id);

      getTreeToFlat(result, node.children || []);
    });
  }, []);

  const getIds = useCallback((): string[] => {
    if (!tree.length) {
      return [];
    }

    const result: string[] = [];
    getTreeToFlat(result, tree);

    return result;
  }, [getTreeToFlat, tree]);

  const getNodeById = useCallback(
    (id: string): ITree | undefined => data?.entities.pages[id],
    [data?.entities.pages],
  );

  const getNodesByQuery = useCallback(
    (query: string): ITree[] | undefined => {
      const getNodes = (result: ITree[], node: ITree) => {
        const nodeTitle = node.title.toLowerCase();

        if (nodeTitle.includes(query.toLocaleLowerCase())) {
          result.push(node);
          return result;
        }

        if (Array.isArray(node.children)) {
          const children = node.children.reduce(getNodes, []);

          if (children.length) {
            result.push({ ...node, children });
          }
        }

        return result;
      };

      return tree.reduce(getNodes, []);
    },
    [tree],
  );

  return {
    getIds,
    getNodeById,
    getNodesByQuery,
    isError,
    isLoading,
    tree,
  };
};

export default useTree;
