package com.falopa.smarthome.views;

import android.app.Activity;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.CompoundButton;
import android.widget.ImageView;
import android.widget.Switch;
import android.widget.TextView;

import com.falopa.smarthome.R;
import com.falopa.smarthome.model.AC;
import com.falopa.smarthome.model.Alarm;
import com.falopa.smarthome.model.Blind;
import com.falopa.smarthome.model.Device;
import com.falopa.smarthome.model.Door;
import com.falopa.smarthome.model.Lamp;
import com.falopa.smarthome.model.Oven;
import com.falopa.smarthome.model.Refrigerator;
import com.falopa.smarthome.model.Timer;

/**
 * Created by Francisco Delgado on 11/19/2017.
 */

public class FunctionArrayAdapter extends ArrayAdapter<Device> {

    public FunctionArrayAdapter(Activity context, Device[] objects) {
        super(context, R.layout.device_list_item, objects);
    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        DeviceViewHolder holder;
        if (convertView == null) {
            convertView = LayoutInflater.from(getContext()).inflate(R.layout.device_list_item, parent, false);
            holder = new DeviceViewHolder();
            holder.nameTextView = (TextView) convertView.findViewById(R.id.name);
            holder.activationSwitch = (Switch) convertView.findViewById(R.id.activation_switch);
            convertView.setTag(holder);
        } else {
            holder = (DeviceViewHolder) convertView.getTag();
        }
        Device device = getItem(position);
        holder.nameTextView.setText(device.getName());

        return convertView;
    }
}