package campus.rush.thegame;



import android.app.Activity;
import android.os.Bundle;
import android.view.Menu;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.ImageView;

public class Instructiuni extends Activity {

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_instructiuni);
	
	ImageView i=(ImageView)findViewById(R.id.imageView1);
	i.setOnClickListener(new OnClickListener() {
		
		@Override
		public void onClick(View v) {
			finish();// TODO Auto-generated method stub
			
		}
	});
	}

	@Override
	public boolean onCreateOptionsMenu(Menu menu) {
		// Inflate the menu; this adds items to the action bar if it is present.
		getMenuInflater().inflate(R.menu.instructiuni, menu);
		return true;
	}
	
	

}
