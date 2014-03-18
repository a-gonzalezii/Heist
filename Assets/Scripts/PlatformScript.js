#pragma strict

function OnCollisionEnter2D (hitInfo : Collision2D){
	
	if(hitInfo.collider.tag == "Player"){
		hitInfo.gameObject.SendMessage("jumpToUnlock");
	}

}