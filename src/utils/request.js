import axios from "axios"
import qs from "qs"
import Vue from "vue"


Vue.prototype.$imgPre = "http://localhost:3000"
let baseUrl = "/api";

//响应拦截
axios.interceptors.response.use(res => {
    console.group("=====本次请求路径是:" + res.config.url)
    console.log(res);
    console.groupEnd()

    return res;
})

/*********菜单管理***************/
//添加
export const reqMenuAdd = (params) => {
    return axios({
        url: baseUrl + "/api/menuadd",
        method: "post",
        data: qs.stringify(params)
    })
}

//列表
export const reqMenuList = () => {
    return axios({
        url: baseUrl + "/api/menulist",
        method: "get",
        params: {
            istree: true
        }
    })
}
//删除
export const reqMenuDel = (id) => {
    return axios({
        url: baseUrl + "/api/menudelete",
        method: "post",
        data: qs.stringify({ id: id })
    })
}

//1条
export const reqMenuDetail = (id) => {
    return axios({
        url: baseUrl + "/api/menuinfo",
        method: "get",
        params: {
            id: id
        }
    })
}

//修改
export const reqMenuUpdate = (params) => {
    return axios({
        url: baseUrl + "/api/menuedit",
        method: "post",
        data: qs.stringify(params)
    })
}
//----------角色管理----------//
//添加
export const reqRoleAdd = (params) => {
    return axios({
        url: baseUrl + "/api/roleadd",
        method: "post",
        data: qs.stringify(params)
    })
}
//角色列表
export const reqRoleList = () => {
    return axios({
        url: baseUrl + "/api/rolelist",
        method: "get"
    })
}
//角色修改
export const reqRoleUpdate = (params) => {
    return axios({
        url: baseUrl + "/api/roleedit",
        method: "post",
        data: qs.stringify(params)
    })
}
//角色删除
export const reqRoleDel = (id) => {
    return axios({
        url: baseUrl + "/api/roledelete",
        method: "post",
        data: qs.stringify({ id: id })
    })
}
//角色获取
export const reqRoleDetail = (id) => {
    return axios({
        url: baseUrl + "/api/roleinfo",
        method: "get",
        params: {
            id: id
        }
    })
}


/*********管理员管理*************/

//管理员添加
export const reqMangerAdd = (params) => {
    return axios({
        url: baseUrl + "/api/useradd",
        method: "post",
        data: qs.stringify(params)
    })
}

//管理员总数
export const reqMangerCount = () => {
    return axios({
        url: baseUrl + "/api/usercount"
    })
}

//管理员列表
export const reqMangerList = (params) => {
    return axios({
        url: baseUrl + "/api/userlist",
        method: "get",
        params: params
    })
}

//1条获取
export const reqMangerDetail = (uid) => {
    return axios({
        url: baseUrl + "/api/userinfo",
        method: "get",
        params: {
            uid: uid
        }
    })
}
//管理员修改
export const reqMangerUpdate = (params) => {
    return axios({
        url: baseUrl + "/api/userdelete",
        method: "post",
        data: qs.stringify(params)
    })
}
//管理员删除
export const reqMangerDel = (uid) => {
    return axios({
        url: baseUrl + "/api/userdelete",
        method: "post",
        data: qs.stringify({ uid: uid })
    })
}

/*********商品分类*************/

//商品分类添加
export const reqCateAdd = (params) => {
    let data = new FormData();
    for (let i in params) {
        data.append(i, params[i])
    }
    return axios({
        url: baseUrl + "/api/cateadd",
        method: "post",
        data: data
    })
}



//商品分类列表
export const reqCateList = (params) => {
    return axios({
        url: baseUrl + "/api/catelist",
        method: "get",
        params: params
    })
}

//1条获取
export const reqCateDetail = (id) => {
    return axios({
        url: baseUrl + "/api/cateinfo",
        method: "get",
        params: {
            id: id
        }
    })
}
//商品分类修改
export const reqCateUpdate = (params) => {
    let data = new FormData()
    for (let i in params) {
        data.append(i, params[i])
    }
    return axios({
        url: baseUrl + "/api/cateedit",
        method: "post",
        data: data
    })
}
//商品分类删除
export const reqCateDel = (id) => {
    return axios({
        url: baseUrl + "/api/catedelete",
        method: "post",
        data: qs.stringify({ id: id })
    })
}

/*****************商品规格管理**********************/
//商品规格添加
export const reqSpecsAdd = (params) => {
    return axios({
        url: baseUrl + "/api/specsadd",
        method: "post",
        data: qs.stringify(params)
    })
}

//商品规格总数
export const reqSpecsCount = () => {
    return axios({
        url: baseUrl + "/api/specscount"
    })
}

