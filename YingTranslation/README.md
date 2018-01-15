###如果npm install以后记得修改安卓里 android[react-native-splash-screen]/src/main/res/values/refs.xml 中的primary_dark为系统颜色或自定义颜色
```
    <item type="color" name="primary_dark">
        #ffff //自定义的16进制颜色
    </item>
```


###使用【keytool -genkey -v -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000】生成签名文件，并将签名文件放入app目录
####秘钥：as365189523
#### CN=fanweijian, OU=lemon, O=lemon, L=guangdong, ST=guangzhou, C=zh