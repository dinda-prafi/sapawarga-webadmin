<template>
  <div class="app-container news-page">
    <el-row :gutter="10">
      <el-col class="col-left" :xs="24" :sm="24" :md="24" :lg="7" :xl="7">
        <el-card v-if="device==='desktop'">
          <div slot="header" class="clearfix">
            <span>{{ $t('news.media-channel') }}</span>
          </div>
          <el-table stripe :data="tableDataStatistik" :show-header="false" style="width: 100%">
            <el-table-column prop="title" align="left" />
            <el-table-column prop="count" align="right" />
          </el-table>
        </el-card>
        <el-card v-else>
          <el-collapse>
            <el-collapse-item name="1" :title="$t('news.media-channel')">
              <el-table stripe :data="tableDataStatistik" :show-header="false" style="width: 100%">
                <el-table-column prop="title" align="left" />
                <el-table-column prop="count" align="right" />
              </el-table>
            </el-collapse-item>
          </el-collapse>
        </el-card>
        <el-card class="top-space">
          <el-table stripe :data="tableDataStatistikTotal" :show-header="false" style="width: 100%">
            <el-table-column prop="title" />
            <el-table-column prop="count" align="right" />
          </el-table>
        </el-card>
      </el-col>
      <el-col class="col-right" :xs="24" :sm="24" :md="24" :lg="17" :xl="17">
        <el-row style="margin: 10px 0px" type="flex">
          <div v-permission="['admin','staffProv', 'staffKabkota']">
            <router-link :to="{ path: '/news/create' }">
              <el-button type="primary" size="small" icon="el-icon-plus" style="margin: 0 10px 0 0">
                {{ $t('news.news-add-header') }}
              </el-button>
            </router-link>
          </div>
          <div v-permission="['admin','staffProv', 'staffKabkota']">
            <router-link :to="{ path: '/news/priority' }">
              <el-button type="primary" size="small" icon="el-icon-plus">
                {{ $t('news.priority-news-header') }}
              </el-button>
            </router-link>
          </div>
        </el-row>

        <ListFilter :list-query.sync="listQuery" @submit-search="getList" @reset-search="resetFilter" />

        <el-table v-loading="listLoading" :data="list" border stripe fit highlight-current-row @sort-change="changeSort">

          <el-table-column type="index" width="50" align="center" :index="getTableRowNumbering" />

          <el-table-column prop="title" sortable="custom" :label="$t('news.news-title')" min-width="200" />

          <el-table-column prop="channel.name" sortable="custom" :label="$t('label.source')" align="center" min-width="100" />

          <el-table-column prop="status" sortable="custom" class-name="status-col" :label="$t('label.status')" align="center" min-width="100">
            <template slot-scope="{row}">
              <el-tag :type="row.status | statusFilter">
                {{ row.status_label }}
              </el-tag>
            </template>
          </el-table-column>

          <el-table-column prop="total_viewers" sortable="custom" :label="$t('news.news-viewer')" align="center" min-width="130" />

          <el-table-column prop="source_date" sortable="custom" :label="$t('news.news-date')" align="center" min-width="150">
            <template slot-scope="{row}">
              {{ row.source_date | moment('D MMMM YYYY') }}
            </template>
          </el-table-column>

          <el-table-column align="center" :label="$t('label.actions')" min-width="250px">
            <template slot-scope="scope">
              <router-link :to="'/news/detail/'+scope.row.id">
                <el-tooltip :content="$t('news.news-detail')" placement="top">
                  <el-button type="primary" icon="el-icon-view" size="small" />
                </el-tooltip>
              </router-link>
              <router-link :to="(scope.row.status !== 10 && scope.row.created_by === user_id ? '/news/edit/' +scope.row.id : '')">
                <el-tooltip :content="$t('news.news-edit-header')" placement="top">
                  <el-button type="warning" icon="el-icon-edit" size="small" :disabled="scope.row.status === 10 || scope.row.created_by !== user_id" />
                </el-tooltip>
              </router-link>
              <el-tooltip :content="$t('news.news-delete')" placement="top">
                <el-button type="danger" icon="el-icon-delete" size="small" :disabled="scope.row.status === 10 || scope.row.created_by !== user_id" @click="deleteNews(scope.row.id)" />
              </el-tooltip>
              <el-tooltip :content="$t('news.news-inactivate')" placement="top">
                <el-button v-if="scope.row.status === 10" type="danger" icon="el-icon-circle-close" size="small" :disabled="scope.row.created_by !== user_id" @click="deactivateRecord(scope.row.id)" />
              </el-tooltip>
              <el-tooltip :content="$t('news.news-activate')" placement="top">
                <el-button v-if="scope.row.status === 0" type="success" icon="el-icon-circle-check" size="small" :disabled="scope.row.created_by !== user_id" @click="activateRecord(scope.row.id)" />
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>

        <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

      </el-col>
    </el-row>
  </div>
