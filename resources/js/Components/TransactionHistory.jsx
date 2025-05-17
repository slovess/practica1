const TransactionHistory = () => {
    const transactions = [
      {
        date: 'Вчера',
        items: [
          { category: 'Продукты', amount: '-25 000р' },
          { category: 'Бензин', amount: '-5 000р' },
          { category: 'Зарплата', amount: '+85 000р', isIncome: true }
        ]
      },
      {
        date: '11 мая',
        items: [
          { category: 'Продукты', amount: '-5 000р' },
          { category: 'Бензин', amount: '-1 000р' },
          { category: 'Одежда и обувь', amount: '-50 000р' }
        ]
      },
      {
        date: '10 мая',
        items: [
          { category: 'Продукты', amount: '-1 000р' },
          { category: 'Ресторан', amount: '-5 000р' },
          { category: 'ЖКХ', amount: '-10 000р' }
        ]
      }
    ];
  
    return (
      <section className="history-section">
        <h2 className="history-title">ИСТОРИЯ</h2>
        <div className="history-container">
          {transactions.map((day, index) => (
            <div key={index} className="day-group">
              <h3 className="day-title">{day.date}</h3>
              {day.items.map((item, itemIndex) => (
                <div key={itemIndex} className="transaction-row">
                  <p className="category">{item.category}</p>
                  <p className={`amount ${item.isIncome ? 'income' : ''}`}>
                    {item.amount}
                  </p>
                </div>
              ))}
            </div>
          ))}
        </div>
        <style jsx>{`
          .history-section {
            width: 100%;
            margin-top: 32px;
          }
          .history-title {
            color: #0b56f9;
            font-size: 20px;
            font-weight: 700;
            text-align: center;
            margin-bottom: 24px;
          }
          .history-container {
margin-left:100px;
            display: flex;
            gap:400px;
            margin-bottom:20px;
          }
          .day-group {
            display: flex;
            flex-direction: column;
            gap: 16px;
          }
          .day-title {
            color: #0b56f9;
            font-size: 24px;
            font-weight: 700;
          }
          .transaction-row {
            display: flex;
            justify-content: space-between;
          }
          .category {
            color: #0b56f9;
            font-size: 24px;
          }
          .amount {
            color: #0b56f9;
            font-size: 24px;
            margin-left: 12px;
          }
          .amount.income {
            color: #0bf927;
          }
          @media (max-width: 991px) {
            .history-container {
              flex-direction: column;
              gap: 32px;
            }
          }
        `}</style>
      </section>
    );
  };
  
  export default TransactionHistory;
  