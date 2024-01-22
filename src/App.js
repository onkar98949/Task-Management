import React from 'react';
import { BrowserRouter as Router , Routes , Route } from 'react-router-dom';
import Login from './Pages/Login';
import CreateTask from './Pages/CreateTask';
import Register from './Pages/Register';
import Home from './Pages/Home';
import Navbar from './components/Navbar';
import TaskPage from './Pages/TaskPage';
import UpdateTask from './Pages/UpdateTask';

function App() {
  return (
    <div>
      <Router>
        <Navbar/>
        <Routes>
          <Route path='/' exact Component={Home}/>
          <Route path='/createTask' exact Component={CreateTask}/>
          <Route path='/login' exact Component={Login}/>
          <Route path='/register' exact Component={Register}/> 
          <Route path='/task/:id' exact Component={TaskPage}/>
          <Route path='/updateTask/:id' exact Component={UpdateTask}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
