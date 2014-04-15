#pragma strict

//TODO : WHEN PLAYER ON PLATFORM AND PLATFORM IS MOVING UP, CANNOT JUMP MORE THAN ONCE. - NOT DETECTING COLLISION

function OnCollisionEnter2D (hitInfo : Collision2D){
	//When landing from a jump, let the player jump again
	print("collision");
	if(hitInfo.collider.tag == "Player"){
		
		var cp:ContactPoint2D[]=hitInfo.contacts;
		var center_y:float = hitInfo.gameObject.renderer.bounds.center.y;
		
		for(var i=0;i < cp.length;i++){//only if player is on top of a platform can they jump again
			if(cp[i].point.y > center_y){
				print("Player is not on top");
				return;
			}
		}
		hitInfo.gameObject.SendMessage("jumpToUnlock");
	}

}