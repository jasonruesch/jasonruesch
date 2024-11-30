import { Page } from '@jasonruesch/jasonruesch-ui';

export async function clientLoader() {
  return {
    title: 'Transparent',
  };
}

export default function Transparent() {
  return <Page transparent />;
}
