import { createClient, type ClientConfig } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

const config: ClientConfig = {
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  useCdn: false, // set to `true` to fetch from edge cache (동적 데이터라 캐싱안함)
  apiVersion: '2023-04-21', // use current date (YYYY-MM-DD) to target the latest API version
  token: process.env.SANITY_SECRET_TOKEN, // 데이터수정할거면 토큰 필요
};
export const client = createClient(config);

const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.image(source).width(800).url();
}
// myProjectId.api.sanity.io/v2021-06-07/assets/images/myDataset
export const assetsURL = `https://${process.env.SANITY_PROJECT_ID}.api.sanity.io/v2021-06-07/assets/images/${process.env.SANITY_DATASET}`