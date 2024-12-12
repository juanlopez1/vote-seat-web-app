import type { Session } from '@vote-seat-web-app/types/session.types';

export type LoginRequest = {
    username: string;
    password: string;
};

export type LoginResponse = Session;
