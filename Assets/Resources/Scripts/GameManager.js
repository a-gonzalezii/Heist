#pragma strict
//import System.Linq;

//var player1: Transform;
//var player2: Transform;

var mainCamera : Camera;
var cameraOffset : Vector3 = new Vector3(0,0,-10);

var platforms: GameObject[];
var levels:GameObject[];
var players:GameObject[];
var bgs:GameObject[];

var positionFromStart = 0;
var platformPosFromStart = 0;
var bgPosFromStart = 0;
var time: float = 100;
var cameraWidth:float;
var cameraLeftLimit:float;
var cameraRightLimit:float;
var playerLeftLimit = 0;

var timeWarning = 20;
var isPaused = false;
var inWarning = false;
var gameOver = false;

var mainThemeAudio:AudioClip;
var endWarningAudio:AudioClip;
var gameOverAudio:AudioClip;
var checkPointAudio:AudioClip;
var spawnAudio:AudioClip;


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
	//LEVELS
	instantiateLevels();
	//PLAYERS
	instantiatePlayers();
	
	//BACKGROUND
	instantiateBackground();
	
	//Background and Extend Platforms
	extendPlatformAndBg();
	
	var bottomPlatformFloor = -levels[0].renderer.bounds.extents.y;
	var topPlatformFloor = platforms[1].renderer.bounds.extents.y;


	//AUDIO
	spawnAudio = Resources.Load("Sounds/SpawnAudio",AudioClip);
	checkPointAudio = Resources.Load("Sounds/Hit_checkpoint",AudioClip);
	gameOverAudio = Resources.Load("Sounds/Game_over",AudioClip);
	mainThemeAudio = Resources.Load("Sounds/Main_Theme",AudioClip);
	endWarningAudio = Resources.Load("Sounds/Time_Low",AudioClip);
	audio.clip = mainThemeAudio;
	audio.volume = .3;
	audio.loop = true;
	audio.Play();
	
	//Array(Map{Type:Array(Map{})})
	//Array of Levels
	//	Each Level represented as a Map{Object type : Array of those objects in level}
	//		Objects are represented as a Map {"Information to Set" : Value}
	//			Examples are {Position: Vector3 Position; Sprite: String SpriteLocation; Variables: Array of Variables for Method setVariables(Array)}
	//TODO: CHANGE HARD CODED VALUES
	//TODO: "SCALE" = Vector3()
	//TODO: PHYSICS MATERIAL
	
	//LEVEL4
	
				var level4_Button2Mapping = {};
				level4_Button2Mapping["Position"] = new Vector3(16f,topPlatformFloor+6, 0f);//TODO: HARD CODED - FIX
				level4_Button2Mapping["Sprite"]   = "Materials/buttonGreen";
				level4_Button2Mapping["Script"]   = "InteractibleScript";
				level4_Button2Mapping["Variables"] = ["Next_Level4/Gate 3",3,4,0];
				level4_Button2Mapping["Scale"] = new Vector3(1,1,1);			
	
				var level4_Button1Mapping = {};
				level4_Button1Mapping["Position"] = new Vector3(5f, bottomPlatformFloor, 0f);
				level4_Button1Mapping["Sprite"]   = "Materials/buttonGreen";
				level4_Button1Mapping["Script"]   = "InteractibleScript";//, ["Next_Level0/Gate 1",3,4,0]];//changedObj, Speed, Ydist, Xdist
				level4_Button1Mapping["Variables"] = ["Next_Level4/Gate 1",3, 10,0];
				level4_Button1Mapping["Scale"] = new Vector3(1,1,1);
					
			var level4_ButtonArray = [level4_Button1Mapping, level4_Button2Mapping];
			
				var level4_Gate3Mapping = {};
				level4_Gate3Mapping["Position"] = new Vector3(20f,bottomPlatformFloor,0);
				level4_Gate3Mapping["Sprite"]   = "Materials/gate";
				level4_Gate3Mapping["Script"]   = "PlatformScript";
				level4_Gate3Mapping["Variables"] = [];
				level4_Gate3Mapping["Scale"] = new Vector3(1,.5,1);
			
				var level4_Gate2Mapping = {};
				level4_Gate2Mapping["Position"] = new Vector3(16f,topPlatformFloor,0);
				level4_Gate2Mapping["Sprite"]   = "Materials/gate";
				level4_Gate2Mapping["Script"]   = "PlatformScript";
				level4_Gate2Mapping["Variables"] = [];
				level4_Gate2Mapping["Scale"] = new Vector3(2,1,1);
			
				var level4_Gate1Mapping = {};
				level4_Gate1Mapping["Position"] = new Vector3(9f,bottomPlatformFloor,0);
				level4_Gate1Mapping["Sprite"]   = "Materials/gate";
				level4_Gate1Mapping["Script"]   = "PlatformScript";
				level4_Gate1Mapping["Variables"] = [];
				level4_Gate1Mapping["Scale"] = new Vector3(1,1,1);
			
			var level4_GateArray   = [level4_Gate1Mapping, level4_Gate2Mapping, level4_Gate3Mapping];
			
		var level4_childrenMapping = {};
		level4_childrenMapping["Button"] = level4_ButtonArray;
		level4_childrenMapping["Gate"] = level4_GateArray;
	//LEVEL 3
				var level3_Button1Mapping = {};
				level3_Button1Mapping["Position"] = new Vector3(5f, bottomPlatformFloor, 0f);
				level3_Button1Mapping["Sprite"]   = "Materials/buttonGreen";
				level3_Button1Mapping["Script"]   = "InteractibleScript";//, ["Next_Level0/Gate 1",3,4,0]];//changedObj, Speed, Ydist, Xdist
				level3_Button1Mapping["Variables"] = ["Next_Level3/Gate 1",3,-5,0];
				level3_Button1Mapping["Scale"] = new Vector3(1,1,1);
				
				var level3_Button2Mapping = {};
				level3_Button2Mapping["Position"] = new Vector3(12f,topPlatformFloor, 0f);
				level3_Button2Mapping["Sprite"]   = "Materials/buttonGreen";
				level3_Button2Mapping["Script"]   = "InteractibleScript";
				level3_Button2Mapping["Variables"] = ["Next_Level3/Gate 2",3,4,0];
				level3_Button2Mapping["Scale"] = new Vector3(1,1,1);
		
			var level3_ButtonArray = [level3_Button1Mapping, level3_Button2Mapping];
	
				var level3_Gate2Mapping = {};
				level3_Gate2Mapping["Position"] = new Vector3(16f,bottomPlatformFloor,0);
				level3_Gate2Mapping["Sprite"]   = "Materials/gate";
				level3_Gate2Mapping["Script"]   = "PlatformScript";
				level3_Gate2Mapping["Variables"] = [];
				level3_Gate2Mapping["Scale"] = new Vector3(1,1,1);
				
				var level3_Gate1Mapping = {};
				level3_Gate1Mapping["Position"] = new Vector3(9f,topPlatformFloor,0);
				level3_Gate1Mapping["Sprite"]   = "Materials/gate";
				level3_Gate1Mapping["Script"]   = "PlatformScript";
				level3_Gate1Mapping["Variables"] = [];
				level3_Gate1Mapping["Scale"] = new Vector3(1,1,1);
				
			var level3_GateArray = [level3_Gate1Mapping, level3_Gate2Mapping];
		var level3_childrenMapping = {};
		level3_childrenMapping["Button"] = level3_ButtonArray;
		level3_childrenMapping["Gate"] = level3_GateArray;
	
	//LEVEL 1	
				var level2_Button1Mapping = {};
				level2_Button1Mapping["Position"] = new Vector3(6f,topPlatformFloor, 0f);
				level2_Button1Mapping["Sprite"]   = "Materials/buttonGreen";
				level2_Button1Mapping["Script"]   = "InteractibleScript";
				level2_Button1Mapping["Variables"] = ["Next_Level1/Gate 1",3,4,0];
				level2_Button1Mapping["Scale"] = new Vector3(1,1,1);
			var level2_ButtonArray = [level2_Button1Mapping];
	
				var level2_Gate1Mapping = {};
				level2_Gate1Mapping["Position"] = new Vector3(9f, bottomPlatformFloor,0f);
				level2_Gate1Mapping["Sprite"] = "Materials/gate";
				level2_Gate1Mapping["Script"]   = "PlatformScript";
				level2_Gate1Mapping["Variables"] = [];
				level2_Gate1Mapping["Scale"] = new Vector3(1,1,1);
				
			var level2_GateArray = [level2_Gate1Mapping];
		var level2_childrenMapping = {};
		level2_childrenMapping["Button"] = level2_ButtonArray;
		level2_childrenMapping["Gate"] = level2_GateArray;
	
	//LEVEL 2
	
				var level1_Button1Mapping = {};
				level1_Button1Mapping["Position"] = new Vector3(5f, topPlatformFloor, 0f);
				level1_Button1Mapping["Sprite"]   = "Materials/buttonGreen";
				level1_Button1Mapping["Script"]   = "InteractibleScript";//, ["Next_Level0/Gate 1",3,4,0]];//changedObj, Speed, Ydist, Xdist
				level1_Button1Mapping["Variables"] = ["Next_Level2/Gate 1",3,4,0];
				level1_Button1Mapping["Scale"] = new Vector3(1,1,1);
				
				var level1_Button2Mapping = {};
				level1_Button2Mapping["Position"] = new Vector3(12f,bottomPlatformFloor, 0f);
				level1_Button2Mapping["Sprite"]   = "Materials/buttonGreen";
				level1_Button2Mapping["Script"]   = "InteractibleScript";
				level1_Button2Mapping["Variables"] = ["Next_Level2/Gate 2",3,4,0];
				level1_Button2Mapping["Scale"] = new Vector3(1,1,1);
		
			var level1_ButtonArray = [level1_Button1Mapping, level1_Button2Mapping];
	
				var level1_Gate2Mapping = {};
				level1_Gate2Mapping["Position"] = new Vector3(16.7,bottomPlatformFloor,0);
				level1_Gate2Mapping["Sprite"]   = "Materials/gate";
				level1_Gate2Mapping["Script"]   = "PlatformScript";
				level1_Gate2Mapping["Variables"] = [];
				level1_Gate2Mapping["Scale"] = new Vector3(1,1,1);
				
				var level1_Gate1Mapping = {};
				level1_Gate1Mapping["Position"] = new Vector3(8.8,bottomPlatformFloor,0);
				level1_Gate1Mapping["Sprite"]   = "Materials/gate";
				level1_Gate1Mapping["Script"]   = "PlatformScript";
				level1_Gate1Mapping["Variables"] = [];
				level1_Gate1Mapping["Scale"] = new Vector3(1,1,1);
				
			var level1_GateArray = [level1_Gate1Mapping, level1_Gate2Mapping];
		var level1_childrenMapping = {};
		level1_childrenMapping["Button"] = level1_ButtonArray;
		level1_childrenMapping["Gate"] = level1_GateArray;
		
			//EXTRA CODE IN CASE WE WANT TO CREATE REFERENCE OBJECTS LATER
			var level0_Button1Mapping = {};
				level0_Button1Mapping["Position"] = new Vector3(1f, topPlatformFloor, 0f);
				level0_Button1Mapping["Sprite"]   = "Materials/buttonGreen";
				level0_Button1Mapping["Script"]   = "InteractibleScript";//, ["Next_Level0/Gate 1",3,4,0]];//changedObj, Speed, Ydist, Xdist
				level0_Button1Mapping["Variables"] = ["Next_Level0/Gate 1",3,4,0];
				level0_Button1Mapping["Scale"] = new Vector3(1,1,1);
			var level0_ButtonArray = [level0_Button1Mapping];
				var level0_Gate1Mapping = {};
				level0_Gate1Mapping["Position"] = new Vector3(1f,bottomPlatformFloor,0);
				level0_Gate1Mapping["Sprite"]   = "Materials/gate";
				level0_Gate1Mapping["Script"]   = "PlatformScript";
				level0_Gate1Mapping["Variables"] = [];
				level0_Gate1Mapping["Scale"] = new Vector3(1,1,1);
		
		var level0_childrenMapping = {};
				
	//LIST OF LEVELS
	var levelArrangement = [level0_childrenMapping, level2_childrenMapping, level1_childrenMapping, 
						level3_childrenMapping, level4_childrenMapping];
			
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
		var scaleTypeCast:Vector3;
		
		var reSizingCollisionBox:Vector3;
		
		for(var child: Transform in level_i.transform){
			name = child.name.Split();
	
			childType = name[0];
			childTypeIndex = parseInt(name[1])-1;		
			
			levelMap = levelArrangement[i];// gives map{type:list}
			childTypeArray = levelMap[childType];
			
			componentTypeMap = childTypeArray[childTypeIndex];
			
			//disconnect from parent so not rescaled
			child.gameObject.transform.parent = null;
			
			//SPRITE
			child.gameObject.GetComponent(SpriteRenderer).sprite = Resources.Load(componentTypeMap["Sprite"],Sprite);
			
			//rescale to world then scale to parent
			scaleTypeCast = componentTypeMap["Scale"];
	
			child.transform.localScale = scaleTypeCast;
			child.transform.parent = level_i.transform;
			
			reSizingCollisionBox = child.renderer.bounds.size;
			reSizingCollisionBox.x /= scaleTypeCast.x;
			reSizingCollisionBox.y /= scaleTypeCast.y;
			child.GetComponent(BoxCollider2D).size = (reSizingCollisionBox);
			
			
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
		
			if(childType=="Button"){
				if(child.gameObject.GetComponent(AudioSource)==null){
					child.gameObject.AddComponent(AudioSource);
				}
			}
		
		}
	}
	cameraWidth = mainCamera.orthographicSize*Screen.width/Screen.height - 5;
	nextLevel(levels[1].name);
	//Set Camera
	var xPos = Mathf.Abs(levels[1].transform.position.x - levels[0].transform.position.x)/2 + levels[0].transform.position.x;
	mainCamera.transform.position = new Vector3(xPos, screenHeight/2 , 0) + cameraOffset;
	
}


