import { Page } from '@jasonruesch/jasonruesch-ui';

export async function clientLoader() {
  return {
    title: 'Blank',
  };
}

export default function Blank() {
  return <Page />;
}
