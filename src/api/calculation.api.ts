import { httpGet, httpPost } from '@vote-seat-web-app/services/http.service';
import type {
    CalculateSeatsRequest,
    CalculateSeatsResponse,
    GetHistoryResponse,
} from '@vote-seat-web-app/api/calculation.types';

class CalculationAPI {
    calculateSeats = ({ partiesLists, save, seats }: CalculateSeatsRequest): Promise<CalculateSeatsResponse> =>
        httpPost<CalculateSeatsRequest, CalculateSeatsResponse>('api/calculate', {
            partiesLists,
            save,
            seats,
        });

    getHistory = (): Promise<GetHistoryResponse> => httpGet<GetHistoryResponse>('api/history');
}

const calculationApi = new CalculationAPI();
export default calculationApi;
