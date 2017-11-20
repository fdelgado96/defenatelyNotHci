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

public class DeviceArrayAdapter extends ArrayAdapter<Device> {
    
    public DeviceArrayAdapter(Activity context, Device[] objects) {
        super(context, R.layout.device_list_item, objects);
    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        DeviceViewHolder holder;
        if(hasSwitch(getItem(position))) {

            if (convertView == null) {
                convertView = LayoutInflater.from(getContext()).inflate(R.layout.device_list_item, parent, false);
                holder = new DeviceViewHolder();
                holder.nameTextView = (TextView) convertView.findViewById(R.id.name);
                holder.activationSwitch = (Switch) convertView.findViewById(R.id.activation_switch);
                convertView.setTag(holder);
            } else {
                holder = (DeviceViewHolder) convertView.getTag();
            }

            final Device device = getItem(position);
            holder.nameTextView.setText(device.getName());
            holder.activationSwitch.setOnCheckedChangeListener(
                    new CompoundButton.OnCheckedChangeListener() {
                        @Override
                        public void onCheckedChanged(CompoundButton buttonView, boolean isChecked) {
                            changeDeviceState(device,isChecked);
                        }
                    });
            holder.activationSwitch.setChecked(getDeviceState(device));
        }else{

            if (convertView == null) {
                convertView = LayoutInflater.from(getContext()).inflate(R.layout.device_list_item_no_switch, parent, false);
                holder = new DeviceViewHolder();
                holder.nameTextView = (TextView) convertView.findViewById(R.id.name);
                convertView.setTag(holder);
            } else {
                holder = (DeviceViewHolder) convertView.getTag();
            }

            final Device device = getItem(position);
            holder.nameTextView.setText(device.getName());

        }
        return convertView;
    }

    public boolean hasSwitch(Device device){
        if(device instanceof Alarm || device instanceof Refrigerator)
            return false;
        else return true;
    }

    public boolean getDeviceState(Device device){
        Log.d("s", "getDeviceState: ");
        if(device instanceof AC) {
            AC aux = (AC) device;
            return aux.getStatus();
        }
        if(device instanceof Oven) {
            Oven aux = (Oven) device;
            return aux.getStatus();
        }
        if(device instanceof Blind) {
            Blind aux = (Blind) device;
            if("open"==aux.getStatus() || "opening"==aux.getStatus())
                return true;
            else
                return false;
        }
        if(device instanceof Lamp) {
            Lamp aux = (Lamp) device;
            return aux.getStatus();
        }
        if(device instanceof Timer) {
            Timer aux = (Timer) device;
            return aux.getStatus();
        }

        if(device instanceof Door){
            Door aux = (Door) device;
            return aux.getStatus();
        }
        return false;

    }

    public void changeDeviceState(Device device,boolean state){
        if(device instanceof AC) {
            AC aux = (AC) device;
            aux.setStatus(state);
        }
        if(device instanceof Oven) {
            Oven aux = (Oven) device;
            aux.setStatus(state);
        }
        if(device instanceof Blind) {
            Blind aux = (Blind) device;
            aux.setOpen(state);          //como se lidia con opening
        }
        if(device instanceof Lamp) {
            Lamp aux = (Lamp) device;
            aux.setStatus(state);          //como se lidia con opening
        }
        if(device instanceof Timer) {
            Timer aux = (Timer) device;
            aux.setStatus(state);          //como se lidia con opening
        }

        if(device instanceof Door){
            Door aux = (Door) device;
            aux.setStatus(state);
            Log.d("asd", "onCheckedChanged: ");
        }
    }

}