</template>

<script>
import { fetchList, fetchStatistic, deleteData, deactivate, activate } from '@/api/news'
import permission from '@/directive/permission/index.js'
import Pagination from '@/components/Pagination'
import ListFilter from './_listfilter'
import { mapGetters } from 'vuex'
import moment from 'moment'

export default {
  components: { Pagination, ListFilter },
  directives: { permission },
  filters: {
    statusFilter(status) {
      const statusMap = {
        '10': 'success',
        '0': 'info',
        '5': 'warning',
        '3': 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        title: null,
        search: null,
        page: 1,
        limit: 10
      },
      tableDataStatistik: [],
      tableDataStatistikTotal: []
    }
  },

  computed: {
    ...mapGetters([
      'user_id',
      'device'
    ])
  },

  created() {
    this.getList()
    this.getStatistic()
  },

  methods: {
    getList() {
      this.listLoading = true

      const data = {}

      Object.assign(data, this.listQuery)

      data.source_date = moment(data.source_date).format('YYYY-MM-DD')

      fetchList(data).then(response => {
        this.list = response.data.items
        this.total = response.data._meta.totalCount
        this.listLoading = false
      })
    },

    resetFilter() {
      Object.assign(this.$data.listQuery, this.$options.data().listQuery)

      this.getList()
    },

    getTableRowNumbering(index) {
      return ((this.listQuery.page - 1) * this.listQuery.limit) + (index + 1)
    },

    changeSort(e) {
      this.listQuery.sort_by = e.prop
      this.listQuery.sort_order = e.order
      this.getList()
    },

    getStatistic() {
      this.listLoading = true
      fetchStatistic().then(response => {
        this.tableDataStatistik = response.data.items
        const totalChannels = this.tableDataStatistik.reduce((a, b) => a + parseInt(b.count), 0)
        this.tableDataStatistikTotal = [
          {
            title: this.$t('news.news-category-all'),
            count: totalChannels
          }
        ]
        this.listLoading = false
      })
    },

    async deleteNews(id) {
      try {
        await this.$confirm(this.$t('crud.delete-confirm'), 'warning', {
          confirmButtonText: this.$t('common.confirm'),
          cancelButtonText: this.$t('common.cancel'),
          type: 'warning'
        })

        this.listLoading = true

        await deleteData(id)

        this.$message({
          type: 'success',
          message: this.$t('crud.delete-success')
        })

        this.getList()
      } catch (e) {
        console.log(e)
      }
    },

    async deactivateRecord(id) {
      try {
        await this.$confirm(this.$t('crud.deactivate-confirm'), 'Warning', {
          confirmButtonText: this.$t('common.confirm'),
          cancelButtonText: this.$t('common.cancel'),
          type: 'warning'
        })

        this.listLoading = true

        await deactivate(id)

        this.$message({
          type: 'success',
          message: this.$t('crud.deactivate-success')
        })

        this.getList()
      } catch (e) {
        console.log(e)
      }
    },

    async activateRecord(id) {
      try {
        await this.$confirm(this.$t('crud.activate-confirm'), 'Warning', {
          confirmButtonText: this.$t('common.confirm'),
          cancelButtonText: this.$t('common.cancel'),
          type: 'warning'
        })

        this.listLoading = true

        await activate(id)

        this.$message({
          type: 'success',
          message: this.$t('crud.activate-success')
        })

        this.getList()
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@media only screen and (max-width: 1200px) {
  .col-right {
    margin-top: 20px;
    margin-bottom: 20px;
  }
}

.top-space {
  margin-top: 20px;
}
</style>
