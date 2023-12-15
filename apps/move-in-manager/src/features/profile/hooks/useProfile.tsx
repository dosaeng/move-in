import { useQuery } from 'react-query';

interface ProfileModel {
  id: number;
  name: string;
  type: string;
  profileImage: string;
  reviewScore: number;
  reviewCount: number;
}

const useProfile = () => {
  return useQuery<ProfileModel>('profile', async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return {
      id: 1,
      name: '김영희',
      type: '베테랑 중개인',
      profileImage: 'https://placehold.co/300x300?text=profile',
      reviewScore: 4.5,
      reviewCount: 100,
    };
  });
};

export default useProfile;
