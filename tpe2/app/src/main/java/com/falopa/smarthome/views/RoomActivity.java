package com.falopa.smarthome.views;

import android.app.ActionBar;
import android.app.FragmentTransaction;
import android.content.Intent;
import android.os.Bundle;
import android.support.design.widget.TabLayout;
import android.support.v4.app.ListFragment;
import android.widget.ArrayAdapter;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v4.app.FragmentActivity;
import android.support.v4.view.ViewPager;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.View;

import com.falopa.smarthome.R;

public class RoomActivity extends AppCompatActivity {
    private MyAdapter mAdapter;
    private ViewPager  mPager;
    private Toolbar toolbar;
    private TabLayout tabLayout;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_rooms);

        Intent intent = getIntent();
        setTitle(intent.getStringExtra(MainActivity.EXTRA_ROOM_NAME));

        toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);

        mPager = (ViewPager) findViewById(R.id.pager);
        setupViewPager(mPager);

        tabLayout = (TabLayout) findViewById(R.id.tabs);
        tabLayout.setupWithViewPager(mPager);

    }

    private void setupViewPager(ViewPager viewPager) {
        mAdapter = new MyAdapter(getSupportFragmentManager());
        mAdapter.addFragment(new RoomDevicesViewFragment(), "Dispositivos");
        mAdapter.addFragment(new RoomDevicesViewFragment(), "Funciones Personalizadas");
        viewPager.setAdapter(mAdapter);
    }

}
