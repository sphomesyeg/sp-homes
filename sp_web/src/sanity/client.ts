import { createClient } from "next-sanity";


export const client = createClient({
  projectId: "fixs5xtu",
  dataset: "production",
  apiVersion: "2023-01-01",
  useCdn: false,
});
