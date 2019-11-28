<template>
  <div id="leafletmap" />
</template>

<script>
import L from 'leaflet'

export default {
  name: 'MapThumb',

  props: {
    latitude: {
      type: String,
      default: '-6.8675185',
      required: true
    },
    longitude: {
      type: String,
      default: '107.0446946',
      required: true
    },
    id: {
      type: String,
      default: 'gmap_canvas'
    }
  },

  data() {
    return {
      map: null,
      zoom: 12
    }
  },

  mounted() {
    this.initMap()
  },

  methods: {
    initMap() {
      try {
        this.map = L.map('leafletmap').setView(
          [this.latitude, this.longitude],
          this.zoom
        )
        this.tileLayer = L.tileLayer(
          'https://cartodb-basemaps-{s}.global.ssl.fastly.net/rastertiles/voyager/{z}/{x}/{y}.png',
          {
            maxZoom: 18,
            attribution:
              '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>'
          }
        )

        this.tileLayer.addTo(this.map)
        this.initMarker()
      } catch (error) {
        console.error(error)
        this.$message.error(this.$t('map-error'))
      }
    },
    initMarker() {
      L.marker([this.latitude, this.longitude]).addTo(this.map)
    }
  }
}
</script>

<style lang="scss" scoped>
.map {
  margin-top: 50px;
  height: 50px;
  width: 270px;
}

.mapouter {
  position: relative;
  text-align: right;
  height: 350px;
  width: 400px;
}

#leafletmap {
  background: none !important;
  width: 400px;
  height: 350px;
  margin-left: 20px;
  border-radius: 5px;
  margin-top: 20px;
  -webkit-box-shadow: 0px 0px 25px -10px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 0px 25px -10px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 25px -10px rgba(0, 0, 0, 0.75);
}

.map-title {
  width: 400px;
  margin-left: 20px;
  margin-bottom: 10px;
  margin-top: 50px;
  padding: 10px;
}

@media only screen and (min-width: 1200px) and (max-width: 1570px) {
  #leafletmap {
    background: none !important;
    width: 250px;
    height: 230px;
    margin-left: 20px;
    border-radius: 5px;
    margin-top: 20px;
    -webkit-box-shadow: 0px 0px 25px -10px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: 0px 0px 25px -10px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 0px 25px -10px rgba(0, 0, 0, 0.75);
  }

  .map-title {
    width: 250px;
    margin-left: 20px;
    margin-bottom: 10px;
    margin-top: 50px;
    padding: 10px;
  }
}
</style>
