#pragma strict

var speed : float = 10;
var jumpSpeed: float = 100;
var acceleration: float = 2;

var jumpIsLocked:boolean = false;

var moveLeft : KeyCode;
var moveRight : KeyCode;
var jump : KeyCode;

function jumpToUnlock(){
	jumpIsLocked = false;
}

function FixedUpdate () {

	if(Input.GetKey(moveLeft)){
		rigidbody2D.velocity.x = -speed;
		
	}else if(Input.GetKey(moveRight)){
		rigidbody2D.velocity.x = speed;		
		
	}else{
		rigidbody2D.velocity.x = 0;
	}
	if(Input.GetKey(jump)){
		if(!jumpIsLocked){//TODO: NEED TO CHANGE THIS FOR WHEN THEY ARE IN A SPACE THAT ONLY FITS THE USER/player icon
			rigidbody2D.AddForce(Vector3.up*jumpSpeed);//rigidbody2D.velocity.y = jumpSpeed;
			jumpIsLocked = true;
		}
	}
}