package com.examples.disha.database;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import com.examples.disha.domain.Wish;

public class DBSelectOperations {

	private final String WISH_ID = "wishId";
	private final String CHILDNAME = "childName";
	private final String CHILDAGE = "childAge";
	private final String CHILDGENDER = "childGender";
	private final String CHARITYNAME = "charityName";
	private final String WISH = "wish";
	private final String WISHSTATUS = "wishStatus";
	private final String EMPLOYEENAME = "employeeName";
	private final String EMPLOYEEEMAIL = "employeeEmail";
	private final String EMPLOYEERACFID = "employeeRacfId";
	private final String EMPLOYEEBUILDING = "employeeBuilding";
	private final String EMPLOYEEDESKNUMBER = "employeeDeskNumber";
	private final String REGISTERED = "REGISTERED";
	private final String INCOMPLETE = "INCOMPLETE";
	private final String COMPLETE = "COMPLETE";

	public List<Wish> getAllWishes(String dataBase) {

		List<Wish> allWishes = new ArrayList<Wish>();

		try {
			Connection connection = new CreateConnection()
					.getConnection(dataBase);
			PreparedStatement ps = connection
					.prepareStatement("select * from wish");
			ResultSet rs = ps.executeQuery();
			while (rs.next()) {
				Wish wish = new Wish(rs.getInt(WISH_ID),
						rs.getString(CHILDNAME), rs.getString(CHILDAGE),
						rs.getString(CHILDGENDER), rs.getString(CHARITYNAME),
						rs.getString(WISH), rs.getString(WISHSTATUS),
						rs.getString(EMPLOYEENAME),
						rs.getString(EMPLOYEEEMAIL),
						rs.getString(EMPLOYEERACFID),
						rs.getString(EMPLOYEEBUILDING),
						rs.getString(EMPLOYEEDESKNUMBER));

				allWishes.add(wish);
			}

			connection.close();
		} catch (Exception e) {
			System.err.println("Cannot connect to database server");
			e.printStackTrace();
		}

		return allWishes;
	}

	public List<Wish> getAllWishesByRacfId(String employeeRacfId,
			String dataBase) {

		List<Wish> allWishes = new ArrayList<Wish>();

		try {
			Connection connection = new CreateConnection()
					.getConnection(dataBase);

			String selectSql = "select * from wish where employeeRacfId = ?";

			PreparedStatement ps = connection.prepareStatement(selectSql);
			ps.setString(1, employeeRacfId);
			ResultSet rs = ps.executeQuery();
			while (rs.next()) {
				Wish wish = new Wish(rs.getInt(WISH_ID),
						rs.getString(CHILDNAME), rs.getString(CHILDAGE),
						rs.getString(CHILDGENDER), rs.getString(CHARITYNAME),
						rs.getString(WISH), rs.getString(WISHSTATUS),
						rs.getString(EMPLOYEENAME),
						rs.getString(EMPLOYEEEMAIL),
						rs.getString(EMPLOYEERACFID),
						rs.getString(EMPLOYEEBUILDING),
						rs.getString(EMPLOYEEDESKNUMBER));

				allWishes.add(wish);
			}

			connection.close();
		} catch (Exception e) {
			System.err.println("Cannot connect to database server");
			e.printStackTrace();
		}

		return allWishes;
	}

	public List<Wish> getAllCompleteWishes(String dataBase) {

		List<Wish> allWishes = new ArrayList<Wish>();

		try {
			Connection connection = new CreateConnection()
					.getConnection(dataBase);

			String selectSql = "select * from wish where wishStatus = ?";

			PreparedStatement ps = connection.prepareStatement(selectSql);
			ps.setString(1, COMPLETE);
			ResultSet rs = ps.executeQuery();
			while (rs.next()) {
				Wish wish = new Wish(rs.getInt(WISH_ID),
						rs.getString(CHILDNAME), rs.getString(CHILDAGE),
						rs.getString(CHILDGENDER), rs.getString(CHARITYNAME),
						rs.getString(WISH), rs.getString(WISHSTATUS),
						rs.getString(EMPLOYEENAME),
						rs.getString(EMPLOYEEEMAIL),
						rs.getString(EMPLOYEERACFID),
						rs.getString(EMPLOYEEBUILDING),
						rs.getString(EMPLOYEEDESKNUMBER));

				allWishes.add(wish);
			}

			connection.close();
		} catch (Exception e) {
			System.err.println("Cannot connect to database server");
			e.printStackTrace();
		}

		return allWishes;
	}

