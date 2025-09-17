import { ErrorMessage, Formik } from 'formik';
import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useAppSelector } from '../../hooks';
import { actions } from '../../redux/model/userActions';
import { useAppDispatch } from '../../redux/store';
import './Auth.scss';

type FormValues = { username: string; password: string };

export const Auth: FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const isLoggedIn = useAppSelector((s) => s.auth.isLoggedIn);
    const error = useAppSelector((s) => s.auth.error);

    const [isLogin, setIsLogin] = useState(true);

    useEffect(() => {
        if (isLoggedIn) navigate('/');
    }, [isLoggedIn, navigate]);

    const schema = Yup.object().shape({
        username: Yup.string().required('Required'),
        password: Yup.string().required('Required'),
    });

    const onSubmit = (values: FormValues) => {
        if (isLogin) dispatch(actions.loginRequest(values));
        else dispatch(actions.registerRequest(values));
    };

    return (
        <div className="auth">
            <div className="auth__box">
                <h2>{isLogin ? 'Login' : 'Register'}</h2>

                <Formik initialValues={{ username: '', password: '' }} validationSchema={schema} onSubmit={onSubmit}>
                    {({ handleChange, handleBlur, values, handleSubmit }) => (
                        <form onSubmit={handleSubmit}>
                            <div className="field">
                                <label>Username</label>
                                <input name="username" value={values.username} onChange={handleChange} onBlur={handleBlur} />
                                <ErrorMessage name="username" component="div" className="error__message" />
                            </div>

                            <div className="field">
                                <label>Password</label>
                                <input name="password" type="password" value={values.password} onChange={handleChange} onBlur={handleBlur} />
                                <ErrorMessage name="password" component="div" className="error__message" />
                            </div>

                            {error && <div className="error__message">{error}</div>}

                            <button type="submit" className="auth__button">{isLogin ? 'Login' : 'Register'}</button>
                        </form>
                    )}
                </Formik>

                <p className="auth__switch">
                    {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
                    <span onClick={() => setIsLogin(!isLogin)}>{isLogin ? 'Register' : 'Login'}</span>
                </p>
            </div>
        </div>
    );
};