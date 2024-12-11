export type PartyList = {
    name: string;
    votes: number | string;
};

export type PartyListWithSeats = PartyList & {
    seats: number;
};

export type HistoryRecord = {
    id: number;
    seats: number;
    listQuantity: number;
    createdAt: string;
    partiesLists: PartyListWithSeats[];
};

export type CalculateResponse = {
    id?: number;
    seats: number;
    result: PartyListWithSeats[];
};
