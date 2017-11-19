package com.falopa.smarthome.utils;

import com.falopa.smarthome.model.IntegerParam;
import com.falopa.smarthome.model.Param;
import com.falopa.smarthome.model.StringParam;
import com.google.gson.JsonElement;
import com.google.gson.JsonPrimitive;
import com.google.gson.JsonSerializationContext;
import com.google.gson.JsonSerializer;

import java.lang.reflect.Type;


public class ParamSerializer implements JsonSerializer<Param> {

    @Override
    public JsonElement serialize(Param src, Type typeOfSrc, JsonSerializationContext context) {
        JsonPrimitive json;
        if(src instanceof IntegerParam)
            json = new JsonPrimitive(((IntegerParam)src).getValue());
        else
            json = new JsonPrimitive(((StringParam)src).getValue());

        return json;
    }
}
