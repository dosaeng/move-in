/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from 'react';
import { SignUpRequestModel } from './useSignUp';

const SignUpContext = createContext<{
  data: SignUpRequestModel | undefined;
  setData: (data: SignUpRequestModel | undefined) => void;
}>({ setData: () => {}, data: undefined });

export const useSignUpFormState = () => {
  return useContext(SignUpContext);
};

export const SignUpFormContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [value, setValue] = useState<SignUpRequestModel | undefined>();

  return <SignUpContext.Provider value={{ data: value, setData: setValue }}>{children}</SignUpContext.Provider>;
};
