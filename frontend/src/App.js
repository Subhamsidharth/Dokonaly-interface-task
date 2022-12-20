import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {Route, Routes} from 'react-router';
import { Navigate } from 'react-router';
import { Suspense } from 'react';
import { Header } from './components/Header/Header';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from './context/auth-context';
import { useAuth } from './hook/auth-hook';

const Signin = React.lazy(() => import('./Views/Signin/Signin'));
const Signup = React.lazy(() => import('./Views/Signup/Signup'));
const UserProfile = React.lazy(() => import('./Views/UserProfile/UserProfile'))

function App() {
  const { login, logout, userId, token } = useAuth();
  console.log(token,"token")
  return (
    <AuthContext.Provider
    value={{
      isLoggedIn: !!token,
      token: token,
      userId: userId,
      login: login,
      logout: logout,
    }}
    >
    <div id="app" className="App">
     {token && <Header />}
     <Suspense fallback={<div>Loading</div>}>
     <Routes>
      <Route path={"/"}  element={<Signin />} />
      <Route path={"/signin"}  element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/userprofile" element={<UserProfile />} />
      <Route path='*' element={<Navigate to='/' replace />} />
     </Routes>
     </Suspense>
     <ToastContainer autoClose={2000} />
    </div>
    </AuthContext.Provider>
  );
}

export default App;
