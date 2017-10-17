/* AiRacer (UNITY C#)
* 
* AiRacer:
* 
* USE:
* - To orchestrate the racer ai.
* - This class has waypoints and move towards classes.
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

using UnityEngine;
using System.Collections;

public class AiRacer : MonoBehaviour
{

	public class Racer
	{
		public GameObject wayPointTarget;
		public bool isAllowedToRace;
				
		public Racer (bool _isAllowedToRace)
		{
			isAllowedToRace = _isAllowedToRace;
		}

		public Racer ()
		{
			isAllowedToRace = false;
		}
	}
		
	public Racer racer = new Racer(false);

	void Start()
	{
		racer.isAllowedToRace = true;
	}
		
	bool wayPointReached(GameObject _target){

		Vector3 currentPosition = transform.position;

		bool _wayPointReached = false;

		float distance = (currentPosition - _target.transform.position).sqrMagnitude;

		if (distance < Random.Range(1, 2)) { // TODO UPDATE AND RANDOMISE VALUE HERE.
			_wayPointReached = true;
		}

		return _wayPointReached;

	}

	void race () {

		AiWayPointsSequential _aiWayPointsSequential = GetComponent<AiWayPointsSequential>();
		racer.wayPointTarget = _aiWayPointsSequential.getCurrentWayPoint ();
	
		MoveTowards _moveTowards = GetComponent<MoveTowards>();
		_moveTowards.moveToTarget (racer.wayPointTarget);

	}

	void Update () {

		if (racer.isAllowedToRace) {

			race ();
				
		}
			
	}

}
