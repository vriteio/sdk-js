declare module "virtual:vrite" {
  // @ts-ignore
  export const client: import("@vrite/sdk/api").Client;
  export {
    APIError,
    BadRequestError,
    Client,
    ContentGroup,
    ContentPiece,
    Settings,
    Tag,
    UnauthorizedError,
    // @ts-ignore
  } from "@vrite/sdk/api";
  export function Content(props: {
    contentPieceId?: string;
    slug?: string;
  }): any;
  export function getStaticPaths(): Promise<
    Array<{
      params: { slug: string };
      // @ts-ignore
      props: import("@vrite/sdk/api").ContentPiece;
    }>
  >;
  export function getContentPieces(
    config?: {
      limit?: number | "all";
      startPage?: number;
      tagId?: string;
    }
    // @ts-ignore
  ): Promise<Array<import("@vrite/sdk/api").ContentPiece>>;
}
