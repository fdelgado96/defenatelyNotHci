package com.falopa.smarthome.model;


import com.google.gson.annotations.SerializedName;

public abstract class Device {
    protected String id;
    protected String name;
    protected String typeId;
    @SerializedName("meta")
    protected String roomId;

    protected transient DeviceType type;
    protected transient Room room;

    protected Device(String id, String name, DeviceType type, String roomId) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.typeId = type.getId();
        this.roomId = roomId;
    }

    protected static String createDevice(String name, DeviceType type, String roomId) {
        return null;
    }

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public DeviceType getType() {
        return type;
    }

    public Room getRoom() {
        return room;
    }

    public void setName(String name) {
        this.name = name;
    }

    public abstract boolean update();
}