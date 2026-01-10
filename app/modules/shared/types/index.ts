import type { InferOutput } from 'valibot';
import type {
  BackgroundStyleSolidSchema,
  BackgroundStyleGradientSchema,
  BackgroundStyleSchema,
  BackgroundSchema,
  CanvasSchema,
  FrameSchema,
  ScreenshotSchema,
  SettingsSchema,
} from '../schemas';

export type BackgroundStyleSolid = InferOutput<typeof BackgroundStyleSolidSchema>;
export type BackgroundStyleGradient = InferOutput<typeof BackgroundStyleGradientSchema>;
export type BackgroundStyle = InferOutput<typeof BackgroundStyleSchema>;
export type BackgroundType = BackgroundStyle['type'];

export type BackgroundSettings = InferOutput<typeof BackgroundSchema>;
export type CanvasSettings = InferOutput<typeof CanvasSchema>;
export type FrameSettings = InferOutput<typeof FrameSchema>;
export type ScreenshotSettings = InferOutput<typeof ScreenshotSchema>;
export type Settings = InferOutput<typeof SettingsSchema>;
