package com.falopa.smarthome.model;

import com.google.gson.annotations.SerializedName;
import java.util.ArrayList;


public class Action {
    private String deviceId;
    @SerializedName("actionName")
    private String name;
    private ArrayList<Param> params;

    private transient Device device;
}
