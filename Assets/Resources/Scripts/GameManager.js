#pragma strict
//import System.Linq;

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
	//Set Camera
	var xPos = Mathf.Abs(levels[1].transform.position.x - levels[0].transform.position.x)/2 + levels[0].transform.position.x;
	mainCamera.transform.position = new Vector3(xPos, screenHeight/2 , 0) + cameraOffset;
	var bottomPlatformFloor = -levels[0].renderer.bounds.extents.y;
	var topPlatformFloor = platforms[1].renderer.bounds.extents.y;
	
	//BACKGROUND
	instantiateBackground();
	
	//Array(Map{Type:Array(Map{})})
	//Array of Levels
	//	Each Level represented as a Map{Object type : Array of those objects in level}
	//		Objects are represented as a Map {"Information to Set" : Value}
	//			Examples are {Position: Vector3 Position; Sprite: String SpriteLocation; Variables: Array of Variables for Method setVariables(Array)}
	//TODO: CHANGE HARD CODED VALUES
	//TODO: "SCALE" = Vector3()
	//TODO: PHYSICS MATERIAL
	
	//LEVEL 3
				var level3_Button1Mapping = {};
				level3_Button1Mapping["Position"] = new Vector3(5f, bottomPlatformFloor, 0f);
				level3_Button1Mapping["Sprite"]   = "Materials/GreenButton";
				level3_Button1Mapping["Script"]   = "InteractibleScript";//, ["Next_Level0/Gate 1",3,4,0]];//changedObj, Speed, Ydist, Xdist
				level3_Button1Mapping["Variables"] = ["Next_Level2/Gate 1",3,-4,0];
				
				var level3_Button2Mapping = {};
				level3_Button2Mapping["Position"] = new Vector3(15f,topPlatformFloor, 0f);
				level3_Button2Mapping["Sprite"]   = "Materials/GreenButton";
				level3_Button2Mapping["Script"]   = "InteractibleScript";
				level3_Button2Mapping["Variables"] = ["Next_Level2/Gate 2",3,4,0];
		
			var level3_ButtonArray = [level3_Button1Mapping, level3_Button2Mapping];
	
				var level3_Gate2Mapping = {};
				level3_Gate2Mapping["Position"] = new Vector3(16f,bottomPlatformFloor,0);
				level3_Gate2Mapping["Sprite"]   = "Materials/GreenButton";
				level3_Gate2Mapping["Script"]   = "PlatformScript";
				level3_Gate2Mapping["Variables"] = [];
				
				var level3_Gate1Mapping = {};
				level3_Gate1Mapping["Position"] = new Vector3(9f,topPlatformFloor,0);
				level3_Gate1Mapping["Sprite"]   = "Materials/GreenButton";
				level3_Gate1Mapping["Script"]   = "PlatformScript";
				level3_Gate1Mapping["Variables"] = [];
				
			var level3_GateArray = [level3_Gate1Mapping, level3_Gate2Mapping];
		var level3_childrenMapping = {};
		level3_childrenMapping["Button"] = level3_ButtonArray;
		level3_childrenMapping["Gate"] = level3_GateArray;
	
	//LEVEL 2	
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
	
	//LEVEL 1
	
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
		
		
	//LIST OF LEVELS
	var levelArrangement = [level1_childrenMapping, level2_childrenMapping,level3_childrenMapping];
			
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
			
			levelMap = levelArrangement[i];// gives map{type:list}
			childTypeArray = levelMap[childType];
			
			componentTypeMap = childTypeArray[childTypeIndex];

			//SPRITE
			child.gameObject.GetComponent(SpriteRenderer).sprite = Resources.Load(componentTypeMap["Sprite"],Sprite);
			
			//POSITION
			//Input is relative to level position (positionFromStart, middle of center platform)
			//	Should also be where you want the center bottom of the sprite to be
			positionTypeCast = componentTypeMap["Position"];
			child.transform.position = level_i.transform.position + positionTypeCast;
			child.transform.position.y += child.renderer.bounds.extents.y;

			scriptTypeCast = componentTypeMap["Script"];
			if("Script" in componentTypeMap){
				if(child.gameObject.GetComponent(scriptTypeCast)==null){ 
					child.gameObject.AddComponent(scriptTypeCast);
				}
			}
			arrayCast = componentTypeMap["Variables"];
			child.SendMessage("setVariables",arrayCast);
		
		}
	}

}


function instantiatePlatforms(){
	//PLATFORMS
	platforms = GameObject.FindGameObjectsWithTag("Platform");//get all platforms
	platforms.Sort(platforms, function(g1,g2) String.Compare(g1.name, g2.name));//sort alphabetically
	
	var reSizingCollisionBox:Vector3;
		
	for(var i=0;i<platforms.Length;i++){
		var platform_i = platforms[i];
		//SET SPRITE TODO -- platform2 demension = 7000 × 70 px 
		platform_i.GetComponent(SpriteRenderer).sprite = Resources.Load("Materials/platform1",Sprite);
		platformExtents = platform_i.renderer.bounds.extents;
		
		//resizing collider
		reSizingCollisionBox = 2*new Vector3(platformExtents.x/platform_i.transform.localScale.x, platformExtents.y/platform_i.transform.localScale.y,platformExtents.z/platform_i.transform.localScale.z);
		platform_i.GetComponent(BoxCollider2D).size = (reSizingCollisionBox);	
		
		
		
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
		player_i.GetComponent(SpriteRenderer).sprite = Resources.Load("Materials/p1_idle",Sprite);
		//MATERIAL / SCRIPT
		if(player_i.GetComponent("PlayerController") == null){
			player_i.AddComponent("PlayerController");
		}
		
		//POSITION - SCALE
		player_i.GetComponent(BoxCollider2D).size = player_i.renderer.bounds.size;
		
		var posX = platforms[i+1].transform.position.x - platforms[i+1].renderer.bounds.extents.x + 2;
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
		variablesToSet.push(20);
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

function instantiateBackground(){


	


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



function Update () {

	//TODO: ADJUST CAMERA - Pan slowly to next level; center on players but stay within bounds of level.
	//TODO: LIMIT PLAYER POSITION - Players cannot go to the left of the level boundary

	//Set camera to the current lvl
	var xPos = Mathf.Abs(levels[1].transform.position.x - levels[0].transform.position.x)/2 + levels[0].transform.position.x;
	mainCamera.transform.position.x = xPos;

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


