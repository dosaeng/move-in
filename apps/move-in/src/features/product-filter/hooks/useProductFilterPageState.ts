import useProductFilterList from './useProductFilterList';

const useProductFilterPageState = () => {
  const { data, isLoading } = useProductFilterList();

  return {
    isEmpty: !isLoading && !data?.length,
    hasExpiredList: data?.some((item) => item.state === 'EXPIRED'),
  };
};

export default useProductFilterPageState;
