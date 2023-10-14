import react from 'react'
import { Main } from './Component/Main';
import { UserContextProvider } from './Component/ContextAPI/ContextProvider';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Navbar } from './Component/Navbar';
import { Login } from './Component/ContextAPI/Login';
import { Profile } from './Component/Profile';

function App() {
  return (
   <UserContextProvider>
    <BrowserRouter>
    <Routes>
      <Route path='/main'  element={<Main/>}  />
      <Route index  element={<Login/>}  />
      <Route path='/profile'  element={<Profile/>}  />
    </Routes>
    
    </BrowserRouter>
    
   </UserContextProvider>
  );
}

export default App;
