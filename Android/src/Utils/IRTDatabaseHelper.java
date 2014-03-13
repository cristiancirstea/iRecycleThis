package Utils;

import android.content.Context;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;
import android.util.Log;

public class IRTDatabaseHelper extends SQLiteOpenHelper{
	public final static String TABLE_USERS="USERS_IRT";
	public final static String COLUMN_USERS_ID="_id";
	public final static String COLUMN_USERS_IMEI="imei";
	public final static String COLUMN_USERS_USERNAME="user";
	public final static String COLUMN_USERS_NUME="nume";
	public final static String COLUMN_USERS_NR_TEL="nr_tel";
	public final static String COLUMN_USERS_PASSWORD="password_user";
	
	private final static String DATABASE_NAME="IRT.db";
	private final static int DATABASE_VERSION=1;
	
	private static final String DATABASE_CREATE_USERS="create table "
			+ TABLE_USERS + "( " 
			  + COLUMN_USERS_ID + " integer primary key autoincrement, " 
			  + COLUMN_USERS_IMEI + " text not null, " 
			  +COLUMN_USERS_USERNAME +" text, " 
		      +COLUMN_USERS_NUME +" text, " 
			  + COLUMN_USERS_NR_TEL+ " text, "
			  + COLUMN_USERS_PASSWORD+ " text"
		      		+");";
	
	public final static String TABLE_REQUESTS="REQUESTS";
	public final static String COLUMN_REQUEST_ID="_id";
	public final static String COLUMN_REQUEST_IMEI="imei";
	public final static String COLUMN_REQUEST_TIP_REQ="tip_req";
	public final static String COLUMN_REQUEST_STATUS="status";
	public final static String COLUMN_REQUEST_ECOPOINTS="ecop";
	public final static String COLUMN_REQUEST_DATA="data_req";
	public final static String COLUMN_REQUEST_ORA="ora_req";
	public final static String COLUMN_REQUEST_TIP_DESEU="tip_deseu";
	public final static String COLUMN_REQUEST_LATITUDINE="latitudine";
	public final static String COLUMN_REQUEST_LONGITUDINE="longitudine";
	public final static String COLUMN_REQUEST_POZA="poza";
	
	private static final String DATABASE_CREATE_REQUESTS="create table "
			+ TABLE_REQUESTS + "( " 
			  + COLUMN_REQUEST_ID + " integer primary key autoincrement, " 
			  + COLUMN_USERS_IMEI + " text not null, " 
			  +COLUMN_REQUEST_TIP_REQ +" integer, " 
		      +COLUMN_REQUEST_STATUS +" integer, " 
			  + COLUMN_REQUEST_ECOPOINTS+ "integer,"
			  + COLUMN_REQUEST_DATA+ "text,"
			  + COLUMN_REQUEST_ORA+ "text,"
			  + COLUMN_REQUEST_TIP_DESEU+ "integer,"
			  + COLUMN_REQUEST_LATITUDINE+ "real,"
			  + COLUMN_REQUEST_LONGITUDINE+ "real,"
			  + COLUMN_REQUEST_POZA+ "text"
		      		+");";
	
	public IRTDatabaseHelper(Context context) {
	    super(context, DATABASE_NAME, null, DATABASE_VERSION);
	  }

	@Override
	  public void onCreate(SQLiteDatabase database) {
	    database.execSQL(DATABASE_CREATE_USERS);
	    database.execSQL(DATABASE_CREATE_REQUESTS);
	  }
	@Override
	  public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {
	    Log.w(IRTDatabaseHelper.class.getName(),
	        "Upgrading database from version " + oldVersion + " to "
	            + newVersion + ", which will destroy all old data");
	    db.execSQL("DROP TABLE IF EXISTS " + TABLE_REQUESTS);
	    db.execSQL("DROP TABLE IF EXISTS " + TABLE_USERS);
	    onCreate(db);
	  }
}
