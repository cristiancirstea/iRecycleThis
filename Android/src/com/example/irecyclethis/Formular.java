package com.example.irecyclethis;

import java.io.ByteArrayOutputStream;
import java.util.ArrayList;
import java.util.List;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.HttpClient;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.protocol.HTTP;
import org.apache.http.util.EntityUtils;

import Utils.WSUtils;
import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.graphics.Bitmap;
import android.location.Location;
import android.location.LocationListener;
import android.location.LocationManager;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.os.Bundle;
import android.os.Handler;
import android.text.InputType;
import android.util.Base64;
import android.util.Log;
import android.view.Menu;
import android.view.View;
import android.view.inputmethod.InputBinding;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.Toast;

public class Formular extends Activity {
	
	int tipMaterial;
	int CAMERA_PIC_REQUEST = 1337;
	Bitmap photo = null;
	double longitude;
	double latitude;
	
	
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		overridePendingTransition(R.anim.fadein, R.anim.fadeout);
		setContentView(R.layout.activity_formular);
		
		//porneste GPS
		GPS();
		
		//preia tip material
		Intent intent = new Intent();
		intent = getIntent();
		tipMaterial = intent.getIntExtra("tipMaterial", -1);
		
		Nume = (EditText)findViewById(R.id.editText1);
		Numar = (EditText)findViewById(R.id.editText2);
		
		Numar.setSingleLine();
		Nume.setSingleLine();
		//Numar.setInputType(InputType.TYPE_NUMBER_FLAG_DECIMAL);
		//Nume.getKeyListener();
		
