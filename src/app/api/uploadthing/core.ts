import { createUploadthing, type FileRouter } from "uploadthing/next";
const f = createUploadthing();

export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  productImage: f({ image: { maxFileSize: "16MB" } }).onUploadComplete(
    async ({ file }) => {
      console.log("file url", file.url);
    }
  )
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;