import { Routes, Route } from 'react-router-dom';
import Login from '../pages/login/Login'
import Navers from '../pages/navers/Navers'
import NotFound from '../components/404'
import PrivateRoute from './PrivateRoute.jsx'

const myRoutes = () => 
  <Routes>
    <Route exact path="/" element={<Login/>}/>
    <Route exact path="*" element={<NotFound/>}/>
    <Route exact path='/navers' element={<PrivateRoute/>}>
      <Route exact path="/navers" element={<Navers/>}/>
    </Route>
  </Routes>


export default myRoutes