import { Card, SimpleLayout } from "../components";
import { type ArticleWithSlug, formatDate } from "../lib";

function Article({ article }: { article: ArticleWithSlug }) {
  return (
    <article className="md:grid md:grid-cols-4 md:items-baseline">
      <Card className="md:col-span-3">
        <Card.Title href={`/articles/${article.slug}`}>
          {article.title}
        </Card.Title>
        <Card.Eyebrow
          as="time"
          dateTime={article.date}
          className="md:hidden"
          decorate
        >
          {formatDate(article.date)}
        </Card.Eyebrow>
        <Card.Description>{article.description}</Card.Description>
        <Card.Cta>Read article</Card.Cta>
      </Card>
      <Card.Eyebrow
        as="time"
        dateTime={article.date}
        className="mt-1 max-md:hidden"
      >
        {formatDate(article.date)}
      </Card.Eyebrow>
    </article>
  );
}

export default function ArticlesIndex() {
  const articles: ArticleWithSlug[] = [
    {
      slug: "#1",
      author: "Jason Ruesch",
      title: "How to build a successful business",
      date: "2021-10-01",
      description:
        "Learn how to build a successful business from scratch with these 10 steps.",
    },
    {
      slug: "#2",
      author: "Jason Ruesch",
      title: "The future of software design",
      date: "2021-09-01",
      description:
        "Discover the future of software design and how it will impact your business.",
    },
  ]; // await getAllArticles();

  return (
    <SimpleLayout
      title="Writing on software design, company building, and the aerospace industry."
      intro="All of my long-form thoughts on programming, leadership, product design, and more, collected in chronological order."
    >
      <div className="md:border-l md:border-neutral-100 md:pl-6 md:dark:border-neutral-700/40">
        <div className="flex max-w-3xl flex-col space-y-16">
          {articles.map((article) => (
            <Article key={article.slug} article={article} />
          ))}
        </div>
      </div>
    </SimpleLayout>
  );
}
