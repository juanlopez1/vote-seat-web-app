import { type FC, type PropsWithChildren, createContext, useCallback, useContext, useMemo, useState } from 'react';

import type { CalculateResponse, HistoryRecord, PartyList } from '@vote-seat-web-app/types/calculation.types';
import calculationApi from '@vote-seat-web-app/api/calculation.api';

export type CalculationState = {
    calculationResult?: CalculateResponse;
    historyRecords?: HistoryRecord[];
    error: boolean;
    fetching: boolean;
    calculateSeats: (seats: number, partiesLists: PartyList[], save?: boolean) => Promise<void>;
    getHistory: () => Promise<void>;
};

const CalculationContext = createContext<CalculationState | undefined>(undefined);

export const CalculationProvider: FC<PropsWithChildren> = ({ children }) => {
    const [historyRecords, setHistoryRecords] = useState<HistoryRecord[]>();
    const [calculationResult, setCalculationResult] = useState<CalculateResponse>();
    const [error, setError] = useState(false);
    const [fetching, setFetching] = useState(false);

    const calculateSeats = useCallback(async (seats: number, partiesLists: PartyList[], save = false) => {
        try {
            setError(false);
            setFetching(true);

            const result = await calculationApi.calculateSeats({ save, seats, partiesLists });
            setCalculationResult(result);
        } catch (_) {
            setError(true);
        } finally {
            setFetching(false);
        }
    }, []);

    const getHistory = useCallback(async () => {
        try {
            setError(false);
            setFetching(true);

            const records = await calculationApi.getHistory();
            setHistoryRecords(records);
        } catch (_) {
            setError(true);
        } finally {
            setFetching(false);
        }
    }, []);

    const value = useMemo(
        () => ({
            calculationResult,
            historyRecords,
            error,
            fetching,
            calculateSeats,
            getHistory,
        }),
        [calculationResult, historyRecords, error, fetching, calculateSeats, getHistory],
    );
    return <CalculationContext.Provider value={value}>{children}</CalculationContext.Provider>;
};

const useCalculation = (): CalculationState => {
    const context = useContext(CalculationContext);
    if (!context) {
        throw new Error('useCalculation must be used within a CalculationProvider');
    }
    return context;
};

export default useCalculation;
