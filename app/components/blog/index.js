import dynamic from 'next/dynamic';

//Markdown
export { MdxLayout } from "./mdx-layout";
export { MdxLayoutFullWidth } from "./mdx-layout";
export { MdxLayoutParentWidth } from "./mdx-layout";
export { MdxImage } from "./images/MdxImage";

//Components
export { PhotoGallery } from './photoGallery';
export { TravelFeature } from './feature-sections/travel-feature';
export { Footer } from './footer';
export { CookBookDivider } from "./cookbook-divider";
export { BlogMapWrapper } from "./map-wrapper";
export { FromToCode } from "./colums/from-to-code";

//Images
export { CenteredImage } from "./images/centered-image";
export { TwoCenteredImages } from "./images/two-centered-images"
export { ThreeCenteredImages } from "./images/three-centered-images"

//Videos
export { BasicVideo } from './videos/basic-video';
export { Gif } from './videos/gif';

//Project Components
export { RustChapter1 } from "./projects/rust-chapter-1";
export { RustChapter2 } from "./projects/rust-chapter-2";
export { Fibonacci } from "./projects/rust-chapter-3-fib";
export { DaysOfChistmass } from "./projects/rust-chapter-3-days-of-christmas";
export { CelsiusToFahrenheitToKelvin } from "./projects/rust-chapter-3-ctof";

//Landing Pages
export { SiteLanding } from "./landing-pages/site-landing";
export { TopicLanding } from "./landing-pages/topic-landing";

//Small Topics
export { TopicSmall } from "./topic/topic-small";
export { TopicLarge } from "./topic/topic-large";

//Emoji
export { Checkmark } from './emojis/checkmark';

//Links
export { LinkNewTab } from "./links/link-new-tab";

//Strava
export { StravaEmbed } from "./strava/strava-embed";

//KC-Mtn-Biking
export { KCMtnBikingMain } from './kc-mnt-biking/kc-mtn-biking-main'
export { TLDR } from './kc-mnt-biking/tldr'
export { FAQSection } from './kc-mnt-biking/faq-section'
export { CallOut } from './kc-mnt-biking/call-out'
export { ProjectNav } from './kc-mnt-biking/project-nav'
export { Area } from './kc-mnt-biking/area'
export { HeaderSection } from './kc-mnt-biking/header-section'
export { StatsSection } from './kc-mnt-biking/stats-section'
export { StorySection } from './kc-mnt-biking/story-section'
export { MtnBikePhotoGallery } from './kc-mnt-biking/photo-section'
export { MtnBikeMap } from './kc-mnt-biking/mtn-bike-map'
// export { default as MtnBikeMap } from './kc-mnt-biking/mtn-bike-map';
export { MtnBikeGettingStarted } from './kc-mnt-biking/mtn-bike-getting-started'
export { MtnBikeFooter } from './kc-mnt-biking/mtn-bike-footer'
