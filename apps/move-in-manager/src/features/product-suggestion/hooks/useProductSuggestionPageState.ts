import useProductFilterDetail from "../../product-filter/hooks/useProductFilterDetail"

const useProductSuggestionPageState = (filterId: string | number) => {
  const { data } = useProductFilterDetail(filterId);

  return {
    filterName: data?.name ?? '',
  }
}


export default useProductSuggestionPageState;
