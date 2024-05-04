import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import DataLoadingPage from '@/pages/DataLoadingPage.tsx';
import ErrorPage from '@/pages/ErrorPage.tsx';
import RootPage from '@/pages/RootPage.tsx';
import DataVisualizationPage from '@/pages/DataVisualizationPage.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootPage/>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <DataLoadingPage />,
      },
      {
        path: '/visualization',
        element: <DataVisualizationPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
