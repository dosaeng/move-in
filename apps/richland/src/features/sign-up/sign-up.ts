export enum SignUpType {
  kakao,
  apple,
}

export const signUpTypeToString = (type: SignUpType) => {
  switch (type) {
    case SignUpType.kakao:
      return '카카오';
    case SignUpType.apple:
      return '애플';
  }
};
