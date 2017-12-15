
const collectionKey = 'WordsStorageKey';
//收藏单词
export const collectionWord = (data) => {
    //根据转换规则 dict中的l + dict中query做id
    const id = data.l + data.query;
    console.log("id:" + id);
    return new Promise((resolve, reject) => {
        global.storage.save({
            key: collectionKey,
            id: id,
            data: data
        }).then(() => {
            console.log('收藏成功');
            data.mark = true;
            resolve(data);
        }).catch((err) => {
            console.log('收藏失败');
            reject(err);
        });
    })
}

//取消收藏单词
export const removeWord = (data) => {
    const id = data.l + data.query;
    console.log("id:" + id);
    return new Promise((resolve, reject) => {
        global.storage.remove({
            key: collectionKey,
            id: id,
            data: data
        }).then(() => {
            data.mark = false;
            console.log('取消收藏成功');
            resolve(data);
        }).catch((err) => {
            console.log('取消收藏失败');
            reject(err);
        });
    });
}

//查询单词有没有被收藏
export const findWord = (wordId) => {
    return new Promise((resolve, reject)=>{
        global.storage.load({
            key: collectionKey,
            id: wordId
        }).then(ret => {
            console.log('该单词有收藏');
            ret.mark = true;
            resolve(ret);            
        }).catch(err => {
            console.log('该单词没有收藏');
            reject(err);
        });
    });
} 


//获取全部收藏的单词
export const findAllCollectionWords = () => {
    return new Promise((resolve, reject) => {
        global.storage.getAllDataForKey(
            collectionKey
        ).then(ret => {

            resolve(ret);
        }).catch(err => {
            console.warn(err.message);
            reject(err);
        });
    });
}