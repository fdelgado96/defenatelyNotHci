package com.falopa.smarthome.model;


import com.google.gson.annotations.SerializedName;

public class Device {
    private String id;
    private String name;
    private String typeId;
    @SerializedName("meta")
    private String roomId;

    private transient DeviceType type;
    private transient Room room;
}
