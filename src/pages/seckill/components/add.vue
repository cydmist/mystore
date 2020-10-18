<template>
  <div>
    <el-dialog
      :title="info.isAdd ? '活动添加' : '活动修改'"
      :visible.sync="info.isshow"
      @closed="close"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item
          label="活动名称"
          prop="title"
          :rules="[
            { required: true, message: '请输入活动名称', trigger: 'blur' },
          ]"
        >
          <el-input v-model="form.title"></el-input>
        </el-form-item>

        <el-form-item label="活动期限">
          <div class="block">
            <el-date-picker
              v-model="value2"
              type="datetimerange"
              :picker-options="pickerOptions"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              align="right"
            >
            </el-date-picker>
          </div>
        </el-form-item>

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
          <el-select v-model="form.second_cateid" @change="changeSecond">
            <el-option label="请选择" value="" disabled></el-option>
            <el-option
              v-for="item in secondCateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="商品">
          <el-select v-model="form.goodsid">
            <el-option label="请选择" value="" disabled></el-option>
            <el-option
              v-for="item in goodsList"
              :key="item.id"
              :label="item.goodsname"
              :value="item.id"
            ></el-option>
          </el-select>
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
        <el-button type="primary" @click="update('form')" v-else
          >修 改</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import {
  //商品分类
  reqCateList,
  //商品管理
  reqGoodsList,
  reqSeckillAdd,
  reqSeckillDetail,
  reqSeckillUpdate,
} from "../../../utils/request";
import { warningAlert, successAlert } from "../../../utils/alert";
export default {
  props: ["info"],
  components: {},
  data() {
    return {
      //二级分类的list
      secondCateList: [],
      //goodslist
      goodsList: [],
      form: {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1,
      },
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
      value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
      value2: "",
    };
  },
  computed: {
    ...mapGetters({
      //商品list
      cateList: "cate/list",
    }),
  },
  methods: {
    ...mapActions({
      //请求商品分类list
      reqCateList: "cate/reqListAction",
      //请求商品管理list
      reqGoodsList: "goods/reqListAction",
      reqSeckillList: "seckill/reqListAction",
    }),
    //一级分类变了，二级分类也会变
    changeFirst() {
      this.form.second_cateid = "";
      this.getSecondList();
    },
    //获得二级分类
    getSecondList() {
      reqCateList({ pid: this.form.first_cateid }).then((res) => {
        this.secondCateList = res.data.list;
      });
    },
    //二级分类改变，三级分类也变
    changeSecond() {
      (this.goodsid = ""), this.getThreeList();
    },
    //获取三级分类
    getThreeList() {
      reqGoodsList().then((res) => {
        this.goodsList = res.data.list.filter((item) => {
          return this.form.second_cateid == item.second_cateid;
        });
      });
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
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1,
      };
    },
    //得到时间
    getTime() {
      //得到时间
    },
    //点击了添加按钮
    add(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          //开始时间转时间戳
          var t1 = new Date(this.value2[0]).getTime();
          //结束时间转时间戳
          var t2 = new Date(this.value2[1]).getTime();
          this.form.begintime = t1;
          this.form.endtime = t2;
          reqSeckillAdd(this.form).then((res) => {
            if (res.data.code == 200) {
              //成功
              successAlert(res.data.msg);

              //数据重置
              this.empty();

              //弹框消失
              this.cancel();
              this.value2 = "";
              //list数据要刷新
              this.reqSeckillList();
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
      reqSeckillDetail(id).then((res) => {
        if (res.data.code == 200) {
          //时间戳转为正常时间格式

          //这个时候form是没有id的
          this.form = res.data.list;
          this.form.id = id;
          this.value2 = [
            new Date(parseInt(this.form.begintime)),
            new Date(parseInt(this.form.endtime)),
          ];
          console.log(this.form.begintime);
          // 得到二级list
          this.getSecondList();
          //得到三级list
          this.getThreeList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    //修改
    update(id,form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          let data = {
            ...this.form,
            cateList: JSON.stringify(this.form.cateList),
            goodsList: JSON.stringify(this.form.goodsList),
          };

          reqSeckillUpdate(data).then((res) => {
            console.log(res);
            if (res.data.code == 200) {
              successAlert(res.data.msg);
              this.empty();
              this.cancel();
              this.reqSeckillList();
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
    this.reqCateList();
    //如果菜单list没有请求过，就请求一下，如果请求过了，就不用请求了
    // if (this.menuList.length == 0) {
    //   this.reqMenuListAction();
    // }
  },
};
</script>
<style scoped>
</style>