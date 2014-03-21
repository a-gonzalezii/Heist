#pragma strict

var changedObject:Light;

function Start(){

	changedObject = changedObject;
	//changedObject.intensity=0;

}

function OnTriggerEnter2D(hitInfo : Collider2D){
	
	if(hitInfo.collider2D.tag == "Player"){
		changedObject.intensity = 8f;
		
	}
	
}

function OnTriggerExit2D(hitInfo : Collider2D){

	if(hitInfo.collider2D.tag == "Player"){
		changedObject.intensity=0f;
	}

}
