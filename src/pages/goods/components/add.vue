<template>
  <div>
    <el-dialog
      :title="info.isAdd ? '商品添加' : '商品修改'"
      :visible.sync="info.isshow"
      @closed="close"
      @opened="opened"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="一级分类">
          <el-select v-model="form.first_cateid" @change="changeFirst">
            <el-option label="请选择" value="" disabled></el-option>
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

         <el-form-item label="二级分类">
          <el-select v-model="form.second_cateid">
            <el-option label="请选择" value="" disabled></el-option>
            <el-option
              v-for="item in secondCateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="商品名称">
          <el-input v-model="form.goodsname"></el-input>
        </el-form-item>

        <el-form-item label="价格">
          <el-input v-model="form.price"></el-input>
        </el-form-item>

        <el-form-item label="市场价格">
          <el-input v-model="form.market_price"></el-input>
        </el-form-item>

        <!-- 原生 -->
        <el-form-item label="图片">
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

        <el-form-item label="商品规格">
          <el-select v-model="form.specsid" @change="changeSpecs">
            <el-option lable="请选择" value=""></el-option>
            <el-option 
            v-for="item in specsList"
            :key="item.id"
            :label="item.specsname"
            :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="商品属性">
          <el-select v-model="form.specsattr" placeholder="请选择" multiple>
            <el-option label="请选择" value=""></el-option>
            <el-option 
            v-for="item in goodsAttrList"
            :key="item"
            :label="item"
            :value="item"
            ></el-option>
          
          </el-select>
        </el-form-item>

        <el-form-item label="是否新品">
          <el-radio v-model="form.isnew" :label="1">是</el-radio>
          <el-radio v-model="form.isnew" :label="2">否</el-radio>
        </el-form-item>

        <el-form-item label="是否热卖">
          <el-radio v-model="form.ishot" :label="1">是</el-radio>
          <el-radio v-model="form.ishot" :label="2">否</el-radio>
        </el-form-item>

        <el-form-item label="商品描述">
            <div v-if="info.isshow" id="editor"></div>
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
        <el-button type="primary" @click="add" v-if="info.isAdd"
          >添 加</el-button
        >
        <el-button type="primary" @click="update" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
//富文本编辑器
import E from "wangeditor"
import { mapGetters, mapActions } from "vuex";
import {
  reqCateList,
  reqGoodsAdd,
  reqGoodsDetail,
  reqGoodsUpdate,
} from "../../../utils/request";
import { warningAlert, successAlert } from "../../../utils/alert";
export default {
  props: ["info"],
  components: {},
  data() {
    return {
      //图片地址
      imgUrl: "",
      //商品属性list
      goodsAttrList:[],
      secondCateList:[],
      imgUrl: null,
      form: {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: null,
        description: "",
        specsid: "",
        specsattr: [],
        isnew: 1,
        ishot: 1,
        status: 1,
      },
    };
  },
  computed: {
    ...mapGetters({
      cateList: "cate/list",
      //商品规格
      specsList:"specs/list"
    }),
  },
  methods: {
    ...mapActions({
      //请求商品分类list
      reqCateList:"cate/reqListAction",
      //请求goods lits
      reqListAction: "goods/reqListAction",
      //请求商品规格list
      reqSpecsList:"specs/reqListAction",
      reqTotalAction:"goods/reqTotalAction"
    }),
    //富文本
    opened(){
      this.editor=new E('#editor');
      this.editor.create();
      //编辑器创建完成之后
      this.editor.txt.html(this.form.description)
    },
    //商品规格发生了改变，计算属性的数组
    changeSpecs(){
      this.form.specsattr=[];
      this.getAttrsArr();
    },
    //获取商品属性数组
    getAttrsArr(){
      let obj=this.specsList.find(item=>{
      return  item.id==this.form.specsid
      });
      console.log(obj);
      this.goodsAttrList=obj.attrs
    },
    //一级分类变了，获取二级分类的list
    changeFirst(){
      this.form.second_cateid="";
      this.getSecondList();
    },
    //获取二级分类list
    getSecondList(){
      reqCateList({pid:this.form.first_cateid}).then(res=>{
        this.secondCateList=res.data.list
      })
    },
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
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: null,
        description: "",
        specsid: "",
        specsattr: [], //后端要的 '[]',所以 记得在请求前 转换格式
        isnew: 1,
        ishot: 1,
        status: 1,
      };
      //二级分类的list
      this.secondCateLis = [];
      //图片地址
      this.imgUrl = "";
      //商品属性list
      this.goodsAttrList = [];
    },
      

    //点击了添加按钮
    add() {
      //添加之前获取到富文本编辑器里面的内容
      this.form.description=this.editor.txt.html();
      let data={
        ...this.form,
        specsattr:JSON.stringify(this.form.specsattr)
      }

      reqGoodsAdd(data).then((res) => {
        
        if (res.data.code == 200) {
          //成功
          successAlert(res.data.msg);

          //数据重置
          this.empty();

          //弹框消失
          this.cancel();

          //list数据要刷新
          this.reqListAction();
          this.reqTotalAction();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    //获取菜单详情 （1条）
    look(id) {
      //发请求
      reqGoodsDetail({id:id}).then((res) => {
        
        if (res.data.code == 200) {
          //这个时候form是没有id的
          this.form = res.data.list;
          //补id
          this.form.id = id;  
          //请求二级分类的list
          this.getSecondList();
          
          this.imgUrl = this.$imgPre + this.form.img;

          //商品属性从字符串转为 []
          this.form.specsattr = JSON.parse(this.form.specsattr);

          //获取商品属性的数组
          this.getAttrsArr();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    //修改
    update() {
      this.form.description=this.editor.txt.html();
      
      let data={
        ...this.form,
        specsattr:JSON.stringify(this.form.specsattr)
      }
      
      reqGoodsUpdate(data).then((res) => {
        console.log(res);
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.empty();
          this.cancel();
          this.reqListAction();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
  },
  mounted() {
    this.reqSpecsList(true)
    //如果菜单list没有请求过，就请求一下，如果请求过了，就不用请求了
    if (this.cateList.length == 0) {
      this.reqCateList();
    }
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