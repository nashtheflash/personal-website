import dynamic from 'next/dynamic';

//Markdown
export { MdxLayout } from "./mdx-layout";
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
