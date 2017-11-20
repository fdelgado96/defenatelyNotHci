package com.falopa.smarthome.views;

import android.content.Intent;
import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.design.widget.TabLayout;
import android.support.v4.view.ViewPager;
import android.util.Log;
import android.view.View;
import android.support.design.widget.NavigationView;
import android.support.v4.view.GravityCompat;
import android.support.v4.widget.DrawerLayout;
import android.support.v7.app.ActionBarDrawerToggle;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.Menu;
import android.view.MenuItem;

import com.falopa.smarthome.R;
import com.falopa.smarthome.model.Home;
import com.falopa.smarthome.utils.APIConnector;
import com.falopa.smarthome.utils.Callback;

public class MainActivity extends AppCompatActivity
        implements NavigationView.OnNavigationItemSelectedListener {
    private static final String TAG = "MainActivity";
    private final int FUNCION_P_ID = 9999;
    private final int AGREGAR_AMB_ID = 8888;
 

    public final static String EXTRA_ROOM_NAME = com.falopa.smarthome.views.MainActivity.EXTRA_ROOM_NAME;

    private MyAdapter mAdapter;
    private ViewPager  mPager;
    private Toolbar toolbar;
    private TabLayout tabLayout;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        APIConnector.init(this);
        setContentView(R.layout.activity_main);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        DrawerLayout drawer = (DrawerLayout) findViewById(R.id.drawer_layout);
        ActionBarDrawerToggle toggle = new ActionBarDrawerToggle(
                this, drawer, toolbar, R.string.navigation_drawer_open, R.string.navigation_drawer_close);
        drawer.addDrawerListener(toggle);
        toggle.syncState();

        NavigationView navigationView = (NavigationView) findViewById(R.id.nav_view);
        navigationView.setNavigationItemSelectedListener(this);
        
        Menu menu = navigationView.getMenu();
        menu.add(0,FUNCION_P_ID,0,"Funciones Personalizadas");
        menu.add(0,AGREGAR_AMB_ID,0,"Agregar Ambiente");
        drawer.closeDrawers();

        //Progress dialog
        Home.init(new Callback() {
            @Override
            public void onSuccess() {
                //saca progress dialog
            }

            @Override
            public void onFail() {
                //saca progres dialog
                //no tenes ningun dato, cagamo la fruta
            }
        });
    }
    public void addMenuRoom(String roomName, int roomid) {

        NavigationView navigationView = (NavigationView) findViewById(R.id.nav_view);
        Menu menu = navigationView.getMenu();
        menu.add(0, roomid, 0, roomName);

    }


    @Override
    public void onBackPressed() {
        DrawerLayout drawer = (DrawerLayout) findViewById(R.id.drawer_layout);
        if (drawer.isDrawerOpen(GravityCompat.START)) {
            drawer.closeDrawer(GravityCompat.START);
        } else {
            super.onBackPressed();
        }
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.main, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();

        //noinspection SimplifiableIfStatement
        if (id == R.id.action_settings) {
            return true;
        }

        return super.onOptionsItemSelected(item);
    }

    @SuppressWarnings("StatementWithEmptyBody")
    @Override
    public boolean onNavigationItemSelected(MenuItem item) {
        // Handle navigation view item clicks here.
        int id = item.getItemId();

        if (id == R.id.nav_camera) {

//            toolbar = (Toolbar) findViewById(R.id.toolbar);
//            setSupportActionBar(toolbar);
//            getSupportActionBar().setDisplayHomeAsUpEnabled(true);

            mPager = (ViewPager) findViewById(R.id.pager);
            setupViewPager(mPager);
            setTitle("Cocina");
            tabLayout = (TabLayout) findViewById(R.id.tabs);
            tabLayout.setupWithViewPager(mPager);


        } else if (id == R.id.nav_gallery) {
            Intent intent = new Intent(this, NewRoom.class);
            startActivity(intent);
        } else if (id == R.id.nav_slideshow) {

        } else if (id == R.id.nav_manage) {

        } else if (id == R.id.nav_share) {

        } else if (id == R.id.nav_send) {

        }

        DrawerLayout drawer = (DrawerLayout) findViewById(R.id.drawer_layout);
        drawer.closeDrawer(GravityCompat.START);
        return true;
    }
    
    /*
     @SuppressWarnings("StatementWithEmptyBody")
    @Override
    public boolean onNavigationItemSelected(MenuItem item) {

        int itemID = item.getItemId();
        Fragment fragment = null;
        boolean isRoomItem = false;

        if(itemID == AGREGAR_AMB_ID) { 
            //fragment = new Agregar Ambiente Fragment
        }
        else if(itemID == FUNCION_P_ID) { 
            //fragment = new Funciones Personalizadas Fragment
        }
        else { //Agregar ambiente
           // fragment = new RoomFragment();
            isRoomItem = true;

        }
        
        if(fragment != null) {

            NavigationView navigationView = (NavigationView) findViewById(R.id.nav_view);
            Menu menu = navigationView.getMenu();
            int size = menu.size();

            for(int i=0 ; i<size ; i++) { 
                MenuItem menuItem = menu.getItem(i);
                if(!item.equals(menuItem)) {
                    menuItem.setChecked(false);
                }
            }

            if(isRoomItem) {

                Bundle bundle = new Bundle();
                bundle.putString("roomid", String.valueOf(item.getItemId()));
                fragment.setArguments(bundle);
            }

            getSupportFragmentManager().beginTransaction().replace(R.id.content_main,fragment).commit();
            item.setChecked(true);

            getSupportActionBar().setTitle(item.getTitle());

        }

        DrawerLayout drawer = (DrawerLayout) findViewById(R.id.drawer_layout);
        drawer.closeDrawer(GravityCompat.START);

        return true;
    }
    */


    private void setupViewPager(ViewPager viewPager) {
        mAdapter = new MyAdapter(getSupportFragmentManager());
        mAdapter.addFragment(new RoomDevicesViewFragment(), "Dispositivos");
        mAdapter.addFragment(new RoomDevicesViewFragment(), "Funciones Personalizadas");
        viewPager.setAdapter(mAdapter);
    }
}
