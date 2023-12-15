import { useMutation, useQuery } from "react-query";

// 회원가입 이후 필터 설정을 유도하는 팝업 표시 상태를 관리
const useProductFilterCreateNudgeState = () => {
  const { data, refetch, isLoading } = useQuery('productFilterNudgeState', async () => {
    return localStorage.getItem('productFilterNudgeState') === 'true' ? false : true;
  });

  const { mutate } = useMutation(async () => {
    localStorage.setItem('productFilterNudgeState', 'true');
    refetch();
  })

  return {
    state: data,
    isLoading,
    mutate,
  }
}

export default useProductFilterCreateNudgeState;
