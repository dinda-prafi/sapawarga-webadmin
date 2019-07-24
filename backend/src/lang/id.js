export default {
  route: {
    dashboard: 'Dashboard',
    'profile': 'Profile',

    'user-manage': 'Kelola Pengguna',
    'user-create': 'Tambah Pengguna Baru',
    'user-list-provinsi': 'Provinsi',
    'user-list-kabkota': 'Kabupaten / Kota',
    'user-list-kecamatan': 'Kecamatan',
    'user-list-kelurahan': 'Desa / Kelurahan',
    'user-list-rw': 'User Tingkat RW',

    'nomor-penting-manage': 'Nomor Penting',
    'nomor-penting-list': 'Daftar Nomor Penting',
    'nomor-penting-create': 'Tambah Nomor Penting',
    'nomor-penting-edit': 'Edit Nomor Penting',
    'nomor-penting-detail': 'Detail Nomor Penting',

    'broadcast-manage': 'Pesan',
    'broadcast-create': 'Tambah Pesan',
    'broadcast-list': 'Daftar Pesan',
    'broadcast-edit': 'Edit Pesan',
    'broadcast-show': 'Detail Pesan',

    'notification-manage': 'Notifikasi',
    'notification-create': 'Tambah Notifikasi',
    'notification-list': 'Daftar Notifikasi',
    'notification-edit': 'Edit Notifikasi',
    'notification-show': 'Detail Notifikasi',

    'aspiration-manage': 'Aspirasi Masyarakat',
    'aspiration-list': 'Aspirasi Masyarakat',
    'aspiration-detail': 'Detail Aspirasi',

    'polling-manage': 'Polling',
    'polling-list': 'Daftar Polling',
    'polling-create': 'Tambah Polling',
    'polling-detail': 'Detail Polling',
    'polling-edit': 'Edit Polling',

    'survey-manage': 'Survei',
    'survey-list': 'Daftar Survei',
    'survey-create': 'Tambah Survei',
    'survey-detail': 'Detail Survei',
    'survey-edit': 'Edit Survei',

    'news-manage': 'Berita',
    'news-list': 'Daftar Berita',
    'news-create': 'Tambah Berita',
    'news-edit': 'Edit Berita',
    'news-detail': 'Detail Berita',

    'video-manage': 'Video',
    'video-list': 'Daftar Video',
    'video-create': 'Tambah Video',
    'video-edit': 'Edit Video',
    'video-detail': 'Detail Video'

  },
  crud: {
    'list-empty': 'Belum ada data.',
    'create': 'Buat Baru',
    'update': 'Edit',
    'delete': 'Hapus',
    'cancel': 'Batal',
    'back': 'Kembali',
    'accept': 'Terima',
    'reject': 'Tolak',
    'send': 'Kirim Pesan',
    'draft': 'Simpan sebagai Draft',

    'save-create': 'Simpan',
    'save-update': 'Simpan Perubahan',
    'save-publish': 'Simpan dan Aktifkan',
    'save-news': 'Tambah Berita',

    'back-to-list': 'Kembali ke Daftar',
    'send-polling': 'Publikasikan Polling',
    'publish-polling': 'Polling berhasil dipublikasikan',

    'survey-send': 'Publikasikan Survei',
    'survey-published': 'Survei berhasil dipublikasikan.',

    'insert-row': 'Tambah Baris Baru',
    'delete-row': 'Hapus',
    'delete-row-confirm': 'Anda yakin ingin menghapus data ini?',

    'create-success': 'Data baru berhasil dibuat.',
    'update-success': 'Perubahan data berhasil disimpan.',
    'send-success': 'Pesan berhasil dikirim',
    'draft-success': 'Pesan berhasil disimpan di draft',

    'send-polling-success': 'Polling berhasil dipublikasikan',
    'draft-polling-success': 'Polling berhasil disimpan di draft',

    'send-notification-success': 'Notifikasi berhasil di kirim',
    'draft-notification-success': 'Notifikasi berhasil di simpan di draft',

    'user-activate-confirm': 'Anda yakin ingin mengaktifkan pengguna ini?',
    'user-deactivate-confirm': 'Anda yakin ingin menonaktifkan pengguna ini?',
    'user-activate-success': 'Pengguna berhasil diaktifkan.',
    'user-deactivate-success': 'Pengguna berhasil dinonaktifkan.',

    'activate-confirm': 'Anda yakin ingin mengaktifkan data ini?',
    'deactivate-confirm': 'Anda yakin ingin menonaktifkan data ini?',
    'activate-success': 'Data berhasil diaktifkan.',
    'deactivate-success': 'Data berhasil dinonaktifkan.',

    'delete-confirm': 'Anda yakin ingin menghapus data ini?',
    'delete-success': 'Data berhasil dihapus.',

    'polling-error-edit-published': 'Sudah dipublish, tidak dapat diedit.',
    'broadcast-error-edit-published': 'Sudah dipublish, tidak dapat di edit.',
    'notification-error-edit-published': 'Sudah dipublish, tidak dapat di edit.'
  },
  common: {
    confirm: 'Ya',
    cancel: 'Batal'
  },
  errors: {
    'internal-server-error': 'Telah terjadi kesalahan sistem, silahkan muat ulang halaman ini.',

    'polling-compare-date': 'Tanggal berakhir polling harus lebih besar dari tanggal mulai polling.',
    'polling-start-date': 'Tanggal mulai polling tidak boleh lebih kecil dari tanggal hari ini.',
    'survey-start-date': 'Tanggal mulai survei tidak boleh lebih kecil dari tanggal hari ini.',
    'survey-compare-date': 'Tanggal berakhir survei harus lebih besar dari tanggal mulai survei.',

    'news-image-null': 'Gambar tidak boleh kosong.'

  },
  navbar: {
    profile: 'Lihat Profil'
  }
}
