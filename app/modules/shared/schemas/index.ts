import * as v from 'valibot';
import { BackgroundSchema } from './background.schema';
import { ScreenshotSchema } from './screenshot.schema';
import { FrameSchema } from './frame.schema';
import { CanvasSchema } from './canvas.schema';

export * from './background.schema';
export * from './screenshot.schema';
export * from './frame.schema';
export * from './canvas.schema';

export const SettingsSchema = v.object({
  canvas: CanvasSchema,
  frame: FrameSchema,
  background: BackgroundSchema,
  screenshot: ScreenshotSchema,
});
