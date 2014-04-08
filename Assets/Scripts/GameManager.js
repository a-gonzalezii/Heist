#pragma strict

var player1: Transform;
var player2: Transform;

var mainCamera : Camera;
var cameraOffset : Vector3 = new Vector3(0,0,-10);

var platform0: Transform;
var platform1: Transform;
var platform2: Transform;

function Start () {//TODO: AUTOCONFIG PLATFORM POSITIONS
	platform0.position = new Vector3 (0f, mainCamera.ScreenToWorldPoint(new Vector3(0f, Screen.height,0f)).y ,0f);
	platform1.position = new Vector3 (0f, mainCamera.ScreenToWorldPoint(new Vector3(0f, Screen.height/2,0f)).y+2,0f);
	platform2.position = new Vector3 (0f, mainCamera.ScreenToWorldPoint(new Vector3(0f, 0f, 0f)).y+2,0f);
	
	player1.position = new Vector3(0f, platform1.position.y+1, 0f);
	player2.position = new Vector3(0f, platform2.position.y+1, 0f);
	
}

function Update () {//TODO: SETUP BOUNDS ON CAMERA

	var xPos = Mathf.Abs(player1.position.x-player2.position.x)/2 + Mathf.Min(player1.position.x,player2.position.x); 
	mainCamera.transform.position = new Vector3(xPos, 5 , 0) + cameraOffset;

}
