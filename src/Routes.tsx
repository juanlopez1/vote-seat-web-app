import { lazy, Suspense, Fragment } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Header from '@vote-seat-web-app/components/Header';
import { CalculationProvider } from '@vote-seat-web-app/contexts/calculation.context';
import NotFound from '@vote-seat-web-app/pages/NotFound.page';
import Spinner from '@vote-seat-web-app/components/Spinner';
import useSession from '@vote-seat-web-app/contexts/session.context';

const Calculate = lazy(() => import('@vote-seat-web-app/pages/Calculate.page'));
const CalculationResult = lazy(() => import('@vote-seat-web-app/pages/CalculationResult.page'));
const History = lazy(() => import('@vote-seat-web-app/pages/History.page'));
const HistoryRecord = lazy(() => import('@vote-seat-web-app/pages/HistoryRecord.page'));
const Home = lazy(() => import('@vote-seat-web-app/pages/Home.page'));
const Login = lazy(() => import('@vote-seat-web-app/pages/Login.page'));

const AppRoutes = () => {
    const { session } = useSession();
    return (
        <Fragment>
            {!session ? (
                <main className="login-page">
                    <Suspense fallback={<Spinner />}>
                        <Routes>
                            <Route path="/login" element={<Login />} />
                            <Route path="*" element={<Navigate to="/login" replace />} />
                        </Routes>
                    </Suspense>
                </main>
            ) : (
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
            )}
        </Fragment>
    );
};
export default AppRoutes;
