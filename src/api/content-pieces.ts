import { PaginationParams, SendRequestFunction } from "./request";

type JSONContentAttrs = Record<string, string | number | boolean>;

interface JSONContent {
  type: string;
  content?: JSONContent[];
  text?: string;
  attrs?: JSONContentAttrs;
  marks?: Array<{ type: string; attrs: JSONContentAttrs }>;
}
interface ContentPiece<
  CustomData extends Record<string, any> = Record<string, any>,
  ContentType extends "json" | "html" | undefined = undefined
> {
  /**
   * ISO date
   */
  date?: string;
  /**
   * Title
   */
  title: string;
  /**
   * Slug generated from the title
   */
  slug: string;
  /**
   * HTML-formatted description
   */
  description?: string;
  /**
   * Array of tag IDs to set
   */
  tags: string[];
  /**
   * URL of the cover image
   */
  coverUrl: string;
  /**
   * Alt description of the cover image
   */
  coverAlt: string;
  /**
   * ID of the content group to assign the piece to
   */
  contentGroupId: string;
  /**
   * Cover image width (only meant for resizing image inside Vrite editor)
   */
  coverWidth: string;
  /**
   * JSON object containing custom metadata
   */
  customData: CustomData;
  /**
   * JSON or HTML-formatted content
   */
  content: ContentType extends undefined
    ? undefined
    : ContentType extends "json"
    ? JSONContent
    : string;
  /**
   * Content piece ID
   */
  id: string;
}

const createContentPiecesEndpoints = (sendRequest: SendRequestFunction) => {
  return {
    get: <
      CustomData extends Record<string, any> = Record<string, any>,
      ContentType extends "html" | "json" | undefined = undefined
    >(
      query: Pick<ContentPiece, "id"> & { content?: ContentType }
    ) => {
      return sendRequest<{
        contentPiece: ContentPiece<CustomData, ContentType>;
      }>("GET", "/content-pieces", { params: query });
    },
    list: <CustomData extends Record<string, any> = Record<string, any>>(
      query: PaginationParams & {
        contentGroupId?: string;
        tagId?: string;
        slug?: string;
      }
    ) => {
      return sendRequest<Array<ContentPiece<CustomData>>>(
        "GET",
        "/content-pieces/list",
        { params: query }
      );
    },
    create: <CustomData extends Record<string, any> = Record<string, any>>(
      input: Omit<Partial<ContentPiece<CustomData>>, "id"> &
        Pick<ContentPiece<CustomData>, "contentGroupId">
    ) => {
      return sendRequest<Pick<ContentPiece, "id">>("PUT", "/content-pieces", {
        body: input,
      });
    },
    update: <CustomData extends Record<string, any> = Record<string, any>>(
      query: Pick<ContentPiece, "id">,
      input: Omit<ContentPiece<CustomData>, "id">
    ) => {
      return sendRequest<Pick<ContentPiece, "id">>("PUT", "/content-pieces", {
        body: { ...query, input },
      });
    },
    delete: (query: Pick<ContentPiece, "id">) => {
      return sendRequest<Pick<ContentPiece, "id"> | { id: null }>(
        "DELETE",
        "/content-pieces",
        {
          params: query,
        }
      );
    },
  };
};

export { createContentPiecesEndpoints };
export type { ContentPiece, JSONContent, JSONContentAttrs };
