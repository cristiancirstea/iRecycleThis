package campus.rush.thegame;

import java.util.ArrayList;



import android.app.Activity;
import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Paint;
import android.graphics.drawable.BitmapDrawable;
import android.hardware.Sensor;
import android.hardware.SensorEvent;
import android.hardware.SensorEventListener;
import android.hardware.SensorManager;
import android.os.Bundle;
import android.os.CountDownTimer;
import android.view.Display;
import android.view.Menu;
import android.view.SurfaceHolder;
import android.view.SurfaceHolder.Callback;
import android.view.SurfaceView;
import android.view.WindowManager;

public class Joc extends Activity implements SensorEventListener {

	//matrici initializate
	int[][] Matrix;
	int manx, many;//pozitie in matrice omulet - incepe de la 0
	int fantom1x, fantom1y, fantom2x, fantom2y, fantom3x, fantom3y, fantom0x, fantom0y;
	
	//matrici
	
	int[][] MatrixParter = 
		   {{ 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2},
			{ 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2},
			{ 2, 0, 2, 2, 0, 0, 2, 2, 0, 2, 0, 2, 0, 0, 2, 2, 0, 0, 0, 2},
			{ 2, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 3, 0, 0, 2, 0, 2},
			{ 2, 0, 0, 0, 2, 2, 2, 2, 0, 0, 2, 2, 0, 0, 0, 0, 2, 2, 0, 2},
			{ 2, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 2, 2, 2, 0, 0, 2, 0, 0, 2},
			{ 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 2, 2, 0, 0, 2},
			{ 2, 0, 0, 0, 0, 0, 2, 2, 2, 4, 2, 0, 0, 2, 0, 2, 0, 0, 2, 2},
			{ 2, 0, 0, 2, 0, 2, 2, 0, 0, 0, 2, 2, 0, 2, 0, 0, 0, 0, 0, 2},
			{ 2, 0, 0, 2, 0, 0, 0, 0, 0, 0, 5, 0, 0, 2, 2, 2, 0, 2, 2, 2},
			{ 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2},
			{ 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 2}};
	
	int[][] MatrixEtaj1 = 
		    {{ 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2},
			{ 2, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 2},
			{ 2, 0, 2, 2, 0, 0, 0, 0, 2, 2, 2, 2, 0, 0, 0, 0, 2, 2, 0, 2},
			{ 2, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 2},
			{ 2, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 2},
			{ 2, 0, 2, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 2, 0, 2},
			{ 2, 0, 2, 0, 0, 2, 2, 0, 2, 3, 4, 2, 0, 2, 2, 0, 0, 2, 0, 2},
			{ 2, 0, 0, 0, 2, 2, 0, 0, 0, 5, 0, 0, 0, 0, 2, 2, 0, 0, 0, 2},
			{ 2, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 2},
			{ 2, 0, 2, 2, 0, 0, 0, 0, 2, 2, 2, 2, 0, 0, 0, 0, 2, 2, 0, 2},
			{ 2, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 2},
			{ 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 2}};
	
	int[][] MatrixEtaj2 = {{ 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2},
			{ 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2},
			{ 2, 0, 0, 2, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 2, 2, 0, 0, 2},
			{ 2, 2, 0, 2, 0, 0, 2, 2, 2, 2, 2, 2, 2, 0, 0, 2, 2, 2, 0, 2},
			{ 2, 0, 0, 2, 0, 2, 2, 0, 0, 0, 2, 0, 2, 0, 0, 2, 2, 2, 0, 2},
			{ 2, 0, 2, 2, 0, 2, 2, 0, 3, 4, 5, 0, 2, 2, 2, 2, 2, 0, 0, 2},
			{ 2, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 0, 0, 2},
			{ 2, 2, 0, 2, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 2},
			{ 2, 0, 0, 2, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 2, 2, 2, 0, 2},
			{ 2, 0, 2, 2, 2, 2, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2},
			{ 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2},
			{ 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 2}};
	
	int[][] MatrixEtaj3 =
		   {{ 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2},
			{ 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2},
			{ 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2},
			{ 2, 0, 2, 0, 0, 2, 2, 2, 0, 2, 0, 0, 0, 2, 0, 0, 0, 2, 0, 2},
			{ 2, 0, 2, 0, 0, 2, 0, 2, 0, 2, 0, 0, 0, 2, 0, 0, 0, 2, 0, 2},
			{ 2, 0, 2, 0, 0, 2, 2, 2, 3, 4, 2, 5, 2, 6, 2, 0, 2, 0, 0, 2},
			{ 2, 0, 2, 0, 0, 2, 0, 0, 0, 0, 2, 0, 2, 0, 2, 0, 2, 0, 0, 2},
			{ 2, 0, 2, 0, 0, 2, 0, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 2},
			{ 2, 0, 2, 0, 0, 2, 0, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 2},
			{ 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2},
			{ 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2},
			{ 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 2}};
	
	
	
