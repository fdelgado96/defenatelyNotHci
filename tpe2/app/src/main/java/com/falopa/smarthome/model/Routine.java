package com.falopa.smarthome.model;

import java.util.ArrayList;
import com.google.gson.annotations.SerializedName;


public class Routine {
    private String id;
    private String name;
    private ArrayList<Action> actions;
    @SerializedName("meta")
    private String roomId;

    private transient Room room;

    public Routine(String name, Room room) {
        this.name = name;
        this.room = room;
        this.roomId = room.getId();
    }

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public ArrayList<Action> getActions() {
        return actions;
    }

    public Room getRoom() {
        return room;
    }

    public boolean addAction(Action action) {
        return actions.add(action);
    }

    public boolean removeAction(Action action) {
        return actions.remove(action);
    }
}
