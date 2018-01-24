###如果npm install以后记得修改安卓里 android[react-native-splash-screen]/src/main/res/values/refs.xml 中的primary_dark为系统颜色或自定义颜色
```
    <item type="color" name="primary_dark">
        #ffff //自定义的16进制颜色
    </item>
```


###使用 "keytool -genkey -v -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000" 生成签名文件，并将签名文件放入app目录
####秘钥：as365189523
#### CN=fanweijian, OU=lemon, O=lemon, L=guangdong, ST=guangzhou, C=zh


##配置CodePus（热更新）

**Authentication：8530917349712d0513e72d18243b731fe60f53cc**

**注册iOS app**
 `code-push app add YT-ios ios react-native`
 
 eployments:
┌───────────────────────────────────────────────────────────────────────────────┐
│ Name       │ Deployment Key                                                   │
├───────────────────────────────────────────────────────────────────────────────┤
│ Production │ deQ_So3Qjrx66nz2wSRtweCNpyw63e570e6d-1756-4fea-ac2a-83ad60454c8e │
├───────────────────────────────────────────────────────────────────────────────┤
│ Staging    │ ta1bpcPvESizun_uIkDVJ1YSGGMg3e570e6d-1756-4fea-ac2a-83ad60454c8e │
└───────────────────────────────────────────────────────────────────────────────┘

**4.2 注册android app**
`code-push app add YT-android android react-native`

┌───────────────────────────────────────────────────────────────────────────────┐
│ Name       │ Deployment Key                                                   │
├───────────────────────────────────────────────────────────────────────────────┤
│ Production │ 1OAyH3rFJHAuWa8eKvULh5-xDCru3e570e6d-1756-4fea-ac2a-83ad60454c8e │
├───────────────────────────────────────────────────────────────────────────────┤
│ Staging    │ n4y-sxoQHiysgURL7unE1bTut9YQ3e570e6d-1756-4fea-ac2a-83ad60454c8e │
└───────────────────────────────────────────────────────────────────────────────┘


##安卓真机调试
```
adb kill-server

adb start-server

adb reverse tcp:8081 tcp:8081

adb shell input keyevent 82
```