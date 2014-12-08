package com.examples.disha.repository.contract;

import java.util.List;

import com.examples.disha.domain.Wish;

public interface WishRepository {

	List<Wish> getWishes();

	/**
	 * Returns a Wish given its id
	 * 
	 * @param id
	 * @return
	 */
	Wish getWishById(int id);

	List<Wish> getAllWishes();

	List<Wish> getAllWishesByRacfId(String employeeRacfId);

	int registerForWish(Wish wish);

	int createWish(Wish wish);

	List<Wish> getAllInompleteWishes();

	List<Wish> getAllRegisteredWishes();

	List<Wish> getAllCompleteWishes();
}
