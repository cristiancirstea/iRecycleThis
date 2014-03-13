package Utils;

import java.util.ArrayList;
import java.util.List;

import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.SQLException;
import android.database.sqlite.SQLiteDatabase;
import android.util.Log;

public class IRTUserDataSource {
	private SQLiteDatabase database;
	private IRTDatabaseHelper dbHelper;
	private String[] allColumn={IRTDatabaseHelper.COLUMN_USERS_ID,
			IRTDatabaseHelper.COLUMN_USERS_IMEI,
			IRTDatabaseHelper.COLUMN_USERS_NUME,
			IRTDatabaseHelper.COLUMN_USERS_USERNAME,
			IRTDatabaseHelper.COLUMN_USERS_PASSWORD,
			IRTDatabaseHelper.COLUMN_USERS_NR_TEL
			};
	public final static String[] DEFAULT_DATA_REQUEST={};
	
	public IRTUserDataSource(Context context)
	{
		this.dbHelper=new IRTDatabaseHelper(context);
	}
	
	public void open() throws SQLException
	{
		this.database=this.dbHelper.getWritableDatabase();
	}
	public void close() 
	{
		this.dbHelper.close();
	}
	
	public int create(IRTUser user)
	{
		ContentValues values= new ContentValues();
		values.put(IRTDatabaseHelper.COLUMN_USERS_IMEI,user.IMEI);
		values.put(IRTDatabaseHelper.COLUMN_USERS_NUME,user.Nume);
		values.put(IRTDatabaseHelper.COLUMN_USERS_USERNAME,user.Username);
		values.put(IRTDatabaseHelper.COLUMN_USERS_PASSWORD,user.Password);
		values.put(IRTDatabaseHelper.COLUMN_USERS_NR_TEL,user.Nr_tel);
		
		int insertID=(int) this.database.insert(IRTDatabaseHelper.TABLE_USERS,
				null, values);
		Log.i("DBOperation", "Insert "+IRTDatabaseHelper.TABLE_USERS+ " with ID="+insertID);
		user.setID(insertID);
		return insertID;
	}
	public IRTUser getById(int id)
	{
		IRTUser user=null;
		Cursor cursor= database.query(IRTDatabaseHelper.TABLE_USERS,
				allColumn, IRTDatabaseHelper.COLUMN_USERS_ID+" = "+id, null, null, null,
						null	
						);
		cursor.moveToFirst();
		while(!cursor.isAfterLast())
		{
			user= new IRTUser(
					cursor.getInt(0),
					cursor.getString(1), 
					cursor.getString(2), 
					cursor.getString(3), 
					cursor.getString(4), 
					cursor.getString(5));
			cursor.moveToNext();
		}
		 // make sure to close the cursor
	    cursor.close();
		return user;
	}
	public IRTUser getByUserName(String username)
	{
		IRTUser user=null;
		Cursor cursor= database.query(IRTDatabaseHelper.TABLE_USERS,
				allColumn, IRTDatabaseHelper.COLUMN_USERS_USERNAME+" = "+username, 
					null, null, null,null	
						);
		cursor.moveToFirst();
		while(!cursor.isAfterLast())
		{
			user= new IRTUser(
					cursor.getInt(0),
					cursor.getString(1), 
					cursor.getString(2), 
					cursor.getString(3), 
					cursor.getString(4), 
					cursor.getString(5));
			cursor.moveToNext();
		}
		 // make sure to close the cursor
	    cursor.close();
		return user;
	}
	public IRTUser getByName(String name)
	{
		IRTUser user=null;
		Cursor cursor= database.query(IRTDatabaseHelper.TABLE_USERS,
				allColumn, IRTDatabaseHelper.COLUMN_USERS_NUME+" = "+name, 
					null, null, null,null	
						);
		cursor.moveToFirst();
		while(!cursor.isAfterLast())
		{
			user= new IRTUser(
					cursor.getInt(0),
					cursor.getString(1), 
					cursor.getString(2), 
					cursor.getString(3), 
					cursor.getString(4), 
					cursor.getString(5));
			cursor.moveToNext();
		}
		 // make sure to close the cursor
	    cursor.close();
		return user;
	}
	public void delete(IRTUser user)
	{
		int id=user.getID();
		Log.i("DBOperation", "Delete "+IRTDatabaseHelper.TABLE_USERS+ " with ID="+id);
		database.delete(IRTDatabaseHelper.TABLE_USERS,
				IRTDatabaseHelper.COLUMN_USERS_ID+" = "+id,null);
	}
	public void delete(int id)
	{
		Log.i("DBOperation", "Delete "+IRTDatabaseHelper.TABLE_USERS+ " with ID="+id);
		database.delete(IRTDatabaseHelper.TABLE_USERS,
				IRTDatabaseHelper.COLUMN_USERS_ID+" = "+id,null);
	}
	public Boolean update(IRTUser user)
	{
		ContentValues values= new ContentValues();
		values.put(IRTDatabaseHelper.COLUMN_USERS_IMEI,user.IMEI);
		values.put(IRTDatabaseHelper.COLUMN_USERS_NUME,user.Nume);
		values.put(IRTDatabaseHelper.COLUMN_USERS_USERNAME,user.Username);
		values.put(IRTDatabaseHelper.COLUMN_USERS_PASSWORD,user.Password);
		values.put(IRTDatabaseHelper.COLUMN_USERS_NR_TEL,user.Nr_tel);
		
		Log.i("DBOperation", "Update  "+IRTDatabaseHelper.TABLE_USERS+ "  with ID="+user.getID());
		int nr_row_af=database.update(IRTDatabaseHelper.TABLE_USERS,
				values, IRTDatabaseHelper.COLUMN_USERS_ID+"="+user.getID(),null);
		return (nr_row_af!=0);
	}
	public List<IRTUser> getList()
	{
		List<IRTUser> list= new ArrayList<IRTUser>();
		
		Cursor cursor= database.query(IRTDatabaseHelper.TABLE_USERS,
				allColumn, null, null, null, null,
						IRTDatabaseHelper.COLUMN_USERS_ID +" asc "	
						);
		cursor.moveToFirst();
		while(!cursor.isAfterLast())
		{
			IRTUser user= new IRTUser(
					cursor.getInt(0),
					cursor.getString(1), 
					cursor.getString(2), 
					cursor.getString(3), 
					cursor.getString(4), 
					cursor.getString(5));
			list.add(user);
			cursor.moveToNext();
		}
		 // make sure to close the cursor
	    cursor.close();
		return list;
	}
}
