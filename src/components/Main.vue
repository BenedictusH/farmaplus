<template>
  <div class="wrapper">
    <div class="header"></div>
    {{ selected }}
    <button @click="filter()">Update</button>
    <div
      class="toolbar"
      style="position: sticky; top: 0; z-index: 20; background-color: white"
      v-if="!loadingToolbar"
    >
      <v-row class="px-16 pt-5" no-gutters>
        <v-col cols="8" class="px-5">
          <v-text-field
            filled
            rounded
            dense
            label="Search"
            append-icon="mdi-magnify"
            v-model="selected.name"
          ></v-text-field>
        </v-col>
        <v-col cols="4" class="px-5">
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
              <v-btn
                text
                color="primary"
                @click="$refs.menu.save(selected.tanggal)"
              >
                OK
              </v-btn>
            </v-date-picker>
          </v-menu>
        </v-col>
      </v-row>
      <v-row class="px-16 pb-0" no-gutters>
        <v-col cols="4" class="px-5">
          <span class="pl-5">Obat</span>
          <v-autocomplete
            v-model="selected.obat"
            :items="options.obat"
            chips
            filled
            multiple
            clearable
            deletable-chips
            rounded
          >
          </v-autocomplete>
        </v-col>
        <v-col cols="4" class="px-5">
          <span class="pl-5">Provinsi</span>
          <v-autocomplete
            v-model="selected.provinsi"
            :items="options.provinsi"
            chips
            filled
            multiple
            clearable
            deletable-chips
            rounded
          >
          </v-autocomplete>
        </v-col>
        <v-col cols="4" class="px-5">
          <span class="pl-5">Kabupaten/Kota</span>
          <v-autocomplete
            v-model="selected.kabkota"
            :items="options.kabkota"
            chips
            filled
            multiple
            clearable
            deletable-chips
            rounded
          >
          </v-autocomplete>
        </v-col>
      </v-row>
    </div>
    <v-row class="px-16 pb-10 mt-5" v-if="!loadingBody">
      <v-col v-for="apotek in body" :key="apotek" cols="6" class="px-7">
        <v-card elevation="5" class="card">
          <v-row class="pa-5">
            <v-col cols="6">
              <v-card-title class="text-h5 font-weight-bold pt-0 pl-0">
                {{ apotek.nama }}
              </v-card-title>
              <v-card-subtitle class="px-0"
                >{{ apotek.kabkota }}, {{ apotek.provinsi }}</v-card-subtitle
              >

              <v-card-title
                class="
                  text-h5
                  font-weight-medium
                  pt-0
                  pl-0
                  green--text
                  text--darken-4
                "
              >
                {{ apotek.jumlah }}
              </v-card-title>
              <v-card-subtitle class="pa-0 grey--text text--darken-3"
                >Jumlah</v-card-subtitle
              >
            </v-col>
            <v-col cols="6" class="card-right">
              <div class="text font-weight-bold">{{ apotek.obat }}</div>

              <div class="text">Didistribusikan pada: {{ apotek.tanggal }}</div>
              <v-card-actions class="px-0 pt-7">
                <v-btn outlined rounded text>
                  <v-icon class="mr-2">mdi-map-marker</v-icon> Lokasi
                </v-btn>
              </v-card-actions>
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
    date: [],
    menu: false,
    loadingToolbar: true,
    loadingBody: true,
    selected: {
      name: [],
      obat: [],
      provinsi: [],
      kabkota: [],
      tanggal: [],
    },
    body: [],
    options: [],
  }),
  methods: {
    formatDate(input) {
      var date = new Date(
        input.substr(4, 4),
        input.substr(2, 2) - 1,
        input.substr(0, 2)
      );
      var formated = date
        .toISOString()
        .replace("-", "/")
        .split("T")[0]
        .replace("-", "/")
        .split("/");
      var result =
        parseInt(formated[2]) + 1 + "/" + formated[1] + "/" + formated[0];
      return result;
    },
    remove(item) {
      const index = this.selectedObat.indexOf(item);
      if (index >= 0) this.selectedObat.splice(index, 1);
    },
    async refreshPage() {
      this.options = await api.getField();
      this.loadingToolbar = false;

      var res = await api.filter();
      this.body = res.data;
      this.loadingBody = false;
    },
    async update() {
      this.loadingBody = true;

      var res = await api.filter(
        this.selected.name,
        this.selected.obat,
        this.selected.provinsi,
        this.selected.kabkota,
        this.selected.tanggal
      );
      this.body = res.data;
      console.log(res.data);
      this.loadingBody = false;
    },
    reset() {
      this.selected = {
      name: [],
      obat: [],
      provinsi: [],
      kabkota: [],
      tanggal: [],
    }
    }
  },
  async created() {
    await this.refreshPage();
  },
};
</script>

<style scoped>
.wrapper {
  padding: 0;
  margin: 0;
}

.card {
  display: flex;
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
  box-shadow: 0px 5px 5px 0px rgba(255, 255, 255, 0.85);
  -webkit-box-shadow: 0px 5px 5px 0px rgba(255, 255, 255, 0.85);
  -moz-box-shadow: 0px 5px 5px 0px rgba(255, 255, 255, 0.85);
}

.main {
  width: 100vw;
  padding: 5rem 5rem;
  /* display: flex;
    column-gap: 5rem; */
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
  width: 100vw;
  height: 300px;
  background-color: #90d5ec;
  background-image: linear-gradient(315deg, #90d5ec 0%, #fc575e 74%);
  background-size: 400% 400%;
  animation: gradient 10s ease infinite;
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>
