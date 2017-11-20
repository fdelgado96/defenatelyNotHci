package com.falopa.smarthome.utils;


import android.content.Context;
import android.util.Log;

import com.android.volley.RequestQueue;
import com.android.volley.toolbox.Volley;
import com.falopa.smarthome.model.Param;
import com.google.gson.JsonObject;

import java.util.ArrayList;

public class APIConnector {
    private static final String TAG = "APIConnector";
    private static RequestQueue requestQueue;

    public static void init(Context context) {
        if(requestQueue == null)
            requestQueue = Volley.newRequestQueue(context.getApplicationContext());
    }

    public static RequestQueue getRequestQueue() {
        if(requestQueue == null)
            Log.e(TAG, "Someone would've gotten a null requestQueue", new NullPointerException("No one initialized APIController"));
        return requestQueue;
    }
}
