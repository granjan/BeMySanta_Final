package com.examples.disha.domain;

public class WishesStatusCount {
	private int completeWishes;
	private int incompleteWishes;
	private int registeredWishes;

	public WishesStatusCount() {
		super();
	}

	public WishesStatusCount(int completeWishes, int incompleteWishes,
			int registeredWishes) {
		super();
		this.completeWishes = completeWishes;
		this.incompleteWishes = incompleteWishes;
		this.registeredWishes = registeredWishes;
	}

	public int getCompleteWishes() {
		return completeWishes;
	}

	public void setCompleteWishes(int completeWishes) {
		this.completeWishes = completeWishes;
	}

	public int getIncompleteWishes() {
		return incompleteWishes;
	}

	public void setIncompleteWishes(int incompleteWishes) {
		this.incompleteWishes = incompleteWishes;
	}

	public int getRegisteredWishes() {
		return registeredWishes;
	}

	public void setRegisteredWishes(int registeredWishes) {
		this.registeredWishes = registeredWishes;
	}

}
