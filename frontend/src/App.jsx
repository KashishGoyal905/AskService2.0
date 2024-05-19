import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './components/RootLayout';
import Home from './components/Home';
import Hire from './components/Hire';
import JobProfile from './components/JobProfile';
import JobApply from './components/JobApply';
import About from './components/About';

const router = createBrowserRouter([
  {
    path: '/', element: <RootLayout />,
    children: [
      { path: '/', element: <Home />, },
      { path: 'hire', element: <Hire /> },
      { path: 'hire/:jobProfile', element: <JobProfile />, },
      { path: 'apply', element: <JobApply />, },
      { path: 'about', element: <About />, },
      { path: 'login', element: <About />, },
      { path: 'logout', element: <About />, },
    ]
  }
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
