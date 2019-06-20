<template>
  <div class="app-container">
    <el-row :gutter="10">
      <el-col class="col-left" :xs="24" :sm="24" :md="24" :lg="10" :xl="10">
        <el-card>
          <div slot="header" class="clearfix">
            <span>Target</span>
          </div>
          <el-table stripe :data="tableDataTarget" :show-header="false" style="width: 100%">
            <el-table-column prop="title" />
            <el-table-column prop="content" />
          </el-table>
        </el-card>
      </el-col>
      <el-col class="col-right" :xs="24" :sm="24" :md="24" :lg="14" :xl="14">
        <el-card>
          <div slot="header" class="clearfix">
            <span>Data Polling</span>
          </div>
          <el-table stripe :data="tableDataPolling" :show-header="false" style="width: 100%">
            <el-table-column prop="title" width="180" />
            <el-table-column prop="content" />
          </el-table>
        </el-card>
        <el-button v-if="!btnKirimDisable" class="button-send" type="primary" @click="submitForm(status.active)">{{ $t('crud.send-polling') }}</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { fetchRecord, update } from '@/api/polling'
export default {
  data() {
    return {
      id: 0,
      tableDataTarget: [],
      tableDataPolling: [],
      btnKirimDisable: false,
      polling: null,
      status: {
        draft: 0,
        active: 10
      }
    }
  },
  created() {
    this.id = this.$route.params && this.$route.params.id
    this.getDetail()
  },
  methods: {
    getDetail() {
      fetchRecord(this.id).then(response => {
        const { kabkota, kecamatan, kelurahan, rw, name, category, description, excerpt, start_date, end_date, question, status, status_label, answers } = response.data
        this.polling = response.data

        function logArrayAnswers(value, index, array) {
          return <el-radio label=''>{ value.body }</el-radio>
        }

        if (status === 10) {
          this.btnKirimDisable = true
        } else if (status === 0) {
          this.btnKirimDisable = false
        }

        // count down date
        let expired = false
        let beforeStart = false

        const dateStart = new Date(start_date).getTime()
        const dateSecond = new Date(end_date).getTime()
        const currentDate = new Date().getTime()

        const checkStartDate = currentDate - dateStart
        const distance = dateSecond - currentDate

        console.log(checkStartDate)
        if (checkStartDate < 0) {
          beforeStart = true
        }

        if (distance < 0) {
          expired = true
        }
        // end of count down date

        this.tableDataTarget = [
          {
            title: 'Kota',
            content: ((kabkota !== null) ? kabkota.name : 'Semua Kab/Kota')
          },
          {
            title: 'Kecamatan',
            content: ((kecamatan !== null) ? kecamatan.name : 'Semua Kecamatan')
          },
          {
            title: 'Kelurahan/Desa',
            content: ((kelurahan !== null) ? kelurahan.name : 'Semua Kelurahan')
          },
          {
            title: 'RW',
            content: ((rw !== null) ? rw : 'Semua RW')
          }
        ]

        this.tableDataPolling = [
          {
            title: 'Nama Survey',
            content: name || '-'
          },
          {
            title: 'Kategori',
            content: (category !== null ? category.name : '-')
          },
          {
            title: 'Deskripsi',
            content: description || '-'
          },
          {
            title: 'Pengantar',
            content: excerpt || '-'
          },
          {
            title: 'Dimulai dari',
            content: start_date || '-'
          },
          {
            title: 'Sampai',
            content: end_date || '-'
          },
          {
            title: 'Status',
            content: (status === 1 ? <el-tag type='danger'>Tidak Aktif</el-tag> : status === 10 && expired === true && beforeStart === false ? <el-tag type='warning'>Berakhir</el-tag> : status === 10 && expired === false && beforeStart === false ? <el-tag type='success'>Sedang Berlangsung</el-tag> : status === 10 && beforeStart === true && expired === false ? <el-tag type='primary'>Dipublikasikan</el-tag> : <el-tag type='info'>{status_label}</el-tag>)
          },
          {
            title: 'Pertanyaan',
            content: question || '-'
          },
          {
            content: answers.map(logArrayAnswers)
          }
        ]
      })
    },
    async submitForm(status) {
      const id = this.$route.params && this.$route.params.id
      const data = {}
      Object.assign(data, this.polling)
      data.status = status
      await update(id, data)
      this.$message.success(this.$t('crud.publish-polling'))
      this.$router.push('/polling/index')
    }
  }
}
</script>
<style lang="scss" scoped>
.button-send {
  margin-top: 10px;
  float: right;
}
</style>
