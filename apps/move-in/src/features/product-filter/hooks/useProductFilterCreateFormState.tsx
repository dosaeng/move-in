/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from 'react';
import { ProductFilterCreateRequestModel } from './useCreateProductFilter';

const ProductFilterCreateFormContext = createContext<{
  data: ProductFilterCreateRequestModel | undefined;
  setData: (data: ProductFilterCreateRequestModel | undefined) => void;
}>({ setData: () => {}, data: undefined });

export const useProductFilterCreateFormState = () => {
  return useContext(ProductFilterCreateFormContext);
};

export const ProductFilterCreateFormContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [value, setValue] = useState<ProductFilterCreateRequestModel | undefined>();

  return (
    <ProductFilterCreateFormContext.Provider value={{ data: value, setData: setValue }}>
      {children}
    </ProductFilterCreateFormContext.Provider>
  );
};
