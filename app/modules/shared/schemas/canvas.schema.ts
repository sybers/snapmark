import * as v from 'valibot';

export const CanvasSchema = v.object({
  canvasWidth: v.number(),
  canvasHeight: v.number(),
});
