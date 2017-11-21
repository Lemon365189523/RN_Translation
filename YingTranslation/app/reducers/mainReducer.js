
let initialState = {
    test: "test"
}

let mainReducer = (state = initialState, action) => {

    return{
        ...state
    }
}


export default mainReducer;