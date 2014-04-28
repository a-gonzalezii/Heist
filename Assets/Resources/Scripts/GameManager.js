#pragma strict
import System.Linq;

//var player1: Transform;
//var player2: Transform;

var mainCamera : Camera;
var cameraOffset : Vector3 = new Vector3(0,0,-10);

var platforms: GameObject[];
var levels:GameObject[];
var players:GameObject[];

//GENERAL VARIABLES THAT POP UP OFTEN
var platformExtents:Vector3;
var screenHeight:float;



function Awake(){

	//TODO: UPDATE AS WE BUILD MORE LEVELS
	//

	//ARRAYS OF GLOBAL AND LOCAL INFORMATION
	//TODO: FILL
	



	//SET GLOBALS: PLATFORMS, CAMERA, PLAYERS, LEVELS
	//		SET GLOBAL ABSOLUTES - TRANSFORM, SPRITERENDER, MONOSCRIPT
	//		SET GLOBAL VARIABLES - PLAYER(SPEED, CONTROLS, JUMP_FORCE, ACCELERATION)
	//								PLATFORM()
	//								LEVEL()
	
	
	//CAMERA
	mainCamera = Camera.main;
	//PLATFORMS
	screenHeight = mainCamera.ScreenToWorldPoint(new Vector3(0f,Screen.height,0f)).y;
	instantiatePlatforms();
	//PLAYERS
	instantiatePlayers();
	//LEVELS
	instantiateLevels();
	var bottomPlatformFloor = -levels[0].renderer.bounds.extents.y;
	var topPlatformFloor = platforms[1].renderer.bounds.extents.y;
	
	//Array(Map{Type:Array(Map{})})
	//TODO: CHANGE HARD CODED VALUES
	//TODO: "SCALE" = Vector3()
	
				
				var level2_Button1Mapping = {};
				level2_Button1Mapping["Position"] = new Vector3(6f,topPlatformFloor, 0f);
				level2_Button1Mapping["Sprite"]   = "Materials/GreenButton";
				level2_Button1Mapping["Script"]   = "InteractibleScript";
				level2_Button1Mapping["Variables"] = ["Next_Level1/Gate 1",3,4,0];
			var level2_ButtonArray = [level2_Button1Mapping];
	
				var level2_Gate1Mapping = {};
				level2_Gate1Mapping["Position"] = new Vector3(9f, bottomPlatformFloor,0f);
				level2_Gate1Mapping["Sprite"] = "Materials/GreenButton";
				level2_Gate1Mapping["Script"]   = "PlatformScript";
				level2_Gate1Mapping["Variables"] = [];
				
			var level2_GateArray = [level2_Gate1Mapping];
		var level2_childrenMapping = {};
		level2_childrenMapping["Button"] = level2_ButtonArray;
		level2_childrenMapping["Gate"] = level2_GateArray;
	
				var level1_Button1Mapping = {};
				level1_Button1Mapping["Position"] = new Vector3(5f, topPlatformFloor, 0f);
				level1_Button1Mapping["Sprite"]   = "Materials/GreenButton";
				level1_Button1Mapping["Script"]   = "InteractibleScript";//, ["Next_Level0/Gate 1",3,4,0]];//changedObj, Speed, Ydist, Xdist
				level1_Button1Mapping["Variables"] = ["Next_Level0/Gate 1",3,4,0];
				
				var level1_Button2Mapping = {};
				level1_Button2Mapping["Position"] = new Vector3(12f,bottomPlatformFloor, 0f);
				level1_Button2Mapping["Sprite"]   = "Materials/GreenButton";
				level1_Button2Mapping["Script"]   = "InteractibleScript";
				level1_Button2Mapping["Variables"] = ["Next_Level0/Gate 2",3,4,0];
		
			var level1_ButtonArray = [level1_Button1Mapping, level1_Button2Mapping];
	
				var level1_Gate2Mapping = {};
				level1_Gate2Mapping["Position"] = new Vector3(16.7,bottomPlatformFloor,0);
				level1_Gate2Mapping["Sprite"]   = "Materials/GreenButton";
				level1_Gate2Mapping["Script"]   = "PlatformScript";
				level1_Gate2Mapping["Variables"] = [];
				
				var level1_Gate1Mapping = {};
				level1_Gate1Mapping["Position"] = new Vector3(8.8,bottomPlatformFloor,0);
				level1_Gate1Mapping["Sprite"]   = "Materials/GreenButton";
				level1_Gate1Mapping["Script"]   = "PlatformScript";
				level1_Gate1Mapping["Variables"] = [];
				
			var level1_GateArray = [level1_Gate1Mapping, level1_Gate2Mapping];
		var level1_childrenMapping = {};
		level1_childrenMapping["Button"] = level1_ButtonArray;
		level1_childrenMapping["Gate"] = level1_GateArray;
	var levelArrangement = [level1_childrenMapping, level2_childrenMapping];
			
	// 		FOR EACH LEVEL { FOR EACH CHILD { 
	//			SET ABSOLUTES - TRANSFORM(RELATIVE TO PARENT), SPRITERENDERER, MONOSCRIPT
	//			SET VARIABLES - BUTTON(CHANGED_OBJ, SPEED, XDIST, YDIST)
	//							GATE()
	
	for(var i=0;i<levelArrangement.Length;i++){
	
		var level_i = levels[i];
		
		var name:String[];
		var childType:String;
		var childTypeIndex:int;
		
		var levelMap:Hashtable;
		var childTypeArray:Array;
		var componentTypeMap:Hashtable;
		
		var testing = {};
		var arrayCast:Array;
		var scriptTypeCast:String;
		var positionTypeCast:Vector3;
		for(var child: Transform in level_i.transform){
			name = child.name.Split();
		
			childType = name[0];
			childTypeIndex = parseInt(name[1])-1;		
			
			levelMap = levelArrangement[i];// gives up map{type:list}
			childTypeArray = levelMap[childType];
			
			componentTypeMap = childTypeArray[childTypeIndex];

			//POSITION
			//TODO: CHANGE TO level_i.transform.position + componentTypeMap[Position]
			positionTypeCast = componentTypeMap["Position"];
			child.transform.position = level_i.transform.position + positionTypeCast;
			child.transform.position.y += child.renderer.bounds.extents.y;
			
			//SPRITE
			child.gameObject.GetComponent(SpriteRenderer).sprite = Resources.Load(componentTypeMap["Sprite"],Sprite);
			//SCRIPT - TODO:NOT WORKING
			scriptTypeCast = componentTypeMap["Script"];
			if("Script" in componentTypeMap){
				if(child.gameObject.GetComponent(scriptTypeCast)==null){ 
					child.gameObject.AddComponent(scriptTypeCast);
				}
			}
			arrayCast = componentTypeMap["Variables"];
			child.SendMessage("setVariables",arrayCast);
			//}
		
		}
	}
	
								




	//TODO: CHECK IF COMPONENTS ALREADY EXIST

}


