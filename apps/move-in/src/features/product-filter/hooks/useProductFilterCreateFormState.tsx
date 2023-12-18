/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from 'react';
import { ProductFilterCreateRequestModel } from './useCreateProductFilter';
import useProductFilterList from './useProductFilterList';
import { format } from 'date-fns';

const ProductFilterCreateFormContext = createContext<{
  data: ProductFilterCreateRequestModel | undefined;
  setData: (data: ProductFilterCreateRequestModel | undefined) => void;
}>({ setData: () => {}, data: undefined });

export const useProductFilterCreateFormState = () => {
  return useContext(ProductFilterCreateFormContext);
};

export const ProductFilterCreateFormContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { data } = useProductFilterList();

  const [value, setValue] = useState<ProductFilterCreateRequestModel | undefined>({
    defaultName: `필터 ${(data?.length ?? 0) + 1} (${format(new Date(), 'yyyy-MM-dd')})`,
  });

  return (
    <ProductFilterCreateFormContext.Provider value={{ data: value, setData: setValue }}>
      {children}
    </ProductFilterCreateFormContext.Provider>
  );
};
