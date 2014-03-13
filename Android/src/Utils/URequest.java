package Utils;

import android.annotation.SuppressLint;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.GregorianCalendar;

public class URequest {
	private int _id=-1;
	public String IMEI;
	public int Status=0;
	public int Ecopoints=0;
	public int Tip_req=-1;
	public int Tip_deseu=-1;
	public String Data;
	public String Ora;
	public float Longitudine=0;
	public float Latitudine=0;
	public String Poza="";
	public final static String DATE_FORMAT ="dd.MM.YYYY";
	public final static String HOUR_FORMAT ="HH:mm";
	
	@SuppressLint("SimpleDateFormat")
	public URequest()
	{
		Calendar cal = new GregorianCalendar();
		SimpleDateFormat df = new SimpleDateFormat(DATE_FORMAT);
		this.Data = df.format(cal.getTime());
		this.Ora=df.format(cal);
	}
	public URequest(int id,
			String IMEI,
			int status,
			int ecopoints,
			int tip_req,
			int tip_deseu,
			String data,
			String ora,
			float longitudine,
			float latitudine,
			String poza)
	{
		this._id=id;
		this.IMEI=IMEI;
		this.Status=status;
		this.Ecopoints=ecopoints;
		this.Tip_req=tip_req;
		this.Tip_deseu=tip_deseu;
		this.Data=data;
		this.Ora=ora;
		this.Longitudine=longitudine;
		this.Latitudine=latitudine;
		this.Poza=poza;
	}
	public URequest(
			String IMEI,
			int status,
			int ecopoints,
			int tip_req,
			int tip_deseu,
			String data,
			String ora,
			float longitudine,
			float latitudine,
			String poza)
	{
		this._id=-1;
		this.IMEI=IMEI;
		this.Status=status;
		this.Ecopoints=ecopoints;
		this.Tip_req=tip_req;
		this.Tip_deseu=tip_deseu;
		this.Data=data;
		this.Ora=ora;
		this.Longitudine=longitudine;
		this.Latitudine=latitudine;
		this.Poza=poza;
	}
	//id
	public int getID()
	{
		return this._id;
	}
	public void setID(int value)
	{
		if (value>0)
			this._id=value;
		else
			this._id=-1;
	}
}
