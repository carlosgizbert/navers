import { Routes, Route } from 'react-router-dom';
import Login from '../pages/login/Login'
import NotFound from '../components/404'
import PrivateRoute from './PrivateRoute.jsx'
import Navers from '../pages/navers/Navers'
import CreateNaver from '../pages/navers/create/createNaver';

const myRoutes = () => 
  <Routes>
    <Route exact path="/" element={<Login/>}/>
    <Route exact path="*" element={<NotFound/>}/>
    <Route exact path='/navers' element={<PrivateRoute/>}>
      <Route exact path="/navers" element={<Navers/>}/>
    </Route>
    <Route exact path='/adicionar' element={<PrivateRoute/>}>
      <Route exact path="/adicionar" element={<CreateNaver/>}/>
    </Route>
  </Routes>


export default myRoutes