function instantiatePlatforms(){
	//PLATFORMS
	platforms = GameObject.FindGameObjectsWithTag("Platform");//get all platforms
	platforms.Sort(platforms, function(g1,g2) String.Compare(g1.name, g2.name));//sort alphabetically
	platformExtents = platforms[0].renderer.bounds.extents;
		
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
}

function instantiatePlayers(){
	//PLAYERS
	players = GameObject.FindGameObjectsWithTag("Player");
	players.Sort(players, function(g1,g2) String.Compare(g1.name, g2.name));
	for(var i=0; i<players.Length; i++){
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
}

function instantiateLevels(){

	//space between this and the next level - MUST KEEP EXTRA 0 AT THE END
	var levelSize=[28,23,23,41,46,0];

	//LEVELS	
	levels = GameObject.FindGameObjectsWithTag("Level");
	levels.Sort(levels, function(g1,g2) String.Compare(g1.name, g2.name));
	
	var positionFromStart = 0;
	
	for(var i=0;i<levels.Length; i++){
		var level_i = levels[i];
		//SPRITE - WILL BE NONE FOR FINAL EDIT - SAME FOR MATERIAL
		level_i.GetComponent(SpriteRenderer).sprite = Resources.Load("Materials/PinkBox_50x50",Sprite);
		//SCRIPT
		if(level_i.GetComponent("LevelTrigger") == null){
			level_i.AddComponent("LevelTrigger");
		}
		
		//POSITION
		level_i.transform.localScale = new Vector3(1f,2*(platforms[0].transform.position.y-platforms[2].transform.position.y-platforms[0].renderer.bounds.size.y),1f);
		level_i.transform.position = new Vector3(positionFromStart, platforms[1].transform.position.y, 0f);
		positionFromStart += levelSize[i];
	}
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


