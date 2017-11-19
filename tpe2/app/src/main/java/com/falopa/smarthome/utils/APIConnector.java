package com.falopa.smarthome.utils;


import com.falopa.smarthome.model.Param;
import com.google.gson.JsonObject;

import java.util.ArrayList;

public class APIConnector {

    public static boolean doAction(String deviceId, String actionName) {
        // ret is boolean ? return ret : return ret != null
        return false;
    }

    public static boolean doAction(String deviceId, String actionName, Param param) {
        return false;
    }
    public static boolean doAction(String deviceId, String actionName, ArrayList<Param> params) {
        return false;
    }

    public static JsonObject getState(String deviceId) {
        return null;
    }
}
