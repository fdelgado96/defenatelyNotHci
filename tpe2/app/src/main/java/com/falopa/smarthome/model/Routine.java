package com.falopa.smarthome.model;

import java.util.ArrayList;
import com.google.gson.annotations.SerializedName;


public class Routine {
    private String id;
    private String name;
    private ArrayList<Action> actions;
    @SerializedName("meta")
    private String roomId;
}
