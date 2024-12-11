import { Fragment, useEffect } from 'react';
import { RiEyeLine } from '@remixicon/react';
import { useNavigate } from 'react-router-dom';
import { DateTime } from 'luxon';

import Table, { TCell, THead, TRow } from '@vote-seat-web-app/components/Table';
import Spinner from '@vote-seat-web-app/components/Spinner';
import useCalculation from '@vote-seat-web-app/contexts/calculation.context';

const History = () => {
    const navigate = useNavigate();
    const { fetching, historyRecords, getHistory } = useCalculation();

    useEffect(() => {
        getHistory();
    }, [getHistory]);

    if (fetching || !historyRecords) {
        return <Spinner />;
    }
    return (
        <Fragment>
            <h1>Historial</h1>
            <p className="page__description">Los cálculos que fueron almacenados se encuentran aquí</p>
            <Table>
                <TRow gridTemplateColumns="repeat(4, 1fr)">
                    <THead>Fecha</THead>
                    <THead>Escaños</THead>
                    <THead>Cantidad de listas</THead>
                    <THead>Ver detalles</THead>
                </TRow>
                {historyRecords.map((record) => (
                    <TRow key={record.id} gridTemplateColumns="repeat(4, 1fr)">
                        <TCell>{DateTime.fromISO(record.createdAt).toLocaleString(DateTime.DATETIME_SHORT)}</TCell>
                        <TCell>{record.seats}</TCell>
                        <TCell>{record.listQuantity}</TCell>
                        <TCell>
                            <button type="button" onClick={() => navigate(`/history/${record.id}`)}>
                                <RiEyeLine size={25} color="blue" />
                            </button>
                        </TCell>
                    </TRow>
                ))}
            </Table>
        </Fragment>
    );
};

export default History;
