import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from '@vote-seat-web-app/components/Header';
import NotFound from '@vote-seat-web-app/pages/NotFound.page';

const Calculate = lazy(() => import('@vote-seat-web-app/pages/Calculate.page'));
const History = lazy(() => import('@vote-seat-web-app/pages/History.page'));
const Home = lazy(() => import('@vote-seat-web-app/pages/Home.page'));

const App = () => (
    <BrowserRouter>
        <Header />
        <Suspense fallback={<div>Cargando...</div>}>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/calculate" element={<Calculate />} />
                <Route path="/history" element={<History />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Suspense>
    </BrowserRouter>
);

export default App;
