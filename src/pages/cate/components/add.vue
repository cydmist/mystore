<template>
  <div>
    <el-dialog
      :title="info.isAdd ? '商品分类添加' : '商品分类修改'"
      :visible.sync="info.isshow"
      @closed="close"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="上级分类">
          <el-select v-model="form.pid" placeholder="请选择上级分类">
            <el-option label="顶级分类" :value="0"></el-option>
            <el-option
              v-for="item in list"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- 树形控件 -->
        <!-- data要展示的数组 -->
        <!-- props 配置 ：children 用来判断是否有下一层的字段；label用来展示在页面中的字段 -->
        <el-form-item label="分类名称"
          prop="catename"
          :rules="[
            { required: true, message: '请输入规格属性', trigger: 'blur' },
          ]">
          <el-input v-model="form.catename"></el-input>
        </el-form-item>

        <!-- 原生 -->
        <el-form-item label="图片" v-if="form.pid != 0">
          <div class="my-upload">
            <h3>+</h3>
            <img class="img" v-if="imgUrl" :src="imgUrl" alt="" />
            <input
              v-if="info.isshow"
              class="my-input"
              type="file"
              @change="getFile"
            />
          </div>
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
        <el-button type="primary" @click="add('form')" v-if="info.isAdd"
          >添 加</el-button
        >
        <el-button type="primary" @click="update('form')" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import {
  reqCateAdd,
  reqCateDetail,
  reqCateUpdate,
} from "../../../utils/request";
import { warningAlert, successAlert } from "../../../utils/alert";
export default {
  props: ["info"],
  components: {},
  data() {
    return {
      imgUrl: null,
      form: {
        pid: "",
        catename: "",
        img: null,
        status: 1,
      },
    };
  },
  computed: {
    ...mapGetters({
      list: "cate/list",
    }),
  },
  methods: {
    ...mapActions({
      reqListAction: "cate/reqListAction",
    }),
    //获取文件
    getFile(e) {
      let file = e.target.files[0];

      // 是图片
      let imgExtArr = [".jpg", ".png", "jpeg", ".gif"];
      let extname = file.name.slice(file.name.lastIndexOf("."));
      if (!imgExtArr.some((item) => item == extname)) {
        warningAlert("文件格式不正确");
      }

      //生成一个地址
      this.imgUrl = URL.createObjectURL(file);
      //将文件保存在form.img
      this.form.img = file;
    },

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
        pid: "",
        catename: "",
        img: null,
        status: 1,
      };
      this.imgUrl = "";
    },

    //点击了添加按钮
    add(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          reqCateAdd(this.form).then((res) => {
            if (res.data.code == 200) {
              //成功
              successAlert(res.data.msg);

              //数据重置
              this.empty();

              //弹框消失
              this.cancel();

              //list数据要刷新
              this.reqListAction();
            } else {
              warningAlert(res.data.msg);
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //获取菜单详情 （1条）
    look(id) {
      //发请求
      reqCateDetail(id).then((res) => {
        console.log(res);
        if (res.data.code == 200) {
          //这个时候form是没有id的
          this.form = res.data.list;
          this.form.id = id;
          this.imgUrl = this.$imgPre + this.form.img;
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    //修改
    update(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          reqCateUpdate(this.form).then((res) => {
            if (res.data.code == 200) {
              successAlert(res.data.msg);
              this.empty();
              this.cancel();
              this.reqListAction();
            } else {
              warningAlert(res.data.msg);
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
  mounted() {
    //如果菜单list没有请求过，就请求一下，如果请求过了，就不用请求了
    // if (this.roleList.length == 0) {
    //   this.reqRoleListAction();
    // }
  },
};
</script>
<style scoped>
.my-upload {
  width: 150px;
  height: 150px;
  border: 1px dashed #ccc;
  position: relative;
}
.my-upload h3 {
  text-align: center;
  line-height: 150px;
  font-size: 30px;
  font-weight: 400;
}
.my-upload .my-input {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  cursor: pointer;
  opacity: 0;
}
.my-upload .img {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
}
</style>