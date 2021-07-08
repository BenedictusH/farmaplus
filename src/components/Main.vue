<template>
  <div class="wrapper">
    <!-- {{provinsis}} -->
    <div class="header d-flex flex-column align-lg-center justify-center pa-lg-15 pa-3 ">
      <div class="text-lg-h1 text-h3 font-weight-bold pl-5 white--text d-flex">
        Farma Plus
        <img src="https://keamananvaksin.kemkes.go.id/assets/img/kemenkes.png" class="logo" />
      </div>
      <div class="pl-5 pt-3 text-h5 white--text">Tempat Cari Obat</div>
    </div>
    <v-btn
      @click.stop="dialog = true"
      fab
      class="d-block d-lg-none"
      style=" margin-left: 20px; margin-top: 20px; z-index: 20; background-color: white"
      v-if="!loadingToolbar"
    >
      <v-icon dark>
        mdi-menu
      </v-icon>
    </v-btn>
    <v-dialog v-model="dialog">
      <v-card rounded>
        <div class="" v-if="!loadingToolbar">
          <v-row class="px-5 py-5" no-gutters>
            <v-col cols="12" class="d-flex justify-end">
              <v-icon @click.stop="dialog = false">mdi-close</v-icon>
            </v-col>
          </v-row>
          <v-row class="px-lg-16 px-0" no-gutters>
            <v-col cols="12" lg="8" class="px-5">
              <v-text-field
                filled
                rounded
                dense
                label="Search"
                append-icon="mdi-magnify"
                v-model="input.name"
              ></v-text-field>
            </v-col>
            <v-col cols="12" lg="4" class="px-5">
              <v-menu
                ref="menuInput"
                v-model="menuInput"
                :close-on-content-click="false"
                :return-value.sync="input.tanggal"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="input.tanggal"
                    filled
                    rounded
                    hide-details
                    label="Pilih Tanggal"
                    append-icon="mdi-calendar"
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="input.tanggal" no-title scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="menuInput = false"> Cancel </v-btn>
                  <v-btn text color="primary" @click="$refs.menuInput.save(input.tanggal)">
                    OK
                  </v-btn>
                </v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="12" lg="4" class="px-5 mt-5">
              <span class="pl-5">Obat</span>
              <v-autocomplete
                v-model="input.obat"
                :items="options.obat"
                chips
                filled
                hide-details
                multiple
                clearable
                deletable-chips
                rounded
              >
              </v-autocomplete>
            </v-col>
            <v-col cols="12" lg="4" class="px-5 mt-lg-0 mt-5">
              <span class="pl-5">Provinsi</span>
              <v-autocomplete
                v-model="input.provinsi"
                :items="options.provinsi"
                chips
                filled
                hide-details
                multiple
                clearable
                deletable-chips
                rounded
              >
              </v-autocomplete>
            </v-col>
            <!-- <v-col cols="12" lg="4" class="px-5 mt-lg-0 mt-5 mb-lg-0 mb-5">
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
              >
              </v-autocomplete>
            </v-col> -->
            <v-col cols="12 mt-5">
              <div class="text-center">
                <v-pagination
                  v-model="start"
                  :length="parseInt(amount / limit) + 1"
                  total-visible="4"
                  circle
                ></v-pagination>
              </div>
            </v-col>
            <v-col cols="6 px-5 mt-5 mb-5">
              <v-autocomplete
                v-model="limit"
                :items="limitOptions"
                filled
                hide-details
                dense
                rounded
              >
              </v-autocomplete>
            </v-col>

            <v-col
              cols="6 mt-5 mb-5"
              class="pr-5"
              style="display: flex; justify-content: flex-end; align-items: center"
            >
              <v-btn
                color="error"
                small
                elevation="2"
                class="text-body2"
                rounded
                @click="resetInput"
                >Reset</v-btn
              >
              <v-btn
                color="primary"
                small
                elevation="2"
                class="ml-1 text-body2"
                rounded
                @click="searchInput"
                >Search</v-btn
              >
            </v-col>
          </v-row>
        </div>
      </v-card>
    </v-dialog>
    <div
      class="toolbar d-none d-lg-block"
      style="position: sticky; top: 0; z-index: 20; background-color: white"
      v-if="!loadingToolbar"
    >
      <v-row class="px-lg-16 px-0 pt-5" no-gutters>
        <v-col cols="12" lg="8" class="px-5">
          <v-text-field
            filled
            rounded
            dense
            label="Search"
            append-icon="mdi-magnify"
            v-model="selected.name"
          ></v-text-field>
        </v-col>
        <v-col cols="12" lg="4" class="px-5">
          <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            :return-value.sync="selected.tanggal"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="selected.tanggal"
                filled
                rounded
                label="Pilih Tanggal"
                append-icon="mdi-calendar"
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="selected.tanggal" no-title scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="menu = false"> Cancel </v-btn>
              <v-btn text color="primary" @click="$refs.menu.save(selected.tanggal)">
                OK
              </v-btn>
            </v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="6" lg="4" class="px-5">
          <span class="pl-5">Obat</span>
          <v-autocomplete
            v-model="selected.obat"
            :items="options.obat"
            chips
            filled
            hide-details
            multiple
            clearable
            deletable-chips
            rounded
          >
          </v-autocomplete>
        </v-col>
        <v-col cols="6" lg="4" class="px-5">
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
          >
          </v-autocomplete>
        </v-col>
        <v-col cols="6" lg="4" class="px-5 mt-lg-0 mt-5 mb-lg-0 mb-5">
          <!-- <span class="pl-5">Kabupaten/Kota</span>
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
          >
          </v-autocomplete> -->
        </v-col>

        <v-col cols="2 px-5 mt-5">
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
        </v-col>
        <v-col cols="2 mt-5" class="pr-5" style="display: flex; justify-content: flex-end">
          <v-btn color="error" elevation="2" class="ml-5" rounded @click="reset">Reset</v-btn>
        </v-col>
      </v-row>
    </div>
    <v-row class="px-lg-16 px-3 pb-10 mt-5 cards-body" align="stretch" v-if="!loadingBody">
      <v-col v-for="(apotek, index) in body" :key="index" lg="6" cols="12" class="px-7">
        <v-card elevation="5" class="card" height="100%">
          <v-row class="pa-5">
            <v-col cols="12" lg="7" class="d-flex flex-column justify-space-between">
              <div>
                <v-card-title class="text-lg-h5 text-md-h4 font-weight-bold pt-0 pl-0">
                  {{ apotek.nama }}
                </v-card-title>
                <v-card-subtitle class="px-0 pb-0 pb-lg-5"
                  >{{ apotek.kabkota }}, {{ apotek.provinsi }}</v-card-subtitle
                >
              </div>
              <div>
                <v-card-title class="text font-weight-bold px-0">{{ apotek.obat }}</v-card-title>
                <v-card-subtitle class="text px-0 pb-0 pb-lg-5"
                  >Didistribusikan pada: {{ formatTanggal(apotek.tanggal) }}</v-card-subtitle
                >
              </div>
            </v-col>
            <v-col lg="5" cols="12" class="card-right py-0 py-lg-5">
              <v-card-subtitle class="pa-0 grey--text text-h6 text--darken-3"
                >Jumlah</v-card-subtitle
              >
              <v-card-title
                class="
                  text-h4
                  text-md-h2

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

              <!-- <v-card-actions class="px-0 pt-7">
                <v-btn outlined rounded text>
                  <v-icon class="mr-2">mdi-map-marker</v-icon> Lokasi
                </v-btn>
              </v-card-actions> -->
            </v-col>
          </v-row>
        </v-card>
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
    }),
    methods: {
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
        var Difference_In_Date = (today.getTime() - target.getTime()) / (1000 * 3600 * 24);
        if (Difference_In_Date > -1) {
          return "hari ini";
        } else {
          return -1 * Difference_In_Date + " hari yang lalu";
        }
      },
      remove(item) {
        const index = this.selectedObat.indexOf(item);
        if (index >= 0) this.selectedObat.splice(index, 1);
      },
      async refreshPage() {
        await this.getOptions();

        this.loadingToolbar = false;

        var res = await this.update();
        this.body = res.data;
        this.loadingBody = false;
      },
      async getOptions() {
        var obat = await api.find("obats");
        this.options["obat"] = obat.map((ob) => {
          return ob.nama;
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
        console.log("get kabkota");
        this.selected["kabkota"] = this.provinsis.map((prov) => {
          if (prov in this.selected["provinsi"]) {
            return prov.kabkota.map((obj) => {
              return obj;
            });
          }
        });
      },
      reset() {
        this.selected = {
          name: [],
          obat: [],
          provinsi: [],
          kabkota: [],
          tanggal: [],
          start: 0,
          limit: 10,
        };
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
        this.selected = JSON.parse(JSON.stringify(this.input));
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
  }

  .card-left {
    width: 50%;
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
