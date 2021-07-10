<template>
  <div class="wrapper">
    <div
      class="
        header
        d-flex
        flex-column
        justify-center
        align-lg-center
        py-lg-15 py-3
      "
    >
      <div class="text-lg-h2 text-h3 font-weight-bold pl-5 white--text text-center">
        Farma Plus
        <div class="pt-3 text-h5 white--text text-center">Find your medicine here</div>
      </div>
    </div>
    <!-- Toolbar Desktop -->
    <div class="toolbar" style="background-color: white" v-if="!loadingToolbar">
      <v-row class="px-lg-16 px-0 pt-5" no-gutters>
        <!-- <v-col cols="4" class="px-5">
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
            dense
          >
          </v-autocomplete>
        </v-col> -->

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

        <v-col cols="12" class="py-5 px-5 text-lg-h5 text-h6">
          <v-row>
            <v-col cols="12" md="6" order-md="1" order="2">
              Stok {{ formatTanggal(selected.tanggal) }}
              <br class="d-block d-md-none" />
              ({{ formatDate(selected.tanggal) }} 07.00 WIB )</v-col
            >
            <v-col
              cols="12"
              md="6"
              order-md="2"
              order="1"
              class="d-flex justify-md-end justify-center"
              style="column-gap: 2rem"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/d/de/Logo_of_the_Ministry_of_Health_of_the_Republic_of_Indonesia.png"
                class="logo"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Logo_BUMN_Untuk_Indonesia_2020.svg/2560px-Logo_BUMN_Untuk_Indonesia_2020.svg.png"
                class="logo"
              />
              <img
                src="https://1.bp.blogspot.com/-Rxt27KxQsog/XxayOZeDIJI/AAAAAAAACa0/64O97OMazGARKcKItopsuYy6_dWMq3dxACLcBGAsYHQ/w1200-h630-p-k-no-nu/Logo%2BBiofarma.png"
                class="logo"
              />
            </v-col>
          </v-row>

          <!-- {{ formatTanggal(apotek.tanggal) }} -->
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
        <v-col cols="12" class="px-5 pb-5 text-center">
          Menampilkan <strong>{{ formatAngka(getTotal(tableItemsInt)) }}</strong> Obat</v-col
        >

        <v-col cols="12" md="6" class="px-5">
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
        <v-col cols="12" md="6" class="px-5">
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
        <v-col
          class="d-flex justify-center align-center mt-5 flex-column"
          cols="12"
          order="5"
          order-md="4"
          md="8"
          offset-md="2"
          v-show="!loadingBody"
        >
          <div v-if="amount == 1">Menampilkan <strong>1</strong> apotek</div>
          <div v-else-if="amount > 1">
            Menampilkan <strong>{{ amount }}</strong> apotek
          </div>
          <div v-else-if="amount != 0"></div>
        </v-col>
        <v-col
          cols="12"
          md="2"
          order-md="5"
          order="4"
          class="d-flex justify-end align-center pr-md-5 pr-5 mt-5"
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
      v-if="amount !== 0"
    >
      <v-col
        lg="6"
        cols="12"
        class="px-7"
        v-for="index in 10"
        :key="index * 10"
        v-show="loadingBody"
      >
        <v-skeleton-loader type="article" class="mb-6" elevation="2">
        </v-skeleton-loader>
      </v-col>
      <v-col
        v-for="(apotek, index) in body"
        :key="index"
        lg="6"
        cols="12"
        class="px-7"
        v-show="!loadingBody"
      >
        <v-card elevation="5" class="card" height="100%">
          <v-row class="pa-5">
            <v-col
              cols="12"
              lg="7"
              class="d-flex flex-column justify-space-between pb-0"
            >
              <div>
                <v-card-title
                  class="text-lg-h5 text-md-h4 font-weight-bold pt-0 pl-0"
                >
                  {{ formatNama(apotek.nama) }}
                </v-card-title>
                <v-card-subtitle class="px-0 pb-0">{{
                  apotek.alamat
                }}</v-card-subtitle
                ><v-card-subtitle class="px-0 pb-0 pa-0 pb-lg-5"
                  >{{ apotek.kabkota }}, {{ apotek.provinsi }}</v-card-subtitle
                >
              </div>
              <div>
                <v-card-title class="text font-weight-bold px-0">{{
                  apotek.obat
                }}</v-card-title>
                <!-- <v-card-subtitle class="text px-0 pb-0 pb-lg-5"
                  >Didistribusikan pada:
                  {{ formatTanggal(apotek.tanggal) }}</v-card-subtitle
                > -->
              </div>
            </v-col>
            <v-col
              lg="5"
              cols="12"
              class="
                card-right
                d-flex
                flex-lg-column flex-row
                align-lg-end
                justify-space-between justify-lg-space-between
                py-0
                pt-lg-1
                pb-lg-3
              "
            >
              <div>
                <v-card-subtitle
                  class="pa-0 grey--text text-h6 text--darken-3 text-lg-right"
                  >Stok</v-card-subtitle
                >
                <v-card-title
                  class="
                    text-h4 text-md-h3
                    font-weight-medium
                    pt-0
                    pl-0
                    pr-0
                    green--text
                    text--darken-4
                  "
                >
                  <span v-if="apotek.jumlah <= 0" class="red--text spaccing">
                    Habis</span
                  >
                  <span
                    v-else-if="apotek.jumlah <= 20"
                    class="
                      yellow--text
                      text--darken-2
                      spaccing
                      text-h5 text-md-h4
                    "
                  >
                    Di bawah 20</span
                  >
                  <span v-else class="green--text spaccing"> Tersedia</span>
                </v-card-title>
              </div>

              <!-- <span class="badgeDistributor badge--small mb-3"><v-icon class="mr-2">mdi-map-marker</v-icon> Maps</span> -->

              <v-card-actions class="px-0 pt-md-5 pt-0">
                <a
                  v-bind:href="getLoc(apotek.latitude, apotek.longitude)"
                  target="_blank"
                >
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
    <v-row class="pb-10 px-7 px-lg-0" justify="center">
      <v-col cols="5 mt-4" md="2" lg="1">
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
      <!-- <v-col>
      <div class="text-center mt-10 px-5">
        <p class="">
          {{ (start - 1) * limit + 1 }} - {{ (start - 1) * limit + limit }} of
          {{ amount }}
        </p>
      </div>
      </v-col> -->

      <!-- lg pagination -->
      <v-col cols="8 mt-5 d-md-block d-none" md="5">
        <div class="text-center">
          <v-pagination
            v-model="start"
            class="limit"
            :length="parseInt(amount / limit) + 1"
            total-visible="10"
            circle
          ></v-pagination>
        </div>
      </v-col>

      <!-- phone pagination -->
      <v-col cols="12 d-md-none d-block pagination-hp">
        <div class="text-center">
          <v-pagination
            v-model="start"
            class="limit"
            :length="parseInt(amount / limit) + 1"
            total-visible="5"
            circle
          ></v-pagination>
        </div>
      </v-col>
    </v-row>
    <v-footer dark padless>
      <v-col cols="12 pa-0">
        <v-card
          flat
          tile
          class="grey lighten-4 grey--text text--darken-1 text-center"
        >
          <v-card-text class="grey--text text--darken-3">
            Copyright &copy; 2021, Kementerian Kesehatan Republik Indonesia. All
            Rights Reserved. Developed by CANIGOPAL
          </v-card-text>

          <v-divider></v-divider>
        </v-card>
      </v-col>
    </v-footer>
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
    jumlah: "",
    options: [],
    headers: [
      {
        text: "Jenis Obat",
        value: "obat",
      },
      { text: "Total Obat", value: "jumlah" },
    ],
    tableItems: [],
    tableItemsInt: [],
    selectingObat: [],
    province: "",
  }),
  methods: {
    async optionsToTable() {
      // await Promise.all(
      //   this.options.obat.map((r) => {
      //     var item = {
      //       obat: "",
      //       jumlah: 0,
      //     };
      //     item.obat = r;
      //     item.jumlah = 1000;
      //     this.tableItems.push(item);
      //   })
      // );
      //
    },
    async getJumlah() {
      var total_provinsi = [];
      await Promise.all(
        this.selected["provinsi"].map(async (selected_provinsi) => {
          //
          await Promise.all(
            this.provinsis.map(async (provinsi) => {
              if (provinsi.nama == selected_provinsi) {
                await Promise.all(
                  provinsi.jumlah.map((r) => {
                    if (this.selected.tanggal == r.tanggal) {
                      total_provinsi.push(r);
                    }
                  })
                );
              }
            })
          );
        })
      );
      this.tableItems = [];
      this.tableItemsInt = [];
      await Promise.all(
        this.options.obat.map((r) => {
          var obat = r.toLowerCase();
          var jumlah = total_provinsi
            .map((jumlah) => {
              try {
                return jumlah[obat];
              } catch (e) {
                return 0;
              }
            })
            .reduce((a, b) => a + b, 0);
          var item = {
            obat: "",
            jumlah: 0,
          };
          item.obat = r;
          item.jumlah = this.formatAngka(jumlah);

          this.tableItems.push(item);
          // console.log("haha");
          var itemInt = {
            jumlah: 0,
          };
          itemInt.jumlah = jumlah;
          // console.log(jumlah);
          this.tableItemsInt.push(itemInt);
        })
      );

      //
    },
    async getJumlahObatProv() {
      // var list_provinsis = await Promise.all(
      //   this.selected.provinsi.map(async (provinsi) => {
      //     return await Promise.all(
      //       this.provinsis.map((prov) => {
      //
      //         if (provinsi == prov.nama) {
      //
      //           return prov;
      //         } else {
      //
      //         }
      //       })
      //     );
      //   })
      // );
      //
      var listJumlahObats = await Promise.all(
        this.provinsis.map((provinsi) => {
          return provinsi.jumlah.map((tgl) => {
            if (this.selected.tanggal == tgl.tanggal) {
              return tgl;
            }
          });
        })
      );

      // var azth = listJumlahObats.map((jumlah) => {
      //   try {
      //     return jumlah[0].azithromycin;
      //   } catch (e) {
      //     return 0;
      //   }
      // });

      await Promise.all(
        this.options.obat.map((r) => {
          var obat = r.toLowerCase();
          var jumlah = listJumlahObats
            .map((jumlah) => {
              try {
                return jumlah[0][obat];
              } catch (e) {
                return 0;
              }
            })
            .reduce((a, b) => a + b, 0);

          var item = {
            obat: "",
            jumlah: 0,
          };
          item.obat = r;
          item.jumlah = this.formatAngka(jumlah);

          this.tableItems.push(item);
          console.log("haha");
          var itemInt = {
            jumlah: 0,
          };
          itemInt.jumlah = jumlah;
          console.log(jumlah);
          this.tableItemsInt.push(itemInt);
        })
      );
      // var jumlahObatPBF = [2066186, 3235100, 52895297, 205900, 11856, 83]
      // var jumlahObatRS = [1649724, 1441082, 5525667, 1108732, 63346, 139]
      // this.tableItems.map((item, index) => {
      //
      //   this.tableItems[index]['PBF'] = this.formatAngka( jumlahObatPBF[index])
      //   this.tableItems[index]['RS'] = this.formatAngka(jumlahObatRS[index])
      // })
      //
      // this.jumlah = azth;
      //
      // return x.reduce((a, b) => a + b, 0);
    },
    getTotal(items) {
      var x = items.map((r) => {
        return r.jumlah;
      });
      return x.reduce((a, b) => a + b, 0);
    },
    capitalizeFirstLetter(str) {
      const lower = str.toLowerCase();
      return str.charAt(0).toUpperCase() + lower.slice(1);
    },
    formatNama(nama) {
      if (nama.toLowerCase().includes("apotek")) {
        return nama;
      } else {
        return `Apotek ${nama}`;
      }
    },
    formatDate(input) {
      var date = new Date(input).getDay();

      let bulans = [
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember",
      ];

      let hari = [
        "Senin",
        "Selasa",
        "Rabu",
        "Kamis",
        "Jumat",
        "Sabtu",
        "Minggu",
      ];

      var tanggal = input.toString().slice(input.length - 2);
      var bulan = input.toString().slice(0, 7).slice(5);
      var tahun = input.toString().slice(0, 4);
      return (
        hari[date - 1] +
        ", " +
        tanggal +
        " " +
        bulans[parseInt(bulan) - 1] +
        " " +
        tahun
      );
    },
    getLoc(lat, long) {
      return `http://maps.google.co.uk/maps?q=${lat},${long}`;
    },
    formatAngka(num) {
      var a = 0;
      if (num > 999999) {
        a = (num / 1000000).toFixed(1) + "m";
      } else if (num < 0) {
        a = 0;
      } else {
        a = num > 9999 ? (num / 1000).toFixed(1) + "k" : num;
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
      this.optionsToTable();

      this.loadingToolbar = false;

      var res = await this.update();
      await this.getJumlahObatProv();
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
      //
      // this.options["provinsi"] = provinsi;
    },
    async update() {
      this.province = this.selected.provinsi;
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
      //

      // this.loadingBody = true;

      var res2 = await api.count(
        this.selected.name,
        this.selected.obat,
        this.selected.provinsi,
        this.selected.kabkota,
        this.selected.tanggal
      );
      this.amount = res2.data;
      //
      // this.getJumlahObatProv();
      this.loadingBody = false;

      // await this.getKabkot()
    },
    async getKabkot() {
      //
      //
      var select_kabkota = [];
      await Promise.all(
        this.selected["provinsi"].map(async (selected_provinsi) => {
          //
          await Promise.all(
            this.provinsis.map(async (provinsi) => {
              if (provinsi.nama == selected_provinsi) {
                await Promise.all(
                  provinsi.Kabkota.map((r) => {
                    select_kabkota.push(r.nama);
                  })
                );
                this.options["kabkota"] = select_kabkota;
              }
            })
          );
        })
      );
    },
    amountWriter() {
      if (this.amount == 0) {
        return "Tidak tersedia";
      } else if (this.amount == 1) {
        return "Menampilkan 1 apotek";
      } else {
        return "Menampilkan " + this.amount + " apotek";
      }
    },
    async reset() {
      this.selectingObat = [];
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
    // async getLastShipment() {
    //   var res2 = await api.getLastShipment();
    //
    //   return (res2.data[0]["tanggal"]).toString()
    // },
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
    // this.options["obat"]= this.selected.obat
    // await this.getJumlahObatProv();
    // await this.getOptions();
  },
  watch: {
    selected: {
      handler() {
        this.update();
        if (this.start * this.amount > parseInt(this.amount / this.limit) + 1) {
          this.start = 1;
        }
        // this.getKabkot()
      },
      deep: true,
    },
    start() {
      //
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
        return r.obat;
      });
      this.selected.obat = x;
    },
    province: function (newvar) {
      if (newvar.length == 0) {
        this.options["kabkota"] = [];
        this.selected["kabkota"] = [];
        this.tableItems = [];
        this.tableItemsInt = [];
        this.getJumlahObatProv();
      } else {
        this.getKabkot();
        this.getJumlah();
      }
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
  object-fit: contain;
  max-width: 100px;
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
  background-image: linear-gradient(
    160deg,
    #16b3ac 0%,
    #16b3ac 35%,
    #d1dc03 90%
  );
  background-size: 1000% 1000%;
  animation: 20s gradient infinite ease;
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
    height: 40px;
    margin-top: -15px;
  }

  .header {
    height: 200px;
  }
}
</style>

Copyright (c) 2021, Kementerian Kesehatan Republik Indonesia. All Rights Reserved. Developed by.
