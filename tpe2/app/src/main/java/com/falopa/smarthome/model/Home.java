package com.falopa.smarthome.model;


import java.util.ArrayList;

public class Home {
    private static ArrayList<DeviceType> deviceTypes;
    private static ArrayList<Room> rooms;
    private static ArrayList<Routine> routines;
    //TODO: mas usados

    public static ArrayList<DeviceType> getDeviceTypes() {
        if(deviceTypes == null) {
            //TODO: request
        }
        return deviceTypes;
    }

    public static DeviceType getDeviceType(String id) {
        if(deviceTypes == null) {
            //TODO: request
        }
        for(DeviceType type : deviceTypes) {
            if(type.getId().equals(id))
                return type;
        }
        return null;
    }

    public static ArrayList<Room> getRooms() {
        if(rooms == null) {
            //TODO: request
        }
        return rooms;
    }

    public static Room getRoom(String id) {
        if(rooms == null) {
            //TODO: request
        }
        for(Room room : rooms) {
            if(room.getId().equals(id))
                return room;
        }
        return null;
    }

    public static ArrayList<Routine> getRoutines() {
        if(routines == null) {
            //TODO: request
        }
        return routines;
    }

    public static Routine getRoutine(String id) {
        if(routines == null) {
            //TODO: request
        }
        for(Routine routine : routines) {
            if(routine.getId().equals(id))
                return routine;
        }
        return null;
    }
}
