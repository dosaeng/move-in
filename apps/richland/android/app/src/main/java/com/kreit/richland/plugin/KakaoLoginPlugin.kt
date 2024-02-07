package com.kreit.richland.plugin

import android.util.Log
import com.getcapacitor.JSObject
import com.getcapacitor.Plugin
import com.getcapacitor.PluginCall
import com.getcapacitor.PluginMethod
import com.getcapacitor.annotation.CapacitorPlugin
import com.kakao.sdk.common.KakaoSdk
import com.kakao.sdk.common.model.ClientError
import com.kakao.sdk.common.model.ClientErrorCause
import com.kakao.sdk.common.util.Utility
import com.kakao.sdk.user.UserApiClient


@CapacitorPlugin(name = "KakaoLogin")
class KakaoLoginPlugin : Plugin() {
    private val TAG: String = "KakaoLoginPlugin"

    @PluginMethod
    fun initialize(call: PluginCall) {
        val appKey = call.getString("appKey")

        Log.d(TAG, Utility.getKeyHash(this.context))
        if (appKey == null) {
            call.reject("Require kakao appKey", "REQUIRED_APP_KEY");
            return;
        }

        KakaoSdk.init(this.context, appKey)

        call.resolve()
    }

    @PluginMethod
    // 카카오톡으로 로그인
    fun loginWithKakaoTalk(call: PluginCall) {
        UserApiClient.instance.loginWithKakaoTalk(context) { token, error ->
            when(error) {
                null -> {
                    if(token == null) {
                        call.reject("Invalid login result", "LOGIN_INVALID_RESULT")
                        Log.e(TAG, "Failed kakao login. Not exist token")
                    } else {
                        val ret = JSObject()
                        ret.put("accessToken", token.accessToken)
                        ret.put("refreshToken", token.refreshToken)
                        ret.put("idToken", token.idToken)
                        call.resolve(ret)
                    }
                }
                is ClientError -> {
                    call.reject("Unavailable kakao login", "LOGIN_UNAVAILABLE", Exception(error.message))
                }
                else -> {
                    call.reject("Failed login", "LOGIN_ERROR", Exception(error.message))
                    Log.e(TAG, "Failed kakao login", error)
                }
            }
        }
    }

    @PluginMethod
    // 사용자 액세스 토큰과 리프레시 토큰을 모두 만료시켜, 더 이상 해당 사용자 정보로 카카오 API를 호출할 수 없도록 합니다.
    fun logout(call: PluginCall) {
        UserApiClient.instance.logout { error ->
            if (error != null) {
                call.reject("Failed logout", "LOGOUT_ERROR", Exception(error.message))
                Log.e(TAG, "Failed kakao logout", error)
            }
            else {
                call.resolve()
            }
        }
    }

    @PluginMethod
    // 카카오 플랫폼 안에서 앱과 사용자 카카오계정의 연결 상태를 해제합니다.
    fun unlink(call: PluginCall) {
        UserApiClient.instance.unlink { error ->
            if (error != null) {
                call.reject("Failed unlink", "UNLINK_ERROR", Exception(error.message))
                Log.e(TAG, "Failed kakao unlink", error)
            }
            else {
                call.resolve()
            }
        }
    }
}
