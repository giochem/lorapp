import routes from '../config/routes';

// Layouts

// Pages
import Home from '-/pages/Home';
import Creator from '-/pages/Creator';
import Login from '-/pages/Login';
import Register from '-/pages/Register';

// Public routes
const publicRoutes = [
  { path: routes.home, component: Home },
  { path: routes.creator, component: Creator },
  { path: routes.login, component: Login, layout: null },
  { path: routes.register, component: Register, layout: null },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
