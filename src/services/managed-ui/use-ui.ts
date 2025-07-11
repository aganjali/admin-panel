import { useContext } from 'react';

import { ManagedUIContext } from './context';

export const useUI = () => {
  const context = useContext(ManagedUIContext);

  if (context === undefined) {
    throw new Error(`useUI must be used within a UIProvider`);
  }
  return context;
};
