export const ProfileSection = ({ userInfo }) => {
    return (
      <>
           <link
        href="https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@400;500;700&display=swap"
        rel="stylesheet"
      />
      <section className="profile-section">
        <h1 className="section-title">ЛИЧНЫЙ КАБИНЕТ</h1>
        <div className="profile-content">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/c8a2d15be390e29aa02b9672e51e40d6658dbd27"
            alt="Profile"
            className="profile-image"
          />
          <div className="info-container">
            <div className="info-grid">
              <div className="labels">
                <p>ФИО:</p>
                <p>Электронная почта:</p>
                <p>Дата рождения:</p>
              </div>
              <div className="values">
                <p>{userInfo.fullName}</p>
                <p>{userInfo.email}</p>
                <p>{userInfo.birthDate}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="action-buttons">
          <button className="action-button">изменить</button>
          <button className="action-button">удалить</button>
        </div>
  
        <style jsx>{`
          .profile-section {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-top: 40px;
            padding: 0 23px;
            font-family: Roboto Condensed;
            margin-bottom:180px;
          }
          .section-title {
            color: #0b56f9;
            font-family: Roboto Condensed;
            font-size: 24px;
            font-weight: 700;
            margin-bottom: 40px;
          }
          .profile-content {
            display: flex;
            gap: 87px;
          }
          .profile-image {
            width: 143px;
            height: 184px;
            border-radius: 5px;
            object-fit: cover;
          }
          .info-container {
            background-color: #f5f5f5;
            border-radius: 5px;
            border: 1px solid #0b56f9;
            padding: 20px;
            width: 766px;
          }
          .info-grid {
            display: flex;
            gap: 117px;
          }
          .labels, .values {
            display: flex;
            flex-direction: column;
            gap: 20px;
            color: #0b56f9;
            font-family: Inter;
            font-size: 20px;
          }
          .action-buttons {
            display: flex;
            gap: 85px;
            margin-top: 48px;
          }
          .action-button {
            width: 177px;
            height: 31px;
            border-radius: 5px;
            border: 1px solid #0b56f9;
            background-color: #f5f5f5;
            color: #0b56f9;
            font-family: Inter;
            font-size: 16px;
            cursor: pointer;
          }
          @media (max-width: 991px) {
            .profile-content {
              flex-direction: column;
              align-items: center;
              gap: 40px;
            }
            .info-container {
              width: 100%;
            }
          }
          @media (max-width: 640px) {
            .profile-section {
              padding: 0 16px;
            }
            .info-grid {
              flex-direction: column;
              gap: 20px;
            }
            .action-buttons {
              flex-direction: column;
              gap: 20px;
            }
          }
        `}</style>
      </section>
      </>
    );
  };
  