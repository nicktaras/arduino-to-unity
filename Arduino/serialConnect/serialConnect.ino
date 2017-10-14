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
