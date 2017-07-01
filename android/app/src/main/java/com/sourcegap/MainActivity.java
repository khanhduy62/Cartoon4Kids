package com.sourcegap.c4k;

import com.facebook.react.ReactActivity;
import com.reactnativecomponent.splashscreen.RCTSplashScreen;
import android.os.Bundle;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "C4k";
    }

    @Override
    public void onCreate(Bundle savedInstanceState){
        RCTSplashScreen.openSplashScreen(this);
        super.onCreate(savedInstanceState);
    }
}
