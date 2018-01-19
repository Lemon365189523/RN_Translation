import {
    YoudaoApi,
} from "../constants/ApiUtil";
import * as Types from '../constants/ActionTypes';


export const translate = (resultData,fromCoding ,toCoding) => {
    console.log('=================');
    console.log(fromCoding+ '----to---' + toCoding)
    console.log('=================');
    return dispatch => {
        var result = resultData;
        const regions = result["regions"][0];
        const lines = regions["lines"];
        var count = 0;
        //暂时图片识别只能识别英文和中文  en  zh_CN
        console.log(result);
        function handle(translation, i) {
            lines[i]["translation"] = translation;
            if (count === lines.length) {
                //全部翻译完成
                console.log('++++全部翻译完成+++++');
                console.log(result);
                dispatch({
                    type: Types.REQUEST_SUCCESS,
                    data: result
                });
            }
        }

        for (let index = 0; index < lines.length; index++) {
            const element = lines[index];
            const words = element["words"];
            YoudaoApi(words, toCoding, fromCoding).then(res => {
                if (res.errorCode === "0") {
                    console.log(index + "--===--" + res.query);
                    count++;
                    handle(res.translation, index);
                } else {
                    //翻译有错的话就直接把该文本返回
                    count++;
                    handle(words, index);
                }
            }).catch(err => {
                    //翻译失败的话就直接把该文本返回
                count++;
                handle(words, index);
            });

        }
        dispatch({
            type: Types.REQUEST_START
        });
        // setTimeout(() => {
        //     dispatch({
        //         type: Types.REQUEST_SUCCESS,
        //         data: result
        //     })
        // }, 2000);
    }
}
