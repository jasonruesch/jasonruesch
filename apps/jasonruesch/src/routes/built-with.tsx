import Markdown from 'react-markdown';
import { useLocation } from 'react-router';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import rehypeRaw from 'rehype-raw';

import { Page } from '@jasonruesch/jasonruesch-ui';

// eslint-disable-next-line @nx/enforce-module-boundaries
import markdown from '../../../../docs/BUILT_WITH.md';

export async function clientLoader() {
  return {
    title: 'Built With',
  };
}

export default function BuiltWith() {
  const { pathname } = useLocation();

  return (
    <Page contentClassName="flex flex-col items-start">
      <h1 className="gradient-heading" aria-label="Built With">
        <div className="flex items-center justify-center" aria-hidden="true">
          Built&nbsp;
          <span className="heading-lg">With</span>
        </div>
      </h1>
      <div className="w-full">
        <article className="prose">
          <Markdown
            components={{
              code: ({ className, children, ...props }) => {
                const match = /language-(\w+)/.exec(className || '');

                return match ? (
                  <SyntaxHighlighter language={match[1]} style={tomorrow}>
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              },
            }}
            rehypePlugins={[rehypeRaw]}
            urlTransform={(value: string) => {
              if (value.startsWith('#')) {
                return `${pathname}${value}`;
              }

              return value;
            }}
          >
            {markdown}
          </Markdown>
        </article>
      </div>
    </Page>
  );
}