	public List<Wish> getAllInompleteWishes(String dataBase) {

		List<Wish> allWishes = new ArrayList<Wish>();

		try {
			Connection connection = new CreateConnection()
					.getConnection(dataBase);

			String selectSql = "select * from wish where wishStatus = ?";

			PreparedStatement ps = connection.prepareStatement(selectSql);
			ps.setString(1, INCOMPLETE);
			ResultSet rs = ps.executeQuery();
			while (rs.next()) {
				Wish wish = new Wish(rs.getInt(WISH_ID),
						rs.getString(CHILDNAME), rs.getString(CHILDAGE),
						rs.getString(CHILDGENDER), rs.getString(CHARITYNAME),
						rs.getString(WISH), rs.getString(WISHSTATUS),
						rs.getString(EMPLOYEENAME),
						rs.getString(EMPLOYEEEMAIL),
						rs.getString(EMPLOYEERACFID),
						rs.getString(EMPLOYEEBUILDING),
						rs.getString(EMPLOYEEDESKNUMBER));

				allWishes.add(wish);
			}

			connection.close();
		} catch (Exception e) {
			System.err.println("Cannot connect to database server");
			e.printStackTrace();
		}

		return allWishes;
	}

	public List<Wish> getAllRegisteredWishes(String dataBase) {

		List<Wish> allWishes = new ArrayList<Wish>();

		try {
			Connection connection = new CreateConnection()
					.getConnection(dataBase);

			String selectSql = "select * from wish where wishStatus = ?";

			PreparedStatement ps = connection.prepareStatement(selectSql);
			ps.setString(1, REGISTERED);
			ResultSet rs = ps.executeQuery();
			while (rs.next()) {
				Wish wish = new Wish(rs.getInt(WISH_ID),
						rs.getString(CHILDNAME), rs.getString(CHILDAGE),
						rs.getString(CHILDGENDER), rs.getString(CHARITYNAME),
						rs.getString(WISH), rs.getString(WISHSTATUS),
						rs.getString(EMPLOYEENAME),
						rs.getString(EMPLOYEEEMAIL),
						rs.getString(EMPLOYEERACFID),
						rs.getString(EMPLOYEEBUILDING),
						rs.getString(EMPLOYEEDESKNUMBER));

				allWishes.add(wish);
			}

			connection.close();
		} catch (Exception e) {
			System.err.println("Cannot connect to database server");
			e.printStackTrace();
		}

		return allWishes;
	}

	public Wish getWishById(int wishId, String dataBase) {

		List<Wish> allWishes = new ArrayList<Wish>();
		Wish wish = new Wish();

		try {
			Connection connection = new CreateConnection()
					.getConnection(dataBase);

			String selectSql = "select * from wish where wishId = ?";

			PreparedStatement ps = connection.prepareStatement(selectSql);
			ps.setLong(1, wishId);
			ResultSet rs = ps.executeQuery();
			while (rs.next()) {
				wish = new Wish(rs.getInt(WISH_ID), rs.getString(CHILDNAME),
						rs.getString(CHILDAGE), rs.getString(CHILDGENDER),
						rs.getString(CHARITYNAME), rs.getString(WISH),
						rs.getString(WISHSTATUS), rs.getString(EMPLOYEENAME),
						rs.getString(EMPLOYEEEMAIL),
						rs.getString(EMPLOYEERACFID),
						rs.getString(EMPLOYEEBUILDING),
						rs.getString(EMPLOYEEDESKNUMBER));

				allWishes.add(wish);
			}

			connection.close();
		} catch (Exception e) {
			System.err.println("Cannot connect to database server");
			e.printStackTrace();
		}

		return wish;
	}

}
