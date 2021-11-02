import axios from 'axios';

const BASE_URL = 'http://18.224.33.76:3000/api/';
// const BASE_URL = 'http://localhost:3000/api/';
export const Api = {
    addEntry: (data) => {
        return axios({
            method: 'post',
            url: 'add_entry',
            data: data,
            baseURL: BASE_URL
        });
    },
    
    removeEntry: (data) => {
        return axios({
            method: 'post',
            url: 'remove_entry',
            data: data,
            baseURL: BASE_URL
        });
    },

    getEntries: (data) => {
        return axios({
            method: 'get',
            url: 'get_entries',
            baseURL: BASE_URL
        });    
    },

    getCoinListings: () => {
        return axios({
            method: 'get',
            url: 'coin_listings',
            baseURL: BASE_URL
        });    
    },

    setSetting: (data) => {
        return axios({
            method: 'post',
            url: 'set_setting',
            data: data,
            baseURL: BASE_URL
        });
    },

    getSetting: (data) => {
        return axios({
            method: 'post',
            url: 'get_setting',
            data: data,
            baseURL: BASE_URL
        });
    },

    sendEmail: (data) => {
        return axios({
            method: 'post',
            url: 'send_email',
            data: data,
            baseURL: BASE_URL
        })
    },

    columnVisibleChange: (data) => {
        return axios({
            method: 'post',
            url: 'column_visible_change',
            data: data,
            baseURL: BASE_URL
        })
    },

    getColumnVisibles: () => {
        return axios({
            method: 'get',
            url: 'get_column_visibles',
            baseURL: BASE_URL
        })
    }
};

export default Api;