<template>
  <div>
    <el-dialog
      :title="info.isAdd ? '编辑会员' : '编辑会员'"
      :visible.sync="info.isshow"
      @closed="close"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="手机号">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
       
        <el-form-item label="昵称">
          <el-input v-model="form.nickname"></el-input>
        </el-form-item>

        <el-form-item label="密码">
          <el-input v-model="form.password"></el-input>
        </el-form-item>

        
        <el-form-item label="状态">
          <el-switch
            v-model="form.status"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="update">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import {
  
  reqVipDetail,
  reqVipUpdate,
} from "../../../utils/request";
import { warningAlert, successAlert } from "../../../utils/alert";
export default {
  props: ["info"],
  components: {},
  data() {
    return {
     form: {
        nickname:"",
        phone:"",
        password:"",
        status: 1,
      },
    };
  },
  computed: {
    ...mapGetters({
      
      vipList: "vip/list",
    }),
  },
  methods: {
    ...mapActions({
      //请求菜单list
      reqMenuListAction: "menu/reqListAction",
      //角色的list
      reqRoleList:"role/reqListAction"
    }),
    //取消
    cancel() {
      this.info.isshow = false;
    },
    //弹框消失完成
    close() {
      //如果是添加开的弹框，就什么都不做；如果是编辑开的弹框，就清除form
      if (!this.info.isAdd) {
        this.empty();
      }
    },
    //数据重置
    empty() {
      this.form = {
         nickname:"",
        phone:"",
        password:"",
        status: 1,
      };
      
    },
   
   
    //获取菜单详情 （1条）
    look(id) {
      //发请求
      
      reqVipDetail(id).then((res) => {
    
        if (res.data.code == 200) {
         
          this.form = res.data.list;
         
          this.form.password="";
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    //修改
    update() {
      
      reqVipUpdate(this.form).then((res) => {
      
        
        if (res.data.code == 200) {
          
          successAlert(res.data.msg);
          this.empty();
          this.cancel();
          // this.reqVipList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
  },
  mounted() {
    //如果菜单list没有请求过，就请求一下，如果请求过了，就不用请求了
    // if(this.menuList.length==0){
    //   this.reqMenuListAction()
    // }
  },
};
</script>
<style scoped>
</style>