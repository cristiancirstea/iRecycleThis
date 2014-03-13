package Utils;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.List;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.HttpClient;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.utils.URLEncodedUtils;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.message.BasicNameValuePair;

import android.annotation.SuppressLint;
import android.content.Context;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.os.AsyncTask;
import android.util.Log;
import android.widget.Toast;

/**
 * @author Cristi_m
 *
 */
public class WSUtils {
	public final static String WS_URL="http://44.168.0.126/webservice/service/pictures"; 
//	public final static String WS_URL="http://192.168.1.101/ws_jg/service"; 
	public final static int WS_TIMEOUT_TEST=2000;
	public final static String EXTRA_MESSAGE="com.example.jurnalgold";
	public static Boolean IsLoading=false;
	public String ReturnedText="";
//	private String MethodCallBackName="";
	private Object classObj;
	//with ArrayList TODO
	public String []  MCBParamsNames;
	public String []  MCBParamsValues;
	private Boolean CanConnect=false;
	
	public WSUtils()
	{
		
	}
	
	public WSUtils(Object classObject)
	{
		classObj=classObject;
		CanConnect= testConnection((Context) classObject);
	}
	public void setClassObject(Object classObject)
	{
		classObj=classObject;
	}
	public void getResponse(String URI,String Method)
	{
		if (!CanConnect)
			return;
		try
		{
			IsLoading=true;
			new LongOperation().execute("get",URI,Method);
			
		}
		catch (Exception e )
		{
			
		}
	}
	public void post(String URI,String Method)
	{
		if (!CanConnect)
			return;
		try
		{
			IsLoading=true;
			new LongOperation().execute("post",URI,Method);
			
		}
		catch (Exception e )
		{
			
		}
	}
	private class LongOperation extends AsyncTask<String, Void, String> {
		private String MethodCallBackName="";
		@Override
	      protected String doInBackground(String... params) {
	        String returned="";
	        try {
	        	MethodCallBackName=params[2];
	        	//for (String s:params)
	        		Log.i("Method",params[0]);
	        		Log.i("URI",params[1]);
	        		Log.i("MethodCallback",params[2]);
	        	if (params[0].equalsIgnoreCase("get"))
	        		returned = WS_Get(params[1],MCBParamsNames,MCBParamsValues);
	        	else
	        		if (params[0].equalsIgnoreCase("post"))
	        			returned=WS_Post(params[1],MCBParamsNames,MCBParamsValues);
	        } catch (Exception e) {
	            // TODO Auto-generated catch block
	            e.printStackTrace();
	        }
	            return returned;
	      }      

	      @SuppressLint("NewApi")
		@Override
	      protected void onPostExecute(String result) {
	    	  ReturnedText=result;
	    	  if (MethodCallBackName.isEmpty())
	    		  return;
	    	  Method methodCallBack=null;
	    	  try{
	    		  IsLoading=false;
	    		  methodCallBack= classObj.getClass().getDeclaredMethod(MethodCallBackName,String.class);
	    	  }
	    	  catch(SecurityException e){
	    		  Log.i("ERROR",e.toString());
	    	  }
	    	  catch(NoSuchMethodException e){

	    		  Log.i("ERROR",e.toString());
	    	  }
	    	  
	    	  try{
	    		  
	    			  methodCallBack.invoke(classObj, result);
	    			  Log.i("RETURN", methodCallBack.toString());
	    	  }
	    	  catch (IllegalArgumentException e) {

	    		  Log.i("ERROR",e.toString());
	    	  } 
	    	  catch (IllegalAccessException e) {

	    		  Log.i("ERROR",e.toString());
	    	  } 
	    	  catch (InvocationTargetException e) {

	    		  Log.i("ERROR",e.toString());
	    	  }
	      }
	}
	private String WS_Get(String URI,String[] params,String [] values)
	{	
		String message="";
		 HttpClient httpclient = new DefaultHttpClient();
		    //HttpGet httpget = new HttpGet(WS_URL+URI);

		    try {
		        // Add your data
		        List<NameValuePair> nameValuePairs = new ArrayList<NameValuePair>(2);
		        if (params!=null)
		        {
			        for (int i=0;i<params.length;i++)
			        {
			        	nameValuePairs.add(new BasicNameValuePair(params[i],values[i]));
			        	Log.i("Param=Value",params[i]+"="+values[i]);
			        }
		        }
		        String paramString = URLEncodedUtils.format(nameValuePairs, "utf-8");
		        HttpGet httpget = new HttpGet(WS_URL+URI+"?"+paramString);
		       // httppost.setEntity(new UrlEncodedFormEntity(nameValuePairs));

		        // Execute HTTP Post Request
		        HttpResponse response = httpclient.execute(httpget);	
		        HttpEntity entity = response.getEntity();

		        // json is UTF-8 by default
		        BufferedReader reader = new BufferedReader(new InputStreamReader(entity.getContent(), "UTF-8"), 8);
		        StringBuilder sb = new StringBuilder();
		        
		        String line = null;
		        while ((line = reader.readLine()) != null)
		        {
		            sb.append(line + "\n");
		        }
		        Log.i("WSReturn",sb.toString());
		        return sb.toString();
		    } catch (ClientProtocolException e) {
//		        // TODO Auto-generated catch block
		    	return (String)message;
		    	
		    } catch (IOException e) {
		        // TODO Auto-generated catch block
		    	return (String)message;
		    }
	}
	private String WS_Post(String URI,String[] params,String [] values)
	{	
		String message="";
		 HttpClient httpclient = new DefaultHttpClient();
		  HttpPost httppost = new HttpPost(WS_URL+URI);

		    try {
		        // Add your data
		        List<NameValuePair> nameValuePairs = new ArrayList<NameValuePair>(2);
		        if (params!=null)
		        {
			        for (int i=0;i<params.length;i++)
			        {
			        	nameValuePairs.add(new BasicNameValuePair(params[i],values[i]));
			        	Log.i("Param=Value",params[i]+"="+values[i]);
			        }
		        }
		        httppost.setEntity(new UrlEncodedFormEntity(nameValuePairs));

		        // Execute HTTP Post Request
		        HttpResponse response = httpclient.execute(httppost);
		        HttpEntity entity = response.getEntity();

		        // json is UTF-8 by default
		        BufferedReader reader = new BufferedReader(new InputStreamReader(entity.getContent(), "UTF-8"), 8);
		        StringBuilder sb = new StringBuilder();
		        
		        String line = null;
		        while ((line = reader.readLine()) != null)
		        {
		            sb.append(line + "\n");
		        }
		        Log.i("WSReturn",sb.toString());
		        return sb.toString();
		    } catch (ClientProtocolException e) {
//		        // TODO Auto-generated catch block
		    	return (String)message;
		    	
		    } catch (IOException e) {
		        // TODO Auto-generated catch block
		    	return (String)message;
		    }
	}
//TODO test if WebService is reachable
	public Boolean testConnection(Context c)
	{
		try{
			ConnectivityManager connMgr = (ConnectivityManager) 
				c.getSystemService(Context.CONNECTIVITY_SERVICE);
		    NetworkInfo networkInfo = connMgr.getActiveNetworkInfo();
		    if (networkInfo != null && networkInfo.isConnected()) 
		    {
		    	return true;
		    }
		    else
		    {
		    	Log.i("Connection Error","Not connected to a network");
		    	Toast.makeText(c, "Please connect to a network!", Toast.LENGTH_LONG).show();
				return false;
		    }
		}
		catch (Exception e)
		{
			Log.i("ConnErr",e.toString());
			e.printStackTrace();
			return false;
		}
	}
	
}
