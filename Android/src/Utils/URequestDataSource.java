package Utils;

import java.util.ArrayList;
import java.util.List;

import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.SQLException;
import android.database.sqlite.SQLiteDatabase;
import android.util.Log;

public class URequestDataSource {
	//database fields
	private SQLiteDatabase database;
	private IRTDatabaseHelper dbHelper;
	private String[] allColumn={IRTDatabaseHelper.COLUMN_REQUEST_ID,
			IRTDatabaseHelper.COLUMN_REQUEST_IMEI,
			IRTDatabaseHelper.COLUMN_REQUEST_STATUS,
			IRTDatabaseHelper.COLUMN_REQUEST_ECOPOINTS,
			IRTDatabaseHelper.COLUMN_REQUEST_TIP_REQ,
			IRTDatabaseHelper.COLUMN_REQUEST_TIP_DESEU,
			IRTDatabaseHelper.COLUMN_REQUEST_DATA,
			IRTDatabaseHelper.COLUMN_REQUEST_ORA,
			IRTDatabaseHelper.COLUMN_REQUEST_LATITUDINE,
			IRTDatabaseHelper.COLUMN_REQUEST_LONGITUDINE,
			IRTDatabaseHelper.COLUMN_REQUEST_POZA
			};
	public final static String[] DEFAULT_DATA_REQUEST={};
	
	public URequestDataSource(Context context)
	{
		this.dbHelper=new IRTDatabaseHelper(context);
	}
	
	public void open() throws SQLException
	{
		this.database=this.dbHelper.getWritableDatabase();
	}
	//TODO create def requests
//	public Boolean insertDef() throws SQLException
//	{
//		if (DEFAULT_DATA_REQUEST.length==0)
//			return true;
//		Cursor c=this.database.rawQuery("SELECT COUNT(*) FROM "+IRTDatabaseHelper.TABLE_REQUESTS, null);
//		c.moveToFirst();
////		Log.i("RETURN",c.getString(0));
//		int nr=c.getInt(0);
//		c.close();
//		if (nr==0)
//		{
//			for(int i=0;i<DEFAULT_DATA_REQUEST.length;i++)
//			{
//				this.create();
//			}
//			return true;
//		}
//		return false;
//	}
	public void close() 
	{
		this.dbHelper.close();
	}
	
	public int create(URequest req)
	{
		ContentValues values= new ContentValues();
		values.put(IRTDatabaseHelper.COLUMN_REQUEST_IMEI,req.IMEI);
		values.put(IRTDatabaseHelper.COLUMN_REQUEST_STATUS,req.Status);
		values.put(IRTDatabaseHelper.COLUMN_REQUEST_ECOPOINTS,req.Ecopoints);
		values.put(IRTDatabaseHelper.COLUMN_REQUEST_TIP_REQ,req.Tip_req);
		values.put(IRTDatabaseHelper.COLUMN_REQUEST_TIP_DESEU,req.Tip_deseu);
		values.put(IRTDatabaseHelper.COLUMN_REQUEST_DATA,req.Data);
		values.put(IRTDatabaseHelper.COLUMN_REQUEST_ORA,req.Ora);
		values.put(IRTDatabaseHelper.COLUMN_REQUEST_LATITUDINE,req.Latitudine);
		values.put(IRTDatabaseHelper.COLUMN_REQUEST_LONGITUDINE,req.Longitudine);
		values.put(IRTDatabaseHelper.COLUMN_REQUEST_POZA,req.Poza);
		
		int insertID=(int) this.database.insert(IRTDatabaseHelper.TABLE_REQUESTS,
				null, values);
		Log.i("DBOperation", "Insert "+IRTDatabaseHelper.TABLE_REQUESTS+ " with ID="+insertID);
		req.setID(insertID);
		return insertID;
	}
	
