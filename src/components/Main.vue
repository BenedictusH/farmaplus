<template>
  <v-container class="wrapper">
    <v-parallax
      src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
      class="header"
    ></v-parallax>
    <div class="main">
      <div class="left">
        <div class=" search"><v-autocomplete label="Tempat"></v-autocomplete></div>
        <div class=" search">
          <v-autocomplete label="Nama Obat" v-model="selectedObat" :items="obat"></v-autocomplete>
        </div>
      </div>
      <div class="right">
        <v-col v-for="apotek in dummyData" :key="apotek" cols="12">
          <v-card elevation="5" class="card">
            <div class="card-left">
              <v-card-title class="text-h5 font-weight-bold">
                {{ apotek.apotek }}
              </v-card-title>

              <v-card-subtitle>{{ apotek.kota }}, {{ apotek.lokasi }}</v-card-subtitle>
              <v-card-actions>
                <v-btn outlined rounded text>
                  <v-icon class="mr-2">mdi-map-marker</v-icon> Lokasi
                </v-btn>
              </v-card-actions>
            </div>
            <div class="card-right">
              <div class="text font-weight-medium">Obat : {{ apotek.obat }}</div>
              <div class="text">Jumlah: {{ apotek.jumlah }}</div>
              <div class="text">Updated Date: {{ formatDate(apotek.updatedDate) }}</div>
              <div class="text">Update Time: {{ apotek.updatedTime }}</div>
            </div>
          </v-card>
        </v-col>
      </div>
    </div>
  </v-container>
</template>

<script>
  export default {
    name: "HelloWorld",

    data: () => ({
      ecosystem: [
        {
          text: "vuetify-loader",
          href: "https://github.com/vuetifyjs/vuetify-loader",
        },
        {
          text: "github",
          href: "https://github.com/vuetifyjs/vuetify",
        },
        {
          text: "awesome-vuetify",
          href: "https://github.com/vuetifyjs/awesome-vuetify",
        },
      ],
      obat: [
        "Azitromisin",
        "Favipiravir",
        "Intravenous",
        "Immunoglobulin",
        "Ivermectin",
        "Oseltamivir",
        "Remsdesivir",
        "Tociluzumab",
      ],
      dummyData: [
        {
          apotek: "Apotek Benedictus",
          obat: "Ivermectin",
          kota: "Jakarta",
          lokasi: "Senen",
          jumlah: 250,
          updatedDate: "05072021",
          updatedTime: "04:00",
        },
        {
          apotek: "Apotek Harris",
          obat: "Remsdesivir",
          kota: "Lampung",
          lokasi: "Lampung",
          jumlah: 1760,
          updatedDate: "05072021",
          updatedTime: "04:00",
        },
        {
          apotek: "Apotek Hutama",
          obat: "Immunoglobulin",
          kota: "Tangerang",
          lokasi: "Cengkareng",
          jumlah: 2230,
          updatedDate: "05072021",
          updatedTime: "04:00",
        },
        {
          apotek: "Apotek Stefan",
          obat: "Oseltamivir",
          kota: "Yogyakarta",
          lokasi: "Yogyakarta",
          jumlah: 10,
          updatedDate: "05072021",
          updatedTime: "05:00",
        },
      ],
    }),
    methods: {
      formatDate(input) {
        var date = new Date(input.substr(4, 4), input.substr(2, 2) - 1, input.substr(0, 2));
        var formated = date
          .toISOString()
          .replace("-", "/")
          .split("T")[0]
          .replace("-", "/")
          .split("/");
        var result = parseInt(formated[2]) + 1 + "/" + formated[1] + "/" + formated[0];
        return result;
      },
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
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    margin: 1rem 1rem 0 0;
  }

  .card-left {
    width: 50%;
  }

  .main {
    width: 100vw;
    padding: 5rem 5rem;
    display: flex;
    column-gap: 5rem;
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
    height: 30vh;
    width: 100vw;
    background-color: #f9c1b1;
    background-image: linear-gradient(315deg, #f9c1b1 0%, #fb8085 74%);
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
