package campus.rush.thegame;



import android.app.Activity;
import android.content.Intent;
import android.media.MediaPlayer;
import android.media.MediaPlayer.OnCompletionListener;
import android.net.Uri;
import android.os.Bundle;
import android.view.Menu; 
import android.widget.VideoView;

public class Movie extends Activity {
Intent intent;
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_movie);
		intent=getIntent();
		
		VideoView v=(VideoView)findViewById(R.id.videoView1);
		
	int film=	intent.getIntExtra("film", 0);
	Uri video=null;
		if(film==0){
		video = Uri.parse("android.resource://" + getPackageName() + "/" 
				+ R.raw.lose); 
		}
		else if(film==1)
			video = Uri.parse("android.resource://" + getPackageName() + "/" 
					+ R.raw.nextlevel); 
		else if(film==2)
			video = Uri.parse("android.resource://" + getPackageName() + "/" 
					+ R.raw.win); 
				v.setVideoURI(video);
				v.start();
				
				v.setOnCompletionListener(new OnCompletionListener() {
					
					@Override
					public void onCompletion(MediaPlayer mp) {
						setResult(1, intent);
						finish();
					}
				});
		
	}

	@Override
	public boolean onCreateOptionsMenu(Menu menu) {
		// Inflate the menu; this adds items to the action bar if it is present.
		getMenuInflater().inflate(R.menu.movie, menu);
		return true;
	}

}
