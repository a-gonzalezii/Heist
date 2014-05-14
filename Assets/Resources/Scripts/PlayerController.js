#pragma strict

var speed : float = 10;
var jumpForce: float = 100;//high force to compensate for high gravity so player stays attached to moving objects

var jumpIsLocked:boolean = false;

var moveLeft : KeyCode;
var moveRight : KeyCode;
var jump : KeyCode;

var jumpAudio:AudioClip;

var anim:Animator;
var isPlayer1:boolean;


function Awake(){
	jumpAudio = Resources.Load("Sounds/jumpLowPitch",AudioClip);
	anim = GetComponent(Animator);
	anim.SetFloat("Speed",0f);
}

function jumpToUnlock(){
	jumpIsLocked = false;
}
function jumpToLock(){
	jumpIsLocked = true;
}

function FixedUpdate () {
	//Move Left
	if(Input.GetKey(moveLeft)){
		rigidbody2D.velocity.x = -speed;
		anim.SetFloat("Speed",1f);
		
	//Move Right	
	}else if(Input.GetKey(moveRight)){
		rigidbody2D.velocity.x = speed;		
		anim.SetFloat("Speed",1f);
		
	//Move None
	}else{
		rigidbody2D.velocity.x = 0;
		anim.SetFloat("Speed",0f);
	}//Jump - seperate loop so you can jump and move
	if(Input.GetKey(jump)){
		if(!jumpIsLocked){
			rigidbody2D.velocity.y = jumpForce;
			jumpIsLocked = true;
			audio.PlayOneShot(jumpAudio);
		}
	}
	
}

function Update(){
	
	
}

function setVariables(variables:Array){//, rightKey:KeyCode, jumpKey:KeyCode, newSpeed:float, jumpF:float){
	moveLeft  = variables[0];
	moveRight = variables[1];
	jump      = variables[2];
	speed     = variables[3];
	jumpForce = variables[4];


}
