import React, { useState } from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { Button, Form } from 'react-bootstrap';

import login from '../images/login.jpg';
import { useAuth } from '../hooks/index.jsx';

const LoginPage = () => {
  const { t } = useTranslation();
  const [authFailed, setAuthFailed] = useState(false);
  const { logIn } = useAuth();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: yup.object({
      username: yup.string().trim().required(),
      password: yup.string().required(),
    }),
    onSubmit: async (values) => {
      setAuthFailed(false);
      try {
        await logIn(values);
      } catch (err) {
        setAuthFailed(true);
      }
    },
  });

  return (
    <div className="h-100">
      <div className="h-100" id="chat">
        <div className="d-flex flex-column h-100">
          <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
            <div className="container">
              <a className="navbar-brand" href="/">Hexlet Chat</a>
            </div>
          </nav>
          <div className="container-fluid h-100">
            <div className="row justify-content-center align-content-center h-100">
              <div className="col-12 col-md-8 col-xxl-6">
                <div className="card shadow-sm">
                  <div className="card-body row p-5">
                    <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                      <img src={login} className="rounded-circle" alt="Войти" />
                    </div>
                    <Form className="col-12 col-md-6 mt-3 mt-mb-0" onSubmit={formik.handleSubmit}>
                      <h1 className="text-center mb-4">{t('login.header')}</h1>
                      <Form.Group className="form-floating mb-3">
                        <Form.Control
                          name="username"
                          autoComplete="username"
                          required=""
                          placeholder="Ваш ник"
                          id="username"
                          className="form-control"
                          onChange={formik.handleChange}
                          value={formik.values.username}
                          isInvalid={authFailed}
                        />
                        <Form.Label className="form-label" htmlFor="username">{t('login.username')}</Form.Label>
                      </Form.Group>
                      <Form.Group className="form-floating mb-4">
                        <Form.Control
                          name="password"
                          autoComplete="current-password"
                          required=""
                          placeholder="Пароль"
                          type="password"
                          id="password"
                          className="form-control"
                          onChange={formik.handleChange}
                          value={formik.values.password}
                          isInvalid={authFailed}
                        />
                        <Form.Label className="form-label" htmlFor="password">{t('login.password')}</Form.Label>
                        <Form.Control.Feedback type="invalid">{t('login.authFailed')}</Form.Control.Feedback>
                      </Form.Group>
                      <Button type="submit" className="w-100 mb-3 btn btn-outline-primary">{t('login.submit')}</Button>
                    </Form>
                  </div>
                  <div className="card-footer p-4">
                    <div className="text-center">
                      <span>{t('login.newToChat')}</span>
                      <a href="/signup">{t('login.signup')}</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="Toastify" />
      </div>
    </div>
  );
};

export default LoginPage;
