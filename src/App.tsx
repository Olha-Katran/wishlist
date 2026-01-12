import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css'
import Header from './components/header';
import Dashboard from './pages/Dashboard'
import WishPage from './pages/Wish';

function App() { 

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Dashboard />,
    },
    {
      path: "/wish/:id",
      element: <WishPage />,
    }
  ]);

  return (
    <>
      <Header />
        <main>
          <RouterProvider router={router} />
        </main>
      </>
   
  )
}

export default App;