import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from '@vote-seat-web-app/components/Header';
import NotFound from '@vote-seat-web-app/pages/NotFound.page';
import Spinner from '@vote-seat-web-app/components/Spinner';
import { CalculationProvider } from '@vote-seat-web-app/contexts/calculation.context';

const Calculate = lazy(() => import('@vote-seat-web-app/pages/Calculate.page'));
const CalculationResult = lazy(() => import('@vote-seat-web-app/pages/CalculationResult.page'));
const History = lazy(() => import('@vote-seat-web-app/pages/History.page'));
const HistoryRecord = lazy(() => import('@vote-seat-web-app/pages/HistoryRecord.page'));
const Home = lazy(() => import('@vote-seat-web-app/pages/Home.page'));

const App = () => (
    <BrowserRouter>
        <CalculationProvider>
            <Header />
            <main className="page__container">
                <Suspense fallback={<Spinner />}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/calculate" element={<Calculate />} />
                        <Route path="/calculate/result" element={<CalculationResult />} />
                        <Route path="/history" element={<History />} />
                        <Route path="/history/:id" element={<HistoryRecord />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </Suspense>
            </main>
        </CalculationProvider>
    </BrowserRouter>
);

export default App;
