import { createClient } from "@sanity/client/stega";

const client = createClient({
  projectId: process.env.SANITY_STUDIO_PROJECT_ID,
  dataset: "production",
  useCdn: true,
  apiVersion: "2023-03-20",
});

export default client;