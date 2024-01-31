import { IonContent, IonFooter, IonPage } from '@ionic/react';
import { Button, CTAButtonBlock } from '@move-in/design-system';
import { css } from '@move-in/styled-system/css';
import { useNavigate, useSearchParams } from 'react-router-dom';

const LogoutNoticePage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const errorCode = searchParams.get('errorCode');
  let errorMessage = (
    <>
      60분 간 활동이 없어 <br />
      로그아웃 되었습니다
    </>
  );
  let helperMessage = <>다시 로그인 해주세요</>;

  // TODO. 에러코드 업데이트하기
  if (errorCode === '002') {
    errorMessage = (
      <>
        다른 기기에서
        <br />
        로그인 되었습니다
      </>
    );

    helperMessage = <>이어하시려면 다시 로그인 해주세요</>;
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
                bottom: '-42px',
                whiteSpace: 'nowrap',
                textAlign: 'center',
                textStyle: 'header-20-sb',
                color: 'text.dark.04',
              })}
            >
              {errorMessage}
              <div
                className={css({
                  whiteSpace: 'nowrap',
                  textAlign: 'center',
                  textStyle: 'body-16-m',
                  color: 'text.dark.01',
                  marginTop: '8px',
                })}
              >
                {helperMessage}
              </div>
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
            label="다시 로그인하기"
            onClick={() => {
              navigate('/sign-up');
            }}
          />
        </CTAButtonBlock>
      </IonFooter>
    </IonPage>
  );
};

export default LogoutNoticePage;
