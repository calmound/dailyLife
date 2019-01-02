  <template>
  <el-table :data="list" style="width: 100%">
    <el-table-column prop="name" label="任务名称" width="180"></el-table-column>
    <el-table-column prop="repeatStatus" label="重复频率" width="180"></el-table-column>
    <el-table-column label="颜色">
      <template slot-scope="scope">
        <div
          v-bind:style="{width:'20px',height:'20px',borderRadius:'50%',background:scope.row.color}"
        ></div>
      </template>
    </el-table-column>
    <el-table-column label="操作" width="180">
      <template slot-scope="scope">
        <router-link :to="{path:`/schedule/add/${scope.row.id}`}">编辑</router-link>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import axios from "axios";
export default {
  mounted() {
    axios.get("/schedule/list").then(res => {
      // eslint-disable-next-line
      console.log(res);
      this.list = res.data.data;
    });
  },
  data() {
    return {
      list: []
    };
  }
};
</script>