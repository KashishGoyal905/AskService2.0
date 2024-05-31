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
import { applyJobAction, signUpAction } from './components/actions';
import { AuthContextProvider } from './context/AuthContext';
import Profile from './components/Profile';
import { ToastContainer, Bounce } from 'react-toastify';

const router = createBrowserRouter([
  {
    path: '/', element: <RootLayout />,
    children: [
      { path: '/', element: <Home />, },
      { path: 'hire', element: <Hire /> },
      { path: 'hire/:jobProfile', element: <JobProfile />, },
      { path: 'apply', element: <JobApply />, action: applyJobAction },
      { path: 'about', element: <About />, },
      { path: '/profile/:userId', element: <Profile /> },
    ]
  },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <Singup />, action: signUpAction },
  { path: '/updatePass', element: <Singup /> },
]);

function App() {
  return (
    <AuthContextProvider>
      <ToastContainer autoClose={1500} position="top-center" theme="colored" transition={Bounce} />
      <RouterProvider router={router} />
    </AuthContextProvider>
  );
}

export default App;
