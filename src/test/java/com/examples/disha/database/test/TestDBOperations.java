package com.examples.disha.database.test;

import static org.junit.Assert.*;

import java.util.ArrayList;
import java.util.List;

import org.junit.Test;

import com.examples.disha.database.DBCompleteWishByVolunteer;
import com.examples.disha.database.DBInsertOperations;
import com.examples.disha.database.DBSelectOperations;
import com.examples.disha.database.DBUpdateOperations;
import com.examples.disha.domain.Wish;

public class TestDBOperations {

	@Test
	public void testInsertWish() {
		String dataBase = "testdb";
		Wish wish = new Wish(20, "test", "test", "test", "test", "INCOMPLETE",
				"test", "test", "test", "test", "test", "test");
		Wish wish2 = new Wish(21, "test", "test", "test", "test", "INCOMPLETE",
				"test", "test", "gaurav", "test", "test", dataBase);
		Wish emptyWish = new Wish(22, "test", "test", "test", "test",
				"INCOMPLETE", "test", "", "", "", "", "");
		Wish emptyWish1 = new Wish(23, "test", "test", "test", "test",
				"INCOMPLETE", "test", "", "", "", "", "");
		Wish emptyWish2 = new Wish(24, "test", "test", "test", "test",
				"INCOMPLETE", "test", "", "", "", "", "");
		Wish emptyWish3 = new Wish(25, "test", "test", "test", "test",
				"INCOMPLETE", "test", "", "", "", "", "");
		Wish emptyWish4 = new Wish(26, "test", "test", "test", "test",
				"INCOMPLETE", "test", "", "", "", "", "");
		Wish emptyWish5 = new Wish(27, "test", "test", "test", "test",
				"INCOMPLETE", "test", "", "", "", "", "");
		DBInsertOperations dbio = new DBInsertOperations();
		dbio.insertWish(wish, dataBase);
		dbio.insertWish(wish2, dataBase);
		dbio.insertWish(emptyWish, dataBase);
		dbio.insertWish(emptyWish1, dataBase);
		dbio.insertWish(emptyWish2, dataBase);
		dbio.insertWish(emptyWish3, dataBase);
		dbio.insertWish(emptyWish4, dataBase);
		dbio.insertWish(emptyWish5, dataBase);
	}

	@Test
	public void testGetAllWihes() {
		String dataBase = "testdb";
		List<Wish> allWishes = new ArrayList<Wish>();
		DBSelectOperations dbso = new DBSelectOperations();
		allWishes = dbso.getAllWishes(dataBase);
		assertNotNull(allWishes);
		assertEquals(2, allWishes.size());
	}

	@Test
	public void testGetAllWishesByRacfID() {
		String dataBase = "testdb";
		String employeeRacfId = "gaurav";
		List<Wish> allWishes = new ArrayList<Wish>();
		DBSelectOperations dbso = new DBSelectOperations();
		allWishes = dbso.getAllWishesByRacfId(employeeRacfId, dataBase);
		assertNotNull(allWishes);
		assertEquals(1, allWishes.size());
	}

	@Test
	public void testGetWishByWishID() {
		String dataBase = "testdb";
		int wishId = 20;
		Wish wish = new Wish();
		DBSelectOperations dbso = new DBSelectOperations();
		wish = dbso.getWishById(wishId, dataBase);
		assertNotNull(wish);
	}

	@Test
	public void testRegisterWish() {
		String dataBase = "testdb";
		int wishId;
		Wish wish = new Wish(20, "test", "test", "test", "test", "INCOMPLETE",
				"test", "gaurav", "gaurav", "gaurav", "gaurav", "gaurav");
		DBUpdateOperations dbuo = new DBUpdateOperations();
		wishId = dbuo.registerForWish(wish, dataBase);
		assertNotNull(wishId);
		assertTrue(wishId == 20);
	}

	@Test
	public void checkIfVolunteerExists() {
		String dataBase = "testdb";
		DBCompleteWishByVolunteer dbco = new DBCompleteWishByVolunteer();
		boolean check = dbco.checkIfVolunteerExists("admin", "admin", dataBase);
		assertTrue(check);
	}

	@Test
	public void testCompleteWishProcess() {
		String dataBase = "testdb";
		Wish wish = new Wish(50, "test", "test", "test", "test", "INCOMPLETE",
				"test", "test", "test", "test", "test", "test");
		DBInsertOperations dbio = new DBInsertOperations();
		dbio.insertWish(wish, dataBase);
		DBCompleteWishByVolunteer dbco = new DBCompleteWishByVolunteer();
		boolean check = dbco.checkIfVolunteerExists("admin", "admin", dataBase);
		int wishID = dbco.completeWish(50, "admin", dataBase);
		assertTrue(wishID != -1);
	}
}
