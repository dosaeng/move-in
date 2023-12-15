import useProductSuggestionList from "./useProductSuggestionList";

const useProductFilterDetailViewState = (filterId: string | number) => {
  const { data } = useProductSuggestionList(filterId);

  return {
    hasSuggestionList: !!data?.length,
  }
}


export default useProductFilterDetailViewState;
