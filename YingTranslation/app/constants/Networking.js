export default function request(method, url, body) {
    method = method.toUpperCase();
    if (method === 'GET') {
        // fetch的GET不允许有body，参数只能放在url中
        body = undefined;
    } else {
        //把json 转换为formData 
        let formData = new FormData();
        Object.keys(body).map(function (key) {
            var value = body[key];
            formData.append(key, value);
        });
        body = formData;
       
    }

    return fetch(url, 
        {
            method: method,
            headers: {
                // 定义content为json 如果是文本，Content-Type="text/plain" multipart/form-data
                'Content-Type': 'multipart/form-data',
                'Accept': 'application/json',
                timeout: 20 * 1000,
            },
            body: body ,
        })
        .then((res) => {
            return res.json();
        });
}

export const GET = url => request('GET', url);
export const POST = (url, body) => request('POST', url, body);
export const PUT = (url, body) => request('PUT', url, body);
export const DEL = (url, body) => request('DELETE', url, body);