// import { type ArticleWithSlug } from '../libs/data-access';
import { Card, SimpleLayout } from '@jasonruesch/ui';
// import { formatDate } from '../libs/utils';

function Article({ article }: { article: any /* ArticleWithSlug */ }) {
  return (
    <article className="md:grid md:grid-cols-4 md:items-baseline">
      <Card className="md:col-span-3">
        <Card.Title to={`/articles/${article.slug}`}>
          {article.title}
        </Card.Title>
        <Card.Eyebrow
          as="time"
          dateTime={article.date}
          className="md:hidden"
          decorate
        >
          {/* {formatDate(article.date)} */}
          {article.date}
        </Card.Eyebrow>
        <Card.Description>{article.description}</Card.Description>
        <Card.Cta>Read article</Card.Cta>
      </Card>
      <Card.Eyebrow
        as="time"
        dateTime={article.date}
        className="mt-1 max-md:hidden"
      >
        {/* {formatDate(article.date)} */}
        {article.date}
      </Card.Eyebrow>
    </article>
  );
}

export default function ArticlesIndex() {
  const articles: any[] /* ArticleWithSlug[] */ = [
    // {
    //   slug: '#1',
    //   author: 'Jason Ruesch',
    //   title: 'How to build a successful business',
    //   date: '2021-10-01',
    //   description:
    //     'Learn how to build a successful business from scratch with these 10 steps.',
    // },
    // {
    //   slug: '#2',
    //   author: 'Jason Ruesch',
    //   title: 'The future of software design',
    //   date: '2021-09-01',
    //   description:
    //     'Discover the future of software design and how it will impact your business.',
    // },
  ]; // await getAllArticles();

  return (
    <SimpleLayout
      title="Writing on software development and design."
      intro="All of my long-form thoughts on software development, product design, and more, collected in chronological order."
    >
      <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
        <div className="flex max-w-3xl flex-col space-y-16">
          {articles.length ? (
            articles.map((article) => (
              <Article key={article.slug} article={article} />
            ))
          ) : (
            <Card as="article">
              <Card.Title>Coming soon</Card.Title>
              <Card.Description>
                I'm working on some new articles. Check back soon!
              </Card.Description>
            </Card>
          )}
        </div>
      </div>
    </SimpleLayout>
  );
}
