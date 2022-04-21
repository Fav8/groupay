import React from 'react';
import { Container } from 'react-bootstrap';
import { AuthProvider } from '../context/AuthContext';
import Signup from './Signup';
import Login from './Login';
import Dashboard from './Dashboard';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute'
import GroupPage from './GroupPage';


function App() {

  return (
      
        <Router>
          <AuthProvider>
            <Routes>
              <Route exact path='/' element={<PrivateRoute>
                <Dashboard/>
              </PrivateRoute>}/>
              <Route path='/signup' element={<PublicRoute>
                <Signup/>
              </PublicRoute>}/>
              <Route path='/login' element={<PublicRoute>
                <Login/>
              </PublicRoute>}/>
              <Route path="/group/:groupName" element={<GroupPage />} />
            </Routes>
          </AuthProvider>
        </Router>
      
  );
}

export default App;
