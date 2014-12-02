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
}
