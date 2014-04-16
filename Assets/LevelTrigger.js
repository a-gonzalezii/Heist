#pragma strict



function OnTriggerEnter2D(hitInfo : Collider2D){
	print("here");
}


/*When player passes level trigger:
	Need to move camera over;
		Send msg to game controller to:
			-move to next index 
			-pop level from Stack
			


*/
