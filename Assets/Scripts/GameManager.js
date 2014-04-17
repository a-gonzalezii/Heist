#pragma strict

var player1: Transform;
var player2: Transform;

var mainCamera : Camera;
var cameraOffset : Vector3 = new Vector3(0,0,-10);

var platform0: GameObject;
var platform1: GameObject;
var platform2: GameObject;

var levels:GameObject[];
//var currentLevel:int; - currently using levels as a stack where the first one will be left bound. 

function Start () {
	//Set platforms so that their start position(far left side) is at 0f and they are evenly spaced through the center of the screen. 
	platform0.transform.position = new Vector3 (platform1.renderer.bounds.size.x/2, mainCamera.ScreenToWorldPoint(new Vector3(0f, Screen.height,0f)).y ,0f);
	platform1.transform.position = new Vector3 (platform1.renderer.bounds.size.x/2, mainCamera.ScreenToWorldPoint(new Vector3(0f, Screen.height/2,0f)).y+2,0f);
	platform2.transform.position = new Vector3 (platform2.renderer.bounds.size.x/2, mainCamera.ScreenToWorldPoint(new Vector3(0f, 0f, 0f)).y+2,0f);

	//Set player position so they are just above platforms 1 and 2 respectively; could further enhance this by making them at y position = platformPosition+platformHeight+playerHeight
	player1.position = new Vector3(platform1.transform.position.x - platform1.renderer.bounds.size.x/2+2, platform1.transform.position.y+1, 0f);
	player2.position = new Vector3(platform2.transform.position.x - platform2.renderer.bounds.size.x/2+2, platform2.transform.position.y+1, 0f);
	
	mainCamera = Camera.main;
	
	levels = GameObject.FindGameObjectsWithTag("Level");
	//currentLevel = 0;
	//sort levels by name (alphabetically)
	levels.Sort(levels, function(g1,g2) String.Compare(g1.name, g2.name));
	
	//TODO: SPACE LVLS AND AUTOGENERATE
	
	
	
}

function nextLevel(l:String){

	if(levels[1].name==l && levels.Length>2){
		levels = levels[1:];
		for(var i=0;i<levels.Length;i++){
			print(levels[i].name);
		}
		
	}

}



function Update () {//TODO: SETUP BOUNDS ON CAMERA

	//var xPos = Mathf.Abs(player1.position.x-player2.position.x)/2 + Mathf.Min(player1.position.x,player2.position.x); 
	
	var xPos = Mathf.Abs(levels[1].transform.position.x - levels[0].transform.position.x)/2 + levels[0].transform.position.x;
	mainCamera.transform.position = new Vector3(xPos, 5 , 0) + cameraOffset;

}


