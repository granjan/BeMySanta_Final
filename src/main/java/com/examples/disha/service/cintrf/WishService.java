package com.examples.disha.service.cintrf;

import java.util.List;

import com.examples.disha.domain.CompleteRequest;
import com.examples.disha.domain.Volunteer;
import com.examples.disha.domain.Wish;

public interface WishService {

	public boolean getStatus();

	public Wish getWishById(int id);

	List<Wish> getAllWishes();

	List<Wish> getAllWishesByRacfId(String employeeRacfId);

	int registerForWish(Wish wish);

	int createWish(Wish wish);

	List<Wish> getAllRegisteredWishes();

	List<Wish> getAllIncompleteWishes();

	List<Wish> getAllCompleteWishes();

//	Wish completeWish(int wishId, String userName, String password);

	boolean validateVolunteer(String userName, String password);

	Wish completeWish(CompleteRequest request);

	List<Volunteer> getAllVolunteers();
}
