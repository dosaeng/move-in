import useProductFilterList, { ProductFilterState } from './useProductFilterList';

const useProductFilterPageState = () => {
  const { data, refetch, isLoading } = useProductFilterList();

  return {
    isEmpty: !isLoading && !data?.length,
    hasExpiredList: data?.some((item) => item.state === ProductFilterState.EXPIRED),
    draftCount: data?.filter((item) => item.state === ProductFilterState.DRAFT).length ?? 0,
    refetch,
  };
};

export default useProductFilterPageState;
