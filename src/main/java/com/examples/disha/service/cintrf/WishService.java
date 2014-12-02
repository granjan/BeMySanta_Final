package com.examples.disha.service.cintrf;

import java.util.List;

import com.examples.disha.domain.Wish;

public interface WishService {

	public boolean getStatus();

	public Wish getWishById(int id);

	List<Wish> getAllWishes();
}
