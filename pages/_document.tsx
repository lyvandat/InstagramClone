import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head></Head>
        <body>
          {/* có thể để modal này ở trên Main hoặc dưới NextScript hoặc ở giữa đều được */}
          <Main />
          <NextScript />
          <div id="modal"></div>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
