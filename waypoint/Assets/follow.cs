using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class follow : MonoBehaviour {

	public GameObject _target;
	public float moveSpeed = 0.6f;
	public float RotationSpeed = 20;

	// Use this for initialization
	void Start () {
		
	}
	
	// Update is called once per frame
	void Update () {

		transform.position = Vector3.Lerp(transform.position, _target.transform.position, Time.deltaTime / moveSpeed);

		//find the vector pointing from our position to the target
		Vector3 _direction = (_target.transform.position - transform.position).normalized;
		//create the rotation we need to be in to look at the target
		Quaternion _lookRotation = Quaternion.LookRotation (_direction);
		//rotate us over time according to speed until we are in the required rotation
		transform.rotation = Quaternion.Slerp (transform.rotation, _lookRotation, Time.deltaTime * RotationSpeed);
		
	}
}
	