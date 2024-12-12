import { type FC, type PropsWithChildren, createContext, useCallback, useContext, useMemo, useState } from 'react';

import sessionApi from '@vote-seat-web-app/api/session.api';
import type { Session } from '@vote-seat-web-app/types/session.types';
import { useNavigate } from 'react-router-dom';

export type SessionState = {
    session?: Session;
    error: boolean;
    fetching: boolean;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
};

const SessionContext = createContext<SessionState | undefined>(undefined);

export const SessionProvider: FC<PropsWithChildren> = ({ children }) => {
    const navigate = useNavigate();
    const storageSession = localStorage.getItem('session');
    const [session, setSession] = useState<Session | undefined>(
        storageSession ? JSON.parse(storageSession) : undefined,
    );
    const [error, setError] = useState(false);
    const [fetching, setFetching] = useState(false);

    const login = useCallback(
        async (username: string, password: string) => {
            try {
                setError(false);
                setFetching(true);

                const newSession = await sessionApi.login({ username, password });
                setSession(newSession);
                localStorage.setItem('session', JSON.stringify(newSession));
                navigate('/');
            } catch (_) {
                setError(true);
            } finally {
                setFetching(false);
            }
        },
        [navigate],
    );

    const logout = useCallback(() => {
        try {
            setError(false);
            setFetching(true);

            localStorage.removeItem('session');
            setSession(undefined);
            navigate('/login');
        } catch (_) {
            setError(true);
        } finally {
            setFetching(false);
        }
    }, [navigate]);

    const value = useMemo(
        () => ({
            session,
            error,
            fetching,
            login,
            logout,
        }),
        [session, error, fetching, login, logout],
    );
    return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
};

const useSession = (): SessionState => {
    const context = useContext(SessionContext);
    if (!context) {
        throw new Error('useSession must be used within a SessionProvider');
    }
    return context;
};

export default useSession;
