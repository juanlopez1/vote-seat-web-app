import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

import App from '@vote-seat-web-app/App';
import '@vote-seat-web-app/styles/main.scss';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <StrictMode>
        <App />
    </StrictMode>,
);
