package com.falopa.smarthome.views;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.widget.EditText;
import android.widget.Toast;

import com.falopa.smarthome.R;
import com.falopa.smarthome.utils.Callback;
import com.falopa.smarthome.model.Room;

public class NewRoom extends AppCompatActivity implements Callback {
    private boolean creating = false;

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
        EditText editText = findViewById(R.id.new_room_name);
        switch(item.getItemId()) {
            case R.id.action_create_room:
                if(!creating) {
                    creating = true;
                    editText.setEnabled(false);
                    Toast.makeText(NewRoom.this, R.string.create_room_wait, Toast.LENGTH_LONG).show();
                    String name = editText.getText().toString();
                    Room.create(name, this);
                }
                return true;
            case android.R.id.home:
                if(!creating) {
                    this.finish();
                }
                return true;

            default:
                return super.onOptionsItemSelected(item);
        }
    }

    @Override
    public void onBackPressed() {
        if(!creating) {
            super.onBackPressed();
        }
    }

    @Override
    public void onSuccess() {
        EditText editText = findViewById(R.id.new_room_name);
        //UPDATE ROOMS
        creating = false;
        editText.setEnabled(true);
        Toast.makeText(NewRoom.this, R.string.create_room_success, Toast.LENGTH_LONG).show();
        this.finish();
    }

    @Override
    public void onFail() {
        EditText editText = findViewById(R.id.new_room_name);
        creating = false;
        editText.setEnabled(true);
        Toast.makeText(NewRoom.this, R.string.create_room_fail, Toast.LENGTH_LONG).show();
    }
}
