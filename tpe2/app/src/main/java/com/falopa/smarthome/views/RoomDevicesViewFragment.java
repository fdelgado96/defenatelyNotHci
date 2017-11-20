package com.falopa.smarthome.views;

import android.os.Bundle;
import android.support.v4.app.ListFragment;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.ListView;
import android.widget.TextView;

import com.falopa.smarthome.R;
import com.falopa.smarthome.model.Alarm;
import com.falopa.smarthome.model.Device;
import com.falopa.smarthome.model.DeviceType;
import com.falopa.smarthome.model.Door;
import com.falopa.smarthome.model.Home;
import com.falopa.smarthome.model.Room;

import java.util.ArrayList;
import java.util.LinkedList;

/**
 * Created by Francisco Delgado on 11/19/2017.
 */

public class RoomDevicesViewFragment extends ListFragment {

    String id;
    ArrayList<Device> deviceList = new ArrayList<>();
    /**
     * Create a new instance of CountingFragment, providing "num"
     * as an argument.
     */
    static RoomDevicesViewFragment newInstance(int id) {
        RoomDevicesViewFragment f = new RoomDevicesViewFragment();

        // Supply num input as an argument.
        Bundle args = new Bundle();
        args.putInt("id", id);
        f.setArguments(args);

        return f;
    }

    /**
     * When creating, retrieve this instance's number from its arguments.
     */
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        id = getArguments() != null ? getArguments().getString("id") : "";
//        deviceList = Home.getRoom(id).getDevices();
    }

    /**
     * The Fragment's UI is just a simple text view showing its
     * instance number.
     */
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View v = inflater.inflate(R.layout.fragment_pager_list, container, false);
        View tv = v.findViewById(R.id.text);
        return v;
    }

    @Override
    public void onActivityCreated(Bundle savedInstanceState) {
        Device[] devices = new Device[]{
                new Door("12312","Door", new DeviceType("1231","lel",null), "123123"),
                new Alarm("12312","Alarm", new DeviceType("1231","lel",null), "123123")
        };

        super.onActivityCreated(savedInstanceState);
        setListAdapter(new DeviceArrayAdapter(getActivity(), devices));
    }

    @Override
    public void onListItemClick(ListView l, View v, int position, long id) {
        Log.i("FragmentList", "Item clicked: " + id);
    }
}

//    public static final String ARG_OBJECT = "object";
//
//    @Override
//    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState){
//        View rootView = inflater.inflate(R.layout.fragment_device_object,container,false);
//        Bundle args = getArguments();
//        ((TextView) rootView.findViewById(android.R.id.text1)).setText(Integer.toString(args.getInt(ARG_OBJECT)));
//    }

