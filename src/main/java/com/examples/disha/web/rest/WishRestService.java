package com.examples.disha.web.rest;

import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;

import com.examples.disha.domain.Wish;
import com.examples.disha.service.cintrf.WishService;
import com.google.inject.Inject;

/**
 * REST service to expose the data to the display in the UI grid.
 * 
 * @author Gaurav
 *
 */

@Path("wishes")
@Produces(MediaType.APPLICATION_JSON)
public class WishRestService {

	private final WishService wishService;

	@Inject
	public WishRestService(WishService wishService) {
		super();
		this.wishService = wishService;
	}

	@GET
	@Path("status")
	public boolean getStatus() {
		return wishService.getStatus();
	}

	@GET
	@Path("{wishId}")
	public Wish getWish(@PathParam("wishId") int wishId) {
		return wishService.getWishById(wishId);
	}

	@GET
	@Path("getAll")
	public List<Wish> getAllWishes() {
		List<Wish> allWishes = new ArrayList<Wish>();
		allWishes = wishService.getAllWishes();
		return allWishes;
	}

	@GET
	@Path("getByRacfId/{employeeRacfId}")
	public List<Wish> getAllWishesByRacfId(
			@PathParam("employeeRacfId") String employeeRacfId) {
		List<Wish> allWishes = new ArrayList<Wish>();
		allWishes = wishService.getAllWishesByRacfId(employeeRacfId);
		return allWishes;
	}

	@POST
	@Path("registerWish/{wishId}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Wish registerForWish(Wish wish) {
		Wish registeredWish = new Wish();
		int wishId = wishService.registerForWish(wish);
		registeredWish = wishService.getWishById(wishId);
		return registeredWish;
	}

	@POST
	@Path("createWish/{wishId}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Wish createWish(Wish wish) {
		Wish registeredWish = new Wish();
		int wishId = wishService.registerForWish(wish);
		registeredWish = wishService.getWishById(wishId);
		return registeredWish;
	}

}