function instantiatePlatforms(){
	//PLATFORMS
	platforms = GameObject.FindGameObjectsWithTag("Platform");//get all platforms
	platforms.Sort(platforms, function(g1,g2) String.Compare(g1.name, g2.name));//sort alphabetically
	
	var reSizingCollisionBox:Vector3;
		
	//TODO RESIZE PLATFORM 0
	for(var i=0;i<platforms.Length;i++){
		var platform_i = platforms[i];
		
		//SET SPRITE 
		if(i<2){
			platform_i.GetComponent(SpriteRenderer).sprite = Resources.Load("Materials/platform1",Sprite);
		}else{platform_i.GetComponent(SpriteRenderer).sprite = Resources.Load("Materials/platform2",Sprite);}
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
		platform_i.transform.position = new Vector3(platform_i.renderer.bounds.extents.x, screenHeight*(1f+((i%3)/25f)-(i/2f)),0f);
		
	}
	platformPosFromStart = platform_i.transform.position.x+platform_i.renderer.bounds.extents.x;
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
		
		var posX = levels[1].transform.position.x + 2;
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
		
		if(player_i.gameObject.GetComponent(AudioSource)==null){
			player_i.gameObject.AddComponent(AudioSource);
		}
		
		
	}
}

function instantiateLevels(){

	//space between this and the next level - MUST KEEP EXTRA 0 AT THE END
	var levelSize=[15,23,28,23,28,46,0];

	//LEVELS	
	levels = GameObject.FindGameObjectsWithTag("Level");
	levels.Sort(levels, function(g1,g2) String.Compare(g1.name, g2.name));
	
	for(var i=0;i<levels.Length; i++){
		var level_i = levels[i];
		//SPRITE - WILL BE NONE FOR FINAL EDIT - SAME FOR MATERIAL
		level_i.GetComponent(SpriteRenderer).sprite = Resources.Load("Materials/PinkBox_50x50",Sprite);
		//SCRIPT
		if(level_i.GetComponent("LevelTrigger") == null){
			level_i.AddComponent("LevelTrigger");
		}
		
		//POSITION
		level_i.transform.localScale = new Vector3(1f,2*(platforms[0].transform.position.y-platforms[2].transform.position.y-(platforms[0].renderer.bounds.extents.y+platforms[2].renderer.bounds.extents.y)),1f);
		level_i.transform.position = new Vector3(positionFromStart, platforms[1].transform.position.y, 0f);
		positionFromStart += levelSize[i];
	}
}