	//nivelul care se joaca (nivel curent)
	int nivel;
	int mort= 0;
	int castig = 0;
	
	//initializare bitmap
	int width;
	int height;
	
	Bitmap manb;
	Bitmap wall;
	Bitmap freepb;
	Bitmap freee1b;
	Bitmap freee2b;
	Bitmap freee3b;
	
	Bitmap bonus0b;
	Bitmap bonus1b;
	Bitmap bonus2b;
	
	//parter
	Bitmap ghostp1b;
	Bitmap ghostp2b;
	Bitmap ghostp3b;
	
	//etaj 1
	Bitmap ghoste11b;
	Bitmap ghoste12b;
	Bitmap ghoste13b;
	
	//etaj 2
	Bitmap ghoste21b;
	Bitmap ghoste22b;
	Bitmap ghoste23b;
	
	//etaj 3
	Bitmap ghoste31b;
	Bitmap ghoste32b;
	Bitmap ghoste33b;
	Bitmap ghoste30b;
	
	BitmapDrawable man;
	BitmapDrawable wall1;
	BitmapDrawable freep;
	BitmapDrawable freee1;
	BitmapDrawable freee2;
	BitmapDrawable freee3;
	
	
	
	BitmapDrawable bonus0;
	BitmapDrawable bonus1;
	BitmapDrawable bonus2;
	
	//parter
	BitmapDrawable ghostp1;
	BitmapDrawable ghostp2;
	BitmapDrawable ghostp3;
	
	//etaj 1
	BitmapDrawable ghoste11;
	BitmapDrawable ghoste12;
	BitmapDrawable ghoste13;
	
	//etaj 2
	BitmapDrawable ghoste21;
	BitmapDrawable ghoste22;
	BitmapDrawable ghoste23;
	
	//etaj 3
	BitmapDrawable ghoste31;
	BitmapDrawable ghoste32;
	BitmapDrawable ghoste33;
	BitmapDrawable ghoste30;
		
	Bitmap resizedwall;
	Bitmap resizedfreep; 
	Bitmap resizedfreee1;
	Bitmap resizedfreee2;
	Bitmap resizedfreee3;
	Bitmap resizedman;
	
	//parter
	Bitmap resizedghostp1;
	Bitmap resizedghostp2;
	Bitmap resizedghostp3;
	
	//etaj 1
	Bitmap resizedghoste11;
	Bitmap resizedghoste12;
	Bitmap resizedghoste13;
		
	//etaj 2
	Bitmap resizedghoste21;
	Bitmap resizedghoste22;
	Bitmap resizedghoste23;
	
	//etaj 3
	Bitmap resizedghoste31;
	Bitmap resizedghoste32;
	Bitmap resizedghoste33;
	Bitmap resizedghoste30;	
	
	//initializare desen
	SurfaceView surface;
	SurfaceHolder holder;
	Paint paint;
	
	//initializari pt matrice
	int nrx = 20;
	int nry = 12;
	int square1;
	int square2;
	int square;
	
	float extrax ;
	float extray ;
	
	int dimx = nrx - 1;
	int dimy = nry - 1;
	
	int[][] matrixcopy = new int[nry][nrx];
	
	//accelerometru
	SensorManager sensorManager;
	float accx, accy, accz;
	int step;
	int nextstep;
	
