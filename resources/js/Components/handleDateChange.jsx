const handleDateChange = (e) => {
    const selected = e.target.value;
    axios.get(`/transactions?date=${selected}`).then(res => { setTransactions(res.data);
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
    }
    );
  };


