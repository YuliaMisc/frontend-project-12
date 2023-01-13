import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Form } from 'react-bootstrap';
import { useFormik } from 'formik';

import { useApi } from '../hooks/index.jsx';
import { actions as modalActions } from '../slices/modalSlice.js';
import { actions as channelsActions } from '../slices/channelsSlice.js';

const AddChannelModal = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { addCannel } = useApi();
  const { channels } = useSelector((state) => state.channelsReducer);
  const namesChannels = channels.map(({ name }) => name);

  const [nameUniqueness, setNameUniqueness] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState(false);

  const handleClose = () => {
    dispatch(modalActions.closeModal());
  };

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    onSubmit: async ({ name }) => {
      setLoadingStatus(true);
      try {
        if (!namesChannels.includes(name)) { // eslint-disable-line
          const data = await addCannel(name);
          dispatch(modalActions.closeModal());
          dispatch(channelsActions.switchChannel(data.id));
        } else {
          throw Error('Channel already exists');
        }
      } catch (err) {
        setNameUniqueness(true);
        setLoadingStatus(false);
      }
    },
  });

  const input = useRef(null);
  useEffect(() => input.current.focus(), []);

  return (
    <div role="dialog" aria-modal="true" className="fade modal show" tabIndex="-1" style={{ display: 'block' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <div className="modal-title h4">{t('channel.addChannel')}</div>
            <button type="button" aria-label="Close" data-bs-dismiss="modal" className="btn btn-close" onClick={handleClose} />
          </div>
          <div className="modal-body">
            <Form className="" onSubmit={formik.handleSubmit}>
              <Form.Group>
                <Form.Control
                  name="name"
                  id="name"
                  className="mb-2 form-control"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  ref={input}
                  isInvalid={nameUniqueness}
                />
                <Form.Label className="visually-hidden" htmlFor="name">{t('channel.nameChannel')}</Form.Label>
                <Form.Control.Feedback className="invalid-feedback">{t('channel.feedback')}</Form.Control.Feedback>
                <div className="d-flex justify-content-end">
                  <Button type="button" disabled={loadingStatus} className="me-2 btn btn-secondary" onClick={handleClose}>{t('channel.cancel')}</Button>
                  <Button type="submit" disabled={loadingStatus} className="btn btn-primary">{t('channel.send')}</Button>
                </div>
              </Form.Group>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

const RenameCannel = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { renameChannel } = useApi();
  const { channelId } = useSelector((state) => state.modalReducer);
  const { channels } = useSelector((state) => state.channelsReducer);
  const namesChannels = channels.map(({ name }) => name);

  const [nameUniqueness, setNameUniqueness] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState(false);

  const handleClose = () => {
    dispatch(modalActions.closeModal());
  };

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    onSubmit: async ({ name }) => {
      setLoadingStatus(true);
      try {
        if (!namesChannels.includes(name)) { // eslint-disable-line
          await renameChannel(name, channelId);
          dispatch(modalActions.closeModal());
        } else {
          throw Error('Channel already exists');
        }
      } catch (err) {
        setNameUniqueness(true);
        setLoadingStatus(false);
      }
    },
  });

  const input = useRef(null);
  useEffect(() => input.current.focus(), []);

  return (
    <div role="dialog" aria-modal="true" className="fade modal show" tabIndex="-1" style={{ display: 'block' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <div className="modal-title h4">{t('channel.renameChannel')}</div>
            <button type="button" aria-label="Close" data-bs-dismiss="modal" onClick={handleClose} className="btn btn-close" />
          </div>
          <div className="modal-body">
            <Form className="" onSubmit={formik.handleSubmit}>
              <Form.Group>
                <Form.Control
                  name="name"
                  id="name"
                  className="mb-2 form-control"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  ref={input}
                  isInvalid={nameUniqueness}
                />
                <Form.Label className="visually-hidden" htmlFor="name">{t('channel.nameChannel')}</Form.Label>
                <Form.Control.Feedback className="invalid-feedback">{t('channel.feedback')}</Form.Control.Feedback>
                <div className="d-flex justify-content-end">
                  <Button type="button" disabled={loadingStatus} className="me-2 btn btn-secondary" onClick={handleClose}>{t('channel.cancel')}</Button>
                  <Button type="submit" disabled={loadingStatus} className="btn btn-primary">{t('channel.send')}</Button>
                </div>
              </Form.Group>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

const RemoveChannel = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { removeChannel } = useApi();
  const { channelId } = useSelector((state) => state.modalReducer);
  const [loadingStatus, setLoadingStatus] = useState(false);

  const handleClose = () => {
    dispatch(modalActions.closeModal());
  };

  const handleRemove = async () => {
    await removeChannel(channelId);
    dispatch(modalActions.closeModal());
    dispatch(channelsActions.switchChannel(1));
    setLoadingStatus(true);
  };

  return (
    <div role="dialog" aria-modal="true" className="fade modal show" tabIndex="-1" style={{ display: 'block' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <div className="modal-title h4">{t('channel.removeChannel')}</div>
            <button type="button" aria-label="Close" data-bs-dismiss="modal" className="btn btn-close" onClick={handleClose} />
          </div>
          <div className="modal-body">
            <p className="lead">{t('channel.truly')}</p>
            <div className="d-flex justify-content-end">
              <button type="button" className="me-2 btn btn-secondary" disabled={loadingStatus} onClick={handleClose}>{t('channel.cancel')}</button>
              <button type="button" className="btn btn-danger" disabled={loadingStatus} onClick={handleRemove}>{t('channel.remove')}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const listModal = {
  addCannel: AddChannelModal,
  removeCannel: RemoveChannel,
  renameCannel: RenameCannel,
};

const Modal = () => {
  const { modalType } = useSelector((state) => state.modalReducer);
  const ActiveModal = listModal[modalType];
  return modalType ? <ActiveModal /> : '';
};

export default Modal;