	Intent intent;
	//Intent film;
	
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_joc);
		System.gc();
		//nu uita sa intorci raspuns la final cu setResult pt alegere nivel
		//nu uita de setResult si ytrimis nivel pt intent filmulet
		//la inceput initializare matrici
		
		 
		System.out.println("Prim - oncreate");
		
		intent = getIntent();
		nivel = intent.getIntExtra("nivel", 0);	//nivelul la care se joaca 4-parter, 1,2,3 respectiv etaj
		
		System.out.println(" nivel: " + nivel);
		
		//alegere matrice in fc de nivel
		
		if (nivel == 4)
			{Matrix = MatrixParter;
			fantom3x = 3;
			fantom3y = 14;
			fantom2x = 7; 
			fantom2y = 9;
			fantom1x = 9;
			fantom1y = 10;
			}
		if (nivel == 1)
			{Matrix = MatrixEtaj1;
			fantom3x = 6;
			fantom3y = 9; 
			fantom2x = 6; 
			fantom2y = 10;
			fantom1x = 7;
			fantom1y = 9;
			}
		if (nivel == 2)
			{Matrix = MatrixEtaj2;
			fantom3x = 5;
			fantom3y = 8; 
			fantom2x = 5; 
			fantom2y = 9;
			fantom1x = 5;
			fantom1y = 10;
			}
		if (nivel ==3)
			{Matrix = MatrixEtaj3;
			fantom3x = 5;
			fantom3y = 8; 
			fantom2x = 5; 
			fantom2y = 9;
			fantom1x = 5;
			fantom1y = 11;
			fantom0x = 5;
			fantom0y = 13;
			}
		
		//initializare pozitii initiale fantome 
		manx = 0;
		many = 1;
		
		//initializare copie matrice pt fantoma inteligenta
		Matrixcopy();
		
		//fc initializare pt desen
		InitDrawing();
		
		//desenare initiala a matricei
		holder.addCallback(new Callback() {
			
			@Override
			public void surfaceDestroyed(SurfaceHolder arg0) {
				// TODO Auto-generated method stub	
			}
			
			@Override
			public void surfaceCreated(SurfaceHolder arg0) {
				// TODO Auto-generated method stub
				drawmatrix();
				count.start();	
			}
			
			@Override
			public void surfaceChanged(SurfaceHolder arg0, int arg1, int arg2, int arg3) {
				// TODO Auto-generated method stub
			}
		});
		//finish();
	}
	
	
	
	@Override
	public boolean onCreateOptionsMenu(Menu menu) {
		// Inflate the menu; this adds items to the action bar if it is present.
		getMenuInflater().inflate(R.menu.joc, menu);
		return true;
	}

	
	public void InitDrawing(){
		Display display = ((WindowManager) getSystemService(WINDOW_SERVICE)).getDefaultDisplay();
		width = display.getWidth();
		height = display.getHeight();
		
		//System.out.println(width+"");
		
		surface = (SurfaceView)findViewById(R.id.surfaceView1);
		holder = surface.getHolder();
		paint=new Paint();
		paint.setColor(Color.BLUE);
		
		man = (BitmapDrawable) getResources().getDrawable(R.drawable.man); 
		wall1 = (BitmapDrawable) getResources().getDrawable(R.drawable.wall);
		
		if(nivel == 4){
		freep = (BitmapDrawable) getResources().getDrawable(R.drawable.freep);
		ghostp1 = (BitmapDrawable) getResources().getDrawable(R.drawable.ghostp1);//alex
		ghostp2 = (BitmapDrawable) getResources().getDrawable(R.drawable.ghostp2);//iulia
		ghostp3 = (BitmapDrawable) getResources().getDrawable(R.drawable.ghostp3);//adriana
		bonus0=  (BitmapDrawable) getResources().getDrawable(R.drawable.m0);
		}
	
		if(nivel == 1){
		freee1 = (BitmapDrawable) getResources().getDrawable(R.drawable.freee1);
		ghoste11 = (BitmapDrawable) getResources().getDrawable(R.drawable.ghoste11);//cristi
		ghoste12 = (BitmapDrawable) getResources().getDrawable(R.drawable.ghoste12);//sabina
		ghoste13 = (BitmapDrawable) getResources().getDrawable(R.drawable.ghoste13);//bogdan
		bonus1=  (BitmapDrawable) getResources().getDrawable(R.drawable.g1);
		}
		
		if(nivel == 2){
		freee2 = (BitmapDrawable) getResources().getDrawable(R.drawable.freee2);
		ghoste21 = (BitmapDrawable) getResources().getDrawable(R.drawable.ghoste21);//stefan
		ghoste22 = (BitmapDrawable) getResources().getDrawable(R.drawable.ghoste22);//alexandra 
		ghoste23 = (BitmapDrawable) getResources().getDrawable(R.drawable.ghoste23);//vlad
		bonus2=  (BitmapDrawable) getResources().getDrawable(R.drawable.l2);
		}
		
		if(nivel == 3){
		freee3 = (BitmapDrawable) getResources().getDrawable(R.drawable.freee3);
		ghoste31 = (BitmapDrawable) getResources().getDrawable(R.drawable.ghoste31);//adela
		ghoste32 = (BitmapDrawable) getResources().getDrawable(R.drawable.ghoste32);//ioana
		ghoste33 = (BitmapDrawable) getResources().getDrawable(R.drawable.ghoste33);//alex
		ghoste30 = (BitmapDrawable) getResources().getDrawable(R.drawable.ghoste30);//daiana
		
		}
		 
		manb = man.getBitmap();
		wall = wall1.getBitmap();
	
		if(nivel ==4){
		freepb = freep.getBitmap();
		ghostp1b = ghostp1.getBitmap();
		ghostp2b = ghostp2.getBitmap();
		ghostp3b = ghostp3.getBitmap();
		bonus0b=bonus0.getBitmap();
		}
		
		if(nivel == 1){
		freee1b = freee1.getBitmap();
		ghoste11b = ghoste11.getBitmap();
		ghoste12b = ghoste12.getBitmap();
		ghoste13b = ghoste13.getBitmap();
		bonus1b=bonus1.getBitmap();
		}
		
		if(nivel == 2){
		freee2b = freee2.getBitmap();
		ghoste21b = ghoste21.getBitmap();
		ghoste22b = ghoste22.getBitmap();
		ghoste23b = ghoste23.getBitmap();
		bonus2b=bonus2.getBitmap();
		}
		
		if(nivel == 3){
		freee3b = freee3.getBitmap();
		ghoste31b = ghoste31.getBitmap();
		ghoste32b = ghoste32.getBitmap();
		ghoste33b = ghoste33.getBitmap();
		ghoste30b = ghoste30.getBitmap();
		
		}
		
		square1 = width / nrx;
		square2 = height / nry;
		square = square1;
		if(square1 > square2)
			square = square2;
		
		resizedwall = Bitmap.createScaledBitmap(wall, square, square, false); 
		resizedman = Bitmap.createScaledBitmap(manb, square, square, false);
		
		//parter
		if(nivel == 4){
		resizedfreep = Bitmap.createScaledBitmap(freepb, square, square, false); 
		resizedghostp1 = Bitmap.createScaledBitmap(ghostp1b, square, square, false);
		resizedghostp2 = Bitmap.createScaledBitmap(ghostp2b, square, square, false);
		resizedghostp3 = Bitmap.createScaledBitmap(ghostp3b, square, square, false);
		bonus0b= Bitmap.createScaledBitmap(bonus0b, square, square, false);
		}
		
		//etaj 1
		if(nivel == 1){
		resizedfreee1 = Bitmap.createScaledBitmap(freee1b, square, square, false); 
		resizedghoste11 = Bitmap.createScaledBitmap(ghoste11b, square, square, false); 
		resizedghoste12 = Bitmap.createScaledBitmap(ghoste12b, square, square, false);
		resizedghoste13 = Bitmap.createScaledBitmap(ghoste13b, square, square, false);
		bonus1b= Bitmap.createScaledBitmap(bonus1b, square, square, false);
		}
		
		//etaj 2
		if(nivel == 2){
		resizedfreee2 = Bitmap.createScaledBitmap(freee2b, square, square, false); 
		resizedghoste21 = Bitmap.createScaledBitmap(ghoste21b, square, square, false);
		resizedghoste22 = Bitmap.createScaledBitmap(ghoste22b, square, square, false);
		resizedghoste23 = Bitmap.createScaledBitmap(ghoste23b, square, square, false);
		bonus2b= Bitmap.createScaledBitmap(bonus2b, square, square, false);
		}
		
		//etaj 3
		if(nivel == 3){
		resizedfreee3 = Bitmap.createScaledBitmap(freee3b, square, square, false); 
		resizedghoste31 = Bitmap.createScaledBitmap(ghoste31b, square, square, false);
		resizedghoste32 = Bitmap.createScaledBitmap(ghoste32b, square, square, false);
		resizedghoste33 = Bitmap.createScaledBitmap(ghoste33b, square, square, false);
		resizedghoste30 = Bitmap.createScaledBitmap(ghoste30b, square, square, false);
	
		}
		
		extrax = (width - square*nrx)/2;
		extray = (height - square*nry)/2;
		
		sensorManager = (SensorManager)getSystemService(SENSOR_SERVICE);
		sensorManager.registerListener(this,sensorManager.getDefaultSensor(Sensor.TYPE_ACCELEROMETER),
				SensorManager.SENSOR_DELAY_NORMAL);
	}
	
	public void onAccuracyChanged(Sensor arg0, int arg1) {
        // TODO Auto-generated method stub
    }

    public void onSensorChanged(SensorEvent ev) {
        // TODO Auto-generated method stub
//System.out.println("lala");
        if(ev.sensor.getType()==Sensor.TYPE_ACCELEROMETER){
        	
        	
            accx = ev.values[0];
            accy = ev.values[1];
            accz = ev.values[2];
           
            if(ev.values[0] > Math.abs(ev.values[1]) )
            	{step = 2;
            	nextstep = 0;
            	}
            else if(ev.values[0] <- Math.abs(ev.values[1]))
            	{step = 3;
            	nextstep = 1;
            	}
            else if(ev.values[1] < - Math.abs(ev.values[0]) )
            	{step = 1;
            	nextstep = 2;}
            else 
            	{step = 0; 
            	nextstep = 3;
            	}
        }
    }

	//Timer
		CountDownTimer count =new CountDownTimer(36000000,600) {
			
		@Override
		public void onTick(long millisUntilFinished) {
				//JOC
				
				if(manx == 10 && many == 18){
					Castig();
					}
				
				if (nextstep == 0)	//jos 
					{
						if (manx < nry -1 && (Matrix[manx + 1][many] == 3 ||  Matrix[manx + 1][many] == 4 || Matrix[manx + 1][many] == 5|| Matrix[manx][many + 1] == 6))
							{mort = 1;
							Mort();
							}
						else if (manx == 11 && many == 18)
									{castig = 1;
									Castig();
									}
						//continua joc
						else if (manx < nry &&Matrix[manx + 1][many] == 0  ){
									Matrix[manx][many] = 0;
									Matrix[manx + 1][many] = 1;
									manx = manx + 1;
								}
						}
				
				if (nextstep == 1)	//sus
				{	if (manx > 1 && (Matrix[manx - 1][many] == 3 ||  Matrix[manx - 1][many] == 4 || Matrix[manx - 1][many] == 5|| Matrix[manx][many + 1] == 6))
						{mort = 1;
						Mort();
						}
					else{
							//continua joc 
						if (manx > 1 && Matrix[manx - 1][many] == 0){
							Matrix[manx][many] = 0;
							Matrix[manx - 1][many] = 1;
							manx = manx - 1;
						}
					}
				}
				
				if (nextstep == 2)	//stanga 
				{	if (many > 1 && (Matrix[manx][many - 1] == 3 ||  Matrix[manx][many - 1] == 4 || Matrix[manx][many - 1] == 5|| Matrix[manx][many + 1] == 6))
						{mort = 1;
						Mort();
						}
						
				//continua joc
					else if (Matrix[manx][many - 1] == 0){
							Matrix[manx][many] = 0;
							Matrix[manx][many - 1] = 1;
							many = many - 1;
						}
					}
				
				if (nextstep == 3)	//dreapta 
				{	if (many < nrx -1 && (Matrix[manx][many + 1] == 3 ||  Matrix[manx][many + 1] == 4 || Matrix[manx][many + 1] == 5 || Matrix[manx][many + 1] == 6))
						{mort = 1;
						Mort();
						}
				//continua joc
				else if (Matrix[manx][many + 1] == 0){
						Matrix[manx][many] = 0;
						Matrix[manx][many + 1] = 1; 
						many = many + 1;
					}
				}
				
				//film = new Intent(this , Movie.class );
				//miscarea fantomelor
				
				if(  !(manx == 0 && many == 1) || !(manx == 11 && many == 18)){
					MoveSmart();
				}
				MoveStupid();
				MoveRandom();
				if(nivel == 3)
					MoveDaiana();
				Matrix[0][0] = 2;
				
				drawmatrix();
		}
					
		@Override
		public void onFinish() {
				// TODO Auto-generated method stub
						
				}
		};
		
	
	public void drawmatrix(){
		
		try {
			
		
		
				Canvas canvas = holder.lockCanvas();
				//canvas = holder.lockCanvas();
				for( int i = 0 ; i < nry; i++)
					for( int j = 0 ; j < nrx  ; j++){
						if (Matrix[i][j] == 0){
							if(nivel == 4){
								
								canvas.drawBitmap(resizedfreep, j*square + extrax, i*square + extray, paint); 
							}
							if(nivel == 1){
								canvas.drawBitmap(resizedfreee1, j*square + extrax, i*square + extray, paint);
							}
							if(nivel == 2){
								
								canvas.drawBitmap(resizedfreee2, j*square + extrax, i*square + extray, paint);
							}
							if(nivel == 3){
								canvas.drawBitmap(resizedfreee3, j*square + extrax, i*square + extray, paint);
							}
						}
						if (Matrix[i][j] == 2)
							if(nivel==4&&((i==7&&j==10)||(i==8&&j==10)||(i==8&&j==11)||(i==2&&j==2)||(i==2&&j==3)||(i==3&&j==2))) canvas.drawBitmap(bonus0b, j*square + extrax, i*square + extray, paint); 
							else if(nivel==2&&((i==3&&j==1)||(i==5&&j==2)||(i==7&&j==1))) canvas.drawBitmap(bonus2b, j*square + extrax, i*square + extray, paint); 
							else  if(nivel==1&&((i==5&&j==2)||(i==6&&j==2)||(i==6&&j==8)||(i==6&&j==11)||(i==6&&j==17)||(i==5&&j==17))) canvas.drawBitmap(bonus1b, j*square + extrax, i*square + extray, paint); 
							else
							canvas.drawBitmap(resizedwall, j*square + extrax, i*square + extray, paint);
						if (Matrix[i][j] == 3){
							if(nivel == 4 ){
								canvas.drawBitmap(resizedghostp3, j*square + extrax, i*square + extray, paint);
							}
							if(nivel == 1 ){
								canvas.drawBitmap(resizedghoste13, j*square + extrax, i*square + extray, paint);
							}
							if(nivel == 2 ){
								canvas.drawBitmap(resizedghoste23, j*square + extrax, i*square + extray, paint);
							}
							if(nivel == 3 ){
								canvas.drawBitmap(resizedghoste33, j*square + extrax, i*square + extray, paint);
							}
						}
						if (Matrix[i][j] == 4){
							if(nivel == 4 ){
								canvas.drawBitmap(resizedghostp2, j*square + extrax, i*square + extray, paint);
							}
							if(nivel == 1 ){
								canvas.drawBitmap(resizedghoste12, j*square + extrax, i*square + extray, paint);
							}
							if(nivel == 2 ){
								canvas.drawBitmap(resizedghoste22, j*square + extrax, i*square + extray, paint);
							}
							if(nivel == 3 ){
								canvas.drawBitmap(resizedghoste32, j*square + extrax, i*square + extray, paint);
							}
						}
						if (Matrix[i][j] == 5){
							if(nivel == 4 ){
								canvas.drawBitmap(resizedghostp1, j*square + extrax, i*square + extray, paint);
							}
							if(nivel == 1 ){
								canvas.drawBitmap(resizedghoste11, j*square + extrax, i*square + extray, paint);
							}
							if(nivel == 2 ){
								canvas.drawBitmap(resizedghoste21, j*square + extrax, i*square + extray, paint);
							}
							if(nivel == 3 ){
								canvas.drawBitmap(resizedghoste31, j*square + extrax, i*square + extray, paint);
							}
						}
						if (Matrix[i][j] == 1)
							canvas.drawBitmap(resizedman, j*square + extrax, i*square + extray, paint);	
						if(nivel == 3){
							if (Matrix[i][j] == 6)
								canvas.drawBitmap(resizedghoste30, j*square + extrax, i*square + extray, paint);
							}
						}
				holder.unlockCanvasAndPost(canvas); 
		} catch (NullPointerException e) {
			e.printStackTrace();// TODO: handle exception
		}
	}
		
	
	public void Matrixcopy(){
		for(int i = 0; i< nry ; i++)
			for( int j = 0; j< nrx ; j++)
			{	matrixcopy[i][j] = 0;
				if (Matrix[i][j] != 0)
					matrixcopy[i][j] = -1;
			}
	}
	
	public void PrintMatrix(){
		for(int i= 0; i< nry; i++){
			for(int j =0; j< nrx ; j++){
				System.out.print(" "+Matrix[i][j]);
			}
			System.out.println("");
		}
	}
	
	
	//fc de gasit pozitie noua pt fantoma inteligenta 
	public Cell nextStepSmart(int fantomx, int fantomy){	
	
		int xstart = fantomx;
		int ystart = fantomy;
		int xtarget = manx;
		int ytarget = many;
		
		for(int i = 0; i< nry ; i++)
			for( int j = 0; j< nrx ; j++)
			{	matrixcopy[i][j] = 0;
				if (Matrix[i][j] != 0)
					matrixcopy[i][j] = -1;
			}
		matrixcopy[manx][many] = 0;
		
		ArrayList<Cell> list = new ArrayList<Cell>();
		int ok = 0;
		int cost = 0;
		Cell start = new Cell();
		start.x = xstart;
		start.y = ystart;
		start.cost = 0;
		list.add(start);
		
		
		
		matrixcopy[0][1] = -1;
		matrixcopy[11][18] = -1;
		try {
			
		
		while ( ok == 0){
			
			while( list.get(0).cost == cost){
				
				if ((list.get(0).x == xtarget) && (list.get(0).y == ytarget))
					ok = 1;
				//stanga verificare
				
				if(list.get(0).x > 0){
				if (matrixcopy[list.get(0).x - 1 ][list.get(0).y] == 0){
					matrixcopy[list.get(0).x - 1 ][list.get(0).y] = cost + 1;
					Cell celula = new Cell();
					celula.x = list.get(0).x - 1;
					celula.y = list.get(0).y;
					celula.cost = cost + 1;
					list.add(celula);
				}
				}
				
				//jos
				if(list.get(0).y > 0){
				if (matrixcopy[list.get(0).x ][list.get(0).y - 1 ] == 0){
					matrixcopy[list.get(0).x ][list.get(0).y - 1 ] = cost + 1;
					Cell celula = new Cell();
					celula.x = list.get(0).x;
					celula.y = list.get(0).y - 1;
					celula.cost = cost + 1;
					list.add(celula);
				}}
				//dreapta	
				if(list.get(0).x < nry - 1){
				if (matrixcopy[list.get(0).x + 1 ][list.get(0).y ] == 0){
					matrixcopy[list.get(0).x + 1 ][list.get(0).y ] = cost + 1;
					Cell celula = new Cell();
					celula.x = list.get(0).x + 1;
					celula.y = list.get(0).y;
					celula.cost = cost + 1;
					list.add(celula);
				}}
				//sus
				if (list.get(0).y < nrx - 1){
				if (matrixcopy[list.get(0).x ][list.get(0).y + 1 ] == 0){
					matrixcopy[list.get(0).x ][list.get(0).y + 1 ] = cost + 1;
					Cell celula = new Cell();
					celula.x = list.get(0).x;
					celula.y = list.get(0).y + 1;
					celula.cost = cost + 1;
					list.add(celula);
				}
				}
				list.remove(0);
			}
			cost++;
		} }catch (IndexOutOfBoundsException e) {
			e.printStackTrace();// TODO: handle exception
		}
		
		
		int xback = xtarget;
		int yback = ytarget;
		 
		cost--;
		try {
			
		
		while(cost != 1){
			//System.out.println(xback + "    " + yback);
			if(matrixcopy[xback - 1][yback] == cost - 1)
				xback = xback - 1;
			if(matrixcopy[xback][yback - 1] == cost - 1)
				yback = yback - 1;
			if(matrixcopy[xback + 1][yback] == cost - 1) 
				xback = xback + 1;
			if(matrixcopy[xback][yback + 1] == cost - 1)
				yback = yback + 1;
			cost--;		 
			}
		} catch (ArrayIndexOutOfBoundsException e) {
			e.printStackTrace();
		}
		Cell firststep = new Cell();
		firststep.x = xback; 
		firststep.y = yback;
		firststep.cost = 1;
		return firststep;
	}
	
	public Cell nextStepStupid(int fantomx, int fantomy){
		//pt mers in partea in care e omul, daca e in stanga merge daca poate in stanga 
		Cell nextstep = new Cell();
		nextstep.x = fantomx;
		nextstep.y = fantomy;
		
		//asa si asa
		//if(Matrix[fantomx - 1][fantomy] == 1)
			//Mort();
		
		if (fantomx > 1 && fantomx > manx && Matrix[fantomx - 1 ][ fantomy ] == 0  )
			{nextstep.x = fantomx - 1;
			nextstep.y = fantomy;
			}
		else{
			if( fantomy > 1&& fantomy > many && Matrix[fantomx][fantomy -1] == 0)
				{ nextstep.x = fantomx  ;
				nextstep.y = fantomy -1;
				}
		
			else {
				if(fantomx < manx  && fantomx < nry -1 &&Matrix[fantomx + 1 ][ fantomy ] == 0)
					{nextstep.x = fantomx + 1;
					nextstep.y = fantomy;
					}
				else{
					if( fantomy < nrx -1 && Matrix[fantomx][fantomy + 1] == 0 )
						{nextstep.x = fantomx;
						nextstep.y = fantomy + 1;
						}
				}
			}
		}
	return nextstep;
	}
	public Cell nextStepRandom(int fantomx, int fantomy, int manx, int many){
		//pt mers random
		Cell nextstep = new Cell();
		nextstep.x = fantomx;
		nextstep.y = fantomy;
		int rand = (int)(Math.random()*4);
		
		if(rand == 0){
			//if(fantomy > 0 && Matrix[fantomx][fantomy - 1 ] == 1 )
			//	Mort();
			if(fantomy > 0 && Matrix[fantomx][fantomy - 1 ] == 0 ){
				nextstep.x = fantomx;
				nextstep.y = fantomy -1;
			}
		}
		if(rand == 1 ){
			//if( fantomy < nrx -1 && Matrix[fantomx][fantomy + 1 ] == 1)
			//	Mort();
			if( fantomy < nrx -1 && Matrix[fantomx][fantomy + 1 ] == 0){
				nextstep.x = fantomx;
				nextstep.y = fantomy + 1;
			}
		}
		if(rand == 2){
			//if(fantomx > 0 && Matrix[fantomx - 1][fantomy ] == 1 )
			//	Mort();
			if(fantomx > 0 && Matrix[fantomx - 1][fantomy ] == 0 ){
				nextstep.x = fantomx - 1;
				nextstep.y = fantomy;
			}
		}
		if(rand == 3){
			//if(fantomx < nry -1 && Matrix[fantomx + 1][fantomy] == 0 )
			//	Mort();
			if(fantomx < nry -1 && Matrix[fantomx + 1][fantomy] == 0 ){
				nextstep.x = fantomx + 1;
				nextstep.y = fantomy ;
			}
		}
		return nextstep;
	}
	
	public void MoveSmart(){
		Cell nextstep;
		nextstep = nextStepSmart(fantom3x, fantom3y);
		if(nextstep.x == manx && nextstep.y == many)
			Mort();
		Matrix[fantom3x][fantom3y] = 0;
		fantom3x = nextstep.x;
		fantom3y = nextstep.y;
		Matrix[nextstep.x][nextstep.y] = 3;
	}
	
	public void MoveStupid(){ 
		Cell nextstep;
		nextstep = nextStepStupid(fantom2x, fantom2y);
		Matrix[fantom2x][fantom2y] = 0;
		fantom2x = nextstep.x;
		fantom2y = nextstep.y;
		Matrix[nextstep.x][nextstep.y] = 4;
	}
	
	public void MoveRandom(){
		Cell nextstep;
		nextstep = nextStepRandom(fantom1x, fantom1y, manx, many);
		Matrix[fantom1x][fantom1y] = 0;
		fantom1x = nextstep.x;
		fantom1y = nextstep.y;
		Matrix[nextstep.x][nextstep.y] = 5;
	}
	
	public void MoveDaiana(){
		Cell nextstep;
		nextstep = nextStepRandom(fantom0x, fantom0y, manx, many);
		Matrix[fantom0x][fantom0y] = 0;
		fantom0x = nextstep.x;
		fantom0y = nextstep.y;
		Matrix[nextstep.x][nextstep.y] = 6;
	}
	
	public void Mort(){
		finished=true;
		sensorManager.unregisterListener(this);
		
		Intent intent = new Intent();
		intent.putExtra("film", 0);
		
		setResult (nivel,intent);
		System.out.println("MORT");
		//filmulet
		count.cancel();
		Joc.this.finish();
	}
	
	public void onDestroy()
	{super.onDestroy();
	count.cancel();
	System.gc();
	/*if(nivel ==4){
		freepb.recycle();
		ghostp1b.recycle();
		ghostp2b.recycle();
		ghostp3b.recycle();
		}
		
		if(nivel == 1){
		freee1b.recycle();
		ghoste11b.recycle();
		ghoste12b.recycle();
		ghoste13b.recycle();
		}
		
		if(nivel == 2){
		freee2b.recycle();
		ghoste21b.recycle();
		ghoste22b.recycle();
		ghoste23b.recycle();
		}
		
		if(nivel == 3){
		freee3b.recycle();
		ghoste31b.recycle();
		ghoste32b.recycle();
		ghoste33b.recycle();
		ghoste30b.recycle();
		}*/
	System.out.println("on destroy");}
	
	public void Castig(){
		finished=true;
		sensorManager.unregisterListener(this);
		
		Intent intent = new Intent();
		if(nivel == 3)
			intent.putExtra("film", 2);
		else
			intent.putExtra("film", 1);
		
		if(nivel ==4)
			setResult(1,intent);
		else if(nivel == 3) 
			setResult(5,intent);
		else
			setResult(nivel+1,intent);
		
		System.out.println("CASTIG");
		count.cancel();
		finish();
	} 
	boolean finished=false;	
}
