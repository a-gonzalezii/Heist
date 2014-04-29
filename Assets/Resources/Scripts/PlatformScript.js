#pragma strict

function OnCollisionEnter2D (hitInfo : Collision2D){
	//When landing from a jump, let the player jump again

	if(hitInfo.collider.tag == "Player"){
		
		//The two corners that make the line of contact
		var cp:ContactPoint2D[]=hitInfo.contacts;
		//lower bound of player object
		//TODO: FAILING BECAUSE THE SPRITE SHEET IS TOO BIG. 
		var center_y:float = hitInfo.gameObject.renderer.bounds.center.y - hitInfo.gameObject.renderer.bounds.extents.y;	
		//only if player is on top of a platform can they jump again
		for(var i=0;i < cp.length;i++){
			if(cp[i].point.y > center_y ){
				return;
			}
		}
		hitInfo.gameObject.SendMessage("jumpToUnlock");
	}
}

function setVariables(variables:Array){}