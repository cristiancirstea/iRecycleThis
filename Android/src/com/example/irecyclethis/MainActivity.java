package com.example.irecyclethis;

import android.app.Activity;
import android.content.Intent;
import android.media.MediaPlayer;
import android.media.MediaPlayer.OnCompletionListener;
import android.net.Uri;
import android.os.Bundle;
import android.os.Handler;
import android.view.Menu;
import android.widget.VideoView;

public class MainActivity extends Activity {

	private Handler mHandler = new Handler();
	
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_main);
		
		mHandler.postDelayed(new Runnable() {
            public void run() {
            	GetToMeniu();
            }
        }, 2000);
		
		/*VideoView v=(VideoView)findViewById(R.id.videoView1);
		
		int film=	intent.getIntExtra("film", 0);
		Uri video=null;
			
			video = Uri.parse("android.resource://" + getPackageName() + "/" 
					+ R.raw.lose); 
			
			
					v.setVideoURI(video);
					v.start();
					
					v.setOnCompletionListener(new OnCompletionListener() {
						
						@Override
						public void onCompletion(MediaPlayer mp) {
							setResult(1, intent);
							finish();
						}
					});
			*/
		
		
		
	}

	@Override
	public boolean onCreateOptionsMenu(Menu menu) {
		// Inflate the menu; this adds items to the action bar if it is present.
		getMenuInflater().inflate(R.menu.main, menu);
		return true;
	}
	
	public void GetToMeniu(){
		Intent intent= new Intent (MainActivity.this,Story.class);
		
		//Intent intent= new Intent (MainActivity.this,AlegereMaterial.class);
		startActivity(intent);
		finish();
	}

}
