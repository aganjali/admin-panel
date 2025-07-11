'use client';

import React, { type FC, useMemo, useReducer, useCallback } from 'react';

import {
  initialReducer,
  ManagedUIContext,
  type ManagedUIAction,
  type UserModalViewArgs,
  type ManagedUIContextType,
  type IManagedUIReducerState,
} from './context';

function uiReducer(state: IManagedUIReducerState, action: ManagedUIAction): IManagedUIReducerState {
  switch (action.type) {
    case 'OPEN_MODAL': {
      return {
        ...state,
        displayModal: true,
      };
    }
    case 'CLOSE_MODAL': {
      state.modalView.onModalClose?.();
      return {
        ...state,
        displayModal: false,
        modalView: { ...state.modalView, onModalClose: undefined },
      };
    }
    case 'SET_MODAL_VIEW': {
      return {
        ...state,
        modalView: {
          ...action.view,
        },
      };
    }
  }
}

interface Props {
  children: React.ReactNode;
}

export const ManagedUIProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(uiReducer, initialReducer);

  const openModal = useCallback(() => {
    dispatch({ type: 'OPEN_MODAL' });
  }, []);
  const closeModal = useCallback(() => {
    dispatch({ type: 'CLOSE_MODAL' });
  }, []);

  const setModalView = useCallback((view: UserModalViewArgs) => {
    dispatch({
      type: 'SET_MODAL_VIEW',
      view: {
        ...view,
        props: view.props ?? { cancelable: true },
        onModalClose: view.props?.onModalClose,
      },
    });
  }, []);
  const walletPasswordResolver = useCallback(async () => {
    return new Promise<string>((resolve, reject) => {
      setModalView({
        name: 'WALLET_PASSWORD',
        args: {
          submitFn: async (p) => {
            resolve(p);
          },
        },
        props: {
          onModalClose() {
            reject(new Error('Canceled by user'));
          },
          cancelable: true,
        },
      });
      openModal();
    });
  }, [setModalView, openModal]);

  const value = useMemo<ManagedUIContextType>(
    () => ({
      ...state,
      openModal,
      closeModal,
      setModalView,
      walletPasswordResolver,
    }),
    [state, openModal, walletPasswordResolver, closeModal, setModalView]
  );

  return <ManagedUIContext.Provider value={value}>{children}</ManagedUIContext.Provider>;
};
