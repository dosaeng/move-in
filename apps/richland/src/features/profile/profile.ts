import { SignUpType } from "../sign-up/sign-up";

export const signUpTypeToMethodString = (
  type?: SignUpType,
  { defaultString = '' }: { defaultString?: string } = {}
) => {
  if (type == null) return defaultString;

  switch (type) {
    case SignUpType.kakao:
      return '카카오로 가입';
    case SignUpType.apple:
      return '애플로 가입';
  }
};
