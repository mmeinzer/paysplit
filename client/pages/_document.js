import Document, { Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <html className="h-full">
        <Head>
          <link
            href="https://cdn.jsdelivr.net/npm/tailwindcss/dist/tailwind.min.css"
            rel="stylesheet"
          />
          <style>{'#__next { height: 100vh; }'}</style>
        </Head>
        <body className="h-full bg-grey-lightest">
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
