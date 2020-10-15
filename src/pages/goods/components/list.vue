<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      :tree-props="{ children: 'children' }"
    >
      <el-table-column prop="id" label="商品编号" >
      </el-table-column>

      <el-table-column prop="goodsname" label="商品名称">
      </el-table-column>
      <el-table-column prop="price" label="商品价格">
      </el-table-column>
      <el-table-column prop="market_price" label="市场价格">
      </el-table-column>
      

      <el-table-column label="图片">
        <template slot-scope="scope">
          <img v-if="scope.row.img!='null'" :src="$imgPre + scope.row.img" alt="" />
        </template>
      </el-table-column>

      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status == 1" type="primary"
            >启用</el-button
          >
          <el-button v-else type="info">禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="操作" sortable width="180">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.id)"
            >编辑</el-button
          >
          <del-btn @confirm="dele(scope.row.id)"></del-btn>
        </template>
      </el-table-column>
    </el-table>

    
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { successAlert, warningAlert } from "../../../utils/alert";
import { reqGoodsDel } from "../../../utils/request";
export default {
  props: [],
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      list: "goods/list",
      size:"goods/size",
      total:"goods/total"
    }),
  },
  methods: {
    ...mapActions({
      reqListAction: "goods/reqListAction",
      reqTotalAction: "goods/reqTotalAction",
      changePageAction: "goods/changePageAction",
    }),
    
    //编辑
    edit(id) {
      this.$emit("edit", id);
      console.log(id);
    },
    //删除2
    dele(id) {
      //点了确定按钮
      
      reqGoodsDel(id).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.reqListAction();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
  },
  mounted() {
    
    this.reqListAction();

  },
};
</script>
<style scoped>
img{
  width: 100px;
  height: 100px;
}
</style>