import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import Loader from './components/Loader/Loader';
import Layout from './components/Layout/Layout';
const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const BoardPage = lazy(() => import('./pages/BoardPage/BoardPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage/NotFoundPage'));

const App = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/board/:id" element={<BoardPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
};

export default App;
