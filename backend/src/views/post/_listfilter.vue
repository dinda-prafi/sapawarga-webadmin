<template>
  <el-card class="box-card" style="margin-bottom: 10px">
    <el-form>
      <el-row :gutter="10">
        <el-col :xs="{span:24, tag:'mb-10'}" :sm="24" :md="15">
          <el-form-item style="margin-bottom: 0">
            <el-input v-model="listQuery.search" placeholder="Nama Kegiatan" />
          </el-form-item>
        </el-col>
        <el-col :xs="{span:24, tag:'mb-10'}" :sm="24" :md="9">
          <el-form-item style="margin-bottom: 0">
            <el-select
              v-model="listQuery.status"
              clearable
              filterable
              placeholder="Pilih Status"
              style="width: 100%"
            >
              <el-option value="10" label="Aktif" />
              <el-option value="0" label="Tidak Aktif" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10" type="flex" style="margin-top: 10px">
        <el-col :span="24">
          <input-filter-area
            :parent-id="filterAreaParentId"
            :kabkota-id="listQuery.kabkota_id"
            :kec-id="listQuery.kec_id"
            :kel-id="listQuery.kel_id"
            @changeKabkota="changeKabkota"
            @changeKecamatan="changeKecamatan"
            @changeKelurahan="changeKelurahan"
          />
        </el-col>
      </el-row>
      <el-row :gutter="10" type="flex" style="margin-top: 10px">
        <el-col>
          <el-button type="primary" size="small" style="float: right; margin: 2px;" @click="resetFilter">
            {{ $t('crud.reset') }}
          </el-button>
          <el-button type="primary" size="small" style="float: right; margin: 2px;" @click="submitSearch">
            {{ $t('crud.search') }}
          </el-button>
        </el-col>
      </el-row>
    </el-form>
  </el-card>
</template>

<script>
import InputFilterArea from '@/components/InputFilterArea'

export default {
  components: { InputFilterArea },
  props: {
    listQuery: {
      type: Object,
      default: null
    },
    status: {
      type: String,
      default: null
    }
  },

  data() {
    return {
      checkStaff: false
    }
  },

  methods: {

    submitSearch() {
      this.$emit('submit-search')
    },

    resetFilter() {
      this.$emit('reset-search')
    },

    changeKabkota(id) {
      this.listQuery.kabkota_id = id
    },

    changeKecamatan(id) {
      this.listQuery.kec_id = id
    },

    changeKelurahan(id) {
      this.listQuery.kel_id = id
    }

  }
}
</script>
