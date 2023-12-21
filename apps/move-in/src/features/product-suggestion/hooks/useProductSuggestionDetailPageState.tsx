import useProductConsultingList from '@/features/product-consulting/hooks/useProductConsultingList';

const useProductSuggestionDetailPageState = (suggestionId: number | string) => {
  const { data: consultingList, isLoading } = useProductConsultingList();

  return {
    canRequestConsulting: isLoading
      ? false
      : consultingList?.find(
          (item) => item.suggestionId === Number(suggestionId)
        ) == null,
  };
};

export default useProductSuggestionDetailPageState;
