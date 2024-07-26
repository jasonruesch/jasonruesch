import Markdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import rehypeRaw from 'rehype-raw';

import markdown from '../../../docs/BUILT_WITH.md';
import { Page } from '../../components';

export function BuiltWith() {
  return (
    <Page contentClassName="flex flex-col items-start">
      <h1 className="gradient-heading" aria-label="Built With">
        <div className="flex items-center justify-center">
          Built&nbsp;
          <span className="heading-lg">With</span>
        </div>
      </h1>
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
        >
          {markdown}
        </Markdown>
      </article>
    </Page>
  );
}
