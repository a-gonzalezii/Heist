#pragma strict
#pragma downcast

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

	//GENERAL VARIABLES THAT POP UP OFTEN
	var platformExtents:Vector3;
	var screenHeight:float;

	//ARRAYS OF GLOBAL AND LOCAL INFORMATION
	//TODO: FILL
	var levelSize = [28,23,23,41,46,0];//space between this and the next level - MUST KEEP EXTRA 0 AT THE END
	//Array(Map{Type:Array(Map{})})
	/*var level1_childrenMapping = {};
				var level1_Gate1Mapping = {};
				level1_GateMapping["Position"] = new Vector3(8.8,-.13,0);
			var level1_GateArray = [level1_Gate1Mapping, level1_Gate2Mapping];
		level1_childrenMapping["Gate"] = level1_GateArray;
	var levelArrangement = [];
*/

	//SET GLOBALS: PLATFORMS, CAMERA, PLAYERS, LEVELS
	//		SET GLOBAL ABSOLUTES - TRANSFORM, SPRITERENDER, MONOSCRIPT
	//		SET GLOBAL VARIABLES - PLAYER(SPEED, CONTROLS, JUMP_FORCE, ACCELERATION)
	//								PLATFORM()
	//								LEVEL()
	
	
	//CAMERA
	mainCamera = Camera.main;
	
	//PLATFORMS
	platforms = GameObject.FindGameObjectsWithTag("Platform");//get all platforms
	platforms.Sort(platforms, function(g1,g2) String.Compare(g1.name, g2.name));//sort alphabetically
	
	platformExtents = platforms[0].renderer.bounds.extents;
	screenHeight = mainCamera.ScreenToWorldPoint(new Vector3(0f,Screen.height,0f)).y;
	
	for(var i=0;i<platforms.Length;i++){
		var platform_i = platforms[i];
		//SET SPRITE
		platform_i.GetComponent(SpriteRenderer).sprite = Resources.Load("Materials/PurplePlatform",Sprite);
		//SET MATERIAL - SHOULD BE DEFAULT OTHERWISE WE NEED TO LOOK INTO
		
		//SET SCRIPT
		if(i > 0 && platform_i.GetComponent("PlatformScript") == null){
			platform_i.AddComponent("PlatformScript");
		}
		//POSITION
		//Set platforms so that their start position(far left side) is at 0f and they are evenly spaced through the center of the screen. 
			//set the 3 heights to top, middle, bottom (1f-i/2f) - then shift up the top 0, the middle 1/25, bottom 2/25 of screen height
		platform_i.transform.position = new Vector3(platformExtents.x, screenHeight*(1f+((i%3)/25f)-(i/2f)),0f);
	}


	//PLAYERS
	players = GameObject.FindGameObjectsWithTag("Player");
	players.Sort(players, function(g1,g2) String.Compare(g1.name, g2.name));
	for(i=0; i<players.Length; i++){
		var player_i = players[i];
		//SPRITE
		player_i.GetComponent(SpriteRenderer).sprite = Resources.Load("Materials/"+player_i.name,Sprite);
		//MATERIAL / SCRIPT
		if(player_i.GetComponent("PlayerController") == null){
			player_i.AddComponent("PlayerController");
		}
		
		//POSITION
		var posX = platforms[i+1].transform.position.x - platformExtents.x + 2;
		var posY = platforms[i+1].transform.position.y+1;
		player_i.transform.position = new Vector3(posX, posY, 0f);
		
		//setVariables(leftKey, rightKey, jumpKey, newSpeed, jumpF)
		var variablesToSet = new Array();
		if(i==0){		//KeyCode.A,         KeyCode.D,          KeyCode.W,       10, 1000
			variablesToSet.push(KeyCode.A);
			variablesToSet.push(KeyCode.D);
			variablesToSet.push(KeyCode.W);
		}else{			//KeyCode.LeftArrow, KeyCode.RightArrow, KeyCode.UpArrow, 10, 1000
			variablesToSet.push(KeyCode.LeftArrow);
			variablesToSet.push(KeyCode.RightArrow);
			variablesToSet.push(KeyCode.UpArrow);
		}
		variablesToSet.push(10);
		variablesToSet.push(1000);
		player_i.SendMessage("setVariables", variablesToSet);
		
	}
			
				
	//LEVELS	
	levels = GameObject.FindGameObjectsWithTag("Level");
	levels.Sort(levels, function(g1,g2) String.Compare(g1.name, g2.name));
	
	var positionFromStart = 0;
	
	for(i=0;i<levels.Length; i++){
		var level_i = levels[i];
		//SPRITE - WILL BE NONE FOR FINAL EDIT - SAME FOR MATERIAL
		level_i.GetComponent(SpriteRenderer).sprite = Resources.Load("Materials/PinkBox_50x50",Sprite);
		//SCRIPT
		if(player_i.GetComponent("LevelTrigger") == null){
			player_i.AddComponent("LevelTrigger");
		}
		
		//POSITION
		level_i.transform.localScale = new Vector3(1f,2*(platforms[0].transform.position.y-platforms[2].transform.position.y-platforms[0].renderer.bounds.size.y),1f);
		level_i.transform.position = new Vector3(positionFromStart, platforms[1].transform.position.y, 0f);
		positionFromStart += levelSize[i];


		// 		FOR EACH LEVEL { FOR EACH CHILD { 
		//TODO:		SET ABSOLUTES - TRANSFORM(RELATIVE TO PARENT), SPRITERENDERER, MONOSCRIPT
		//			SET VARIABLES - BUTTON(CHANGED_OBJ, SPEED, XDIST, YDIST)
		//							GATE()
		var name:String[];
		var childType:String;
		var childTypeIndex:int;
		
		var levelMap:Hashtable;
		var childTypeArray:Array;
		var componentTypeMap:Hashtable;
		
		var testing = {};
		
		for(var child: Transform in level_i.transform){
			name = child.name.Split();
			childType = name[0];
			childTypeIndex = parseInt(name[1]);		
			
			//levelMap = levelArrangement[i];// gives up map{type:list}
			//childTypeArray = levelMap[childType];
			//componentTypeMap = childTypeArray[childTypeIndex];
			//POSITION
			//child.transform.position = componentTypeMap["Position"];
			//SPRITE
			//child.GetComponent(SpriteRenderer).sprite = Resources.Load(componentTypeMap["Sprite"],Sprite);
			//SCRIPT
			//if("Script" in componentTypeMap){
			//	if(child.getComponent(componentTypeMap["Script"][0]==null){ child.addComponent(componentTypeMap["Script"][0])}
			//	child.SendMessage("setVariables",componentTypeMap["Script"][1]);
			//}
		
		}
				
								
	}
									




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



function Update () {//TODO: ADJUST CAMERA

	//Set camera to the current lvl
	var xPos = Mathf.Abs(levels[1].transform.position.x - levels[0].transform.position.x)/2 + levels[0].transform.position.x;
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


