<template>
  <div class="wrapper">
    <div
      class="
        header
        d-flex
        flex-column
        align-lg-center
        justify-center
        pa-lg-15 pa-3
      "
    >
      <div class="text-lg-h1 text-h3 font-weight-bold pl-5 white--text d-flex">
        Farma Plus
        <img
          src="https://keamananvaksin.kemkes.go.id/assets/img/kemenkes.png"
          class="logo"
        />
      </div>
      <div class="pl-5 pt-3 text-h5 white--text">Find your medicine here</div>
    </div>
    <!-- Toolbar Desktop -->
    <div
      class="toolbar"
      style="background-color: white"
      v-if="!loadingToolbar"
    >
      <v-row class="px-lg-16 px-0 pt-5" no-gutters>
        <v-col cols="6" class="px-5">
          <span class="pl-5">Provinsi</span>
          <v-autocomplete
            v-model="selected.provinsi"
            :items="options.provinsi"
            chips
            filled
            hide-details
            multiple
            clearable
            deletable-chips
            rounded
            dense
          >
          </v-autocomplete>
        </v-col>
        <v-col cols="6" class="px-5">
          <span class="pl-5">Kabupaten/Kota</span>
          <v-autocomplete
            v-model="selected.kabkota"
            :items="options.kabkota"
            chips
            filled
            hide-details
            multiple
            clearable
            deletable-chips
            rounded
            dense
          >
          </v-autocomplete>
        </v-col>

        <!-- <v-col cols="2 px-5 mt-5">
          <v-autocomplete
            v-model="limit"
            :items="limitOptions"
            filled
            hide-details
            deletable-chips
            rounded
          >
          </v-autocomplete>
        </v-col>
        <v-col cols="8 mt-5">
          <div class="text-center">
            <v-pagination
              v-model="start"
              :length="parseInt(amount / limit) + 1"
              total-visible="10"
              circle
            ></v-pagination>
          </div>
        </v-col> -->

        <v-col cols="12" class="pt-5">
          <v-data-table
            mobile-breakpoint="0"
            :headers="headers"
            :items="tableItems"
            v-model="selectingObat"
            item-key="obat"
            dense
            show-select
            :single-select="false"
            hide-default-footer
          >
          </v-data-table>
        </v-col>
        <v-col class="d-flex justify-center align-center mt-5 flex-column" cols="8" offset="2" v-show="!loadingBody">
          <div>Total: {{getTotal(tableItems)}}</div>
          <div>{{ amountWriter() }}</div>
        </v-col>
        <v-col
          cols="2"
          class="d-flex justify-end align-center pr-5 mt-5"
        >
          <v-btn color="error" elevation="2" class="ml-5" rounded @click="reset"
            >Reset</v-btn
          >
        </v-col>
      </v-row>
    </div>
    <!-- Body -->
    <v-row
      class="px-lg-16 px-3 pb-10 mt-5 cards-body"
      align="stretch"
      v-if="!loadingBody && amount == 0"
    >
      <v-col
        cols="12"
        class="d-flex align-center justify-center"
        style="height: 50vh"
      >
        <v-alert outlined type="warning" prominent border="left">
          {{ amountWriter() }}
        </v-alert>
      </v-col>
    </v-row>
    <v-row
      class="px-lg-16 px-3 pb-10 mt-5 cards-body"
      align="stretch"
      v-if="!loadingBody && amount !== 0"
    >
      <v-col
        v-for="(apotek, index) in body"
        :key="index"
        lg="6"
        cols="12"
        class="px-7"
      >
        <v-card elevation="5" class="card" height="100%">
          <v-row class="pa-5">
            <v-col
              cols="12"
              lg="7"
              class="d-flex flex-column justify-space-between"
            >
              <div>
                <v-card-title
                  class="text-lg-h5 text-md-h4 font-weight-bold pt-0 pl-0"
                >
                  {{ formatNama(apotek.nama) }}
                </v-card-title>
                <v-card-subtitle class="px-0 pb-0"
                  >{{ apotek.alamat}}</v-card-subtitle
                ><v-card-subtitle class="px-0 pb-0 pa-0 pb-lg-5"
                  >{{ apotek.kabkota }}, {{ apotek.provinsi }}</v-card-subtitle
                >
              </div>
              <div>
                <v-card-title class="text font-weight-bold px-0">{{
                  apotek.obat
                }}</v-card-title>
                <v-card-subtitle class="text px-0 pb-0 pb-lg-5"
                  >Didistribusikan pada:
                  {{ formatTanggal(apotek.tanggal) }}</v-card-subtitle
                >
              </div>
            </v-col>
            <v-col lg="5" cols="12" class="card-right py-0 py-lg-5">
              <div>
                <v-card-subtitle class="pa-0 grey--text text-h6 text--darken-3 text-right"
                  >Jumlah</v-card-subtitle
                >
                <v-card-title
                  class="
                    text-h4 text-md-h2
                    font-weight-medium
                    pt-0
                    pl-0
                    pr-0
                    green--text
                    text--darken-4
                  "
                >
                  {{ formatAngka(apotek.jumlah) }}
                </v-card-title>
              </div>

              <!-- <span class="badgeDistributor badge--small mb-3"><v-icon class="mr-2">mdi-map-marker</v-icon> Maps</span> -->

              <v-card-actions class="px-0 pt-7">
                <a v-bind:href="getLoc(apotek.latitude, apotek.longitude)" target="_blank">
                <v-btn rounded color="success">
                  <v-icon class="mr-2">mdi-map-marker</v-icon> Maps
                </v-btn>
                </a>
              </v-card-actions>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <v-row class="justify-center pb-10">
      <v-col cols="1 mt-4">
        <v-autocomplete
          v-model="limit"
          :items="limitOptions"
          filled
          hide-details
          deletable-chips
          rounded
        >
        </v-autocomplete>
      </v-col>
      <div class="text-center mt-10 px-5">
        <p class="">
          {{ (start - 1) * limit + 1 }} - {{ (start - 1) * limit + limit }} of
          {{ amount }}
        </p>
      </div>
      <v-col cols="1 mt-5">
        <div class="text-center">
          <v-pagination
            v-model="start"
            :length="parseInt(amount / limit) + 1"
            total-visible="0"
            circle
          ></v-pagination>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import api from "../api/api.js";

