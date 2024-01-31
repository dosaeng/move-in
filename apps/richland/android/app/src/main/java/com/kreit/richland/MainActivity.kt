package com.kreit.richland;

import android.os.Bundle
import com.getcapacitor.BridgeActivity
import com.kreit.richland.plugin.KakaoLoginPlugin

class MainActivity: BridgeActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        registerPlugin(KakaoLoginPlugin::class.java)

        super.onCreate(savedInstanceState)
    }
}
