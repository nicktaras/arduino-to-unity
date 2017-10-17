/* aiController (UNITY C#)
* 
* MoveTowards:
* 
* USE:
* - To move the transform this script is attached to towards a specific game object.
* - Use the public method moveToTarget
* 
* PARAMS:
* - GameObject _target
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

public class MoveTowards : MonoBehaviour {

	public float speed;
	public float RotationSpeed = 1;

	public void moveToTarget(GameObject _target) {
				
		float step = speed * Time.deltaTime;
		transform.position = Vector3.MoveTowards (transform.position, _target.transform.position, step);

		//find the vector pointing from our position to the target
		Vector3 _direction = (_target.transform.position - transform.position).normalized;

		//create the rotation we need to be in to look at the target
		Quaternion _lookRotation = Quaternion.LookRotation (_direction);
		//rotate us over time according to speed until we are in the required rotation
		transform.rotation = Quaternion.Slerp (transform.rotation, _lookRotation, Time.deltaTime * RotationSpeed);

	}
		
}
	