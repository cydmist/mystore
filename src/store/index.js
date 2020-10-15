import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)
import {state,getters,mutations} from "./mutations"
import {actions} from "./actions"
import menu from "./modules/menu"
import role from "./modules/role"
import manger from "./modules/manger"
import cate from "./modules/cate"
import specs from "./modules/specs"
import vip from "./modules/vip"
import banner from "./modules/banner"
import goods from "./modules/goods"
import seckill from "./modules/seckill"
export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions,
    modules:{
        menu,
        role,
        manger,
        cate,
        specs,
        vip,
        banner,
        goods,
        seckill
    }
})