<template>
  <div>
    <el-row v-for="item in list" :key="item.id">
      <el-col :span="12">
        <el-checkbox
          v-model="item.checked"
          @change="handleChangeCheckbox(item)"
          class="checkbox"
          border
        >{{item.name}}</el-checkbox>
      </el-col>
      <el-col :span="12">
        <el-input placeholder="其他原因"></el-input>
      </el-col>
    </el-row>
    <el-button v-on:click="addDailyLife">生活列表插入</el-button>
  </div>
</template>
<script>
import axios from "axios";
export default {
  mounted() {
    this.getInfo();
  },
  data() {
    return {
      list: [],
      id: this.$route.params.id
    };
  },
  methods: {
    addDailyLife() {
      axios.get("/dailylife/add").then(() => {});
    },
    getInfo() {
      axios.get("/dailylife/list").then(res => {
        this.list = res.data.data;

        this.list = this.list.map(v => {
          v.checked = !!v.status;
          return v;
        });
      });
    },
    handleChangeCheckbox(item) {
      let params = {
        sid: item.sid,
        status: 1,
        finishTime: Date.now()
      };
      if (!item.checked) {
        params.finishTime = null;
        params.status = 0;
      }

      axios.post("/dailylife/edit", params).then(() => {
        this.getInfo();
      });
    }
  }
};
</script>
<style  lang="less">
body {
  padding-top: 40px;
}
.el-row {
  margin-bottom: 20px;
}
.el-checkbox {
  width: 150px;
  .el-checkbox__label {
    margin-left: 10px;
  }
}
.mn-title {
  text-align: center;
  font-size: 25px;
  margin-bottom: 5px;
}
</style>
