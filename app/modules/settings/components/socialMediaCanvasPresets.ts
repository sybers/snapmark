export interface CanvasPreset {
  id: string;
  labelKey: string;
  width: number;
  height: number;
}

export interface SocialPlatform {
  id: string;
  labelKey: string;
  icon: string;
  presets: CanvasPreset[];
}

export const socialMediaCanvasPresets: SocialPlatform[] = [
  {
    id: 'instagram',
    labelKey: 'canvas.socialPresets.platforms.instagram',
    icon: 'i-simple-icons-instagram',
    presets: [
      { id: 'ig-square', labelKey: 'canvas.socialPresets.kinds.post-square', width: 1080, height: 1080 },
      { id: 'ig-vertical', labelKey: 'canvas.socialPresets.kinds.post-vertical', width: 1080, height: 1350 },
      { id: 'ig-landscape', labelKey: 'canvas.socialPresets.kinds.post-landscape', width: 1080, height: 566 },
      { id: 'ig-story', labelKey: 'canvas.socialPresets.kinds.story', width: 1080, height: 1920 },
      { id: 'ig-profile', labelKey: 'canvas.socialPresets.kinds.profile', width: 320, height: 320 },
    ],
  },
  {
    id: 'linkedin',
    labelKey: 'canvas.socialPresets.platforms.linkedin',
    icon: 'i-simple-icons-linkedin',
    presets: [
      { id: 'li-landscape', labelKey: 'canvas.socialPresets.kinds.post-landscape', width: 1200, height: 627 },
      { id: 'li-square', labelKey: 'canvas.socialPresets.kinds.post-square', width: 1200, height: 1200 },
      { id: 'li-vertical', labelKey: 'canvas.socialPresets.kinds.post-vertical', width: 720, height: 900 },
      { id: 'li-cover-company', labelKey: 'canvas.socialPresets.kinds.cover-company', width: 1128, height: 191 },
      { id: 'li-cover-personal', labelKey: 'canvas.socialPresets.kinds.cover-personal', width: 1584, height: 396 },
    ],
  },
  {
    id: 'x',
    labelKey: 'canvas.socialPresets.platforms.x',
    icon: 'i-simple-icons-x',
    presets: [
      { id: 'x-landscape', labelKey: 'canvas.socialPresets.kinds.post-landscape', width: 1280, height: 720 },
      { id: 'x-square', labelKey: 'canvas.socialPresets.kinds.post-square', width: 720, height: 720 },
      { id: 'x-vertical', labelKey: 'canvas.socialPresets.kinds.post-vertical', width: 720, height: 1280 },
      { id: 'x-header', labelKey: 'canvas.socialPresets.kinds.header', width: 1500, height: 500 },
      { id: 'x-profile', labelKey: 'canvas.socialPresets.kinds.profile', width: 400, height: 400 },
    ],
  },
  {
    id: 'tiktok',
    labelKey: 'canvas.socialPresets.platforms.tiktok',
    icon: 'i-simple-icons-tiktok',
    presets: [
      { id: 'tt-vertical', labelKey: 'canvas.socialPresets.kinds.story', width: 1080, height: 1920 },
      { id: 'tt-square', labelKey: 'canvas.socialPresets.kinds.post-square', width: 640, height: 640 },
      { id: 'tt-landscape', labelKey: 'canvas.socialPresets.kinds.post-landscape', width: 1920, height: 1080 },
    ],
  },
  {
    id: 'bluesky',
    labelKey: 'canvas.socialPresets.platforms.bluesky',
    icon: 'i-simple-icons-bluesky',
    presets: [
      { id: 'bsky-profile', labelKey: 'canvas.socialPresets.kinds.profile', width: 1000, height: 1000 },
      { id: 'bsky-banner', labelKey: 'canvas.socialPresets.kinds.banner', width: 3000, height: 1000 },
      { id: 'bsky-banner-alt', labelKey: 'canvas.socialPresets.kinds.banner-compact', width: 1500, height: 500 },
      { id: 'bsky-post', labelKey: 'canvas.socialPresets.kinds.post-square', width: 1000, height: 1000 },
    ],
  },
  {
    id: 'youtube',
    labelKey: 'canvas.socialPresets.platforms.youtube',
    icon: 'i-simple-icons-youtube',
    presets: [
      { id: 'yt-thumbnail', labelKey: 'canvas.socialPresets.kinds.thumbnail', width: 1280, height: 720 },
      { id: 'yt-banner', labelKey: 'canvas.socialPresets.kinds.banner', width: 2560, height: 1440 },
      { id: 'yt-profile', labelKey: 'canvas.socialPresets.kinds.profile', width: 800, height: 800 },
    ],
  },
  {
    id: 'threads',
    labelKey: 'canvas.socialPresets.platforms.threads',
    icon: 'i-simple-icons-threads',
    presets: [
      { id: 'th-post', labelKey: 'canvas.socialPresets.kinds.post-vertical', width: 1440, height: 1920 },
      { id: 'th-profile', labelKey: 'canvas.socialPresets.kinds.profile', width: 640, height: 640 },
    ],
  },
  {
    id: 'dribbble',
    labelKey: 'canvas.socialPresets.platforms.dribbble',
    icon: 'i-simple-icons-dribbble',
    presets: [
      { id: 'db-shot-4-3', labelKey: 'canvas.socialPresets.kinds.shot-4-3', width: 1600, height: 1200 },
      { id: 'db-shot-16-9', labelKey: 'canvas.socialPresets.kinds.shot-16-9', width: 1600, height: 900 },
    ],
  },
  {
    id: 'producthunt',
    labelKey: 'canvas.socialPresets.platforms.producthunt',
    icon: 'i-simple-icons-producthunt',
    presets: [
      { id: 'ph-thumbnail', labelKey: 'canvas.socialPresets.kinds.thumbnail', width: 240, height: 240 },
      { id: 'ph-gallery', labelKey: 'canvas.socialPresets.kinds.gallery', width: 1270, height: 760 },
    ],
  },
];
