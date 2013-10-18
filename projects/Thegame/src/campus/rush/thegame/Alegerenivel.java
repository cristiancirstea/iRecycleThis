package campus.rush.thegame;



import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.ImageButton;

//nivel 4 inseamna parter!

public class Alegerenivel extends Activity {

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_alegerenivel);
		
		
	 
		/*ImageButton b2=(ImageButton)findViewById(R.id.imageButton2);
		ImageButton b3=(ImageButton)findViewById(R.id.imageButton3);
		ImageButton b4=(ImageButton)findViewById(R.id.imageButton4);*/
		
	} 

	
	
	public void Joc(View v){
		
		ImageButton buton;
		buton = (ImageButton) v;
		
		int nivel = 4;
		Intent intent = new Intent (this,Joc.class );
		
		if( buton.getId() == R.id.imageButton1)
			nivel = 4;
		if( buton.getId() == R.id.imageButton2)
			nivel = 1;
		if( buton.getId() == R.id.imageButton3)
			nivel = 2;
		if( buton.getId() == R.id.imageButton4)
			nivel = 3;
		
		intent.putExtra("nivel", nivel);
		
		startActivityForResult (intent, 100);
	}
	
	 @Override
	    public void onActivityResult (int requestCode, int responseCode, Intent data)
	    {System.out.println("response:"+responseCode+"");
	    System.gc();
	    
	    	if (requestCode == 100)
	    	{	 if (responseCode==0)
    				{finish();
    				}
	    	else{
	    		Intent movie = new Intent(this, Movie.class);
	    		movie.putExtra("nivel", responseCode);
	    		movie.putExtra("film", data.getIntExtra("film",0));
	    		startActivityForResult(movie, 200);}
	    	}
	    	else if (requestCode==200&&responseCode==1){
	    		//System.out.println("response:"+responseCode);
	    			int nextlevel = data.getIntExtra("nivel", 1); 
	    			if(!(nextlevel==5)){
	    			Intent joc = new Intent (this,Joc.class );
	    			joc.putExtra("nivel", nextlevel);
	    			startActivityForResult(joc,100);} 
	    			
	    		 
	    		
	    	}
	    }

}
