/* eslint-disable react-refresh/only-export-components */
import { ProductAddress, ProductUsage } from '@/features/product/product';
import { createContext, useContext, useState } from 'react';

export interface SearchFormModel {
  usageList: ProductUsage[];
  addressList: ProductAddress[];
}

const SearchFormContext = createContext<{
  value: SearchFormModel;
  updateValue: (data: Partial<SearchFormModel>) => void;
}>({
  value: {
    usageList: [],
    addressList: [],
  },
  updateValue: () => {
    throw Error('Must be implemented');
  },
});

export const SearchFormContextProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [internalValue, setInternalValue] = useState<SearchFormModel>({
    usageList: [],
    addressList: [],
  });
  const updateValue = (value: Partial<SearchFormModel>) => {
    setInternalValue({ ...internalValue, ...value });
  };

  return (
    <SearchFormContext.Provider value={{ value: internalValue, updateValue }}>
      {children}
    </SearchFormContext.Provider>
  );
};

const useSearchFormContext = () => {
  return useContext(SearchFormContext);
};

export default useSearchFormContext;
