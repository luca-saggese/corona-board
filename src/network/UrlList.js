// src/network/UrlList.js

const BASE_URL = 'https://wuhan-coronavirus-api.laeyoung.endpoint.ainize.ai/';
const API_BASE_URL = BASE_URL + 'jhu-edu';

const BASE_URL_PCM = 'https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/';

var UrlList = {
    /**
     * Your App's URLs
     */
    Corona: {
        getBriefUrl: () => {
            return `${API_BASE_URL}/brief`;
        },

        getLatestUrl: () => {
            return `${API_BASE_URL}/latest`;
        },

        getTimeseriesUrl: () => {
            return `${API_BASE_URL}/timeseries`;
        },

        getNazioneUrl: () => {
          return `${BASE_URL_PCM}/dpc-covid19-ita-andamento-nazionale.json`;
        },

        getRegioniUrl: () => {
          return `${BASE_URL_PCM}/dpc-covid19-ita-regioni.json`;
        },

        getProvinceUrl: () => {
          return `${BASE_URL_PCM}/dpc-covid19-ita-province.json`;
        },

        getSpainUrl: () => {
          return 'https://raw.githubusercontent.com/victorvicpal/COVID19_es/master/data/csv_data/data/dataCOVID19_es.csv'
        }
    },

}

module.exports = UrlList;
