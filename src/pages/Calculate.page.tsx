import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { Controller, type SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { RiAddLine, RiCloseLine, RiErrorWarningLine } from '@remixicon/react';

import Button from '@vote-seat-web-app/components/Button';
import Input from '@vote-seat-web-app/components/Input';
import useCalculation from '@vote-seat-web-app/contexts/calculation.context';
import Table, { TCell, THead, TRow } from '@vote-seat-web-app/components/Table';
import type { PartyList } from '@vote-seat-web-app/types/calculation.types';

type FormData = {
    save: boolean;
    seats: number | string;
    partiesLists: PartyList[];
};

const Calculate = () => {
    const navigate = useNavigate();
    const { calculateSeats } = useCalculation();
    const {
        control,
        formState: { errors, isSubmitting },
        handleSubmit,
        register,
        setError,
        clearErrors,
    } = useForm<FormData>({
        defaultValues: {
            save: false,
            seats: '',
        },
    });
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'partiesLists',
    });

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        if (fields.length === 0) {
            setError('partiesLists', { type: 'required', message: 'Agregue listas para poder distribuir los escaños' });
            return;
        }
        const seats = Number(data.seats);
        const partiesLists = data.partiesLists.map((partyList) => ({
            name: partyList.name,
            votes: Number(partyList.votes),
        }));

        calculateSeats(seats, partiesLists, data.save);
        navigate('result');
    };

    const onAddList = () => {
        clearErrors('partiesLists');
        append({ name: `Lista ${fields.length + 1}`, votes: '' });
    };

    return (
        <Fragment>
            <h1>Calcular escaños</h1>
            <p className="page__description">Complete el siguiente formulario para poder realizar el calculo</p>
            <form onSubmit={handleSubmit(onSubmit)} className="calculate-from">
                <Controller
                    name="seats"
                    control={control}
                    rules={{ required: 'Complete este campo' }}
                    render={({ field: { name, onChange, onBlur, value } }) => (
                        <Input
                            name={name}
                            type="text"
                            value={value}
                            label="Ingrese la cantidad de escaños"
                            onBlur={onBlur}
                            onChange={onChange}
                            error={errors.seats?.message}
                        />
                    )}
                />
                <div className="calculate-from__table-wrapper">
                    <label htmlFor="partiesLists" className="input-label">
                        Agregue las listas y sus correspondientes votos
                    </label>
                    <Table>
                        <TRow gridTemplateColumns="2fr 2fr 1fr">
                            <THead>Lista</THead>
                            <THead>Votos</THead>
                            <THead>Eliminar</THead>
                        </TRow>
                        {fields.map((field, index) => (
                            <TRow key={field.id} gridTemplateColumns="2fr 2fr 1fr">
                                <TCell>
                                    <input {...register(`partiesLists.${index}.name`)} type="text" />
                                </TCell>
                                <TCell>
                                    <input {...register(`partiesLists.${index}.votes`)} type="number" />
                                </TCell>
                                <TCell>
                                    <button type="button" onClick={() => remove(index)}>
                                        <RiCloseLine size={25} color="red" />
                                    </button>
                                </TCell>
                            </TRow>
                        ))}
                        <div className="lists-table__add-row">
                            <Button type="button" style="outline" onClick={onAddList}>
                                <RiAddLine size={20} />
                            </Button>
                        </div>
                    </Table>
                    {errors.partiesLists && (
                        <span className="error-message">
                            <RiErrorWarningLine size={14} />
                            {errors.partiesLists.message}
                        </span>
                    )}
                </div>
                <div className="calc-result-btn">
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Calculando...' : 'Calcular'}
                    </Button>
                </div>
            </form>
        </Fragment>
    );
};

export default Calculate;
