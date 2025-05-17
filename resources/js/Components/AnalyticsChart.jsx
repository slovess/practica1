const AnalyticsChart = () => {
    return (
      <section className="chart-container">
        <div className="summary-cards">
          <div className="summary-card">
            <p className="card-label">Доходы</p>
            <p className="card-amount">200 000P</p>
          </div>
          <div className="summary-card">
            <p className="card-label">Расходы</p>
            <p className="card-amount">50 000P</p>
          </div>
        </div>
        <div className="filter-controls">
          <select className="filter-select month-select">Май</select>
          <select className="filter-select type-select">Без переводов</select>
        </div>
        <div className="chart-wrapper">
          <div dangerouslySetInnerHTML={{
            __html: `<svg width="505" height="371" viewBox="0 0 505 371" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="0.5" y="341.5" width="133" height="29" rx="4.5" fill="#F5F5F5" stroke="#0B56F9"></rect>
              <text fill="#006FFF" xml:space="preserve" style="white-space: pre" font-family="Roboto Condensed" font-size="20" letter-spacing="0em"><tspan x="25" y="362.336">Продукты</tspan></text>
              <rect x="189" y="341" width="134" height="30" rx="5" fill="#F5F5F5"></rect>
              <rect x="189.5" y="341.5" width="133" height="29" rx="4.5" stroke="#6C5CFF" stroke-opacity="0.56"></rect>
              <text fill="#6C5CFF" xml:space="preserve" style="white-space: pre" font-family="Roboto Condensed" font-size="20" letter-spacing="0em"><tspan x="223" y="363.336">Бензин</tspan></text>
              <rect x="371.5" y="341.5" width="133" height="29" rx="4.5" fill="#F5F5F5" stroke="#2ADFFF"></rect>
              <text fill="#66E8FF" xml:space="preserve" style="white-space: pre" font-family="Roboto Condensed" font-size="20" letter-spacing="0em"><tspan x="396" y="362.336">Другое...</tspan></text>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M255.5 303.672C342.485 303.672 413 235.693 413 151.836C413 67.9794 342.485 0 255.5 0C168.515 0 98 67.9794 98 151.836C98 235.693 168.515 303.672 255.5 303.672Z" fill="url(#paint0_angular)"></path>
             
            </svg>`
          }} />
        </div>
        <style jsx>{`
          .chart-container {
            width: 803px;
            border: 1px solid #062057;
            background-color: #f5f5f5;
            padding: 24px;
          }
          .summary-cards {
            display: flex;
            gap: 32px;
            margin-bottom: 24px;
          }
          .summary-card {
            flex: 1;
            border-radius: 5px;
            border: 1px solid #0b56f9;
            background-color: #f5f5f5;
            padding: 16px;
          }
          .card-label {
            color: #0b56f9;
            font-size: 14px;
          }
          .card-amount {
            color: #0b56f9;
            font-size: 24px;
          }
          .filter-controls {
            display: flex;
            gap: 16px;
            margin-bottom: 24px;
          }
          .filter-select {
            border-radius: 5px;
            border: 1px solid #0b56f9;
            background-color: #f5f5f5;
            color: #0b56f9;
            padding: 0 8px;
            height: 30px;
          }
          .month-select {
            width: 85px;
          }
          .type-select {
            width: 190px;
          }
          .chart-wrapper {
            display: flex;
            justify-content: center;
          }
          @media (max-width: 991px) {
            .chart-container {
              width: 100%;
            }
          }
        `}</style>
      </section>
    );
  };
  
  export default AnalyticsChart;
  