import { httpPost } from '@vote-seat-web-app/services/http.service';
import type { LoginRequest, LoginResponse } from './session.types';

class SessionAPI {
    login = ({ username, password }: LoginRequest): Promise<LoginResponse> =>
        httpPost<LoginRequest, LoginResponse>('public-api/login', {
            username,
            password,
        });
}

const sessionApi = new SessionAPI();
export default sessionApi;