//商品规格列表
export const reqSpecsList = (params) => {
    return axios({
        url: baseUrl + "/api/specslist",
        method: "get",
        params: params
    })
}

//1条获取
export const reqSpecsDetail = (id) => {
    console.log(id);
    return axios({
        url: baseUrl + "/api/specsinfo",
        method: "get",
        params: {
            id: id
        }
    })
}
//商品规格修改
export const reqSpecsUpdate = (params) => {
    return axios({
        url: baseUrl + "/api/specsedit",
        method: "post",
        data: qs.stringify(params)
    })
}
//商品规格删除
export const reqSpecsDel = (id) => {
    return axios({
        url: baseUrl + "/api/specsdelete",
        method: "post",
        data: qs.stringify({ id: id })
    })
}

/*********会员管理***********/

// 会员列表
export const reqVipList = () => {
    return axios({
        url: baseUrl + "/api/memberlist",
        method: "get",
    })
}
// 获取一条会员
export const reqVipDetail = (uid) => {
    console.log(uid);
    return axios({
        url:baseUrl+"/api/memberinfo",
        method:"get",
        params: {
            uid: uid
        }
    })
}

// 会员修改
export const reqVipUpdate=(params)=>{
    return axios({
        url:baseUrl+"/api/memberedit",
        method:"post",
        data:qs.stringify(params)
    })
}


/*********轮播图管理***********/

//轮播图添加
export const reqBannerAdd = (params) => {
    let data = new FormData();
    for (let i in params) {
        data.append(i, params[i])
    }
    return axios({
        url: baseUrl + "/api/banneradd",
        method: "post",
        data: data
    })
}



//轮播图列表
export const reqBannerList = () => {
    return axios({
        url: baseUrl + "/api/bannerlist",
        method: "get",    
    })
}

//1条获取
export const reqBannerDetail = (id) => {
    return axios({
        url: baseUrl + "/api/bannerinfo",
        method: "get",
        params: {
            id: id
        }
    })
}
//轮播图修改
export const reqBannerUpdate = (params) => {
    let data = new FormData()
    for (let i in params) {
        data.append(i, params[i])
    }
    return axios({
        url: baseUrl + "/api/banneredit",
        method: "post",
        data: data
    })
}
//轮播图删除
export const reqBannerDel = (id) => {
    return axios({
        url: baseUrl + "/api/bannerdelete",
        method: "post",
        data: qs.stringify({ id: id })
    })
}

/**************商品管理*************************/

//商品规格添加
export const reqGoodsAdd = (params) => {
    let data = new FormData()
    for (let i in params) {
        data.append(i, params[i])
    }
    return axios({
        url: baseUrl + "/api/goodsadd",
        method: "post",
        data: data
    })
}

//商品规格总数
export const reqGoodsCount = () => {
    return axios({
        url: baseUrl + "/api/goodscount"
    })
}

//商品规格列表
export const reqGoodsList = (params) => {
    return axios({
        url: baseUrl + "/api/goodslist",
        method: "get",
        params: params
    })
}

//1条获取
export const reqGoodsDetail = (id) => {
    console.log(id);
    return axios({
        url: baseUrl + "/api/goodsinfo",
        method: "get",
        params: id
    })
}
//商品规格修改
export const reqGoodsUpdate = (form) => {
    let data=new FormData();
    for(let i in form){
        data.append(i,form[i])
    }
    return axios({
        url: baseUrl + "/api/goodsedit",
        method: "post",
        data: data
    })
}
//商品规格删除
export const reqGoodsDel = (id) => {
    return axios({
        url: baseUrl + "/api/goodsdelete",
        method: "post",
        data: qs.stringify({ id: id })
    })
}

//管理员登录
export const reqLogin=(params)=>{
    return axios({
        url:baseUrl+"/api/userlogin",
        method:"post",
        data:qs.stringify(params)
    })
}



/**************秒杀管理******************/
//秒杀添加
export const reqSeckillAdd = (params) => {
    return axios({
        url: baseUrl + "/api/seckadd",
        method: "post",
        data: qs.stringify(params)
    })
}

//秒杀列表
export const reqSeckillList = () => {
    return axios({
        url: baseUrl + "/api/secklist",
        method: "get",    
    })
}

//1条获取
export const reqSeckillDetail = (id) => {
    return axios({
        url: baseUrl + "/api/seckinfo",
        method: "get",
        params: {
            id: id
        }
    })
}
//轮播图修改
export const reqSeckillUpdate = (params) => {
    return axios({
        url: baseUrl + "/api/seckedit",
        method: "post",
        data: qs.stringify(params)
    })
}
//轮播图删除
export const reqSeckillDel = (id) => {
    return axios({
        url: baseUrl + "/api/seckdelete",
        method: "post",
        data: qs.stringify({ id: id })
    })
}