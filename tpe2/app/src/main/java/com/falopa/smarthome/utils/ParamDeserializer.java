package com.falopa.smarthome.utils;


import com.falopa.smarthome.model.IntegerParam;
import com.falopa.smarthome.model.Param;
import com.falopa.smarthome.model.StringParam;
import com.google.gson.JsonDeserializationContext;
import com.google.gson.JsonDeserializer;
import com.google.gson.JsonElement;
import com.google.gson.JsonParseException;
import com.google.gson.JsonPrimitive;

import java.lang.reflect.Type;

public class ParamDeserializer implements JsonDeserializer<Param> {
    @Override
    public Param deserialize(JsonElement json, Type typeOfT, JsonDeserializationContext context) throws JsonParseException {
        JsonPrimitive paramJson = json.getAsJsonPrimitive();
        if(paramJson.isString())
            return new StringParam(paramJson.getAsString());
        else
            return new IntegerParam(paramJson.getAsInt());
    }
}
