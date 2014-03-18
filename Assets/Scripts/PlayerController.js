#pragma strict


var speed : float = 10;
var jumpSpeed : float = 10;
var acceleration: float = 2;

var jumpIsLocked:boolean = false;

var moveLeft : KeyCode;
var moveRight : KeyCode;
var jump : KeyCode;
var action : KeyCode;


function jumpToUnlock(){
	jumpIsLocked = false;
}


function Update () {

	if(Input.GetKey(moveLeft)){
		rigidbody2D.velocity.x = -speed;
		
	}else if(Input.GetKey(moveRight)){
		rigidbody2D.velocity.x = speed;		
		
	}else{
		rigidbody2D.velocity.x = 0;
		rigidbody2D.velocity.y = 0;
	}
	
	if(Input.GetKey(action)){
		//TODO: Interactable Object feature
		//need to look at collision detection; most likely this will make a call to the InteractableObject that it is colliding with.
		//on the InteractableObject side there will need to be a boolean that tracks if it is currently colliding with the player. 
		
	}if(Input.GetKey(jump)){
		if(!jumpIsLocked){//TODO: NEED TO CHANGE THIS FOR WHEN THEY ARE IN A SPACE THAT ONLY FITS THE USER/player icon
			rigidbody2D.velocity.y = jumpSpeed;
			jumpIsLocked = true;
		}
	}


}