import useProductConsultingList from './useProductConsultingList';

const useProductConsultingPageState = () => {
  const { data, refetch, isLoading } = useProductConsultingList();

  return {
    isEmpty: !isLoading && !data?.length,
    hasWaitingConsulting: data?.some((item) => item.state === 'WAITING'),
    hasDoneConsulting: data?.some((item) => item.state === 'DONE'),
    refetch,
  };
};

export default useProductConsultingPageState;
