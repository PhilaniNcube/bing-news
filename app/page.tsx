/* eslint-disable @next/next/no-img-element */
import Image from 'next/image'
import { CognitiveServicesCredentials } from "ms-rest-azure";
import { NewsSearchClient } from "azure-cognitiveservices-newssearch";
import Link from 'next/link';

type Article = {
  name: string;
  url: string;
  description: string;
  image: {
    thumbnail: {
      contentUrl: string;
      width: number;
      height: number;
    }
  }
  about: {
    readLink: string;
    name: string;
  }[]
  mentions? : {
    name: string;
  }[]
  provider: {
    _type: string;
    name: string;
    image: {
      thumbnail: {
        contentUrl: string;
      }
    }
  }[]
  datePublished: string;
}

const getNews = async () => {

  const res = await fetch(
    "https://api.bing.microsoft.com/v7.0/news/search?q=eskom&count=10&offset=0&mkt=en-ZA&safeSearch=Moderate&location=global",
    {
      headers: {
        "Ocp-Apim-Subscription-Key": process.env.BING_API_KEY!,
      },
    }
  );

const data = await res.json();

return data;

}

export default async function Home() {

const news = await getNews();

console.log(news);


  return (
    <main className="flex min-h-screen flex-col items-center  p-24">
      <h1 className="text-4xl font-bold text-center">Eskom News</h1>
      <div className="w-full">
        {news.value.map((article: Article, i: number) => (
          <div key={i} className="w-full px-4 py-2">
            <div className="flex space-x-4">
              <img
                className="w-44 h-44 object-cover rounded-md"
                src={article.image.thumbnail.contentUrl}
                alt={article.name}
              />
              <div className="flex-1">
                <h3 className="text-xl font-medium py-1">{article.name}</h3>
                <p className="text-base font-medium text-neutral-600">
                  {article.description}
                </p>
                <Link
                  href={article.url}
                  className="text-sm text-blue-500 underline"
                >
                  {article.url}
                </Link>
                <p className="text-sm font-medium text-neutral-600">
                 Date: {article.datePublished}
                </p>
                <pre>{JSON.stringify(article, null, 2)}</pre>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
