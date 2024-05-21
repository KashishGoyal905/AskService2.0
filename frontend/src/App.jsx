import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './components/RootLayout';
import Home from './components/Home';
import Hire from './components/Hire';
import JobProfile from './components/JobProfile';
import JobApply from './components/JobApply';
import About from './components/About';
import Login from './components/Login';
import Singup from './components/Singup';
import { applyJobAction } from './components/actions';

const router = createBrowserRouter([
  {
    path: '/', element: <RootLayout />,
    children: [
      { path: '/', element: <Home />, },
      { path: 'hire', element: <Hire /> },
      { path: 'hire/:jobProfile', element: <JobProfile />, },
      { path: 'apply', element: <JobApply />, action: applyJobAction },
      { path: 'about', element: <About />, },
    ]
  },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <Singup />, },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
