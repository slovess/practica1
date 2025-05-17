import React from 'react';

export const FinanceCard = ({ title, imageUrl, customStyle }) => {
  return (
    <article className="card-container">
      <div className="card-image">
        <img src={imageUrl} alt={title} className="card-img" style={customStyle} />
      </div>
      <h3 className="card-title">{title}</h3>

      <style jsx>{`
        .card-container {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .card-image {
          width: 143px;
          height: 185px;
          border-radius: 10px;
          border: 1px solid #062057;
          background-color: rgba(206, 219, 249, 0.78);
          position: relative;
          margin-bottom: 10px;
          overflow: hidden;
        }

        .card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .card-title {
          color: #062057;
          font-family: 'Roboto Condensed', sans-serif;
          font-size: 16px;
          margin: 0;
        }
      `}</style>
    </article>
  );
};
