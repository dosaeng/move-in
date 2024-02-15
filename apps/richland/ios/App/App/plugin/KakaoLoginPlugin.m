//
//  KakaoLoginPlugin.m
//  App
//
//  Created by eunjun park on 2/7/24.
//

#import <Capacitor/Capacitor.h>

CAP_PLUGIN(KakaoLoginPlugin, "KakaoLogin",
    CAP_PLUGIN_METHOD(initialize, CAPPluginReturnPromise);
    CAP_PLUGIN_METHOD(loginWithKakaoTalk, CAPPluginReturnPromise);
    CAP_PLUGIN_METHOD(logout, CAPPluginReturnPromise);
    CAP_PLUGIN_METHOD(unlink, CAPPluginReturnPromise);
)
