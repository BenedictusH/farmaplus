const STRAPI_URL = "https://farmaplus.techkyra.com";
var qs = require("qs");
import axios from "axios";

export default {
  getField() {
    var data = JSON.stringify({
      query: `query {
			outlets {
				obat
				provinsi
				kabkota
			}
		}`,
      variables: {},
    });

    var config = {
      method: "post",
      url: "https://farmaplus.techkyra.com/graphql",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    return axios(config)
      .then(function(response) {
        console.log(JSON.stringify(response.data));
        var data = {};
        data["obat"] = Array.from(
          new Set(
            response.data.data.outlets.map((outlet) => {
              return outlet.obat;
            })
          )
        ).sort();
        data["provinsi"] = Array.from(
          new Set(
            response.data.data.outlets.map((outlet) => {
              return outlet.provinsi;
            })
          )
        ).sort();
        data["kabkota"] = Array.from(
          new Set(
            response.data.data.outlets.map((outlet) => {
              return outlet.kabkota;
            })
          )
        ).sort();
        return data;
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  async filter(name, obat, provinsi, kabkota, tanggal) {
    console.log(name, obat, provinsi, kabkota, tanggal);
    const query = qs.stringify({
      _where: {
        _or: [
          [
            { obat: obat },
            { provinsi: provinsi },
            { kabkota: kabkota },
            { tanggal: tanggal },
						{ nama_contains: name }
          ],
        ],
      },
    });
    console.log(query);
    var path = "outlets";
    var response = axios.get(`${STRAPI_URL}/${path}?${query}&_sort=jumlah:DESC`);
    return response;
  },
};
