<template>
  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="任务名称">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="任务颜色">
      <div class="block">
        <el-color-picker v-model="form.color"></el-color-picker>
      </div>
    </el-form-item>
    <el-form-item label="重复频次">
      <el-radio-group v-model="form.repeatStatus">
        <el-radio label="year">年</el-radio>
        <el-radio label="month">月</el-radio>
        <el-radio label="day">日</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">保存</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import axios from "axios";
export default {
  mounted() {
    if (this.id) {
      axios.get("/schedule/info", { params: { id: this.id } }).then(res => {
        this.form = res.data.data[0];
      });
    }
  },
  data() {
    return {
      id: this.$route.params.id,
      form: {
        name: "",
        repeatStatus: "year",
        color: ""
      }
    };
  },
  methods: {
    onSubmit() {
      if (this.id) {
        axios
          .post("/schedule/edit", { ...this.form, id: this.id })
          .then(res => {
            // eslint-disable-next-line
            console.log(res);
          });
      } else {
        axios.post("/schedule/add", this.form).then(res => {
          // eslint-disable-next-line
          console.log(res);
        });
      }
    }
  }
};
</script>