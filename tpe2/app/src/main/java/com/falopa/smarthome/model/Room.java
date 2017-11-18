package com.falopa.smarthome.model;


import java.util.ArrayList;

public class Room {
    private String id;
    private String name;
    private transient ArrayList<Device> devices;

    public Room(String id, String name){
        this.id = id;
        this.name = name;
    }


}
