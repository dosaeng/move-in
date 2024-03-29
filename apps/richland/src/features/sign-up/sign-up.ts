export enum SignUpType {
  kakao,
  apple,
}

export const signUpTypeToString = (
  type?: SignUpType,
  { defaultString = '' }: { defaultString?: string } = {}
) => {
  if (type == null) return defaultString;

  switch (type) {
    case SignUpType.kakao:
      return '카카오';
    case SignUpType.apple:
      return '애플';
  }
};
