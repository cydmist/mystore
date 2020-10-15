<template>
  <div>
    <h1>首页</h1>
    <div class="wrap" id="box"></div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import echarts from "echarts";
export default {
  props: [],
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
        list:"cate/list"
    }),
  },
  watch: {
    list: {
      handler() {
        if (this.list.length > 0) {
          var myChart = echarts.init(document.getElementById("box"));
        }

        let option = {
          title: {
            text: "商品分类",
          },
          tooltip: {},
          legend: {
            data: ["数量"],
          },
          xAxis: {
            data: this.list.map(item=>item.catename)
          },
          yAxis: {},
          series: [
            {
              name: "销量",
              type: "bar",
              data: this.list.map(item=>item.children.length)
            },
        ], 
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
      },
    },
    deep:true
  },
  methods: {
    ...mapActions({
        reqList:"cate/reqListAction"
    }),
  },
  mounted() {
      this.reqList();
  },
};
</script>
<style scoped>
.wrap {
  width: 80%;
  height: 377px;
  margin: 20px auto;
  border: 1px solid red;
}
</style>