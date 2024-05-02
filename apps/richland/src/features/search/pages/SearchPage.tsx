import { Outlet } from 'react-router-dom';
import {
  SearchFormContextProvider
} from '../hooks/useSearchFormContext';

const SearchPage: React.FC = () => {
  return (
    <SearchFormContextProvider>
      <Outlet />
    </SearchFormContextProvider>
  );
};

export default SearchPage;
