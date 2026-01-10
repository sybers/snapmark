import * as v from 'valibot';

export const BackgroundStyleSolidSchema = v.object({
  type: v.literal('solid'),
  color: v.string(),
});

export const BackgroundStyleGradientSchema = v.object({
  type: v.literal('gradient'),
  rotation: v.number(),
  stops: v.array(
    v.object({
      color: v.string(),
      position: v.string(),
    }),
  ),
});

export const BackgroundStyleSchema = v.union([
  BackgroundStyleSolidSchema,
  BackgroundStyleGradientSchema,
]);

export const BackgroundSchema = v.object({
  backgroundStyle: BackgroundStyleSchema,
  opacity: v.number(),
  roundness: v.number(),
  noise: v.boolean(),
});
