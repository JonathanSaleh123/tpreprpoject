int lightPin = 2;
int whitePin = 4;
int bluePin = 7;
 
void setup() 
{ 
  pinMode(lightPin, OUTPUT);
  pinMode(whitePin, OUTPUT);
  pinMode(bluePin, OUTPUT);
  
  Serial.begin(9600);
}

void loop() {
  
  if (Serial.available() > 0) {
    
    String receivedString = "";
    
    while (Serial.available() > 0) {
      receivedString += char(Serial.read ());
    }
    
    Serial.println(receivedString);
    
    if(receivedString == "g"){
      digitalWrite(lightPin,HIGH); 
      digitalWrite(whitePin,LOW);
      digitalWrite(bluePin,LOW);
    }else if(receivedString =="w"){
      digitalWrite(whitePin,HIGH);
      digitalWrite(bluePin,LOW);
      digitalWrite(lightPin,LOW); 
    }else if (receivedString =="b"){
      digitalWrite(bluePin,HIGH);
      digitalWrite(whitePin,LOW);
      digitalWrite(lightPin,LOW); 
  }else{
      digitalWrite(bluePin,LOW);
      digitalWrite(whitePin,LOW);
      digitalWrite(lightPin,LOW); 
  }

  }
}