export default {
  name: "HelloWorld",

  data: () => ({
    shipment: [],
    date: [],
    menu: false,
    menuInput: false,
    loadingToolbar: false,
    loadingBody: true,
    start: 1,
    limit: 10,
    dialog: false,
    limitOptions: [10, 20, 50, 100],
    selected: {
      name: [],
      obat: [],
      provinsi: [],
      kabkota: [],
      tanggal: [],
    },
    input: {
      name: [],
      obat: [],
      provinsi: [],
      kabkota: [],
      tanggal: [],
    },
    provinsis: [],
    body: [],
    options: [],
    headers: [
      {
        text: 'Jenis Obat',
        value: 'obat',
      },
      { text: 'Jumlah', value: 'jumlah' },
    ],
    tableItems: [
    ],
    selectingObat: [],
    province: ''
  }),
  methods: {
    async optionsToTable() {
      await Promise.all(this.options.obat.map((r) => {
        var item = {
          obat: '',
          jumlah: 0
        }
        item.obat = r
        item.jumlah = 1000

        this.tableItems.push(item)
      }))

      console.log(this.tableItems)
    },
    getTotal(items) {
      var x = items.map((r) => {
        return r.jumlah
      })
      return x.reduce((a, b) => a + b, 0)
    },
    capitalizeFirstLetter(str) {
      const lower = str.toLowerCase();
      return str.charAt(0).toUpperCase() + lower.slice(1);
    },
    formatNama(nama) {
      if (nama.toLowerCase().includes("apotek") ) {
        return (nama) 
      } else {
        return (`Apotek ${nama}`)
      }
      
    },
    getLoc(lat, long) {
      return `http://maps.google.co.uk/maps?q=${lat},${long}`
    },
    formatAngka(num) {
      var a = 0;
      if (Math.abs(num) > 999999) {
        a = Math.sign(num) * (Math.abs(num) / 1000000).toFixed(1) + "m";
      } else {
        a =
          Math.abs(num) > 9999
            ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + "k"
            : Math.sign(num) * Math.abs(num);
      }
      return a.toString().replace(".", ",");
    },
    formatTanggal(tanggal) {
      var today = new Date();
      var target = new Date(tanggal);
      var Difference_In_Date =
        (today.getTime() - target.getTime()) / (1000 * 3600 * 24);
      if (Difference_In_Date > -1) {
        return "hari ini";
      } else {
        return -1 * Difference_In_Date + " hari yang lalu";
      }
    },
    async refreshPage() {
      await this.getOptions();
      this.optionsToTable()

      this.loadingToolbar = false;

      var res = await this.update();
      this.body = res.data;
      this.loadingBody = false;
    },
    async getOptions() {
      var obat = await api.find("obats");
      this.options["obat"] = obat.map((ob) => {
        return this.capitalizeFirstLetter(ob.nama);
      });

      var provinsi = await api.find("provinses");
      this.options["provinsi"] = provinsi.map((ob) => {
        return ob.nama;
      });
      this.provinsis = provinsi;

      // var provinsi = await api.find("provinses");
      // console.log(provinsi);
      // this.options["provinsi"] = provinsi;
    },
    async update() {
      this.province = this.selected.provinsi
      this.loadingBody = true;

      var res = await api.filter(
        this.selected.name,
        this.selected.obat,
        this.selected.provinsi,
        this.selected.kabkota,
        this.selected.tanggal,
        this.start - 1,
        this.limit
      );
      this.body = res.data;
      // console.log(res.data);

      this.loadingBody = true;

      var res2 = await api.count(
        this.selected.name,
        this.selected.obat,
        this.selected.provinsi,
        this.selected.kabkota,
        this.selected.tanggal
      );
      this.amount = res2.data;
      // console.log(res2.data);
      this.loadingBody = false;

      // await this.getKabkot()
    },
    async getKabkot() {
      // console.log("get kabkota");
      // console.log(this.provinsis)
      var select_kabkota = []
      await Promise.all((this.selected["provinsi"].map( async (selected_provinsi) => {
        // console.log(selected_provinsi)
        await Promise.all(this.provinsis.map( async (provinsi) => {
          if (provinsi.nama == selected_provinsi) {
            await Promise.all(provinsi.Kabkota.map((r) => {
              select_kabkota.push(r.nama)
            }))
            this.options["kabkota"] = select_kabkota
          }
        }))
      })))

    },
    amountWriter() {
      if (this.amount == 0) {
        return "There are none available";
      } else if (this.amount == 1) {
        return "Showing 1 result";
      } else {
        return "Showing " + this.amount + " results";
      }
    },
    async reset() {
      this.selectingObat = []
      this.selected = {
        name: [],
        obat: [],
        provinsi: [],
        kabkota: [],
        tanggal: [],
        start: 0,
        limit: 10,
      };
      var res2 = await api.getLastShipment();
      this.selected.tanggal = res2.data[0]["tanggal"];
    },
    resetInput() {
      this.input = {
        name: [],
        obat: [],
        provinsi: [],
        kabkota: [],
        tanggal: [],
        start: 0,
        limit: 10,
      };
    },
    searchInput() {
      // this.selected = JSON.parse(JSON.stringify(this.input));
      this.dialog = false;
    },
  },
  async mounted() {
    var res2 = await api.getLastShipment();
    this.selected.tanggal = res2.data[0]["tanggal"];
    await this.refreshPage();
    // await this.getOptions();
  },
  watch: {
    selected: {
      handler() {
        this.update();
        // this.getKabkot()
      },
      deep: true,
    },
    start() {
      // console.log(newV)
      // if (newV > parseInt(this.amount/this.limit)+1) {
      //   this.start = 1
      // }
      this.update();
    },
    limit() {
      this.update();
    },
    selectingObat: function (newvar) {
      var x = newvar.map((r) => {
        return r.obat
      })
      this.selected.obat = x
    },
    province: function (newvar) {
      if (newvar.length == 0) {
        this.options["kabkota"] = []
      } else {
        this.getKabkot()
      }
    }
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap");
* {
  font-family: "Montserrat", sans-serif;
}

.logo {
  height: 50px;
  object-fit: cover;
}

.wrapper {
  padding: 0;
  margin: 0;
  width: 100%;
}

.card {
  display: flex;
  overflow: hidden;
}

.card-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
}

.card-left {
  width: 50%;
}

a {
  text-decoration: none;
}

.toolbar {
  box-shadow: 0px 10px 5px 0px rgba(255, 255, 255, 0.9);
  -webkit-box-shadow: 0px 10px 5px 0px rgba(255, 255, 255, 0.9);
  -moz-box-shadow: 0px 10px 5px 0px rgba(255, 255, 255, 0.9);
}

.left {
  width: 30%;
}

.right {
  width: 70%;
}

.card {
  min-height: 10rem;
  max-height: auto;
}
.header {
  width: 100%;
  height: 300px;
  background-color: #16b3ac;
  background-image: linear-gradient(120deg, #16b3ac 0%, #d1dc03 80%);
  background-size: 1000% 1000%;
  animation: gradient 20s ease infinite;
}
.badgeDistributor {
  box-sizing: border-box;
  display: inline-block;
  background-color: #3498db;
  color: white;

  border-radius: 3rem;
  text-align: center;

  font-size: 0.9rem;
  font-weight: 400;
  padding: 0.05rem 0.8rem 0.1rem;
  line-height: inherit;
}
.badge--small {
  padding: 0.1rem 0.65rem 0.2rem;
}

@keyframes gradient {
  32.5% {
    background-position: 100% 100%;
  }
  75% {
    background-position: 0% 0%;
  }
}

@media only screen and (max-width: 1248px) {
  .wrapper {
    overflow: hidden;
  }

  .logo {
    height: 50px;
    margin-top: -15px;
  }
}
</style>
