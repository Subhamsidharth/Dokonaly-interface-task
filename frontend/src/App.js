import React from 'react';
import './App.css';
import {Route, Routes} from 'react-router';
import { Suspense } from 'react';
import { Header } from './components/Header/Header';


const Home = React.lazy(() => import('./Views/Home/Home'));
const Signin = React.lazy(() => import('./Views/Signin/Signin'));
const Signup = React.lazy(() => import('./Views/Signup/Signup'));


function App() {
  return (

    <div className="App">
     <Header />
     <Suspense fallback={<div>Loading</div>}>
     <Routes>
      <Route path='/' element={<Home />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
     </Routes>
     </Suspense>
    </div>
    
  );
}

export default App;
