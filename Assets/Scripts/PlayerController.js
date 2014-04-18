#pragma strict

var speed : float = 10;
var jumpForce: float = 1000;//high force to compensate for high gravity so player stays attached to moving objects
var acceleration: float = 2;

var jumpIsLocked:boolean = false;

var moveLeft : KeyCode;
var moveRight : KeyCode;
var jump : KeyCode;
var isFacingRight : boolean = true;


// Animator -- John
var anim : Animator;

function Start(){

	// Animator -- John
	anim = GetComponent(Animator);
}

function jumpToUnlock(){
	jumpIsLocked = false;
}

function FixedUpdate () {
	
	// Animator -- John
	var move : float = Input.GetAxis ("Horizontal");
    anim.SetFloat("Speed", move);
	
	//Move Left
	if(Input.GetKey(moveLeft)){
		rigidbody2D.velocity.x = -speed;
	
	if (isFacingRight == true){
		Flip();
		isFacingRight = false;
	}
	
	//Move Right	
	}else if(Input.GetKey(moveRight)){
		rigidbody2D.velocity.x = speed;	
		
	if (isFacingRight == false){
	Flip();
	isFacingRight = true;
	}
		
	//Move None
	}else{
		rigidbody2D.velocity.x = 0;
	}//Jump - seperate loop so you can jump and move
	if(Input.GetKey(jump)){
		if(!jumpIsLocked){//TODO: NEED TO CHANGE THIS FOR WHEN THEY ARE IN A SPACE THAT ONLY FITS THE USER/player icon
			rigidbody2D.AddForce(Vector3.up*jumpForce);//rigidbody2D.velocity.y = jumpSpeed;
			jumpIsLocked = true;
		}
	}
}

function Flip (){
		var theScale = transform.localScale;
		theScale.x *= -1;
		transform.localScale = theScale;
		}