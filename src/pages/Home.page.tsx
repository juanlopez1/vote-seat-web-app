import { Fragment } from 'react';

import Button from '@vote-seat-web-app/components/Button';

const Home = () => (
    <Fragment>
        <h1>¡Bienvenido a VoteSeat!</h1>
        <p className="page__description">Calcule la distribución de escaños utilizando el sistema D'Hondt</p>
        <div className="info-box" role="alert">
            <h4 className="info-box__title">¿Qué es el sistema D'Hondt?</h4>
            <p>
                El sistema o método D'Hondt es un método de promedio mayor para asignar escaños en los sistemas de
                representación proporcional por listas electorales. Los métodos de promedio mayor se caracterizan por
                dividir mediante sucesivos divisores los totales de los votos obtenidos por los distintos partidos,
                dando secuencias de cocientes decrecientes para cada partido y asignando los escaños a los promedios más
                altos.{' '}
                <a href="https://es.wikipedia.org/wiki/Sistema_D%27Hondt" target="_blank" rel="noreferrer">
                    Más información.
                </a>
            </p>
        </div>
        <div className="home-page-btn-container">
            <Button to="/calculate">Calcular escaños</Button>
            <Button to="/history" style="outline">
                Ver historial
            </Button>
        </div>
    </Fragment>
);

export default Home;
