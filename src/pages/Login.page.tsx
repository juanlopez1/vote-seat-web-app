import { Controller, type SubmitHandler, useForm } from 'react-hook-form';
import Input from '@vote-seat-web-app/components/Input';
import useSession from '@vote-seat-web-app/contexts/session.context';
import Button from '@vote-seat-web-app/components/Button';
import { RiErrorWarningLine } from '@remixicon/react';

type FormData = {
    username: string;
    password: string;
};

const Login = () => {
    const { fetching, error, login } = useSession();
    const {
        control,
        formState: { errors, isSubmitting },
        handleSubmit,
    } = useForm<FormData>({
        defaultValues: {
            username: '',
            password: '',
        },
    });

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        login(data.username, data.password);
    };

    return (
        <div className="login-page__wrapper">
            <h1>VoteSeat</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="login-from">
                <Controller
                    name="username"
                    control={control}
                    rules={{ required: 'Complete este campo' }}
                    render={({ field: { name, onChange, onBlur, value } }) => (
                        <Input
                            name={name}
                            type="text"
                            value={value}
                            label="Usuario"
                            onBlur={onBlur}
                            onChange={onChange}
                            error={errors.username?.message}
                        />
                    )}
                />
                <Controller
                    name="password"
                    control={control}
                    rules={{ required: 'Complete este campo' }}
                    render={({ field: { name, onChange, onBlur, value } }) => (
                        <Input
                            name={name}
                            type="password"
                            value={value}
                            label="Contraseña"
                            onBlur={onBlur}
                            onChange={onChange}
                            error={errors.password?.message}
                        />
                    )}
                />
                <Button type="submit" disabled={isSubmitting || fetching}>
                    Iniciar sesión
                </Button>
                {error && (
                    <span className="error-message">
                        <RiErrorWarningLine size={14} />
                        Usuario y/o contraseña incorrecta.
                    </span>
                )}
            </form>
        </div>
    );
};

export default Login;
