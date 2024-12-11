import type { HistoryRecord, PartyList, PartyListWithSeats } from '@vote-seat-web-app/types/calculation.types';

export type CalculateSeatsRequest = {
    partiesLists: PartyList[];
    seats: number;
    save?: boolean;
};

export type CalculateSeatsResponse = {
    id: number;
    result: PartyListWithSeats[];
    seats: number;
};

export type GetHistoryResponse = HistoryRecord[];
