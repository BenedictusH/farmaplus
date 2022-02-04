// export const STRAPI_URL = "https://farmapush.techkyra.com";
export const STRAPI_URL = "https://farmaplus-api.kemkes.go.id";
var qs = require("qs");
import axios from "axios";

export default {
  async filter(name, obat, provinsi, kabkota, brand, start, limit, search) {
    var query;
    var kabkot_upper;
    var kabkot_concat;

    if (kabkota) {
      kabkot_upper = kabkota.map((x) => x.toUpperCase());
    } else {
      kabkot_upper = [];
    }
    kabkot_concat = kabkot_upper.concat(kabkota);
    query = qs.stringify({
      _where: {
        _or: [
          [
            { obat_contains: obat },
            { provinsi: provinsi },
            { kabkota: kabkot_concat },
            { brand: brand },
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

    if (kabkota) {
      kabkot_upper = kabkota.map((x) => x.toUpperCase());
    } else {
      kabkot_upper = [];
    }
    kabkot_concat = kabkot_upper.concat(kabkota);
    query = qs.stringify({
      _where: {
        _or: [
          [
            { obat_contains: obat },
            { provinsi: provinsi },
            { kabkota: kabkot_concat },
            { brand: brand },
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
