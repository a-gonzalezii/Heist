﻿#pragma strict

//set in the scene
var changedObject:GameObject;//a platform or wall - //TODO:may be able to use just the transform
var distanceFromTop:float=3f;
var moving: boolean = false;
var speed: float=3;
var mainCamera:Camera;

//set in start()
var targetPosition: Vector3;
var step: float;
var startPosition: Vector3;


function Start(){//TODO: FINE TUNE THE SPEEDS
	startPosition = changedObject.transform.position;
	step = speed*Time.deltaTime;
	//top of screen - 1/2 object height - distance from top.
	targetPosition = new Vector3(startPosition.x,
		mainCamera.ScreenToWorldPoint(new Vector3(0f,Screen.height,0f)).y-changedObject.renderer.bounds.extents.y-distanceFromTop,0f);
}
//when touch button - the wall is now moving
function OnTriggerEnter2D(hitInfo : Collider2D){
	if(hitInfo.collider2D.tag == "Player"){
		moving = true;
	}	
}
//as long as youre on the button move the wall
function OnTriggerStay2D(hitInfo: Collider2D){//TODO: CANNOT SET POSITION MUST SET VELOCITY
	if(hitInfo.collider2D.tag =="Player"){
		changedObject.transform.position = Vector3.MoveTowards(changedObject.transform.position, targetPosition, step);
	}
}
//when off button no longer moving wall/moves back to position
function OnTriggerExit2D(hitInfo : Collider2D){
	if(hitInfo.collider2D.tag == "Player"){
		moving = false;
	}
}

function FixedUpdate(){
//if the player isnt on the button and the wall hasnt returned to its original position - move toward original position
	if(!moving && Vector3.Distance(startPosition, changedObject.transform.position) > .05){
		changedObject.transform.position = Vector3.MoveTowards(changedObject.transform.position, startPosition, step);
	}


}


