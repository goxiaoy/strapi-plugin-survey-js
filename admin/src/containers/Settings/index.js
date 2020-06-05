import React, { useEffect, useReducer, useRef } from 'react';
import PropTypes from 'prop-types';
import { Header, Inputs } from '@buffetjs/custom';
import pluginId from '../../pluginId';
import { LoadingIndicatorPage, useGlobalContext, request } from 'strapi-helper-plugin';
import init from './init';
import reducer, { initialState } from './reducer';
import { getRequestUrl, getTrad } from '../../utils';
import { isEqual } from 'lodash';
import styled from 'styled-components';


const Wrapper = styled.div`
  padding: 25px 10px;
  margin-top: 33px;
  border-radius: ${({ theme }) => theme.main.sizes.borderRadius};
  box-shadow: 0 2px 4px ${({ theme }) => theme.main.colors.darkGrey};
  background: ${({ theme }) => theme.main.colors.white};
`;
const Settings = () => {
    const { formatMessage } = useGlobalContext();
    const [reducerState, dispatch] = useReducer(reducer, initialState, init);
    const { initialData, isLoading, modifiedData } = reducerState.toJS();
    const isMounted = useRef(true);
    const getDataRef = useRef();
    const abortController = new AbortController();

    getDataRef.current = async () => {
        try {
            const { signal } = abortController;
            const { data } = await request(getRequestUrl('settings', { method: 'GET', signal }));

            if (isMounted.current) {
                dispatch({
                    type: 'GET_DATA_SUCCEEDED',
                    data,
                });
            }
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        getDataRef.current();

        return () => {
            abortController.abort();
            isMounted.current = false;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSubmit = async () => {
        try {
            await request(getRequestUrl('settings'), {
                method: 'PUT',
                body: modifiedData,
            });

            if (isMounted.current) {
                dispatch({
                    type: 'SUBMIT_SUCCEEDED',
                });
            }

            strapi.notification.success('notification.form.success.fields');
        } catch (err) {
            console.error(err);
        }
    };
    const headerProps = {
        title: {
            label: formatMessage({ id: getTrad('settings.header.label') }),
        },
        content: formatMessage({
            id: getTrad('settings.sub-header.label'),
        }),
        actions: [
            {
                color: 'cancel',
                disabled: isEqual(initialData, modifiedData),
                // TradId from the strapi-admin package
                label: formatMessage({ id: 'app.components.Button.cancel' }),
                onClick: () => {
                    dispatch({
                        type: 'CANCEL_CHANGES',
                    });
                },
                type: 'button',
            },
            {
                disabled: false,
                color: 'success',
                // TradId from the strapi-admin package
                label: formatMessage({ id: 'app.components.Button.save' }),
                onClick: handleSubmit,
                type: 'button',
            },
        ],
    };

    const handleChange = ({ target: { name, value } }) => {
        dispatch({
            type: 'ON_CHANGE',
            keys: name,
            value,
        });
    };

    return (
        <>
            <Header {...headerProps} />
            <Wrapper>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-6">
                            <Inputs
                                label={formatMessage({
                                    id: getTrad('settings.form.license.label'),
                                })}
                                description={formatMessage({
                                    id: getTrad('settings.form.license.description'),
                                })}
                                name="license"
                                onChange={handleChange}
                                value={modifiedData.license}
                                type="bool"
                            />
                        </div>
                    </div>
                </div>
            </Wrapper>
        </>
    );
};


export default Settings;