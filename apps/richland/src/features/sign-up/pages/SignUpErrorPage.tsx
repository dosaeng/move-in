import { IonContent, IonFooter, IonPage } from '@ionic/react';
import { Button, CTAButtonBlock } from '@move-in/design-system';
import { css } from '@move-in/styled-system/css';
import { useNavigate, useSearchParams } from 'react-router-dom';

const SignUpErrorPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const errorCode = searchParams.get('errorCode');
  let errorMessage = (
    <>
      회원가입에 실패했어요
      <br />
      다시 시도해주세요
    </>
  );

  // TODO. 에러코드 업데이트하기
  if (errorCode === '001') {
    errorMessage = (
      <>
        아쉽지만 리치랜드는 <br />
        내국인만 이용가능합니다
      </>
    );
  } else if (errorCode === '002') {
    errorMessage = (
      <>
        최근에 탈퇴한 이력이 있습니다 <br />
        내일 다시 시도해주세요
      </>
    );
  }

  return (
    <IonPage>
      <IonContent
        className={css({
          '--padding-top': '24px',
          '--padding-start': '16px',
          '--padding-end': '16px',
          '--padding-bottom': '24px',
        })}
      >
        <div
          className={css({
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: '24px',
            height: '100%',
          })}
        >
          <div
            className={css({
              position: 'relative',
              height: '200px',
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
            })}
          >
            <img
              className={css({
                width: '200px',
                height: '200px',
              })}
              src="/images/error-illust.png"
            />
            <div
              className={css({
                position: 'absolute',
                bottom: '-12px',
                whiteSpace: 'nowrap',
                textAlign: 'center',
                textStyle: 'header-20-sb',
              })}
            >
              {errorMessage}
            </div>
          </div>
        </div>
      </IonContent>
      <IonFooter className="ion-no-border">
        <CTAButtonBlock className={css({ width: '100%' })}>
          <Button
            className={css({
              maxWidth: '100%',
            })}
            label="처음으로 돌아가기"
            onClick={() => {
              navigate('/sign-up');
            }}
          />
        </CTAButtonBlock>
      </IonFooter>
    </IonPage>
  );
};

export default SignUpErrorPage;
