'use server'
import { getSingleBlogPostMetadata } from "@/lib/next-path";
import { ActiveCard } from "./card";

export async function RelatedArticles({ title, description, articles = [], currentView }) {
  const articleData = await Promise.all(
    articles.map(async (slug) => {
      const { title, thumbnail, url } = await getSingleBlogPostMetadata(slug);
      return { title, thumbnail, url: slug , current: slug == currentView ? true : false};
    })
  );

    console.log(articleData);

  return (
    <div className="w-full">
      <h2 className="text-center font-mono">{title}</h2>
      <p className="text-center w-full">{description}</p>
      <ActiveCard articles={articleData}/>
    </div>
  );
}
