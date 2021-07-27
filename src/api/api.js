export const STRAPI_URL = "https://farmaplus-api.kemkes.go.id";
var qs = require("qs");
import axios from "axios";

export default {
  // getField() {
  //   var data = JSON.stringify({
  //     query: `query {
  //           outlets {
  //               obat
  //               provinsi
  //               kabkota
  //           }
  //       }`,
  //     variables: {},
  //   });

  //   var config = {
  //     method: "post",
  //     url: "https://farmaplus.kemkes./graphql",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     data: data,
  //   };
  //   return axios(config)
  //     .then(function(response) {
  //       //
  //       var data = {};
  //       data["obat"] = Array.from(
  //         new Set(
  //           response.data.data.outlets.map((outlet) => {
  //             return outlet.obat;
  //           })
  //         )
  //       ).sort();
  //       data["provinsi"] = Array.from(
  //         new Set(
  //           response.data.data.outlets.map((outlet) => {
  //             return outlet.provinsi;
  //           })
  //         )
  //       ).sort();
  //       data["kabkota"] = Array.from(
  //         new Set(
  //           response.data.data.outlets.map((outlet) => {
  //             return outlet.kabkota;
  //           })
  //         )
  //       ).sort();
  //       return data;
  //     })
  //     .catch(function(error) {
  //
  //     });
  // },
  async filter(name, obat, provinsi, kabkota, brand, start, limit) {
    const query = qs.stringify({
      _where: {
        _or: [
          [
            { obat_contains: obat },
            { provinsi_contains: provinsi },
            { kabkota_contains: kabkota },
            { brand_contains: brand },
            { nama_contains: name },
          ],
        ],
      },
    });
    //
    var path = "masters";
    var newStart = start * limit;
    var response = axios.get(
      `${STRAPI_URL}/${path}?${query}&_sort=jumlah:DESC&_start=${newStart}&_limit=${limit}`
    );
    return response;
  },
  async count(name, obat, provinsi, kabkota, brand) {
    //
    const query = qs.stringify({
      _where: {
        _or: [
          [
            { obat_contains: obat },
            { provinsi_contains: provinsi },
            { kabkota_contains: kabkota },
            { brand_contains: brand },
            { nama_contains: name },
          ],
        ],
      },
    });
    //
    var path = "masters";
    var response = axios.get(
      `${STRAPI_URL}/${path}/count?${query}&_sort=jumlah:DESC`
    );
    //
    return response;
  },
  async getLastShipment() {
    var path = "outlets";
    var response = await axios.get(
      `${STRAPI_URL}/${path}?&_sort=tanggal:desc&_start=0&_limit=1`
    );

    return response;
  },
  async find(name) {
    var path = name;

    var response = await axios.get(`${STRAPI_URL}/${path}?&_sort=nama:ASC`);

    return response.data;
  },
  // async filterCollection(
  //   name,
  //   obat,
  //   provinsi,
  //   kabkota,
  //   brand,
  //   tanggal,
  //   start,
  //   limit
  // ) {
  //   const query = qs.stringify({
  //     _where: {
  //       _or: [
  //         [
  //           { obat_contains: obat },
  //           { provinsi_contains: provinsi },
  //           { kabkota_contains: kabkota },
  //           { brand_contains: brand },
  //           { tanggal_contains: tanggal },
  //           { nama_contains: name },
  //         ],
  //       ],
  //     },
  //   });
  //   //
  //   var newPath
  //   if (outlets.includes(brand)) {
  //     newPath = "outlets"
  //   } else {
  //     newPath = apiBrandToCollection(brand)
  //   }
  //   var newStart = start * limit;
  //   var response = axios.get(
  //     `${STRAPI_URL}/${newPath}?${query}&_sort=jumlah:DESC&_start=${newStart}&_limit=${limit}`
  //   );
  //   return response;
  // },
  // async countCollection(name, obat, provinsi, kabkota, brand, tanggal) {
  //   //
  //   const query = qs.stringify({
  //     _where: {
  //       _or: [
  //         [
  //           { obat_contains: obat },
  //           { provinsi_contains: provinsi },
  //           { kabkota_contains: kabkota },
  //           { brand_contains: brand },
  //           { tanggal_contains: tanggal },
  //           { nama_contains: name },
  //         ],
  //       ],
  //     },
  //   });
  //   //
  //   var newPath
  //   if (outlets.includes(brand)) {
  //     newPath = "outlets"
  //   } else {
  //     newPath = apiBrandToCollection(brand)
  //   }
  //   console.log(tanggal)
  //   var response = axios.get(
  //     `${STRAPI_URL}/${newPath}/count?${query}&_sort=jumlah:DESC`
  //   );
  //   //
  //   return response;
  // },
};
