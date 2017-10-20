import React from 'react';
import * as $ from "jquery";


var api = class {
    static get baseUrl(){
        return "http://127.0.0.1:8080/api/";
    }

    static get timeout() {
        return 60 * 1000;
    }
}
api.room = class{
    static get url(){
        return api.baseUrl + "rooms/"
    }

    static add(room) {
        return $.ajax({
            url: api.room.url,
            method: "POST",
            dataType: "json",
            timeout: api.timeout,
            data: room
        });
    }

    static modify(room) {
        return $.ajax({
            url: api.room.url + room.id,
            method: "PUT",
            dataType: "json",
            timeout: api.timeout,
            data: room
        });
    }

    static delete(id) {
        return $.ajax({
            url: api.room.url + id,
            method: "DELETE",
            dataType: "json",
            timeout: api.timeout,
            // data: room
        });
    }

    static get(id) {
        return $.ajax({
            url: api.room.url + id,
            method: "GET",
            dataType: "json",
            timeout: api.timeout
        });
    }
    static getDevices(id) {
        return $.ajax({
            url: api.room.url + id + "/Devices",
            method: "GET",
            dataType: "json",
            timeout: api.timeout
        })
    }

}
export default api;

