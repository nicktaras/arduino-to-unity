/* AiWayPoints (UNITY C#)
* 
* AiWayPoints:
* 
* USE:
* - To orchestrate the way points of a racer.
* - Attach script to a racer (typically for ai, but could be adapted to ensure players cross all way points to complete a race)
* 
* PARAMS:
* - tagName of way point to use
* 
* TEST: 
* tbc
* 
* AUTHOR: 
* Nicholas Taras
*
*/

using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class AiWayPointsSequential : MonoBehaviour {

	public string tagName;

	class WayPointController
	{
		public GameObject[] objects;
		public bool[] checkList;
		public string tagName;
		public int currentIndex;

		public WayPointController ()
		{
			currentIndex = 0;
		}
	}

	WayPointController vm = new WayPointController();

	public GameObject getCurrentWayPoint(){
		return vm.objects[vm.currentIndex];
	}

	void Start(){

		vm.tagName = tagName;
		vm.objects = GameObject.FindGameObjectsWithTag(vm.tagName);
		initialiseWayPointCheckList ();

	}

	void Update(){

		if (vm.checkList[vm.currentIndex] == false) {

			GameObject _target = vm.objects [vm.currentIndex]; // SHOULD FIND THE CLOSEST.

			bool _hasReachedWayPoint = wayPointReached (_target); 

			if(_hasReachedWayPoint == true) { 

				setWayPointFlag (_hasReachedWayPoint);
				setNextSequencialWayPoint ();

			}

		}

	}

	void initialiseWayPointCheckList(){

		int _lengthOfWayPoints = vm.objects.Length;
		vm.checkList = new bool[_lengthOfWayPoints];
		int _index = 0;

		foreach (GameObject objectByTagName in vm.objects) {
			vm.checkList [_index] = false;
			_index++;
		}

	}

	void setWayPointFlag(bool _hasReachedWayPoint){
		vm.checkList [vm.currentIndex] = _hasReachedWayPoint;
	}

	void setNextSequencialWayPoint(){

		if(vm.currentIndex >= vm.checkList.Length -1) {

			initialiseWayPointCheckList ();
			vm.currentIndex = 0;

		} else {

			vm.checkList[vm.currentIndex] = false;
			vm.currentIndex ++;

		}

	}

	void setNextRandomWayPoint(){
		vm.currentIndex = Random.Range (0, vm.checkList.Length-1);
	}

	bool allWayPointsVisited(){

		int _lengthOfWayPoints = vm.objects.Length;
		int _index = 0;
		int _visitedLength = 0;

		foreach (GameObject objectByTagName in vm.objects) {
			if (vm.checkList [_index] == true) {
				_visitedLength++;
			}
			_index++;
		}

		bool _allVisited = (_visitedLength == vm.objects.Length);

		return _allVisited;

	}

	bool wayPointReached(GameObject _target){

		bool _wayPointReached = false;

		float distance = (transform.position - _target.transform.position).sqrMagnitude;

		if (distance < Random.Range(2, 7)) {
			_wayPointReached = true;
		}

		return _wayPointReached;

	}

}
