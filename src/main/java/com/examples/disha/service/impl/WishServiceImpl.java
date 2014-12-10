package com.examples.disha.service.impl;

import java.util.ArrayList;
import java.util.List;

import com.examples.disha.domain.CompleteRequest;
import com.examples.disha.domain.Volunteer;
import com.examples.disha.domain.Wish;
import com.examples.disha.repository.contract.WishRepository;
import com.examples.disha.service.cintrf.WishService;
import com.google.inject.Inject;
import com.google.inject.Singleton;

@Singleton
public class WishServiceImpl implements WishService {

	private final WishRepository wishRepository;

	@Inject
	public WishServiceImpl(WishRepository wishRepository) {
		super();
		this.wishRepository = wishRepository;
	}

	@Override
	public boolean getStatus() {
		return true;
	}

	@Override
	public Wish getWishById(int wishId) {
		return wishRepository.getWishById(wishId);
	}

	@Override
	public List<Wish> getAllWishes() {
		List<Wish> allWishes = new ArrayList<Wish>();
		allWishes = wishRepository.getAllWishes();
		return allWishes;
	}

	@Override
	public List<Wish> getAllRegisteredWishes() {
		List<Wish> allWishes = new ArrayList<Wish>();
		allWishes = wishRepository.getAllRegisteredWishes();
		return allWishes;
	}

	@Override
	public List<Wish> getAllIncompleteWishes() {
		List<Wish> allWishes = new ArrayList<Wish>();
		allWishes = wishRepository.getAllInompleteWishes();
		return allWishes;
	}

	@Override
	public List<Wish> getAllCompleteWishes() {
		List<Wish> allWishes = new ArrayList<Wish>();
		allWishes = wishRepository.getAllCompleteWishes();
		return allWishes;
	}

	@Override
	public List<Wish> getAllWishesByRacfId(String employeeRacfId) {
		List<Wish> allWishes = new ArrayList<Wish>();
		allWishes = wishRepository.getAllWishesByRacfId(employeeRacfId);
		return allWishes;
	}

	@Override
	public int registerForWish(Wish wish) {
		int updatedWishId = wishRepository.registerForWish(wish);
		return updatedWishId;
	}

	@Override
	public int createWish(Wish wish) {
		int createdWishId = wishRepository.createWish(wish);
		return createdWishId;
	}

	@Override
	public Wish completeWish(CompleteRequest request) {
		Wish createdWishId = wishRepository.completeWish(request.getWishId(),
				request.getUsername(), request.getPassword());
		return createdWishId;
	}

	@Override
	public boolean validateVolunteer(String userName, String password) {
		boolean volunteerValidated = wishRepository.validateVolunteer(userName,
				password);
		return volunteerValidated;
	}

	@Override
	public List<Volunteer> getAllVolunteers() {
		List<Volunteer> allVolunteers = new ArrayList<Volunteer>();
		allVolunteers = wishRepository.getAllVolunteers();
		return allVolunteers;
	}

}
