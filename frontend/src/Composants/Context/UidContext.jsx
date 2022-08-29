import { createContext, useState } from 'react';

export const UidContext = createContext();

export const UidProvider = ({ children }) => {
  const [uid, setUid] = useState('');

  return (
    <UidContext.Provider value={{ uid, setUid }}>
      {children}
    </UidContext.Provider>
  );
};
