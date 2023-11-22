import { Html, Head, Main, NextScript } from 'next/document';
import Link from 'next/link';

export default function Document() {
  return (
    <Html lang='en'>
      <Head />
      {/* <Link
        href='https://fonts.googleapis.com/css?family=Inter'
        rel='stylesheet'
        type='text/css'
      /> */}

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
