package com.yingtranslation;

import android.os.Bundle;

import com.facebook.react.ReactActivity;
import android.content.Intent;

import org.devio.rn.splashscreen.SplashScreen;
import com.yingtranslation.module.ShareModule;
import com.umeng.socialize.UMShareAPI;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "YingTranslation";
    }


    /**
     *  显示启动页方法
     */
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        SplashScreen.show(this );  // here
        super.onCreate(savedInstanceState);
        ShareModule.initActivity(this);
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        UMShareAPI.get(this).onActivityResult(requestCode, resultCode, data);
    }


    @Override
    protected void onDestroy() {
        super.onDestroy();
        // 解决内存泄漏问题
        UMShareAPI.get(this).release();
    }

}
