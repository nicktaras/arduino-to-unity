/* FindNearestByTag (UNITY C#)
* 
* DESCRIPTION: 
* This class can be applied to find the nearest gameobject by tag name to the gameobject the script is applied to.
*
* USAGE: 
* Attach script to a gameobject. To add a tag name or transform - change vars to public and change function params.
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

public class FindNearestByTag : MonoBehaviour {

	GameObject _closestObject;
	Transform _transform; 
	string _tagName;

	public GameObject getNearestObjectByTag(Transform _transform, string _tagName){

		GameObject[] objectsByTagName;
		objectsByTagName = GameObject.FindGameObjectsWithTag(_tagName);

		Vector3 currentPosition = _transform.position;

		_closestObject = GameObject.FindGameObjectsWithTag(_tagName)[0];

		float closestDistance = Mathf.Infinity;

		foreach (GameObject objectByTagName in objectsByTagName) {
			float distance = (currentPosition - objectByTagName.transform.position).sqrMagnitude;
			if(distance < closestDistance){
				closestDistance = distance;
				_closestObject = objectByTagName;
			}
		}
			
		return _closestObject;

	}

}

