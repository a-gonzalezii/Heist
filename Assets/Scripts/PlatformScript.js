#pragma strict

function OnCollisionEnter2D (hitInfo : Collision2D){
	//When landing from a jump, let the player jump again
	if(hitInfo.collider.tag == "Player"){
		
		var cp:ContactPoint2D[]=hitInfo.contacts;
		var center_y:float = hitInfo.gameObject.renderer.bounds.center.y;
		for(var i=0;i < cp.length;i++){//only if player is on top of a platform can they jump again
			if(cp[i].point.y > center_y){
				return;
			}
		}
		hitInfo.gameObject.SendMessage("jumpToUnlock");
	}

}