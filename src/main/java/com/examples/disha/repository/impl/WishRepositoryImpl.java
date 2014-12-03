package com.examples.disha.repository.impl;

import java.util.ArrayList;
import java.util.List;

import com.examples.disha.database.DBInsertOperations;
import com.examples.disha.database.DBSelectOperations;
import com.examples.disha.database.DBUpdateOperations;
import com.examples.disha.domain.Wish;
import com.examples.disha.repository.contract.WishRepository;
import com.google.inject.Singleton;

@Singleton
public class WishRepositoryImpl implements WishRepository {

	private DBSelectOperations dbso = new DBSelectOperations();
	private DBUpdateOperations dbuo = new DBUpdateOperations();
	private DBInsertOperations dbio = new DBInsertOperations();

	@Override
	public List<Wish> getWishes() {
		String dataBase = "testdb";
		this.dbso.getAllWishes(dataBase);
		return null;
	}

	@Override
	public Wish getWishById(int wishId) {
		String dataBase = "testdb";
		return this.dbso.getWishById(wishId, dataBase);
	}

	@Override
	public List<Wish> getAllWishes() {
		List<Wish> allWishes = new ArrayList<Wish>();
		String dataBase = "testdb";
		allWishes = this.dbso.getAllWishes(dataBase);
		return allWishes;
	}

	@Override
	public List<Wish> getAllWishesByRacfId(String employeeRacfId) {
		List<Wish> allWishes = new ArrayList<Wish>();
		String dataBase = "testdb";
		allWishes = this.dbso.getAllWishesByRacfId(employeeRacfId, dataBase);
		return allWishes;
	}

	@Override
	public int registerForWish(Wish wish) {
		String dataBase = "testdb";
		int updatedWishId = this.dbuo.registerForWish(wish, dataBase);
		return updatedWishId;
	}
	
	@Override
	public int createWish(Wish wish) {
		String dataBase = "testdb";
		int createdWishId = this.dbio.insertWish(wish, dataBase);
		return createdWishId;
	}

}
