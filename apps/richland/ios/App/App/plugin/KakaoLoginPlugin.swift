//
//  KakaoLoginPlugin.swift
//  App
//
//  Created by eunjun park on 2/7/24.
//
import Capacitor
import KakaoSDKCommon
import KakaoSDKAuth
import KakaoSDKUser

@objc(KakaoLoginPlugin)
public class KakaoLoginPlugin: CAPPlugin {
    @objc func initialize(_ call: CAPPluginCall) {
        let appKey = call.getString("appKey") ?? ""
        
        if(appKey.isEmpty) {
            call.reject("Require kakao appKey", "REQUIRED_APP_KEY")
            return
        }
        
        KakaoSDK.initSDK(appKey: appKey)
        
        call.resolve()
    }
    
    // 카카오톡으로 로그인
    @objc func loginWithKakaoTalk(_ call: CAPPluginCall) {
        if (!UserApi.isKakaoTalkLoginAvailable()) {
            call.reject("Unavailable kakao login", "LOGIN_UNAVAILABLE")
            return
        }
        
        UserApi.shared.loginWithKakaoTalk {(oauthToken, error) in
            if let error = error {
                call.reject("Failed login", "LOGIN_ERROR", error)
                return
            }
            
            if let oauthToken = oauthToken {
                call.resolve([
                    "accessToken": oauthToken.accessToken,
                    "refreshToken": oauthToken.refreshToken,
                    "idToken": oauthToken.idToken ?? ""
                ])
                return
            }
            
            call.reject("Invalid login result", "LOGIN_INVALID_RESULT")
        }
    }
    
    // 사용자 액세스 토큰과 리프레시 토큰을 모두 만료시켜, 더 이상 해당 사용자 정보로 카카오 API를 호출할 수 없도록 합니다.
    @objc func logout(_ call: CAPPluginCall) {
        UserApi.shared.logout { error in
            if let error = error {
                call.reject("Failed logout", "LOGOUT_ERROR", error)
                return
            }
            
            call.resolve()
        }
    }
    
    // 카카오 플랫폼 안에서 앱과 사용자 카카오계정의 연결 상태를 해제합니다.
    @objc func unlink(_ call: CAPPluginCall) {
        UserApi.shared.unlink { error in
            if let error = error {
                call.reject("Failed unlink", "UNLINK_ERROR", error)
                return
            }
            
            call.resolve()
        }
    }
}
