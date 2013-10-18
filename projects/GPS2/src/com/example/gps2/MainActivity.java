package com.example.gps2;

import android.app.Activity;
import android.content.Context;
import android.location.Location;
import android.location.LocationListener;
import android.location.LocationManager;
import android.os.Bundle;
import android.view.Menu;
import android.widget.TextView;

public class MainActivity extends Activity {

	TextView text2;
	TextView text3;
	TextView text4;
	TextView text1;
	boolean goodenough = false;
	
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_main);
		
		final LocationManager locationManager = (LocationManager) this.getSystemService(Context.LOCATION_SERVICE);
		final String locationProvider = LocationManager.GPS_PROVIDER;
		Location lastKnownLocation = locationManager.getLastKnownLocation(locationProvider);
		
		text2 = (TextView)findViewById(R.id.textView2);
		text2.setText(lastKnownLocation.getLatitude()+"");
		text3 = (TextView)findViewById(R.id.textView3);
		text3.setText(lastKnownLocation.getLongitude()+"");
	    text4 = (TextView)findViewById(R.id.text_GPS_Coordinates);
	    text1 = (TextView)findViewById(R.id.textView1);
		
		LocationListener locationListener = new LocationListener() {
		    
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
			
			//TextView text2 = (TextView)findViewById(R.id.textView2);
			text2.setText(bestLocation.getLatitude()+"");
			//TextView text3 = (TextView)findViewById(R.id.textView3);
			text3.setText(bestLocation.getLongitude()+"");
			text4.setText(bestLocation.getAccuracy()+"");
		    //pus si sTOP!!
			
			if(bestLocation.getAccuracy() <= 10){
				goodenough = true;
			}
			}

		    public void onStatusChanged(String provider, int status, Bundle extras) {}

		    public void onProviderEnabled(String provider) {}

		    public void onProviderDisabled(String provider) {}
		 };
		 
		 if(goodenough){
			 locationManager.removeUpdates(locationListener);
			 text1.setText("S-a ajuns la acuratetea dorita!");
		 }
		 else{
			 locationManager.requestLocationUpdates(LocationManager.NETWORK_PROVIDER, 0, 0, locationListener);
		 }
	}

	@Override
	public boolean onCreateOptionsMenu(Menu menu) {
		// Inflate the menu; this adds items to the action bar if it is present.
		getMenuInflater().inflate(R.menu.main, menu);
		return true;
	}
	

	
	private static final int TWO_MINUTES = 1000 * 60 * 2;

	/** Determines whether one Location reading is better than the current Location fix
	  * @param location  The new Location that you want to evaluate
	  * @param currentBestLocation  The current Location fix, to which you want to compare the new one
	  */
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
	    }// else if (isNewer && !isSignificantlyLessAccurate && isFromSameProvider) {
	       // return true;
	    //}
	    return false;
	}

}
