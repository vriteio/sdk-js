import { client } from "virtual:vrite";
import type { ContentPiece, Client } from "../api";

const getContentPieces = async (
  contentGroupId: string,
  config?: {
    limit?: number | "all";
    startPage?: number;
    tagId?: string;
  }
) => {
  const contentPieces: ContentPiece[] = [];

  let page = config?.startPage || 1;

  const fetchPage = async () => {
    const paginatedContentPieces = await (client as Client).contentPieces.list({
      contentGroupId,
      page,
      perPage: config?.limit === "all" ? 50 : config?.limit || 50,
      tagId: config?.tagId,
    });

    contentPieces.push(...paginatedContentPieces);

    if (config?.limit === "all" && paginatedContentPieces.length === 50) {
      page += 1;
      await fetchPage();
    }
  };

  await fetchPage();

  return contentPieces;
};
const getStaticPaths = async (contentGroupId: string) => {
  const contentPieces = await getContentPieces(contentGroupId, {
    limit: "all",
  });

  return contentPieces.map((contentPiece) => {
    return {
      params: {
        slug: contentPiece.slug,
      },
      props: contentPiece,
    };
  });
};

export { getStaticPaths, getContentPieces };
