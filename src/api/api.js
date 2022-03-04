// export const STRAPI_URL = "https://farmapush.techkyra.com";
export const STRAPI_URL = "https://farmaplus-api.kemkes.go.id";
var qs = require("qs");
import axios from "axios";

// const activeBrand = [
//   "KIMIA FARMA",
//   "K24",
//   "watsons",
//   "CENTURY",
//   "GENERIK",
//   "AJIWARAS",
//   "GUARDIAN",
//   "LIFEPACK",
//   "FARMAKU",
//   "MITRASANA",
//   "VIVA",
//   "HALODOC",
//   "PHARMA",
//   "ROXY",
//   "GOAPOTIK",
//   "MIKA",
//   "berkat",
// ];
const activeObat = [
  "azithromycin",
  "favipiravir",
  "immunoglobulin",
  "oseltamivir",
  "multivitamin",
  "remdesivir",
  "tocilizumab",
  // // "heparin",
  // // "lovenox",
  // "vitaminc",
  // "vitamind",
  // "vitamind3",
  // "molnupiravir",
  // "parasetamol",
  // "vitaminb1",
  // "deksametason",
  // "metilprednisolon",
  // "hidrokortison",
  // // "enoksaparin",
  // // "rivaroksaban",
  // // "fondaparinuks",
  // // "regdanvimab",
  // "paxlovid",
  // "asetilsistein",
];
export default {
  async filter(name, obat, provinsi, kabkota, brand, start, limit, search) {
    var query;
    var kabkot_upper;
    var kabkot_concat;
    var queryBrand;
    var queryObat;
    if (kabkota) {
      kabkot_upper = kabkota.map((x) => x.toUpperCase());
    } else {
      kabkot_upper = [];
    }
    kabkot_concat = kabkot_upper.concat(kabkota);
    console.log(obat);
    // filtering brand
    // if (brand.length == 0) {
    //   queryBrand = activeBrand;
    // } else {
    //   queryBrand = brand;
    // }

    if (obat.length == 0) {
      queryObat = activeObat;
    } else {
      queryObat = obat;
    }

    query = qs.stringify({
      _where: {
        _or: [
          [
            { obat_contains: queryObat },
            { provinsi: provinsi },
            { kabkota: kabkot_concat },
            { brand: queryBrand },
            { nama_contains: name },
          ],
        ],
      },
    });
    //
    var path = "mastermasters";
    var newStart = start * limit;
    var response;

    if (localStorage.getItem("sortItems") == "ascending") {
      response = axios.get(
        `${STRAPI_URL}/${path}?${query}&_q=${search}&_start=${newStart}&_limit=${limit}&_sort=jumlah:ASC`
      );
    } else if (localStorage.getItem("sortItems") == "descending") {
      response = axios.get(
        `${STRAPI_URL}/${path}?${query}&_q=${search}&_start=${newStart}&_limit=${limit}&_sort=jumlah:DESC`
      );
    }
    return response;
  },
  async count(name, obat, provinsi, kabkota, brand, search) {
    var query;
    var kabkot_upper;
    var kabkot_concat;
    var queryBrand;
    var queryObat;
    console.log(kabkota);
    if (kabkota) {
      kabkot_upper = kabkota.map((x) => x.toUpperCase());
    } else {
      kabkot_upper = [];
    }
    kabkot_concat = kabkot_upper.concat(kabkota);
    // filtering brand
    // if (brand.length == 0) {
    //   queryBrand = activeBrand;
    // } else {
    //   queryBrand = brand;
    // }
    if (obat.length == 0) {
      queryObat = activeObat;
    } else {
      queryObat = obat;
    }
    query = qs.stringify({
      _where: {
        _or: [
          [
            { obat_contains: queryObat },
            { provinsi: provinsi },
            { kabkota: kabkot_concat },
            { brand: queryBrand },
            { nama_contains: name },
          ],
        ],
      },
    });
    //
    var path = "mastermasters";
    var response = axios.get(
      `${STRAPI_URL}/${path}/count?${query}&_q=${search}&_sort=jumlah:DESC`
    );
    //
    return response;
  },
  async find(name) {
    var path = name;

    var response = await axios.get(`${STRAPI_URL}/${path}?&_sort=nama:ASC`);

    return response.data;
  },
};
