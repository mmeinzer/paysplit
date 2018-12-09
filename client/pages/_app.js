import App, { Container } from 'next/app';
import Head from 'next/head';
import React from 'react';

export default class CustomApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <Head>
          <title>Pay Split</title>
        </Head>
        <Component {...pageProps} />
      </Container>
    );
  }
}
