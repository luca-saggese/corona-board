// src/network/ApiManager.StickyBoard.js

import RestClient from './RestClient';
import UrlList from './UrlList';

const ApiManager = {
    /**
     * Your App's APIs
     */
    Corona: {
        readBrief: (callback) => {
            RestClient.sendGetRequest(UrlList.Corona.getBriefUrl(), callback);
        },

        readLatest: (callback) => {
            RestClient.sendGetRequest(UrlList.Corona.getLatestUrl(), callback);
        },

        readTimeseries: (callback) => {
            RestClient.sendGetRequest(UrlList.Corona.getTimeseriesUrl(), callback);
        },

        readNazione: (callback) => {
          RestClient.sendGetRequest(UrlList.Corona.getNazioneUrl(), callback);
        },

        readRegioni: (callback) => {
          RestClient.sendGetRequest(UrlList.Corona.getRegioniUrl(), callback);
        },

        readProvince: (callback) => {
          RestClient.sendGetRequest(UrlList.Corona.getProvinceUrl(), callback);
        },
    },
}

export default ApiManager;
