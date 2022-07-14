import routes from '../config/routes';

// Layouts

// Pages
import Home from '../pages/Home';
import Creator from '../pages/Creator';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Store from '../pages/Store';
import Auth from '../pages/Auth';
import Error from '../pages/Error';
// Public routes
const publicRoutes = [
  { path: routes.home, component: Home },
  { path: routes.creator, component: Creator },
  { path: routes.store, component: Store },
  { path: routes.auth, component: Auth },
  { path: routes.error, component: Error },
  { path: routes.login, component: Login, layout: null },
  { path: routes.register, component: Register, layout: null },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
