#pragma strict

//var player1: Transform;
//var player2: Transform;

var mainCamera : Camera;
var cameraOffset : Vector3 = new Vector3(0,0,-10);

var platforms: GameObject[];
var levels:GameObject[];
var players:GameObject[];


function Awake(){

	//TODO: UPDATE AS WE BUILD MORE LEVELS
	//

	//ARRAYS OF GLOBAL AND LOCAL INFORMATION
	//TODO: FILL
	var levelSize = [28,23,23,41,46,0];//space between this and the next level - MUST KEEP EXTRA 0 AT THE END



	//SET GLOBALS: PLATFORMS, CAMERA, PLAYERS, LEVELS
	//		SET GLOBAL ABSOLUTES - TRANSFORM, SPRITERENDER, MONOSCRIPT
	//TODO: SET GLOBAL VARIABLES - PLAYER(SPEED, CONTROLS, JUMP_FORCE, ACCELERATION)
	//								PLATFORM()
	//								LEVEL()
	
	
	//CAMERA
	mainCamera = Camera.main;
	
	//PLATFORMS
	platforms = GameObject.FindGameObjectsWithTag("Platform");//get all platforms
	platforms.Sort(platforms, function(g1,g2) String.Compare(g1.name, g2.name));//sort alphabetically
	
	var screenHeight = mainCamera.ScreenToWorldPoint(new Vector3(0f,Screen.height,0f)).y;
	
	for(var i=0;i<platforms.Length;i++){
		var platform_i = platforms[i];
		//SET SPRITE
		platform_i.GetComponent(SpriteRenderer).sprite = Resources.Load("Materials/PurplePlatform",Sprite);
		//SET MATERIAL - SHOULD BE DEFAULT OTHERWISE WE NEED TO LOOK INTO
		
		//SET SCRIPT
		platform_i.AddComponent("PlatformScript");
		//TODO: TO UPDATE VARIABLES NEED TO IMPLEMENT A SENDMESSAGE / UPDATEVARIABLES
		//POSITION
		//Set platforms so that their start position(far left side) is at 0f and they are evenly spaced through the center of the screen. 
			//set the 3 heights to top, middle, bottom (1f-i/2f) - then shift up the top 0, the middle 1/25, bottom 2/25 of screen height
		platform_i.transform.position = new Vector3(platforms[i].renderer.bounds.size.x/2, screenHeight*(1f+((i%3)/25f)-(i/2f)),0f);
	}

	//PLAYERS
	players = GameObject.FindGameObjectsWithTag("Player");
	players.Sort(players, function(g1,g2) String.Compare(g1.name, g2.name));
	for(i=0; i<players.Length; i++){
		var player_i = players[i];
		//SPRITE
		player_i.GetComponent(SpriteRenderer).sprite = Resources.Load("Materials/"+player_i.name,Sprite);
		//MATERIAL / SCRIPT
		
		//POSITION
		var posX = platforms[i+1].transform.position.x - platforms[i+1].renderer.bounds.extents.x + 2;
		var posY = platforms[i+1].transform.position.y+1;
		player_i.transform.position = new Vector3(posX, posY, 0f);
		
	}
			
				
	//LEVELS	
	levels = GameObject.FindGameObjectsWithTag("Level");
	levels.Sort(levels, function(g1,g2) String.Compare(g1.name, g2.name));
	
	var positionFromStart = -.5;
	
	for(i=0;i<levels.Length; i++){
		var level_i = levels[i];
		//SPRITE - WILL BE NONE FOR FINAL EDIT - SAME FOR MATERIAL
		level_i.GetComponent(SpriteRenderer).sprite = Resources.Load("Materials/PinkBox_50x50",Sprite);
		//SCRIPT
		
		//POSITION
		level_i.transform.position = new Vector3(positionFromStart, level_i.renderer.bounds.extents.y, 0f);
		positionFromStart += levelSize[i];
		
	}
	
	
	
	
	
	
								
	//TODO: FOR EACH LEVEL { FOR EACH CHILD { 
	//			SET ABSOLUTES - TRANSFORM(RELATIVE TO PARENT), SPRITERENDERER, MONOSCRIPT
	//			SET VARIABLES - BUTTON(CHANGED_OBJ, SPEED, XDIST, YDIST)
	//							GATE()


	//TODO: CHECK IF COMPONENTS ALREADY EXIST

}




function Start () {

	//Screen.SetResolution(Screen.currentResolution.width, Screen.currentResolution.height, true);
	//Screen.SetResolution
}
// Delete the first level - called from LevelTrigger.js
function nextLevel(l:String){
	if(levels[1].name==l && levels.Length>2){
		levels = levels[1:];		
	}

}



function Update () {//TODO: SETUP BOUNDS ON CAMERA


	//Set camera to the current lvl
	var xPos = Mathf.Abs(levels[1].transform.position.x - levels[0].transform.position.x)/2 + levels[0].transform.position.x;
	//TODO: SET CAMERA BASED ON SCREEN
	mainCamera.transform.position = new Vector3(xPos, 5 , 0) + cameraOffset;

}

function OnGUI(){

	if(GUI.Button(new Rect(Screen.width-121, 35, 121, 53),"RESET")){
		//RESET PLAYERS POSITIONS
		players[0].transform.position = new Vector3(platforms[1].transform.position.x - platforms[1].renderer.bounds.size.x/2+2, platforms[1].transform.position.y+1, 0f);
		players[1].transform.position = new Vector3(platforms[2].transform.position.x - platforms[2].renderer.bounds.size.x/2+2, platforms[2].transform.position.y+1, 0f);
		
		levels = GameObject.FindGameObjectsWithTag("Level");
		levels.Sort(levels, function(g1,g2) String.Compare(g1.name, g2.name));
	}
}


