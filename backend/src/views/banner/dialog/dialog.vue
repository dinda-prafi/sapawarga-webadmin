<template>
  <el-row>
    <el-table :data="data1.data" border style="width: 100%">
      <el-table-column v-for="col in data1.columns" :key="col.prop" :prop="col.prop" :label="col.label" sortable />
    </el-table>
  </el-row>
</template>
<script>
export default {
  components: {
  },
  props: {
    data1: {
      type: Object,
      default() {
        return []
      }
    }
  },
  mounted() {
  },
  methods: {
  }
}
</script>
