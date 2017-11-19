package com.falopa.smarthome.views;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.widget.Toast;

import com.falopa.smarthome.R;

public class NewRoom extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_new_room);
        android.app.ActionBar actionBar = getActionBar();
        if(actionBar != null) {
            actionBar.setHomeButtonEnabled(true);
        }
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(R.menu.new_room_menu, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        switch (item.getItemId()) {
            case R.id.action_create_room:
                // CREATE ROOM
                Toast.makeText(NewRoom.this, R.string.create_room_success, Toast.LENGTH_LONG).show();
                // FALL INTO NEXT CASE
            case android.R.id.home:
                // CLOSE ACTIVITY
                this.finish();
                return true;

            default:
                return super.onOptionsItemSelected(item);

        }
    }
}
