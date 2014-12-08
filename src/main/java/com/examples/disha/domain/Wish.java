package com.examples.disha.domain;

import java.io.Serializable;

import javax.persistence.*;
import javax.xml.bind.annotation.XmlRootElement;

/**
 * Wish Entity that will hold all the data.
 * 
 * @author Gaurav
 *
 */
@Entity
@XmlRootElement
public class Wish implements Serializable {
	private static final long serialVersionUID = 1L;

	// @Id
	// @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "wishId")
	// @SequenceGenerator(name = "wishId", sequenceName = "wishId")
	// private Long wishId;

	private int wishId;

	// Child Details

	private String childName;
	private String childAge;
	private String childGender;
	private String charityName;
	private String wish;
	private String wishStatus;

	// Employee Details
	private String employeeName;
	private String employeeEmail;
	private String employeeRacfId;
	private String employeeBuilding;
	private String employeeDeskNumber;

	public Wish() {

	}

	public Wish(int wishId, String childName, String childAge,
			String childGender, String charityName, String wish,
			String wishStatus, String employeeName, String employeeEmail,
			String employeeRacfId, String employeeBuilding,
			String employeeDeskNumber) {
		super();
		this.wishId = wishId;
		this.childName = childName;
		this.childAge = childAge;
		this.childGender = childGender;
		this.charityName = charityName;
		this.wish = wish;
		this.wishStatus = wishStatus;
		this.employeeName = employeeName;
		this.employeeEmail = employeeEmail;
		this.employeeRacfId = employeeRacfId;
		this.employeeBuilding = employeeBuilding;
		this.employeeDeskNumber = employeeDeskNumber;
	}

	public int getWishId() {
		return wishId;
	}

	public void setWishId(int wishId) {
		this.wishId = wishId;
	}

	public String getChildName() {
		return childName;
	}

	public void setChildName(String childName) {
		this.childName = childName;
	}

	public String getChildAge() {
		return childAge;
	}

	public void setChildAge(String childAge) {
		this.childAge = childAge;
	}

	public String getChildGender() {
		return childGender;
	}

	public void setChildGender(String childGender) {
		this.childGender = childGender;
	}

	public String getCharityName() {
		return charityName;
	}

	public void setCharityName(String charityName) {
		this.charityName = charityName;
	}

	public String getWish() {
		return wish;
	}

	public void setWish(String wish) {
		this.wish = wish;
	}

	public String getEmployeeName() {
		return employeeName;
	}

	public void setEmployeeName(String employeeName) {
		this.employeeName = employeeName;
	}

	public String getEmployeeRacfId() {
		return employeeRacfId;
	}

	public void setEmployeeRacfId(String employeeRacfId) {
		this.employeeRacfId = employeeRacfId;
	}

	public String getEmployeeBuilding() {
		return employeeBuilding;
	}

	public void setEmployeeBuilding(String employeeBuilding) {
		this.employeeBuilding = employeeBuilding;
	}

	public String getWishStatus() {
		return wishStatus;
	}

	public void setWishStatus(String wishStatus) {
		this.wishStatus = wishStatus;
	}

	public String getEmployeeDeskNumber() {
		return employeeDeskNumber;
	}

	public void setEmployeeDeskNumber(String employeeDeskNumber) {
		this.employeeDeskNumber = employeeDeskNumber;
	}

	public String getEmployeeEmail() {
		return employeeEmail;
	}

	public void setEmployeeEmail(String employeeEmail) {
		this.employeeEmail = employeeEmail;
	}
}
