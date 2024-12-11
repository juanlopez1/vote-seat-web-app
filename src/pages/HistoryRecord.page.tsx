import { Fragment, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DateTime } from 'luxon';

import useCalculation from '@vote-seat-web-app/contexts/calculation.context';
import Table, { TCell, THead, TRow } from '@vote-seat-web-app/components/Table';
import BackLink from '@vote-seat-web-app/components/BackLink';
import Spinner from '@vote-seat-web-app/components/Spinner';
import type { HistoryRecord } from '@vote-seat-web-app/types/calculation.types';

const History = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { fetching, historyRecords, getHistory } = useCalculation();
    const [record, setRecord] = useState<HistoryRecord>();

    useEffect(() => {
        if (!historyRecords) {
            getHistory();
            return;
        }
        const foundedRecord = historyRecords.find((historyRecord) => historyRecord.id === Number(id));

        if (!foundedRecord) {
            navigate('/history', { replace: true });
            return;
        }
        setRecord(foundedRecord);
    }, [historyRecords, id, getHistory, navigate]);

    if (fetching || !record) {
        return <Spinner />;
    }
    return (
        <Fragment>
            <BackLink to="/history">Volver al historial</BackLink>
            <h1>Cálculo N°{record?.id}</h1>
            <div className="page__description">
                Fecha {DateTime.fromISO(record.createdAt).toLocaleString(DateTime.DATETIME_SHORT)}
            </div>
            <p>
                Cantidad de escaños: <strong>{record?.seats}</strong>
            </p>
            <Table>
                <TRow gridTemplateColumns="repeat(3, 1fr)">
                    <THead>Lista</THead>
                    <THead>Escaños</THead>
                    <THead>Votos</THead>
                </TRow>
                {record.partiesLists.map((partyList, index) => (
                    <TRow key={`${partyList.name}${index}`} gridTemplateColumns="repeat(3, 1fr)">
                        <TCell>{partyList.name}</TCell>
                        <TCell>{partyList.seats}</TCell>
                        <TCell>{partyList.votes}</TCell>
                    </TRow>
                ))}
            </Table>
        </Fragment>
    );
};

export default History;
