# arduino-to-unity
A proof of concept application to connect arduino (sensor controls) to unity 3d.

Using this example code found at: http://answers.unity3d.com/questions/179311/unity-to-arduino.html

The aim of this project is to send values from an Arduino board back to Unity3D - to allow for an non-traditional way of controlling an application (e.g. via ultra sound / peizo sensors).

Arduino: 

void setup() {
 Serial.begin(9600);
}

void loop() {
  int val = 2;
  //Sending value
  Serial.write(val);
  delay(1000);
  //Receiving value
  if (Serial.available() > 0) {
    // read the incoming byte:
    incomingByte = Serial.read();
    // say what you got:
    Serial.print("I received: ");
    Serial.println(incomingByte, DEC);
  }
}

Unity 3D:

using UnityEngine;
 using System.Collections;
 using System.IO.Ports;
 using System.Threading;
 
public class SerialPortTest : MonoBehaviour {
   //Setup parameters to connect to Arduino
   public static SerialPort sp = new SerialPort("COM4", 9600, Parity.None, 8, StopBits.One);
   public static string strIn;        

   // Use this for initialization
   void Start () 
   {
   OpenConnection();
   }

   void Update()
   {
           //Read incoming data
       strIn = sp.ReadLine();
   print(strIn);
    //You can also send data like this
    //sp.Write("1");
   }

   //Function connecting to Arduino
   public void OpenConnection() {
     if (sp != null) {
       if (sp.IsOpen) 
       {
           sp.Close();
           message = "Closing port, because it was already open!";
       }
       else 
       {
           sp.Open();  // opens the connection
           sp.ReadTimeout = 50;  // sets the timeout value before reporting error
           message = "Port Opened!";
       }
       }
       else 
       {
           if (sp.IsOpen)
           {
               print("Port is already open");
           }
           else 
           {
               print("Port == null");
           }
       }
   }

   void OnApplicationQuit() 
   {
       sp.Close();
   }
 }

