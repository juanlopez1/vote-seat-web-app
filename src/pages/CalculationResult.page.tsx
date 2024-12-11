import { Fragment, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '@vote-seat-web-app/components/Button';
import Table, { TCell, THead, TRow } from '@vote-seat-web-app/components/Table';
import useCalculation from '@vote-seat-web-app/contexts/calculation.context';
import BackLink from '@vote-seat-web-app/components/BackLink';
import Spinner from '@vote-seat-web-app/components/Spinner';

const CalculationResult = () => {
    const navigate = useNavigate();
    const { calculationResult, fetching, calculateSeats } = useCalculation();

    useEffect(() => {
        if (!fetching && !calculationResult) {
            navigate('/calculate', { replace: true });
        }
    }, [calculationResult, fetching, navigate]);

    const onSaveCalculation = () => {
        if (calculationResult) {
            calculateSeats(calculationResult?.seats, calculationResult?.result, true);
        }
    };

    if (fetching && !calculationResult) {
        return <Spinner />;
    }
    return (
        <Fragment>
            <BackLink to="/calculate">Volver a calcular</BackLink>
            <h1>Resultado</h1>
            <p>
                Cantidad de escaños: <strong>{calculationResult?.seats}</strong>
            </p>
            <Table>
                <TRow gridTemplateColumns="repeat(3, 1fr)">
                    <THead>Lista</THead>
                    <THead>Escaños</THead>
                    <THead>Votos</THead>
                </TRow>
                {calculationResult?.result.map((partyList, index) => (
                    <TRow key={`${partyList.name}${index}`} gridTemplateColumns="repeat(3, 1fr)">
                        <TCell>{partyList.name}</TCell>
                        <TCell>{partyList.seats}</TCell>
                        <TCell>{partyList.votes}</TCell>
                    </TRow>
                ))}
            </Table>
            {!calculationResult?.id && (
                <Button onClick={onSaveCalculation} disabled={fetching}>
                    Guardar calculo
                </Button>
            )}
        </Fragment>
    );
};

export default CalculationResult;
