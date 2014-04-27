#pragma strict

/*When player passes level trigger:
	Need to move camera over;
		Send msg to game controller to:
			-move to next index 
			-pop level from Stack
			


*/

function OnTriggerExit2D(hitInfo : Collider2D){

	if(hitInfo.tag=="Player"){
	
		var players = GameObject.FindGameObjectsWithTag("Player");
		
		//check both players have passed the trigger
		for(var i=0; i<players.Length; i++){
			if(players[i].transform.position.x < transform.position.x){
				return;
			}
		}
		//send msg to game manager telling it to pop
		GameObject.FindGameObjectWithTag("GameController").SendMessage("nextLevel",name);	
	
	}
	
}