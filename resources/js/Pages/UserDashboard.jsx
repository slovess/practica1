"use client";
import { Header} from '../Components/Header';
import { ProfileSection } from '@/Components/ProfileSection';
import { Footer } from '../Components/Footer';



const userInfo = {
  fullName: "Гаврилович Софья Валентиновна",
  email: "sofiagav55@gmail.com",
  birthDate: "04.07.2006"
};

export default function UserDashboard() {
  return (
    <>
         <link
        href="https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@400;500;700&display=swap"
        rel="stylesheet"
      />
    <main className="dashboard">
      <Header userName="Софья Г." />
      <ProfileSection userInfo={userInfo} />
      <Footer />

      <style jsx>{`
        .dashboard {
        margin-top:50px;
          background-color: #fff;
        }
        
      `}</style>
    </main>
    </>
  );
}