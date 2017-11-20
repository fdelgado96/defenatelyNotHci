package com.falopa.smarthome.views;

import android.app.Activity;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.ImageView;
import android.widget.TextView;

import com.falopa.smarthome.R;
import com.falopa.smarthome.model.Device;

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
        if (convertView == null) {
            convertView = LayoutInflater.from(getContext()).inflate(R.layout.device_list_item, parent, false);
            holder = new DeviceViewHolder();
            holder.nameTextView = (TextView) convertView.findViewById(R.id.name);
            convertView.setTag(holder);
        } else {
            holder = (DeviceViewHolder) convertView.getTag();
        }

        Device product = getItem(position);
        holder.nameTextView.setText(product.getName());

        return convertView;
    }
}
