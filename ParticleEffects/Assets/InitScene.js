#pragma strict
//It's the #pragma strict directive that's causing this error: the compiler "thinks" that the aGrid elements are objects, not Arrays. Remove it and your script will work.

public var ballObj : GameObject; 
public var cameraObj : Transform;
public var animationCameraObj : Transform;
public var boundsMinObj : Transform; // Plane in Scene of where Particles will be out of the view. TODO: remove or re-position in view.
public var boundsMaxObj : Transform; // Plane in Scene of where Particles will be spawned from. 
public var mainContainer : GameObject; // contains the whole game object
public var particleContainer : GameObject; // contains the whole game object

public class InitScene extends MonoBehaviour {

    public class InitParticles {
    
        public var particleNum : int;

        public function setParticleNum( _particleNum : int ){
        	particleNum = _particleNum;
        }
        
        public function getParticleNum(){
        	return particleNum;
        }
        
        public function InitParticles(){}
        
    }
    
    public class FormationCtrl {
    
    	public var formationStr : String;
        public var sphere = new Array();
		public var stars = new Array();
        
        public function setFormation( _formationStr : String ){
        	formationStr = _formationStr;
        }
        
        public function getFormation(){
        	return formationStr;
        }
        
       	public function FormationCtrl(){}

    }
    
	public class StateCtrl {
		public var state : String;
		public function SetState(_state : String){ state = _state; }
        public function GetState(){ return state; }
        public function StateMachine(){} 
	}
	
    public class AnimationCtrl {
    
    	public var spinSpeed : double = 0.0;
    	public var spinAccel : double = 10;
    	public var canSpin = true;
    	
    	public var animationComplete = false; 
    	    	 	
    	public function animateAll( particleNum : int, formation : Array){

    		var i = 0;
			var ballObj : GameObject;

			for(ballObj in GameObject.FindGameObjectsWithTag("Ball")){
				if(i >= 0 && i < particleNum){
					ballObj.transform.position = Vector3.Lerp(ballObj.transform.position, formation[i], Time.time/100);
					i++;
				}
			}
		
		}
			
    	public function spin(speedInput: Number ){

    		var center = Vector3(0, 0, 0);
			var count : float = 0;
			var container: GameObject;
			
    		for(ballObj in GameObject.FindGameObjectsWithTag("Ball")){
	    		center += ballObj.transform.position;
			    count++;
		 	}
		 	
			var theCenter = center / count;	
			container = GameObject.FindGameObjectWithTag("particleContainer");
	    	container.transform.RotateAround(theCenter, Vector3(0,500,10), spinSpeed * Time.deltaTime);

    		if(canSpin && spinSpeed > -200 && canSpin && spinSpeed < 200){
				spinSpeed = (spinSpeed) + (speedInput);
			}
	    	
    	}

    	public function expand(input: Number ){

    		var center = Vector3(0, 0, 0);
			var count : float = 0;
			var scale: double = 0.0;
			var container: GameObject;
			container =  GameObject.FindGameObjectWithTag("particleContainer");
			Debug.Log('expand');

			input = input / 1000;
			 
    		for(ballObj in GameObject.FindGameObjectsWithTag("Ball")){
    			scale = (container.transform.localScale.x) + (input);
//	    		center += ballObj.transform.position;
	    		if (scale > 0.01 && scale < 100) {
//	    			ballObj.transform.localScale = Vector3(scale, scale, scale);
	    			container.transform.localScale = Vector3(scale, scale, scale);
	    		}
			    count++;
		 	}
		 	
			var theCenter = center / count;	
	    	container.transform.RotateAround(theCenter, Vector3(0,500,10), 0 * Time.deltaTime);
	      		
    	}
    	
    	public function AnimationCtrl(){}
    }
    
    public class LeaderboardCtrl {
    	public function leaderboardCtrl(){}
    }
    
    public class sponsorsCtrl {
    	public function sponsorsCtrl(){}
    }
    
    //public class sponsors {} // controller for sponsors
    //public class leaderboard {} // controller for leaderboard
    
