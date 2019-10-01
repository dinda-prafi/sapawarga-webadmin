<template>
  <div class="components-container">
    <el-row :gutter="20">
      <el-col :xs="24" :sm="8" :lg="5">
        <AttachmentPhotoUpload type="news_photo" :initial-url="banner.cover_path_url" style="margin-bottom: 25px" @onUpload="photoUploaded" />
      </el-col>
      <el-col :xs="24" :sm="16" :lg="19"> 
        <el-form ref="banner" :model="banner" :rules="rules" :status-icon="true" label-width="160px">
          <el-form-item label="Judul Banner" prop="title">
            <el-input v-model="banner.title" type="text" name="title" placeholder="Judul Banner" />
          </el-form-item>
          <el-form-item label="Tipe" prop="type">
            <el-radio-group v-model="banner.type">
              <el-radio label="eksternal">Eksternal</el-radio>
              <el-radio label="internal">Internal</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item v-if="banner.type === 'eksternal'" label="Tautan" prop="type">
            <el-input v-model="banner.internal_category" type="text" name="title" placeholder="Judul Banner" />
          </el-form-item>
          <el-form-item v-else label="Kategori" prop="category">
             <el-select v-model="banner.internal_entity_id" placeholder="Pilih Kategori">
               <el-option label="Survei" value="survei"></el-option>
                <el-option label="Polling" value="polling"></el-option>
                <el-option label="Berita" value="berita"></el-option>
             </el-select>
          </el-form-item>
          <el-form-item>
            <el-button v-if="isEdit" type="primary" :loading="loading" @click="submitForm">{{ $t('crud.save-update') }}</el-button>
            <el-button v-else type="primary" :loading="loading" @click="submitForm">{{ $t('crud.save-banner') }}</el-button>

            <router-link :to="'/banner/index'">
              <el-button type="info">{{ $t('crud.cancel') }}</el-button>
            </router-link>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import AttachmentPhotoUpload from '@/components/AttachmentPhotoUpload'
export default {
  components: { AttachmentPhotoUpload },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      loading: false,
      banner: {
        title: null,
        internal_category: null,
        internal_entity_id: null,
        cover_path: null,
        cover_path_url: null,
        status: null,
        type: "eksternal"
      },
      rules: {
        title: [
          {
            required: true,
            message: 'Judul Banner harus diisi',
            trigger: 'blur'
          },
        ],
        type: [
          {
            required: true,
            message: 'Tipe Banner harus diisi',
            trigger: 'blur'
          },
        ],
        category: [
          {
            required: true,
            message: 'Kategori Banner harus diisi',
            trigger: 'blur'
          },
        ]
      }
    }
  },
  methods: {
    photoUploaded(path, url) {
      this.banner.cover_path = path
    },
    async submitForm() {

    }
  }
}
</script>