function instantiateBackground(){

	bgs = GameObject.FindGameObjectsWithTag("Bg");
	bgs.Sort(bgs, function(g1,g2) String.Compare(g1.name, g2.name));
	var bg_i:GameObject;

	for(var i=0; i<bgs.Length; i++){
		bg_i = bgs[i];
		
		//SPRITE
		bg_i.GetComponent(SpriteRenderer).sprite = Resources.Load("Materials/player"+(i+1)+"_bg",Sprite);	
		
		//SCALE
		var y_scale_factor = 3;
		var x_scale_factor = 3;
		bg_i.transform.localScale = new Vector3(x_scale_factor, y_scale_factor ,1);
	
		//POSITION
		bg_i.transform.position = new Vector3(bg_i.renderer.bounds.extents.x, platforms[i+1].transform.position.y+bg_i.renderer.bounds.extents.y, 5+i);	
	
				
	}
	bgPosFromStart = bg_i.transform.position.x + bg_i.renderer.bounds.extents.x;
	


}


function extendPlatformAndBg(){

	var x:float = bgPosFromStart;
	
	//EXTEND PLATFORMS
	while(positionFromStart>platformPosFromStart){
	
		Instantiate(platforms[2],new Vector3(platformExtents.x+platformPosFromStart,platforms[2].transform.position.y,0), Quaternion.identity);
		Instantiate(platforms[1],new Vector3(platformExtents.x+platformPosFromStart,platforms[1].transform.position.y,0), Quaternion.identity);
		Instantiate(platforms[0],new Vector3(platformExtents.x+platformPosFromStart,platforms[0].transform.position.y,0), Quaternion.identity);
		
		platformPosFromStart+=platformExtents.x*2;
	
	}
	//EXTEND BG
	while(positionFromStart>bgPosFromStart){
		var bg_ref0 = bgs[0];
		var bg_ref1 = bgs[1];
		Instantiate(bg_ref0,new Vector3(bgPosFromStart+bg_ref0.renderer.bounds.extents.x,bg_ref0.transform.position.y,5), Quaternion.identity);
		Instantiate(bg_ref1,new Vector3(bgPosFromStart+bg_ref1.renderer.bounds.extents.x,bg_ref1.transform.position.y,6), Quaternion.identity);
		
		bgPosFromStart+=x;
	}
	

}



