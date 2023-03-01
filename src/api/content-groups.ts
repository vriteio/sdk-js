import { SendRequestFunction } from "./request";

interface ContentGroup {
  /**
   * Content group name
   */
  name: string;
  /**
   * Content group ID
   */
  id: string;
}

const createContentGroupsEndpoints = (sendRequest: SendRequestFunction) => {
  return {
    list: () => {
      return sendRequest<ContentGroup[]>("GET", "/content-groups/list");
    },
    create: (input: Omit<ContentGroup, "id">) => {
      return sendRequest<Pick<ContentGroup, "id">>("PUT", "/content-groups", {
        body: input,
      });
    },
    update: (
      query: Pick<ContentGroup, "id">,
      input: Omit<ContentGroup, "id">
    ) => {
      return sendRequest<Pick<ContentGroup, "id">>("PUT", "/content-groups", {
        body: { ...query, ...input },
      });
    },
    delete: (query: Pick<ContentGroup, "id">) => {
      return sendRequest<Pick<ContentGroup, "id"> | { id: null }>(
        "DELETE",
        "/content-groups",
        {
          params: query,
        }
      );
    },
  };
};

export { createContentGroupsEndpoints };
export type { ContentGroup };
