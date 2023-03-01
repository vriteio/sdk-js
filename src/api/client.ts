import "isomorphic-unfetch";
import { createContentGroupsEndpoints } from "./content-groups";
import { createContentPiecesEndpoints } from "./content-pieces";
import { createSendRequestFunction } from "./request";
import { createSettingsEndpoints } from "./settings";
import { createTagsEndpoints } from "./tags";

interface ClientConfig {
  token: string;
}

const createClient = (config: ClientConfig) => {
  const baseURL = "https://api.vrite.io";
  const sendRequest = createSendRequestFunction(baseURL, config.token);

  return {
    contentGroups: createContentGroupsEndpoints(sendRequest),
    contentPieces: createContentPiecesEndpoints(sendRequest),
    tags: createTagsEndpoints(sendRequest),
    settings: createSettingsEndpoints(sendRequest),
  };
};

export { createClient };
