package com.falopa.smarthome.utils;


import com.falopa.smarthome.model.Param;
import com.google.gson.JsonObject;

import java.util.ArrayList;

public class DeviceAPI {

    public static boolean doAction(String deviceId, String actionName, Callback callback) {
        // ret is boolean ? return ret : return ret != null
        return false;
    }

    public static boolean doAction(String deviceId, String actionName, Param param, Callback callback) {
        return false;
    }
    public static boolean doAction(String deviceId, String actionName, ArrayList<Param> params, Callback callback) {
        return false;
    }

    public static JsonObject getState(String deviceId) {
        return null;
    }

    public static void createDevice(String name, String typeId, String roomId, Callback callback) {

    }
}
