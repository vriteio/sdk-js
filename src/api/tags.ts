import { PaginationParams, SendRequestFunction } from "./request";

interface Tag {
  /**
   * Tag value used to look for existing tags to update
   */
  value: string;
  /**
   * Label describing the tag
   */
  label: string;
  /**
   * HEX-encoded tag color
   */
  color: string;
  /**
   * Tag ID
   */
  id: string;
}

const createTagsEndpoints = (sendRequest: SendRequestFunction) => {
  return {
    get: (
      query: Pick<Tag, "id" | "value"> | Pick<Tag, "id"> | Pick<Tag, "value">
    ) => {
      return sendRequest<{ tag: Tag | null }>("GET", "/tags", {
        params: query,
      });
    },
    list: (query: PaginationParams & { color?: string }) => {
      return sendRequest<Tag[]>("GET", "/tags/list", {
        params: query,
      });
    },
    create: (input: Omit<Tag, "id" | "value">) => {
      return sendRequest<Pick<Tag, "id">>("PUT", "/tags", {
        body: input,
      });
    },
    update: (
      query: Pick<Tag, "id" | "value"> | Pick<Tag, "id"> | Pick<Tag, "value">,
      input: Omit<Tag, "id" | "value">
    ) => {
      return sendRequest<Pick<Tag, "id">>("PUT", "/tags", {
        body: { ...query, ...input },
      });
    },
    delete: (query: Pick<Tag, "id">) => {
      return sendRequest<Pick<Tag, "id"> | { id: null }>("DELETE", "/tags", {
        params: query,
      });
    },
  };
};

export { createTagsEndpoints };
export type { Tag };
