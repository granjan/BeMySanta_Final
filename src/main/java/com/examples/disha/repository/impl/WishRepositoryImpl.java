package com.examples.disha.repository.impl;

import java.util.ArrayList;
import java.util.List;

import com.examples.disha.database.DBCompleteWishByVolunteer;
import com.examples.disha.database.DBInsertOperations;
import com.examples.disha.database.DBSelectOperations;
import com.examples.disha.database.DBUpdateOperations;
import com.examples.disha.domain.Volunteer;
import com.examples.disha.domain.Wish;
import com.examples.disha.domain.WishesStatusCount;
import com.examples.disha.repository.contract.WishRepository;
import com.google.inject.Singleton;

@Singleton
public class WishRepositoryImpl implements WishRepository {

	private DBSelectOperations dbso = new DBSelectOperations();
	private DBUpdateOperations dbuo = new DBUpdateOperations();
	private DBInsertOperations dbio = new DBInsertOperations();
	private DBCompleteWishByVolunteer dbcom = new DBCompleteWishByVolunteer();
	
	private String dataBase = "testdb";//change this to final db when portal goes live;

	@Override
	public List<Wish> getWishes() {
		this.dbso.getAllWishes(dataBase);
		return null;
	}

	@Override
	public Wish getWishById(int wishId) {
		return this.dbso.getWishById(wishId, dataBase);
	}

	@Override
	public List<Wish> getAllWishes() {
		List<Wish> allWishes = new ArrayList<Wish>();
		allWishes = this.dbso.getAllWishes(dataBase);
		return allWishes;
	}

	@Override
	public List<Wish> getAllWishesByRacfId(String employeeRacfId) {
		List<Wish> allWishes = new ArrayList<Wish>();
		allWishes = this.dbso.getAllWishesByRacfId(employeeRacfId, dataBase);
		return allWishes;
	}

	@Override
	public List<Wish> getAllInompleteWishes() {
		List<Wish> allWishes = new ArrayList<Wish>();
		allWishes = this.dbso.getAllInompleteWishes(dataBase);
		return allWishes;
	}

	@Override
	public List<Wish> getAllRegisteredWishes() {
		List<Wish> allWishes = new ArrayList<Wish>();
		allWishes = this.dbso.getAllRegisteredWishes(dataBase);
		return allWishes;
	}

	@Override
	public List<Wish> getAllCompleteWishes() {
		List<Wish> allWishes = new ArrayList<Wish>();
		allWishes = this.dbso.getAllCompleteWishes(dataBase);
		return allWishes;
	}

	@Override
	public int registerForWish(Wish wish) {
		int updatedWishId = this.dbuo.registerForWish(wish, dataBase);
		return updatedWishId;
	}

	@Override
	public int createWish(Wish wish) {
		int createdWishId = this.dbio.insertWish(wish, dataBase);
		return createdWishId;
	}

	@Override
	public Wish completeWish(int wishId, String userName, String password) {
		boolean volunteerCheck = this.dbcom.checkIfVolunteerExists(userName,
				password, dataBase);
		if (volunteerCheck) {
			int completedWishId = this.dbcom.completeWish(wishId, userName,
					dataBase);
			Wish completedWish = this.dbso.getWishById(completedWishId,
					dataBase);
			return completedWish;
		} else {
			return null;
		}
	}
	
	@Override
	public boolean validateVolunteer(String userName, String password) {
		boolean volunteerCheck = this.dbcom.checkIfVolunteerExists(userName,
				password, dataBase);
		if (volunteerCheck) {
			return volunteerCheck;
		} else {
			return volunteerCheck;
		}
	}

	@Override
	public List<Volunteer> getAllVolunteers() {
		List<Volunteer> allVolunteers = new ArrayList<Volunteer>();
		allVolunteers = this.dbso.getAllVolunteers(dataBase);
		return allVolunteers;
	}

	@Override
	public WishesStatusCount getWishesCount() {
		WishesStatusCount count = new WishesStatusCount();
		count = this.dbso.getWishesCount(dataBase);
		return count;
	}
}
