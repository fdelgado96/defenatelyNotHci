import React from 'react';
import * as $ from "jquery";


var api = class {
    static get baseUrl(){
        return "http://127.0.0.1:8080/api/";
    }

    static get timeout() {
        return 60 * 1000;
    }
};
api.room = class{
    static get url(){
        return api.baseUrl + "rooms/"
    }

    static list() {
        return $.ajax({
            url: api.room.url,
            method: "GET",
            dataType: "json",
            timeout: api.timeout
        });
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

};

api.routines = class{
    static get url(){
        return api.baseUrl + "routines/"
    }

    static list() {
        return $.ajax({
            url: api.routines.url,
            method: "GET",
            dataType: "json",
            timeout: api.timeout
        });
    }

    static add(routine) {
        return $.ajax({
            url: api.routines.url,
            method: "POST",
            dataType: "json",
            timeout: api.timeout,
            data: routine
        });
    }

    static modify(routine) {
        return $.ajax({
            url: api.routines.url + routine.id,
            method: "PUT",
            dataType: "json",
            timeout: api.timeout,
            data: routine
        });
    }

    static delete(id) {
        return $.ajax({
            url: api.routines.url + id,
            method: "DELETE",
            dataType: "json",
            timeout: api.timeout
        });
    }

    static get(id) {
        return $.ajax({
            url: api.routines.url + id,
            method: "GET",
            dataType: "json",
            timeout: api.timeout
        });
    }

    static execute(id) {
        return $.ajax({
            url: api.routines.url + id + '/execute',
            method: "PUT",
            dataType: "json",
            timeout: api.timeout,
            data: {}
        });
    }
};



api.devices = class{
    static get url(){
        return api.baseUrl + "devices/"
    }

    static setDevice(roomId, deviceId){
        return $.ajax({
            url: api.devices.url+deviceId+"/rooms/"+roomId,
            method: "POST",
            dataType: "json",
            timeout: api.timeout
        });
    }

    static removeDevice(deviceId){
        return $.ajax({
            url: api.devices.url +"/"+deviceId+"/rooms",
            method: "DELETE",
            dataType: "json",
            timeout: api.timeout
        });
    }

    static putDevice(deviceId, actionName, params){
        let stringParams = JSON.stringify(params);
        return $.ajax({
            url: api.devices.url + deviceId+"/"+actionName,
            method: "PUT",
            dataType: "text",
            contentType:"application/json",
            timeout: api.timeout,
            data: stringParams
        });
    }

    static getState(deviceId){
        return $.ajax({
            url: api.devices.url + deviceId +"/getState",
            method: "PUT",
            dataType:"json",
            timeout: api.timeout
        })
    }

    static list() {
        return $.ajax({
            url: api.devices.url,
            method: "GET",
            dataType: "json",
            timeout: api.timeout
        });
    }

    static add(device) {
        return $.ajax({
            url: api.devices.url,
            method: "POST",
            dataType: "json",
            timeout: api.timeout,
            data: device
        });
    }

    static modify(device) {
        return $.ajax({
            url: api.devices.url + device.id,
            method: "PUT",
            dataType: "json",
            timeout: api.timeout,
            data: device
        });
    }

    static delete(id) {
        return $.ajax({
            url: api.devices.url + id,
            method: "DELETE",
            dataType: "json",
            timeout: api.timeout
        });
    }

    static get(id) {
        return $.ajax({
            url: api.devices.url + id,
            method: "GET",
            dataType: "json",
            timeout: api.timeout
        });
    }
};

api.deviceTypes = class{
    static get url(){
        return api.baseUrl + "deviceTypes/"
    }

    static getDeviceType(id) {
        return $.ajax({
            url: api.deviceTypes.url + id,
            method: "GET",
            dataType: "json",
            timeout: api.timeout
        })
    }

    static list() {
        return $.ajax({
            url: api.deviceTypes.url,
            method: "GET",
            dataType: "json",
            timeout: api.timeout
        });
    }

    static get(id) {
        return $.ajax({
            url: api.deviceTypes.url + id,
            method: "GET",
            dataType: "json",
            timeout: api.timeout
        });
    }
};

export default api;

