package cz.websense.smarthome;

import com.facebook.react.ReactActivity;


public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "ReactNativeApp";
    }

//    @Override
//    public void onResume() {
//        super.onResume();
//        NotificationManager nMgr = (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);
//        nMgr.cancelAll();
//    }
}