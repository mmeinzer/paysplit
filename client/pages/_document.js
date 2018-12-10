import Document, { Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <html className="h-full">
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link
            href="https://cdn.jsdelivr.net/npm/tailwindcss/dist/tailwind.min.css"
            rel="stylesheet"
          />
          <style>{'#__next { height: 100vh; }'}</style>
        </Head>
        <body className="h-full bg-grey-lighter">
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
