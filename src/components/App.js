import { BrowserRouter as Router, Route, Navigate ,Routes  as Switch} from 'react-router-dom';
import { useAuth } from '../hooks';

import { Home,Login,Signup } from '../pages';
import { Loader, Navbar ,PageNotFound} from './';
import Settings from './../pages/Settings';

function PrivateRoute({ children }) {
  const auth = useAuth();

  return auth.user ? children : <Navigate to="/login" />;
  
}

function App() {
  // using useAUth custom hook to show the loader
  const auth = useAuth();

  if (auth.loading) {
    return <Loader />;
  }

  // Routes is used to select only one route at a time 
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          
          <Route exact path="/" element = {<Home />} />
          
          <Route exact path="/login" element = {   <Login />} />
         
          <Route exact path="/register" element = {<Signup />} />
          
          <Route exact path="/settings" element = {<PrivateRoute><Settings /></PrivateRoute>} />
            
          <Route element = {<PageNotFound />} />
            
       
        </Switch>
      </Router>
    </div>
  );
}

export default App;
