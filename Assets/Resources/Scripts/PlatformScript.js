#pragma strict

function OnCollisionEnter2D (hitInfo : Collision2D){
	//When landing from a jump, let the player jump again

	if(hitInfo.collider.tag == "Player"){
		
		//The two corners that make the line of contact
		var cp:ContactPoint2D[]=hitInfo.contacts;
		//upper bound of platformObject
		var upper_y:float = gameObject.renderer.bounds.max.y;	
		//only if player is on top of a platform can they jump again
		for(var i=0;i < cp.length;i++){
			if(cp[i].point.y < upper_y ){
				return;
			}
		}
		hitInfo.gameObject.SendMessage("jumpToUnlock");
	}
}




function setVariables(variables:Array){}