		//Toast.makeText(this, "Tip material:" + tipMaterial, Toast.LENGTH_SHORT).show();
	}

	@Override
	public boolean onCreateOptionsMenu(Menu menu) {
		// Inflate the menu; this adds items to the action bar if it is present.
		getMenuInflater().inflate(R.menu.formular, menu);
		return true;
	}
	
	public void TakePhoto(View v){
		Intent cameraIntent = new Intent(android.provider.MediaStore.ACTION_IMAGE_CAPTURE);
        startActivityForResult(cameraIntent, CAMERA_PIC_REQUEST);
	}
	
	@Override
	protected void onActivityResult(int requestCode, int resultCode, Intent data) 
	{
	    if( requestCode == CAMERA_PIC_REQUEST)
	    {
	    //  data.getExtras()if (resultCode == Activity.RESULT_OK
	    	if(resultCode == Activity.RESULT_OK){	    	
	        Bitmap thumbnail = (Bitmap) data.getExtras().get("data");
	        ImageView image =(ImageView) findViewById(R.id.imageView1);
	        image.setImageBitmap(thumbnail); 
	        photo = thumbnail;
	    	}
	        
	    }
	    else 
	    {
	        Toast.makeText(Formular.this, "Picture NOT taken", Toast.LENGTH_LONG);
	    }
	    super.onActivityResult(requestCode, resultCode, data);
	}
	
	
	LocationListener locationListener;
	LocationManager locationManager;
	String locationProvider;
	Location lastKnownLocation;
	
	public void GPS(){
		//Toast.makeText(Formular.this, "Heloo", Toast.LENGTH_LONG).show();
		
		locationManager = (LocationManager) this.getSystemService(Context.LOCATION_SERVICE);
		locationProvider = LocationManager.GPS_PROVIDER;
		lastKnownLocation = locationManager.getLastKnownLocation(locationProvider);
		
		locationListener = new LocationListener() {
		    
			public void onLocationChanged(Location location) {
		     // Called when a new location is found by the network location provider.
		     // makeUseOfNewLocation(location);
			Location lastKnownLocation1 = locationManager.getLastKnownLocation(locationProvider);
			boolean witch = isBetterLocation(location, lastKnownLocation1);
			
			Location bestLocation;
			if(witch == true)
				bestLocation = location;
			else
				bestLocation = lastKnownLocation1;
			
			latitude = bestLocation.getLatitude();
			longitude = bestLocation.getLongitude();
			
			}

		    public void onStatusChanged(String provider, int status, Bundle extras) {}

		    public void onProviderEnabled(String provider) {}

		    public void onProviderDisabled(String provider) {}
		 };
			 locationManager.requestLocationUpdates(LocationManager.NETWORK_PROVIDER, 0, 0, locationListener);
		 
		
	}
	
	private static final int TWO_MINUTES = 1000 * 60 * 2;

	protected boolean isBetterLocation(Location location, Location currentBestLocation) {
	    if (currentBestLocation == null) {
	        // A new location is always better than no location
	        return true;
	    }

	    // Check whether the new location fix is newer or older
	    long timeDelta = location.getTime() - currentBestLocation.getTime();
	    boolean isSignificantlyNewer = timeDelta > TWO_MINUTES;
	    boolean isSignificantlyOlder = timeDelta < -TWO_MINUTES;
	    boolean isNewer = timeDelta > 0;

	    // If it's been more than two minutes since the current location, use the new location
	    // because the user has likely moved
	    if (isSignificantlyNewer) {
	        return true;
	    // If the new location is more than two minutes older, it must be worse
	    } else if (isSignificantlyOlder) {
	        return false;
	    }

	    // Check whether the new location fix is more or less accurate
	    int accuracyDelta = (int) (location.getAccuracy() - currentBestLocation.getAccuracy());
	    boolean isLessAccurate = accuracyDelta > 0;
	    boolean isMoreAccurate = accuracyDelta < 0;
	    boolean isSignificantlyLessAccurate = accuracyDelta > 200;

	    // Check if the old and new location are from the same provider
	    //boolean isFromSameProvider = isSameProvider(location.getProvider(),
	    //        currentBestLocation.getProvider());

	    // Determine location quality using a combination of timeliness and accuracy
	    if (isMoreAccurate) {
	        return true;
	    } else if (isNewer && !isLessAccurate) {
	        return true;
	    }
	    return false;
	}
	
	public boolean isNetworkOnline(){
		boolean status = false;
		try{
			ConnectivityManager cm = (ConnectivityManager) getSystemService(Context.CONNECTIVITY_SERVICE);
			NetworkInfo netInfo = cm.getNetworkInfo(0);
			if(netInfo != null && netInfo.getState() == NetworkInfo.State.CONNECTED){
				status = true;
			}else{
				netInfo = cm.getNetworkInfo(1);
				if(netInfo != null && netInfo.getState() == NetworkInfo.State.CONNECTED)
						status= true;
			}
			
		}catch(Exception e){
			e.printStackTrace();
			return false;
		}
		return status;
	}
	
	
	
	String nume;
	String numar;
	String encodedImage;
	private Handler mHandler;
	EditText Nume ;
	EditText Numar;
	
	//static String count = "";
	
	public void Send(View v){
		//strangere si trimitere date
		//EditText Nume = (EditText)findViewById(R.id.editText1);
		//EditText Numar = (EditText)findViewById(R.id.editText2);
		
		mHandler = new Handler();
		
		if(isNetworkOnline() == false){
			Toast.makeText(Formular.this, "Please connect to internet!", Toast.LENGTH_LONG).show();
		}else{
		
		locationManager.removeUpdates(locationListener);
		
		//!!!! MODIFICA
		/*
		nume = Nume.getText().toString();
		numar = Numar.getText().toString();
		*/
		
		nume = "testing";
		numar += "*";
		
		//Toast.makeText(Formular.this, latitude+"", Toast.LENGTH_LONG).show();
		
		
		boolean check = true;
		
		try{
			Integer.parseInt(numar);
		}catch(NumberFormatException e){
			check = false;
		}
		
		
		if(photo == null || nume == null || numar == null || check == false){
			if(photo == null) 
					Toast.makeText(Formular.this, "Please take a photo!", Toast.LENGTH_LONG).show();
			else
				if(nume.matches(""))
					Toast.makeText(Formular.this, "Please insert a name!", Toast.LENGTH_LONG).show();
				else
					//if(numar == null)
						Toast.makeText(Formular.this, "Please insert number!", Toast.LENGTH_LONG).show();
					//else
						//Toast.makeText(Formular.this, "Please insert a number!", Toast.LENGTH_LONG).show();
		}
		
		else{
		
		ByteArrayOutputStream baos = new ByteArrayOutputStream();  
		photo.compress(Bitmap.CompressFormat.JPEG, 100, baos);   
		byte[] b = baos.toByteArray();
		encodedImage = Base64.encodeToString(b, Base64.DEFAULT);
	
		
		
new Thread(new Runnable() {
			
			@Override
			public void run() {
			
				try {
			        HttpClient client = new DefaultHttpClient();  
			       // String postURL = "http://192.168.222.151/ws/sendPicture.php";
			 
			        HttpPost post = new HttpPost(WSUtils.WS_URL); 
			 
			            List<NameValuePair> param = new ArrayList<NameValuePair>();
			 
			            param.add(new BasicNameValuePair("method", "SaveInregistrare"));
				        param.add(new BasicNameValuePair("Nume", nume));
				        param.add(new BasicNameValuePair("Numar", numar+""));
				        param.add(new BasicNameValuePair("latitude", latitude+""));
				        param.add(new BasicNameValuePair("longitude", longitude+""));
				        param.add(new BasicNameValuePair("tip", tipMaterial+""));
				        param.add(new BasicNameValuePair("photo", encodedImage));
				        param.add(new BasicNameValuePair("urq", "android"));
				        param.add(new BasicNameValuePair("prq", "a"));
				        param.add(new BasicNameValuePair("trq", "json"));
			            UrlEncodedFormEntity ent = new UrlEncodedFormEntity(param, HTTP.UTF_8);
			            post.setEntity(ent);
			 
			            HttpResponse responsePOST = client.execute(post);  
			            HttpEntity rasp_entity= responsePOST.getEntity();  
			            Toast.makeText(Formular.this, EntityUtils.toString(rasp_entity), Toast.LENGTH_LONG).show();
			            
			            if (rasp_entity!= null) {    
			                Log.i("RESPONSE",EntityUtils.toString(rasp_entity));
			                //Toast.makeText(Formular.this, EntityUtils.toString(rasp_entity), Toast.LENGTH_LONG).show();
			            }
			    } catch (Exception e) {
			        e.printStackTrace();
			    }
			}
		}).start();

Toast.makeText(Formular.this, "Congratulations!", Toast.LENGTH_LONG).show();

mHandler.postDelayed(new Runnable() {
     public void run() {
    	 ;
     }
 }, 5000);
	

	//Toast.makeText(Formular.this, "Congratulations!", Toast.LENGTH_LONG).show();
	
	//Intent felicitari = new Intent (Formular.this, Felicitari.class);
	//1startActivity (felicitari);
	
	
	finish();
		}}
	}

}