// Delete the first level - called from LevelTrigger.js
function nextLevel(l:String){
	if(levels[1].name==l && levels.Length>2){
		if(levels[1].name != "Next_Level1"){audio.PlayOneShot(checkPointAudio);;}
		else{audio.PlayOneShot(spawnAudio);}
		levels = levels[1:];
		
	}
	
	playerLeftLimit = levels[0].transform.position.x;
	var midpoint = (levels[1].transform.position.x-levels[0].transform.position.x)/2;
	cameraLeftLimit = levels[0].transform.position.x + Mathf.Min(cameraWidth,midpoint);
	cameraRightLimit = levels[1].transform.position.x - Mathf.Min(cameraWidth,midpoint);

}



function FixedUpdate () {

	//ADJUST CAMERA - Pan slowly to next level; center on players but stay within bounds of level.

	var y = mainCamera.transform.position.y;
	var desiredLocation = new Vector3((players[1].transform.position.x + players[0].transform.position.x)/2, y, -10);

	if(desiredLocation.x < cameraLeftLimit){
		desiredLocation.x = cameraLeftLimit;
	}else{
		if(desiredLocation.x > cameraRightLimit){
			desiredLocation.x = cameraRightLimit;
		}
	}
	
	//Set camera to the current lvl
	//TODO: IF YOU WANT THE CAMERA TO MOVE FASTER CHANGE THE 5 BELOW
	var xPos = Vector3.MoveTowards(mainCamera.transform.position, desiredLocation, 10*Time.deltaTime);
	mainCamera.transform.Translate(xPos-mainCamera.transform.position);
	//print(mainCamera.orthographicSize*Screen.width/Screen.height);
	
	players[0].transform.position.x = Mathf.Max(players[0].transform.position.x, playerLeftLimit); 
	players[1].transform.position.x = Mathf.Max(players[1].transform.position.x, playerLeftLimit);
	
	time -=Time.deltaTime;

	if(time<timeWarning && !inWarning){
		audio.Pause();
		audio.clip = endWarningAudio;
		audio.Play();
		inWarning = true;
	}
	if(time<=0){
		gameOver = true;
	}

}


