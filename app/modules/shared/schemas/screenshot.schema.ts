import * as v from 'valibot';

export const ScreenshotSchema = v.object({
  scale: v.number(),
  roundness: v.number(),
  rotation: v.number(),
  perspective: v.object({
    x: v.number(),
    y: v.number(),
  }),
  offset: v.object({
    x: v.number(),
    y: v.number(),
  }),
  boxShadow: v.string(),
});
