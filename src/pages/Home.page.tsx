import Button from '@vote-seat-web-app/components/Button';

const Home = () => (
    <div className="page__container">
        <h1>¡Bienvenido a VoteSeat!</h1>
        <p className="page__description">Calculá la distribución de escaños utilizando el sistema D'Hondt</p>
        <div className="home-page-btn-container">
            <Button to="/calculate">Realizar cálculo</Button>
            <Button to="/history" style="outline">
                Ver historial
            </Button>
        </div>
    </div>
);

export default Home;
