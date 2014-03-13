package Utils;

import android.content.Context;
import android.telephony.TelephonyManager;
import android.util.Log;

public class IRTUser {
	private int _id=-1;
	public String IMEI="";
	public String Nume="";
	public String Username="";
	public String Password="";
	public String Nr_tel="";
	public IRTUser()
	{
	}
	public IRTUser(int id,
			String IMEI,
			String Nume,
			String Usernme,
			String Password,
			String Nr_tel)
	{
		this._id=id;
		this.IMEI=IMEI;
		this.Username=Usernme;
		this.Nume=Nume;
		this.Nr_tel=Nr_tel;
		this.Password=Password;
	}
	public String getIMEI(Context context)
	{
		TelephonyManager telephonyManager = (TelephonyManager)context.getSystemService(Context.TELEPHONY_SERVICE);
		String _IMEI=telephonyManager.getDeviceId();
		this.IMEI=_IMEI;
		Log.i("IMEI",_IMEI);
		return _IMEI;
	}
	public int getID()
	{
		return this._id;
	}
	public void setID(int id)
	{
		this._id=id;
	}
}
