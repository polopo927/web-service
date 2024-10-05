import { Main } from './pages/main/main';
import './App.css';
import { Sidebar } from './components/sidebar/sidebar';
import { Header } from './components/header/header';
import { useState } from 'react';
import { SignIn } from './components/signIn/signIn'
import { SignUp } from './components/signUp/signUp'
import { Navigate, Route, Routes } from 'react-router-dom';

function App() {

  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isAuthe, setIsAuthe] = useState(false)

  const handleAdminToggle = () => {
    setIsSidebarOpen(prev => !prev)
  }

  const handleAuthe = () => {
    setIsAuthe(prev => !prev)
  }

  if (!isAuthe) {
    return (
      <div className="auth-wrapper">
        <Routes>
          <Route path='/' element={<SignIn handleAuthe={() => handleAuthe()} />} />
          <Route path='/sign-in' element={<SignIn handleAuthe={() => handleAuthe()}/>} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path="*" element={<Navigate to="/sign-in" />} />
        </Routes>
      </div>
    );
  }

  return (
    <div className='wrapper'>
      <Header setIsSidebarOpen={handleAdminToggle} isSidebarOpen={isSidebarOpen} />
      <div className='content'>
        <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
          {isSidebarOpen && <Sidebar setIsSidebarOpen={setIsSidebarOpen} />}
        </div>
        <Main />
      </div>
    </div>
  );
}

export default App;
