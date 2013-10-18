package com.example.camera_use;

import java.io.ByteArrayOutputStream;

import android.app.Activity;
import android.content.Intent;
import android.graphics.Bitmap;
import android.os.Bundle;
import android.util.Base64;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.Toast;

public class MainActivity extends Activity {
/*
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_main);
	}

	@Override
	public boolean onCreateOptionsMenu(Menu menu) {
		// Inflate the menu; this adds items to the action bar if it is present.
		getMenuInflater().inflate(R.menu.main, menu);
		return true;
	}

}
*/
	Button ButtonClick;
	int CAMERA_PIC_REQUEST = 1337; 
	/** Called when the activity is first created. */
	@Override
	public void onCreate(Bundle savedInstanceState) {
	    super.onCreate(savedInstanceState);
	    setContentView(R.layout.activity_main);

	    ButtonClick =(Button) findViewById(R.id.button1);
	    ButtonClick.setOnClickListener(new OnClickListener (){
	        @Override
	        public void onClick(View view)
	        {
	            Intent cameraIntent = new Intent(android.provider.MediaStore.ACTION_IMAGE_CAPTURE);
	            // request code

	            startActivityForResult(cameraIntent, CAMERA_PIC_REQUEST);

	        }
	    });

	}

	@Override
	protected void onActivityResult(int requestCode, int resultCode, Intent data) 
	{
	    if( requestCode == CAMERA_PIC_REQUEST)
	    {
	    //  data.getExtras()
	        Bitmap thumbnail = (Bitmap) data.getExtras().get("data");
	        ImageView image =(ImageView) findViewById(R.id.imageView1);
	        image.setImageBitmap(thumbnail);
	        
			
			
			ByteArrayOutputStream baos = new ByteArrayOutputStream();  
			thumbnail.compress(Bitmap.CompressFormat.JPEG, 100, baos); //bm is the bitmap object   
			byte[] b = baos.toByteArray();
			
			String encodedImage = Base64.encodeToString(b, Base64.DEFAULT);
		
			Toast.makeText(MainActivity.this, encodedImage, 5000).show();
	        
	    }
	    else 
	    {
	        Toast.makeText(MainActivity.this, "Picture NOt taken", Toast.LENGTH_LONG);
	    }
	    super.onActivityResult(requestCode, resultCode, data);
	}
	}