function Update(){

	if(Input.GetKeyDown("escape")){
		isPaused = !isPaused;
		Time.timeScale = (Time.timeScale+1.0)%2;
	}

}

function OnGUI(){

	if(!isPaused){
		//RESET BUTTON
		if(GUI.Button(new Rect(Screen.width-121, 35, 121, 53),"RESET")){
		
			levels = GameObject.FindGameObjectsWithTag("Level");
			levels.Sort(levels, function(g1,g2) String.Compare(g1.name, g2.name));
			time = 100;
		
			//RESET PLAYERS POSITIONS
			players[0].transform.position = new Vector3(levels[1].transform.position.x+2, platforms[1].transform.position.y+1, 0f);
			players[1].transform.position = new Vector3(levels[1].transform.position.x+2, platforms[2].transform.position.y+1, 0f);
			
			
			//RESET CAMERA POSITION
			nextLevel(levels[1].name);
			mainCamera.transform.position.x = cameraLeftLimit;
		}
	
		//TIMER
		GUI.contentColor = Color.black;
		GUI.Label(new Rect(Screen.width/2-10,35, 120,50),time.ToString("F2"));
	}else{//TODO: PAUSE SCREEN
	
			isPaused = false;
			Time.timeScale = 1.0;
	
	}
	if(gameOver){//GAME OVER SCREEN
	
		var once = true;
		Time.timeScale = 0.0;
		if(once){
			audio.Pause();
			audio.clip = gameOverAudio;
			audio.Play();
			once = false;
		}
	
		GUI.contentColor = Color.black;
		GUI.Label(Rect(Screen.width/2-75,Screen.height/2,150,50),"Late for work again...");
		GUI.Label(Rect(Screen.width/2-75,Screen.height/2-50,150,50),"TIMES UP!");
		GUI.DrawTexture(Rect(Screen.width-200,Screen.height-50,200,50),Resources.Load("Materials/logo",Texture),ScaleMode.ScaleToFit);
		if(GUI.Button(Rect((Screen.width)/2-50,Screen.height/2+100, 100,50),"Retry")){
			levels = GameObject.FindGameObjectsWithTag("Level");
			levels.Sort(levels, function(g1,g2) String.Compare(g1.name, g2.name));
			time = 100;
		
			//RESET PLAYERS POSITIONS
			players[0].transform.position = new Vector3(levels[1].transform.position.x+2, platforms[1].transform.position.y+1, 0f);
			players[1].transform.position = new Vector3(levels[1].transform.position.x+2, platforms[2].transform.position.y+1, 0f);

			nextLevel(levels[1].name);
			mainCamera.transform.position.x = cameraLeftLimit;
			
			isPaused = false;
			Time.timeScale = 1.0;
			gameOver = false;
		}
	
	}
	
	
}


