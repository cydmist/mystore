export const state={
    userInfo:sessionStorage.getItem('userInfo')?
    JSON.parse(sessionStorage.getItem("userInfo")):{}
}

export const mutations={
    changeUserInfo(state,info){
        state.userInfo=info
        //状态层一刷新数据就消失  
        //但是我们希望数据还在所以本地也存储一份
        if(info.id){
            sessionStorage.setItem("userInfo",JSON.stringify(info))
        }else{
            sessionStorage.removeItem("userInfo")
        }

    }
}

export const getters={
    userInfo(state){
        return state.userInfo;
    }
}
