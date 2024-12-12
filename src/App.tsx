import { BrowserRouter } from 'react-router-dom';
import { SessionProvider } from '@vote-seat-web-app/contexts/session.context';
import AppRoutes from './Routes';

const App = () => (
    <BrowserRouter>
        <SessionProvider>
            <AppRoutes />
        </SessionProvider>
    </BrowserRouter>
);

export default App;
