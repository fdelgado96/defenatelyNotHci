package com.falopa.smarthome.utils;


import com.falopa.smarthome.model.AC;
import com.falopa.smarthome.model.Alarm;
import com.falopa.smarthome.model.Blind;
import com.falopa.smarthome.model.Device;
import com.falopa.smarthome.model.DeviceType;
import com.falopa.smarthome.model.Door;
import com.falopa.smarthome.model.Home;
import com.falopa.smarthome.model.Lamp;
import com.falopa.smarthome.model.Oven;
import com.falopa.smarthome.model.Refrigerator;
import com.falopa.smarthome.model.Timer;
import com.google.gson.JsonDeserializationContext;
import com.google.gson.JsonDeserializer;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParseException;

import java.lang.reflect.Type;

public class DeviceDeserializer implements JsonDeserializer<Device> {
    @Override
    public Device deserialize(JsonElement json, Type typeOfT, JsonDeserializationContext context) throws JsonParseException {
        JsonObject deviceJson = json.getAsJsonObject();
        String id = deviceJson.getAsJsonPrimitive("id").getAsString();
        String name = deviceJson.getAsJsonPrimitive("name").getAsString();
        String typeId = deviceJson.getAsJsonPrimitive("typeId").getAsString();
        String roomId = deviceJson.getAsJsonPrimitive("meta").getAsString();
        DeviceType type = Home.getDeviceType(typeId);
        if(type == null) {
            System.out.println("INVALID TYPE, COULDN'T PARSE");
            return null;
        }
        switch(type.getName()) {
            case "ac":
                return new AC(id, name, type, roomId);
            case "alarm":
                return new Alarm(id, name, type, roomId);
            case "blind":
                return new Blind(id, name, type, roomId);
            case "door":
                return new Door(id, name, type, roomId);
            case "lamp":
                return new Lamp(id, name, type, roomId);
            case "oven":
                return new Oven(id, name, type, roomId);
            case "refrigerator":
                return new Refrigerator(id, name, type, roomId);
            case "timer":
                return new Timer(id, name, type, roomId);
            default:
                System.out.println("UNSUPPORTED TYPE, COULDN'T PARSE");
                return null;
        }
    }
}
