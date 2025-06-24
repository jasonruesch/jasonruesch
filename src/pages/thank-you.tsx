import { useSearchParams } from 'react-router';
import { SimpleLayout } from '../lib';

export default function ThankYou() {
  const [searchParams] = useSearchParams();
  const type = searchParams.get('type');
  const newsletter = type === 'newsletter';
  const contact = type === 'contact';

  return newsletter ? (
    <SimpleLayout
      title="Thanks for subscribing."
      intro="I'll send you an email any time I publish a new blog post, release a new project, or have anything interesting to share that I think you'd want to hear about. You can unsubscribe at any time, no hard feelings."
    />
  ) : contact ? (
    <SimpleLayout
      title="Thanks for your email."
      intro="I'll get back to you as soon as I can. In the meantime, feel free to check out my latest projects."
    />
  ) : null;
}
