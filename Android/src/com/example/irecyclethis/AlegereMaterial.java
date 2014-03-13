package com.example.irecyclethis;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.view.Menu;
import android.view.View;
import android.view.animation.Animation;
import android.view.animation.TranslateAnimation;
import android.widget.ImageView;


public class AlegereMaterial extends Activity {

	int material;
	
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		overridePendingTransition(R.anim.fadein, R.anim.fadeout);
		setContentView(R.layout.activity_alegere_material);
		
	}

	@Override
	public boolean onCreateOptionsMenu(Menu menu) {
		// Inflate the menu; this adds items to the action bar if it is present.
		getMenuInflater().inflate(R.menu.alegere_material, menu);
		return true;
	}
	
	private Handler mHandler = new Handler();
	
	public void picked(View v){
		
		//ImageButton buton;
		//System.gc();
		ImageView buton = (ImageView)v;
		
	 	if( buton.getId() == R.id.imageView1){
	 		material = 1;
	 		for(int i=0; i< 110; i+=10){
	 			Animation animation = new TranslateAnimation(0, -i,0, 0);
	 			animation.setDuration(1000);
	 			buton.startAnimation(animation);
	 			mHandler.postDelayed(new Runnable() {
	 	            public void run() {
	 	            	;
	 	            }
	 	        }, 2000);
	 			}}
	 	
	 	if( buton.getId() == R.id.imageView2){
	 		material = 2;
	 		for(int i=0; i< 110; i+=10){
	 			Animation animation = new TranslateAnimation(0, i,0, 0);
	 			animation.setDuration(1000);
	 			buton.startAnimation(animation);
	 			mHandler.postDelayed(new Runnable() {
	 	            public void run() {
	 	            	;
	 	            }
	 	        }, 2000);
	 			}}
	 	if( buton.getId() == R.id.imageView3){
	 		material = 3;
	 		for(int i=0; i< 90; i+=10){
	 			Animation animation = new TranslateAnimation(0, -i,0, 0);
	 			animation.setDuration(1000);
	 			buton.startAnimation(animation);
	 			mHandler.postDelayed(new Runnable() {
	 	            public void run() {
	 	            	;
	 	            }
	 	        }, 2000);
	 			}}
	 	if( buton.getId() == R.id.imageView4){
	 		material = 4;
	 		for(int i=0; i< 90; i+=5){
	 			Animation animation = new TranslateAnimation(0, i,0, 0);
	 			animation.setDuration(1000);
	 			buton.startAnimation(animation);
	 			mHandler.postDelayed(new Runnable() {
	 	            public void run() {
	 	            	;
	 	            }
	 	        }, 2000);
	 			}
	 		}
	 	if( buton.getId() == R.id.imageView5){
	 		material = 5;
	 		for(int i=0; i< 70; i+=10){
	 			Animation animation = new TranslateAnimation(0, -i,0, 0);
	 			animation.setDuration(1000);
	 			buton.startAnimation(animation);
	 			mHandler.postDelayed(new Runnable() {
	 	            public void run() {
	 	            	;
	 	            }
	 	        }, 2000);
	 			}}
	 	if( buton.getId() == R.id.imageView6){
	 		material = 6;
	 		for(int i=0; i< 70; i+=10){
	 			Animation animation = new TranslateAnimation(0, i,0, 0);
	 			animation.setDuration(1000);
	 			buton.startAnimation(animation);
	 			mHandler.postDelayed(new Runnable() {
	 	            public void run() {
	 	            	;
	 	            }
	 	        }, 2000);
	 			}}

	 	mHandler.postDelayed(new Runnable() {
            public void run() {
            	Intent formular = new Intent (AlegereMaterial.this, Formular.class);
        	 	formular.putExtra("tipMaterial", material);
        	 	startActivity (formular);
            }
        }, 700);
	 	
	 	
	}

}
