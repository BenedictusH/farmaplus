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
    <div class="toolbar" style="background-color: white">
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
            <v-col cols="12" md="6" v-if="loadingToolbar" order-md="2" order="2">
              <v-progress-linear indeterminate color="grey"></v-progress-linear>
            </v-col>
            <v-col class="my-auto" cols="12" md="6" order-md="1" order="3" v-else>
              <!-- Stok {{ formatTanggal(selected.tanggal) }} -->
              <br class="d-block d-md-none" />
              Stok <strong>{{ formatDate(selected.tanggal) }} 09.00 WIB </strong></v-col
            >
            <v-col
              cols="12"
              md="6"
              order-md="3"
              order="1"
              class="d-flex justify-md-end justify-center my-auto"
              style="column-gap: 2rem"
            >
            <v-row>
              <v-col cols="12 d-flex justify-center justify-md-end gap">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/d/de/Logo_of_the_Ministry_of_Health_of_the_Republic_of_Indonesia.png"
                class="logo"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Logo_BUMN_Untuk_Indonesia_2020.svg/2560px-Logo_BUMN_Untuk_Indonesia_2020.svg.png"
                class="logo"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/id/thumb/c/c3/Kimia_Farma_logo.svg/1200px-Kimia_Farma_logo.svg.png"
                class="logo"
              />
              </v-col>
              <v-col cols="12 d-flex justify-center justify-md-end gap">
              <img src="https://i.ibb.co/3pPTRBk/berkat.jpg" class="logo" />
              <img
                src="https://logos-download.com/wp-content/uploads/2017/01/Watsons_logo_logotype.png"
                class="logo"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/id/8/89/Logo_Apotek_K-24.png"
                class="logo"
              />
              <img
                src="https://lh3.googleusercontent.com/proxy/qpUyhOipyBMkeX_vZEfLOQPbff2Ce23x-N_3jmVP94X23ZEp9UdIFn1vLlQeDx99UHlHn9Iqa4are8E3i7NFIHsXHondM0jb_1Ov6LmZAOLF"
                class="logo"
              />
              </v-col>
            </v-row>
            </v-col>
          </v-row>
          <div
            class="text-lg-subtitle-2 text-caption py-5 font-italic red--text"
            cols="12"
            md="6"
            order-md="1"
            order="3"
            v-if="!loadingToolbar"
          >
            *Saat ini, data diupdate secara berkala tiap hari pkl 09.00 WIB, sehingga bukan data
            realtime. Sehubungan dengan tingginya kebutuhan, harap konfirmasikan ketersediaan di
            masing-masing lokasi apotek.*
          </div>

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
            loading="loadingToolbar"
            loading-text="Loading... Please wait"
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
          <v-btn color="error" elevation="2" class="ml-5" rounded @click="reset">Reset</v-btn>
        </v-col>
      </v-row>
    </div>
    <!-- Body -->
    <v-row
      class="px-lg-16 px-3 pb-10 mt-5 cards-body"
      align="stretch"
      v-if="!loadingBody && amount == 0"
    >
      <v-col cols="12" class="d-flex align-center justify-center" style="height: 50vh">
        <v-alert outlined type="warning" prominent border="left">
          {{ amountWriter() }}
        </v-alert>
      </v-col>
    </v-row>
    <v-row class="px-lg-16 px-3 pb-10 mt-5 cards-body" align="stretch" v-if="amount !== 0">
      <v-col
        lg="6"
        cols="12"
        class="px-7"
        v-for="index in 10"
        :key="index * 10"
        v-show="loadingBody"
      >
        <v-skeleton-loader type="article" class="mb-6" elevation="2"> </v-skeleton-loader>
      </v-col>
      <v-col
        v-for="(apotek, index) in body"
        :key="index"
        lg="6"
        cols="12"
        class="px-7"
        v-show="!loadingBody"
      >
        <v-card elevation="5" class="card d-flex flex-column" height="100%">
          <v-row class="pa-5">
            <v-col cols="12" lg="7" class="d-flex flex-column justify-space-between">
              <div>
                <img :src="logoBrand(apotek.brand)" alt="Logo Apotek" class="logo-card mb-3" />
                <v-card-title class="text-lg-h5 text-md-h4 font-weight-bold pt-0 pl-0">
                  {{ formatNama(apotek.nama) }}
                </v-card-title>
                <v-card-subtitle class="px-0 pb-0">{{ apotek.alamat }}</v-card-subtitle
                ><v-card-subtitle class="px-0 pb-0 pa-0"
                  >{{ apotek.kabkota }}, {{ apotek.provinsi }}</v-card-subtitle
                >
                <!-- <v-card-subtitle class="px-0 pb-0 pa-0 pb-lg-5 text-h6"
                  > <strong>{{ apotek.msisdn }}</strong> </v-card-subtitle
                > -->
              </div>
              <div>
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
              "
            >
              <div>
                <v-card-title
                  class="text font-weight-bold px-0 d-flex justify-start justify-lg-end"
                >
                  <span>{{ apotek.obat }} </span></v-card-title
                >
                <v-card-subtitle
                  class="pa-0 grey--text text-h6 text--darken-3 text-lg-right pt-lg-10 pt-5"
                  >Stok</v-card-subtitle
                >
                <v-card-title
                  class="
                    text-h4 text-md-h3
                    font-weight-medium
                    pt-0
                    pl-0
                    pr-0
                    pb-2
                    green--text
                    text--darken-4
                  "
                >
                  <span v-if="apotek.status == 'habis'" class="red--text spaccing">
                    {{ formatStatus(apotek.status) }}</span
                  >
                  <span
                    v-else-if="apotek.status == 'under20'"
                    class="
                      yellow--text
                      text--darken-2
                      spaccing
                      text-h5 text-md-h4
                    "
                  >
                    {{ formatStatus(apotek.status) }}</span
                  >
                  <span v-else class="green--text spaccing">
                    {{ formatStatus(apotek.status) }}
                  </span>
                </v-card-title>
              </div>
              <!-- card-actions for hp -->
              <v-card-actions class="px-0 pb-2 d-flex flex-column-reverse d-md-none">
                <!-- <div
                  class="d-flex align-center justify-center whatsapp pt-md-0 pt-3"
                  v-if="apotek.wa"
                  v-bind:href="getWa(apotek)"
                >
                  <a
                    class="d-flex align-center justify-center whatsapp"
                    v-bind:href="getWa('628119431818')"
                    target="_blank"
                  >
                    <v-btn rounded color="#25D366" class="mr-md-2">
                      <svg
                        class="filterGreen"
                        height="25"
                        viewBox="-23 -21 682 682.66669"
                        width="25"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="m544.386719 93.007812c-59.875-59.945312-139.503907-92.9726558-224.335938-93.007812-174.804687 0-317.070312 142.261719-317.140625 317.113281-.023437 55.894531 14.578125 110.457031 42.332032 158.550781l-44.992188 164.335938 168.121094-44.101562c46.324218 25.269531 98.476562 38.585937 151.550781 38.601562h.132813c174.785156 0 317.066406-142.273438 317.132812-317.132812.035156-84.742188-32.921875-164.417969-92.800781-224.359376zm-224.335938 487.933594h-.109375c-47.296875-.019531-93.683594-12.730468-134.160156-36.742187l-9.621094-5.714844-99.765625 26.171875 26.628907-97.269531-6.269532-9.972657c-26.386718-41.96875-40.320312-90.476562-40.296875-140.28125.054688-145.332031 118.304688-263.570312 263.699219-263.570312 70.40625.023438 136.589844 27.476562 186.355469 77.300781s77.15625 116.050781 77.132812 186.484375c-.0625 145.34375-118.304687 263.59375-263.59375 263.59375zm144.585938-197.417968c-7.921875-3.96875-46.882813-23.132813-54.148438-25.78125-7.257812-2.644532-12.546875-3.960938-17.824219 3.96875-5.285156 7.929687-20.46875 25.78125-25.09375 31.066406-4.625 5.289062-9.242187 5.953125-17.167968 1.984375-7.925782-3.964844-33.457032-12.335938-63.726563-39.332031-23.554687-21.011719-39.457031-46.960938-44.082031-54.890626-4.617188-7.9375-.039062-11.8125 3.476562-16.171874 8.578126-10.652344 17.167969-21.820313 19.808594-27.105469 2.644532-5.289063 1.320313-9.917969-.664062-13.882813-1.976563-3.964844-17.824219-42.96875-24.425782-58.839844-6.4375-15.445312-12.964843-13.359374-17.832031-13.601562-4.617187-.230469-9.902343-.277344-15.1875-.277344-5.28125 0-13.867187 1.980469-21.132812 9.917969-7.261719 7.933594-27.730469 27.101563-27.730469 66.105469s28.394531 76.683594 32.355469 81.972656c3.960937 5.289062 55.878906 85.328125 135.367187 119.648438 18.90625 8.171874 33.664063 13.042968 45.175782 16.695312 18.984374 6.03125 36.253906 5.179688 49.910156 3.140625 15.226562-2.277344 46.878906-19.171875 53.488281-37.679687 6.601563-18.511719 6.601563-34.375 4.617187-37.683594-1.976562-3.304688-7.261718-5.285156-15.183593-9.253906zm0 0"
                          fill-rule="evenodd"
                        />
                      </svg>
                    </v-btn>
                  </a>
                </div> -->
                <div class="pt-md-0 pt-3">
                  <a
                    :href="'tel:' + formatTelpon(apotek.msisdn)"
                    v-if="checkNull(apotek.msisdn)"
                    class=""
                  >
                    <v-btn rounded color="info" class="mr-md-2">
                      <v-icon class="mr-md-2">mdi-phone</v-icon>
                      <span class="d-none d-md-block">{{ formatTelpon(apotek.msisdn) }}</span>
                    </v-btn>
                  </a>
                  <a v-else class>
                    <v-btn rounded outlined disabled color="info">
                      <v-icon class="mr-md-2">mdi-phone</v-icon>
                      <span class="d-none d-md-block">Tidak Tersedia</span>
                    </v-btn>
                  </a>
                </div>
                <div>
                  <a v-bind:href="getLoc(apotek.latitude, apotek.longitude)" target="_blank">
                    <v-btn rounded color="success" class="ml-md-2">
                      <v-icon class="mr-md-2">mdi-map-marker</v-icon>
                      <span class="d-none d-md-block">Maps</span>
                    </v-btn>
                  </a>
                </div>
              </v-card-actions>

              <!-- <span class="badgeDistributor badge--small mb-3"><v-icon class="mr-2">mdi-map-marker</v-icon> Maps</span> -->
            </v-col>
          </v-row>
          <!-- card-actions for md and up -->
          <v-row class="flex-grow-1 pa-8 pt-0 align-end d-none d-md-flex">
            <v-col cols="12" class="pa-0 ">
              <v-card-actions class="pa-0 d-flex flex-row align-center  justify-end">
                <!-- <div
                  class="d-flex align-center justify-center whatsapp"
                  v-if="apotek.wa"
                  v-bind:href="getWa(apotek)"
                >
                  <a
                    class="d-flex align-center justify-center whatsapp"
                    v-bind:href="getWa('628119431818')"
                    target="_blank"
                  >
                    <v-btn rounded color="#25D366" class="mr-md-2">
                      <svg
                        class="filterGreen"
                        height="25"
                        viewBox="-23 -21 682 682.66669"
                        width="25"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="m544.386719 93.007812c-59.875-59.945312-139.503907-92.9726558-224.335938-93.007812-174.804687 0-317.070312 142.261719-317.140625 317.113281-.023437 55.894531 14.578125 110.457031 42.332032 158.550781l-44.992188 164.335938 168.121094-44.101562c46.324218 25.269531 98.476562 38.585937 151.550781 38.601562h.132813c174.785156 0 317.066406-142.273438 317.132812-317.132812.035156-84.742188-32.921875-164.417969-92.800781-224.359376zm-224.335938 487.933594h-.109375c-47.296875-.019531-93.683594-12.730468-134.160156-36.742187l-9.621094-5.714844-99.765625 26.171875 26.628907-97.269531-6.269532-9.972657c-26.386718-41.96875-40.320312-90.476562-40.296875-140.28125.054688-145.332031 118.304688-263.570312 263.699219-263.570312 70.40625.023438 136.589844 27.476562 186.355469 77.300781s77.15625 116.050781 77.132812 186.484375c-.0625 145.34375-118.304687 263.59375-263.59375 263.59375zm144.585938-197.417968c-7.921875-3.96875-46.882813-23.132813-54.148438-25.78125-7.257812-2.644532-12.546875-3.960938-17.824219 3.96875-5.285156 7.929687-20.46875 25.78125-25.09375 31.066406-4.625 5.289062-9.242187 5.953125-17.167968 1.984375-7.925782-3.964844-33.457032-12.335938-63.726563-39.332031-23.554687-21.011719-39.457031-46.960938-44.082031-54.890626-4.617188-7.9375-.039062-11.8125 3.476562-16.171874 8.578126-10.652344 17.167969-21.820313 19.808594-27.105469 2.644532-5.289063 1.320313-9.917969-.664062-13.882813-1.976563-3.964844-17.824219-42.96875-24.425782-58.839844-6.4375-15.445312-12.964843-13.359374-17.832031-13.601562-4.617187-.230469-9.902343-.277344-15.1875-.277344-5.28125 0-13.867187 1.980469-21.132812 9.917969-7.261719 7.933594-27.730469 27.101563-27.730469 66.105469s28.394531 76.683594 32.355469 81.972656c3.960937 5.289062 55.878906 85.328125 135.367187 119.648438 18.90625 8.171874 33.664063 13.042968 45.175782 16.695312 18.984374 6.03125 36.253906 5.179688 49.910156 3.140625 15.226562-2.277344 46.878906-19.171875 53.488281-37.679687 6.601563-18.511719 6.601563-34.375 4.617187-37.683594-1.976562-3.304688-7.261718-5.285156-15.183593-9.253906zm0 0"
                          fill-rule="evenodd"
                        />
                      </svg>
                    </v-btn>
                  </a>
                </div> -->
                <div>
                  <a :href="'tel:' + formatTelpon(apotek.msisdn)" v-if="checkNull(apotek.msisdn)">
                    <v-btn rounded color="info" class="mr-md-2">
                      <v-icon class="mr-md-2">mdi-phone</v-icon>
                      <span class="d-none d-md-block">{{ formatTelpon(apotek.msisdn) }}</span>
                    </v-btn>
                  </a>
                  <a v-else class>
                    <v-btn rounded outlined disabled color="info">
                      <v-icon class="mr-md-2">mdi-phone</v-icon>
                      <span class="d-none d-md-block">Tidak Tersedia</span>
                    </v-btn>
                  </a>
                </div>
                <div>
                  <a v-bind:href="getLoc(apotek.latitude, apotek.longitude)" target="_blank">
                    <v-btn rounded color="success">
                      <v-icon class="mr-md-2">mdi-map-marker</v-icon>
                      <span class="d-none d-md-block">Maps</span>
                    </v-btn>
                  </a>
                </div>
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
        <v-card flat tile class="grey lighten-4 grey--text text--darken-1 text-center">
          <v-card-text class="grey--text text--darken-3">
            Copyright &copy; 2021, Kementerian Kesehatan Republik Indonesia. All Rights Reserved.
            Developed by Tekira
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
      loadingToolbar: true,
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
      formatStatus(status) {
        if (status == "under20") {
          return "Di Bawah 20";
        } else {
          return status[0].toUpperCase() + status.substring(1);
        }
      },
      copyToClipboard(text) {
        var dummy = document.createElement("textarea");
        document.body.appendChild(dummy);
        dummy.value = text;
        dummy.select();
        document.execCommand("copy");
        document.body.removeChild(dummy);
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
        if (total_provinsi.length == 0) {
          await Promise.all(
            this.provinsis.map(async (provinsi) => {
              await Promise.all(
                provinsi.jumlah.map((r) => {
                  if (this.selected.tanggal == r.tanggal) {
                    // console.log(r)
                    total_provinsi.push(r);
                  }
                })
              );
            })
          );
        }
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
      getTotal(items) {
        var x = items.map((r) => {
          return r.jumlah;
        });
        return x.reduce((a, b) => a + b, 0);
      },
      logoBrand(brand) {
        var merek = brand.toUpperCase();
        console.log("ini brand" + merek);

        if (merek == "KF") {
          return "https://upload.wikimedia.org/wikipedia/id/thumb/c/c3/Kimia_Farma_logo.svg/1200px-Kimia_Farma_logo.svg.png";
        } else if (merek == "BERKAT") {
          return "https://i.ibb.co/3pPTRBk/berkat.jpg";
        } else if (merek == "WATSONS") {
          return "https://logos-download.com/wp-content/uploads/2017/01/Watsons_logo_logotype.png";
        } else if (merek == "K24") {
          return "https://upload.wikimedia.org/wikipedia/id/8/89/Logo_Apotek_K-24.png";
        } else if (merek == "CENTURY") {
          return "https://lh3.googleusercontent.com/proxy/qpUyhOipyBMkeX_vZEfLOQPbff2Ce23x-N_3jmVP94X23ZEp9UdIFn1vLlQeDx99UHlHn9Iqa4are8E3i7NFIHsXHondM0jb_1Ov6LmZAOLF";
        } else {
          return "";
        }
      },
      formatTelpon(number) {
        if (number.substring(0, 3) == "021") {
          return number;
        } else if (number.substring(0, 2) == "21") {
          return "0" + number;
        } else if (number.substring(0, 2) == "62") {
          return number;
        } else if (number.substring(0, 2) == "08") {
          return number;
        } else {
          return "021" + number;
        }
      },
      capitalizeFirstLetter(str) {
        const lower = str.toLowerCase();
        return str.charAt(0).toUpperCase() + lower.slice(1);
      },
      getWa(object) {
        let nomor = this.formatTelpon(object.msisdn);

        if (nomor[0] == "0") {
          return "https://wa.me/62" + nomor.substring(1);
        } else if (nomor[0] + nomor[1] == "62") {
          return "https://wa.me/" + nomor;
        } else if (nomor[0] + nomor[1] + nomor[2] == "+62") {
          return "https://wa.me/" + nomor.substring(1);
        }
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

        let hari = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];

        const getHari = new Proxy(hari, {
          get(target, prop) {
            if (!isNaN(prop)) {
              prop = parseInt(prop, 10);
              if (prop < 0) {
                prop += target.length;
              }
            }
            return target[prop];
          },
        });

        var tanggal = input.toString().slice(input.length - 2);
        var bulan = input
          .toString()
          .slice(0, 7)
          .slice(5);
        var tahun = input.toString().slice(0, 4);
        return getHari[date - 1] + ", " + tanggal + " " + bulans[parseInt(bulan) - 1] + " " + tahun;
      },
      getLoc(lat, long) {
        return `http://maps.google.co.uk/maps?q=${lat},${long}`;
      },
      checkNull(value) {
        if (typeof value == "undefined") {
          return false;
        } else if (value.length <= 4) {
          return false;
        } else {
          return value;
        }
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
        var Difference_In_Date = (today.getTime() - target.getTime()) / (1000 * 3600 * 24);
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
        await this.getJumlah();
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
                    provinsi.kabkota.map((r) => {
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
      // this.selected.tanggal = '2021-07-11';
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
      selectingObat: function(newvar) {
        var x = newvar.map((r) => {
          return r.obat;
        });
        this.selected.obat = x;
      },
      province: function(newvar) {
        if (newvar.length == 0) {
          this.options["kabkota"] = [];
          this.selected["kabkota"] = [];
          this.tableItems = [];
          this.tableItemsInt = [];
          this.getJumlah();
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

  .logo-card {
    max-width: 100%;
    height: 50px;
    object-fit: cover;
  }

  .card {
    overflow: hidden;
  }

  .height-adjuster {
    height: 100%;
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

  .gap {
    gap: 20px;
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
    background-image: linear-gradient(160deg, #16b3ac 0%, #16b3ac 35%, #d1dc03 90%);
    background-size: 1000% 1000%;
    animation: 20s gradient infinite ease;
  }

  .whatsapp {
    height: 100%;
  }

  .filterGreen {
    filter: invert(100%);
    transition: filter 0.2s ease;
  }

  .filterGreen:hover {
    filter: invert(90%) sepia(96%) saturate(421%) hue-rotate(80deg) brightness(95%) contrast(86%);
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
