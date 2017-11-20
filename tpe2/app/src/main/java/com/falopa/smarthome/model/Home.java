package com.falopa.smarthome.model;


import android.util.Log;

import com.falopa.smarthome.utils.Callback;

import java.util.ArrayList;

public class Home {
    private static final String TAG = "Home";

    private static ArrayList<DeviceType> deviceTypes;
    private static ArrayList<Room> rooms;
    private static ArrayList<Routine> routines;
    //TODO: mas usados

    public static void init(Callback callback) {

    }

    public static void updateRooms(Callback callback) {

    }

    public static void updateRoutines(Callback callback) {

    }

    public static ArrayList<DeviceType> getDeviceTypes() {
        if(deviceTypes == null) {
            Log.e(TAG, "Home class not initialized");
        }
        return deviceTypes;
    }

    public static DeviceType getDeviceType(String id) {
        if(deviceTypes == null) {
            Log.e(TAG, "Home class not initialized");
            return null;
        }
        for(DeviceType type : deviceTypes) {
            if(type.getId().equals(id))
                return type;
        }
        return null;
    }

    public static ArrayList<Room> getRooms() {
        if(rooms == null) {
            Log.e(TAG, "Home class not initialized");
        }
        return rooms;
    }

    public static Room getRoom(String id) {
        if(rooms == null) {
            Log.e(TAG, "Home class not initialized");
            return null;
        }
        for(Room room : rooms) {
            if(room.getId().equals(id))
                return room;
        }
        return null;
    }

    public static ArrayList<Routine> getRoutines() {
        if(routines == null) {
            Log.e(TAG, "Home class not initialized");
        }
        return routines;
    }

    public static Routine getRoutine(String id) {
        if(routines == null) {
            Log.e(TAG, "Home class not initialized");
            return null;
        }
        for(Routine routine : routines) {
            if(routine.getId().equals(id))
                return routine;
        }
        return null;
    }
}