    public var animationCtrl : AnimationCtrl = new AnimationCtrl();
    public var formationCtrl : FormationCtrl = new FormationCtrl(); 
    public var initParticles : InitParticles = new InitParticles();
    public var stateCtrl : StateCtrl = new StateCtrl();

	function Start(){
	
		animationCameraObj.transform.position = cameraObj.position;
	
		initParticles.setParticleNum(300);

		mainContainer = new GameObject();
		mainContainer.tag = "mainContainer";
		particleContainer = new GameObject();
		particleContainer.tag = "particleContainer";
	
		for ( var i:int = 0; i < initParticles.particleNum; i ++ ) {
		
			//generate sphere co-ords
			
			var phi : float;
			var theta : float;
			var sphereX : float; 
			var sphereY : float;
			var sphereZ : float;

			phi     = Mathf.Acos( -0.999999 + ( 1.999999 * i ) / initParticles.particleNum );
			theta   = Mathf.Sqrt( initParticles.particleNum * Mathf.PI ) * phi;
			sphereX = 10 * Mathf.Cos( theta ) * Mathf.Sin( phi );
			sphereY = 10 * Mathf.Sin( theta ) * Mathf.Sin( phi );
			sphereZ = 10 * Mathf.Cos( phi ) + boundsMaxObj.GetComponent(MeshRenderer).bounds.min.z - 50;
			
			formationCtrl.sphere.push(Vector3(sphereX, sphereY, sphereZ));

			//generate random co-ords for stars formation
			
			var camPosX : float = cameraObj.transform.position.x-10;
			var camPosY : float = cameraObj.transform.position.y-10;
			var boundsX : float = boundsMinObj.GetComponent(MeshRenderer).bounds.max.x+5;
			var boundsZ : float = boundsMaxObj.GetComponent(MeshRenderer).bounds.max.z+5;
			
			var starsX : float = Random.Range(cameraObj.transform.position.x-10, boundsMinObj.GetComponent(MeshRenderer).bounds.max.x+5);
			var starsY : float = Random.Range(cameraObj.transform.position.y-10, boundsMinObj.GetComponent(MeshRenderer).bounds.max.y+5);
			var starsZ : float = Random.Range(cameraObj.transform.position.z-10, boundsMaxObj.GetComponent(MeshRenderer).bounds.max.z+5);

			formationCtrl.stars.push(Vector3(starsX, starsY, starsZ));
						
			var containerObj : GameObject = Instantiate(ballObj, formationCtrl.stars[i], Quaternion.identity);
			containerObj.transform.parent = (particleContainer as GameObject).transform;
			particleContainer.transform.parent = (mainContainer as GameObject).transform;
						
		}
		
	}

	function Update (){

		//in star mode, ensure balls are placed back into view
		for(var ballObj : GameObject in GameObject.FindGameObjectsWithTag("Ball")){
		    if(ballObj.transform.position.z < boundsMinObj.position.z){
		    	ballObj.transform.position.z = Random.Range(boundsMaxObj.position.z, boundsMaxObj.position.z-10);
		    }
		}

		if(Input.GetKeyDown("space")){
			stateCtrl.SetState("start");
	    }
	    	   
	    if (Input.GetKeyDown ("left")){
			stateCtrl.SetState("spinLeft");
		}

		if (Input.GetKeyDown ("right")){
			stateCtrl.SetState("spinRight");
		}

		if (Input.GetKeyDown ("up")){
			stateCtrl.SetState("expandIn");
		}

		if (Input.GetKeyDown ("down")){
			stateCtrl.SetState("expandOut");
		}

		// STATES:
		if (stateCtrl.state == "init"){

		}
		if (stateCtrl.state == "start"){
			animationCtrl.animateAll(initParticles.particleNum, formationCtrl.sphere); 	
		}
		if (stateCtrl.state == "spinLeft"){
			animationCtrl.spin(1.0); // need Arduino input
		}
		if (stateCtrl.state == "spinRight"){
			animationCtrl.spin(-1.0); // need Arduino input
		}
		if (stateCtrl.state == "expandIn"){
			animationCtrl.expand(0.1); // need Arduino input
		}
		if (stateCtrl.state == "expandOut"){
			animationCtrl.expand(-0.1); // need Arduino input
		}
			    	      	    	  
	}

}