	public void delete(URequest req)
	{
		int id=req.getID();
		Log.i("DBOperation", "Delete "+IRTDatabaseHelper.TABLE_REQUESTS+ " with ID="+id);
		database.delete(IRTDatabaseHelper.TABLE_REQUESTS,
				IRTDatabaseHelper.COLUMN_REQUEST_ID+" = "+id,null);
	}
	public void delete(int id)
	{
		Log.i("DBOperation", "Delete "+IRTDatabaseHelper.TABLE_REQUESTS+ " with ID="+id);
		database.delete(IRTDatabaseHelper.TABLE_REQUESTS,
				IRTDatabaseHelper.COLUMN_REQUEST_ID+" = "+id,null);
	}
	public Boolean update(URequest req)
	{
		ContentValues values= new ContentValues();
		values.put(IRTDatabaseHelper.COLUMN_REQUEST_IMEI,req.IMEI);
		values.put(IRTDatabaseHelper.COLUMN_REQUEST_STATUS,req.Status);
		values.put(IRTDatabaseHelper.COLUMN_REQUEST_ECOPOINTS,req.Ecopoints);
		values.put(IRTDatabaseHelper.COLUMN_REQUEST_TIP_REQ,req.Tip_req);
		values.put(IRTDatabaseHelper.COLUMN_REQUEST_TIP_DESEU,req.Tip_deseu);
		values.put(IRTDatabaseHelper.COLUMN_REQUEST_DATA,req.Data);
		values.put(IRTDatabaseHelper.COLUMN_REQUEST_ORA,req.Ora);
		values.put(IRTDatabaseHelper.COLUMN_REQUEST_LATITUDINE,req.Latitudine);
		values.put(IRTDatabaseHelper.COLUMN_REQUEST_LONGITUDINE,req.Longitudine);
		values.put(IRTDatabaseHelper.COLUMN_REQUEST_POZA,req.Poza);
		Log.i("DBOperation", "Update  "+IRTDatabaseHelper.TABLE_REQUESTS+ "  with ID="+req.getID());
		int nr_row_af=database.update(IRTDatabaseHelper.TABLE_REQUESTS,
				values, IRTDatabaseHelper.COLUMN_REQUEST_ID+"="+req.getID(),null);
		return (nr_row_af!=0);
	}
	
	
	public Boolean updateStatus(URequest req)
	{
		ContentValues values= new ContentValues();
		values.put(IRTDatabaseHelper.COLUMN_REQUEST_STATUS,req.Status);
		values.put(IRTDatabaseHelper.COLUMN_REQUEST_ECOPOINTS,req.Ecopoints);
		Log.i("DBOperation", "Update  "+IRTDatabaseHelper.TABLE_REQUESTS+ " status  with ID="+req.getID());
		int nr_row_af=database.update(IRTDatabaseHelper.TABLE_REQUESTS,
				values, IRTDatabaseHelper.COLUMN_REQUEST_ID+"="+req.getID(),null);
		return (nr_row_af!=0);
	}
	
	public List<URequest> getList()
	{
		List<URequest> list= new ArrayList<URequest>();
		
		Cursor cursor= database.query(IRTDatabaseHelper.TABLE_REQUESTS,
				allColumn, null, null, null, null,
						IRTDatabaseHelper.COLUMN_REQUEST_ID +" asc, "+
								IRTDatabaseHelper.COLUMN_REQUEST_STATUS +" asc"		
						);
		cursor.moveToFirst();
		while(!cursor.isAfterLast())
		{
			URequest req= new URequest(
					cursor.getInt(0),
					cursor.getString(1), 
					cursor.getInt(2),
					cursor.getInt(3),
					cursor.getInt(4),
					cursor.getInt(5),
					cursor.getString(6),
					cursor.getString(7), 
					cursor.getFloat(8),
					cursor.getFloat(9),
					cursor.getString(10));
			list.add(req);
			cursor.moveToNext();
		}
		 // make sure to close the cursor
	    cursor.close();
		return list;
	}
	//TODO select diferit
	public List<URequest> getList(int orderByFlag)
	{
		List<URequest> list= new ArrayList<URequest>();
		
		Cursor cursor= database.query(IRTDatabaseHelper.TABLE_REQUESTS,
				allColumn,null, null, null, null,
						IRTDatabaseHelper.COLUMN_REQUEST_ID +" asc,"+
								IRTDatabaseHelper.COLUMN_REQUEST_STATUS +" asc"	
						);
		cursor.moveToFirst();
		while(!cursor.isAfterLast())
		{
			URequest sd= new URequest(
					cursor.getInt(0),
					cursor.getString(1), 
					cursor.getInt(2),
					cursor.getInt(3),
					cursor.getInt(4),
					cursor.getInt(5),
					cursor.getString(6),
					cursor.getString(7), 
					cursor.getFloat(8),
					cursor.getFloat(9),
					cursor.getString(10));
			list.add(sd);
			cursor.moveToNext();
		}
		 // make sure to close the cursor
	    cursor.close();
		return list;
	}
}
