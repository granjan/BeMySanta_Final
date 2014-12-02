package com.examples.disha.service.impl;

import java.util.ArrayList;
import java.util.List;

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
}
