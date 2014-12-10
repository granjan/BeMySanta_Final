package com.examples.disha.domain;

public class Volunteer {

	int volunteerId;
	String volunteerName;
	String floor;

	public Volunteer(int volunteerId, String volunteerName, String floor) {
		super();
		this.volunteerId = volunteerId;
		this.volunteerName = volunteerName;
		this.floor = floor;
	}

	public int getVolunteerId() {
		return volunteerId;
	}

	public void setVolunteerId(int volunteerId) {
		this.volunteerId = volunteerId;
	}

	public String getVolunteerName() {
		return volunteerName;
	}

	public void setVolunteerName(String volunteerName) {
		this.volunteerName = volunteerName;
	}

	public String getFloor() {
		return floor;
	}

	public void setFloor(String floor) {
		this.floor = floor;
	}

}
