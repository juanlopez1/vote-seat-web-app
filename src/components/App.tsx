import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from '@vote-seat-web-app/components/Header';
import NotFound from '@vote-seat-web-app/pages/NotFound';

const Calculate = lazy(() => import('@vote-seat-web-app/pages/Calculate'));
const History = lazy(() => import('@vote-seat-web-app/pages/History'));
const Home = lazy(() => import('@vote-seat-web-app/pages/Home'));

const App = () => {
    return (
        <>
            <Header />
            <BrowserRouter>
                <Suspense fallback={<div>Cargando...</div>}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/calculate" element={<Calculate />} />
                        <Route path="/history" element={<History />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </Suspense>
            </BrowserRouter>
        </>
    );
};

export default App;
