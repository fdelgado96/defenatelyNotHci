package com.falopa.smarthome.utils;

import com.falopa.smarthome.model.ColorParamType;
import com.falopa.smarthome.model.NumberParamType;
import com.falopa.smarthome.model.OptionsParamType;
import com.falopa.smarthome.model.ParamType;
import com.google.gson.Gson;
import com.google.gson.JsonDeserializationContext;
import com.google.gson.JsonDeserializer;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParseException;
import com.google.gson.reflect.TypeToken;

import java.lang.reflect.Type;
import java.util.ArrayList;


public class ParamTypeDeserializer implements JsonDeserializer<ParamType> {
    @Override
    public ParamType deserialize(JsonElement json, Type typeOfT, JsonDeserializationContext context) throws JsonParseException {
        JsonObject paramJson = json.getAsJsonObject();
        String name = paramJson.getAsJsonPrimitive("name").getAsString();
        String type = paramJson.getAsJsonPrimitive("type").getAsString();
        String desc = paramJson.getAsJsonPrimitive("description").getAsString();
        if(type.equals("integer")) {
            Integer minValue = paramJson.getAsJsonPrimitive("minValue").getAsInt();
            Integer maxValue = paramJson.getAsJsonPrimitive("maxValue").getAsInt();
            return new NumberParamType(name, type, desc, minValue, maxValue);
        }
        else if(name.equals("color")) {
            String minValue = paramJson.getAsJsonPrimitive("minValue").getAsString();
            String maxValue = paramJson.getAsJsonPrimitive("maxValue").getAsString();
            return new ColorParamType(name, type, desc, minValue, maxValue);
        }
        else {
            Gson gson = new Gson();
            ArrayList<String> supportedValues = gson.fromJson(paramJson.getAsJsonArray("supportedValues"), new TypeToken<ArrayList<String>>(){}.getType());
            return new OptionsParamType(name, type, desc, supportedValues);
        }
    }
}
