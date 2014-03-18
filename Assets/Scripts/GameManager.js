#pragma strict

var player1: Transform;
var player2: Transform;

var mainCamera : Camera;
var cameraOffset : Vector3 = new Vector3(0,5,-10);

function Start () {

	player1 = player1;
	player2 = player2;
}

function Update () {//TODO: SETP BOUNDS ON CAMERA

	var xPos = Mathf.Abs(player1.position.x-player2.position.x)/2 + Mathf.Min(player1.position.x,player2.position.x); 
	mainCamera.transform.position = new Vector3(xPos, 5 , 0) + cameraOffset;

}