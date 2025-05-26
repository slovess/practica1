export const ArticleContent = ({ article }) => (
    <main className="article-content">
        <h1 className="article-title">{
            article.name
        }</h1>
        <div className="content-wrapper">
            <div className="highlight-container">
                <div className="highlight-box" />
            </div>
            <p className="intro-text">
                {
                    article.abstract
                }
            </p>
        </div>
        <article className="main-text">
            {
                article.description
            }
        </article>
        <style jsx>{`
        .article-content {
          display: flex;
          flex-direction: column;
          padding: 0 60px;
        }
        .article-title {
          color: #0b56f9;
          font-family: Roboto Condensed;
          font-size: 32px;
          font-weight: 700;
          text-align: center;
          margin-bottom: 40px;
        }
        .content-wrapper {
          display: flex;
          gap: 40px;
        }
        .highlight-container {
          width: 577px;
          height: 195px;
          position: relative;
        }
        .highlight-box {
          width: 100%;
          height: 185px;
          border-radius: 10px;
          border: 1px solid #0b56f9;
          background-color: rgba(206, 219, 249, 0.78);
          position: absolute;
          left: 0;
          top: 5px;
        }
        .intro-text {
          width: 698px;
          color: #083087;
          font-family: Roboto Condensed;
          font-size: 20px;
        }
        .main-text {
          color: #083087;
          font-family: Roboto Condensed;
          font-size: 20px;
          margin-top: 40px;
        }
        @media (max-width: 991px) {
          .article-content {
            padding: 0 30px;
          }
          .content-wrapper {
            flex-direction: column;
            align-items: center;
          }
          .highlight-container {
            width: 100%;
          }
          .intro-text {
            width: 100%;
          }
        }
        @media (max-width: 640px) {
          .article-content {
            padding: 0 15px;
          }
        }
      `}</style>
    </main>
);
