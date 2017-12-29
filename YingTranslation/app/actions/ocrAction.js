import { 
    YoudaoApi,
    YoudaoOcrApi
 } from "../constants/ApiUtil";
import * as Types from '../constants/ActionTypes';

/* 传入base64的图片 */
export const OCRTranslate = (img) => {

    return dispatch => {
        dispatch({
            type: Types.REQUEST_START,
        })
        // YoudaoOcrApi(img).then(resData=>{

        // }).catch(err=>{

        // })
        //模拟上传图片
        this.setTimeout(() => {
            console.log('请求成功');
            // dispatch({
            //     type: Types.REQUEST_SUCCESS,
            //     data: testData
            // });
            const result = resData["Result"];
            
        }, 2000);
        
    }
}

export const pushResultPageSuccess = () =>{
    return dispatch => {
        dispatch({
            type: Types.PUSH_OCRRESULTPAGE_SUCCESS
        });
    }
}

const resData = {
    "errorCode": "0",
    "Result": {
        "orientation": "Up",
        "textAngle": 0,
        "language": "en",
        "lines": [
            {
                "boundingBox": "524,2,660,107",
                "words": "can occur at any time of the year, but the"
            },
            {
                "boundingBox": "217,63,972,108",
                "words": "usual tornado season is from March to May. Tornadoes"
            },
            // {
            //     "boundingBox": "217,140,982,96",
            //     "words": "form most often in the afternoon and early evening There"
            // },
            // {
            //     "boundingBox": "216,214,992,83",
            //     "words": "is often little warning of a tornado. People who live in"
            // },
            // {
            //     "boundingBox": "218,297,995,74",
            //     "words": "the Midwest know the signs of tornado activity. The sky"
            // },
            // {
            //     "boundingBox": "221,376,1001,61",
            //     "words": "becomes dark, often a greenish color. Dark clouds appear"
            // },
            // {
            //     "boundingBox": "221,456,1177,49",
            //     "words": "in the sky and there is often large hail. Suddenly, there hail 冰"
            // },
            // {
            //     "boundingBox": "222,527,1128,62",
            //     "words": "is a loud sound, like a train or a jet plane. Sometimes, jet"
            // },
            // {
            //     "boundingBox": "223,608,1023,65",
            //     "words": "tornadoes occur in groups. Two, three, five, or ten or more"
            // },
            // {
            //     "boundingBox": "225,690,697,69",
            //     "words": "tornadoes can form over a large area."
            // },
            // {
            //     "boundingBox": "324,738,941,104",
            //     "words": "A large group of tornadoes hit Oklahoma and"
            // },
            // {
            //     "boundingBox": "227,812,1043,124",
            //     "words": "Kansas in May 1999. The day was stormy, with violent"
            // },
            // {
            //     "boundingBox": "226,881,1055,140",
            //     "words": "thunderstorms in the afternoon. As the wind and rain"
            // },
            // {
            //     "boundingBox": "723,955,563,112",
            //     "words": "began to form. More than thirty"
            // },
            // {
            //     "boundingBox": "1149,1029,145,47",
            //     "words": "tornadoes"
            // }
        ]
    }
}
