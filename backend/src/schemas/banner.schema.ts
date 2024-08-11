import { z } from "zod";

export const bannerSchema = z.object({
  name: z.string(),
  link: z.string(),
  about: z.string(),
  timer: z.number(),
  image: z.string(),
  visible: z.boolean(),
});

export type BannerSchemaType = z.infer<typeof bannerSchema>;
