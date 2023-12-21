/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from 'react';
import { ProductSuggestionRequestModel } from './useRequestProductSuggestion';

const ProductSuggestionFormContext = createContext<{
  data: ProductSuggestionRequestModel | undefined;
  setData: (data: ProductSuggestionRequestModel | undefined) => void;
}>({ setData: () => {}, data: undefined });

export const useProductSuggestionFormContext = () => {
  return useContext(ProductSuggestionFormContext);
};

export const ProductSuggestionFormContextProvider: React.FC<
  React.PropsWithChildren<{
    initialValue?: ProductSuggestionRequestModel;
  }>
> = ({ initialValue, children }) => {
  const [value, setValue] = useState<ProductSuggestionRequestModel | undefined>(
    initialValue
  );

  return (
    <ProductSuggestionFormContext.Provider
      value={{ data: value, setData: setValue }}
    >
      {children}
    </ProductSuggestionFormContext.Provider>
  );
};
