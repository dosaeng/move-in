# Move In
- Move In 클라이언트 서비스를 위한 Monorepo 입니다.

## 구조
### apps 
- 사용자에게 제공되는 어플리케이션들이 작성됩니다.
- [move-in](./move-in) : 일반 사용자용 어플리케이션
  - [디자인](https://www.figma.com/file/5veNVojUpZB9aRslcQz2AA/%5BMove-In%5D-User-Mobile-App-(v1.0)?node-id=13%3A1228&mode=dev)
- [move-in-manager](./move-in-manager) : 중개사용 어플리케이션
  - [디자인](https://www.figma.com/file/4HSLjESLC9VPep3LTmqUH6/%5BMove-In%5D-Manager-Mobile-App-(v0.1)?node-id=0%3A1&mode=dev)

### packages
- 어플리케이션에서 사용되는 패키지들을 작성합니다.
  - 각 어플리케이션에서 공통으로 사용되거나 관리 소요로 인해 분리된 패키지 등

## 시작하기
- `yarn install`로 의존성 패키지 설치
- `yarn user:dev`로 사용자 어플리케이션 개발 서버 실행
  - 그 외 스크립트는 `package.json` 참고

