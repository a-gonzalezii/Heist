#pragma strict

var changedObject:GameObject;
var startPosition: Vector3;
var moving: boolean = false;

function Start(){//TODO: FINE TUNE THIS ISH
	startPosition = changedObject.transform.position;
	
}

function OnTriggerEnter2D(hitInfo : Collider2D){

	if(hitInfo.collider2D.tag == "Player"){
		moving = true;
	}
	
}

function OnTriggerStay2D(hitInfo: Collider2D){

	if(hitInfo.collider2D.tag =="Player"){
		changedObject.transform.position.y += .05;
	}
}

function OnTriggerExit2D(hitInfo : Collider2D){

	if(hitInfo.collider2D.tag == "Player"){
		moving = false;
	}
}

function FixedUpdate(){

	if(!moving && Vector3.Distance(startPosition, changedObject.transform.position) > .05){
		changedObject.transform.position.y -= .05;
	}


}


