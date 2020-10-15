export const state={
    userInfo:sessionStorage.getItem('userInfo')?
    JSON.parse(sessionStorage.getItem("userInfo")):{}
}

export const mutations={
    changeUserInfo(state,info){
        state.userInfo=info

    }
}

export const getters={
    userInfo(state){
        return state.userInfo;
    }
}
