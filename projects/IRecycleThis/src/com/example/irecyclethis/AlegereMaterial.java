package com.example.irecyclethis;


import android.app.Activity;
import android.os.Bundle;
import android.view.Menu;
import android.view.View;
import android.widget.Button;
import android.widget.ImageButton;
import android.widget.ImageView;

public class AlegereMaterial extends Activity {

	String material;
	
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_alegere_material);
		
	}

	@Override
	public boolean onCreateOptionsMenu(Menu menu) {
		// Inflate the menu; this adds items to the action bar if it is present.
		getMenuInflater().inflate(R.menu.alegere_material, menu);
		return true;
	}
	
	public void picked(View v){
		ImageButton buton;
	 	buton = (ImageButton)v;
	 	//if( buton.getId() == R.id.imageButton1){
	 		
	 	//}
		
	}

}
