import { createClient } from "next-sanity";


export const client = createClient({
  projectId: "52bi5eh6",
  dataset: "production",
  apiVersion: "2023-01-01",
  useCdn: false,
});
