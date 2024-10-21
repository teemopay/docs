import { z, defineCollection } from 'astro:content';

const docs = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // slug: z.string().optional(),
    sections: z.enum(['概述', '代收', '代付', '查询', '其他']).default('其他'),
    lang: z.enum(['en', 'zh']).default('zh'),
  }),
});

export const collections = {
  docs,
};