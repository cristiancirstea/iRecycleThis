package com.example.irecyclethis;

import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.view.Menu;
import android.view.View;
import android.view.View.OnClickListener;
import android.view.animation.AnimationUtils;
import android.widget.Button;
import android.widget.ViewSwitcher;


public class Story extends Activity {

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		overridePendingTransition(R.anim.fadein, R.anim.fadeout);
		setContentView(R.layout.activity_story);
		 final ViewSwitcher switcher = (ViewSwitcher) findViewById(R.id.profileSwitcher);
	        Button btn = (Button) findViewById(R.id.btn);
	        btn.setOnClickListener(new OnClickListener() {
	           
	            public void onClick(View v) {
	                new AnimationUtils();
	                // TODO Auto-generated method stub
	                switcher.setAnimation(AnimationUtils.makeInAnimation(getApplicationContext(), true));
	                switcher.showNext();
	            }
	        });
	        Button btn1 = (Button) findViewById(R.id.btn1);
	        btn1.setVisibility(View.GONE);
	        btn1.setOnClickListener(new OnClickListener() {
	           
	            public void onClick(View v) {
	                new AnimationUtils();
	                // TODO Auto-generated method stub
	                switcher.setAnimation(AnimationUtils.makeInAnimation(getApplicationContext(), true));
	                switcher.showPrevious();
	            }
	        });
		
	        System.gc();
	        
		//ImageView img2 = (ImageView)findViewById(R.id.imageView2);
		//img2.setVisibility(View.INVISIBLE);
		
		 
	}

	@Override
	public boolean onCreateOptionsMenu(Menu menu) {
		// Inflate the menu; this adds items to the action bar if it is present.
		getMenuInflater().inflate(R.menu.story, menu);
		return true;
	}

	public void skip(View v){
		Intent intent= new Intent (Story.this, AlegereMaterial.class);
		startActivity(intent);
		//finish();
	}
	
	public void facebook(View v){
 	   String uri = "https://www.facebook.com/pages/IRecycleThis/622753934443684";
 	   Intent browserIntent = new Intent(Intent.ACTION_VIEW, Uri.parse(uri));
 	   startActivity(browserIntent);
	}
	
	
	
}
