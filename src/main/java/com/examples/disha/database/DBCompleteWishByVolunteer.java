package com.examples.disha.database;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.Date;

import com.examples.disha.domain.Wish;

public class DBCompleteWishByVolunteer {

	public int completeWish(int wishId, String userName, String dataBase) {
		try {
			Connection connection = new CreateConnection()
					.getConnection(dataBase);
			String registerWishQuery = "Update wish set wishStatus = ? where wishId = ?";
			PreparedStatement preparedStmt = connection
					.prepareStatement(registerWishQuery);
			preparedStmt.setString(1, "COMPLETED");
			preparedStmt.setInt(2, wishId);

			preparedStmt.executeUpdate();

			String insertQuerySQL = "insert into completewishes(WISHID, USERNAME, DATETIME)"
					+ " values (?, ?, ?)";

			PreparedStatement statement = connection
					.prepareStatement(insertQuerySQL);
			statement.setInt(1, wishId);
			statement.setString(2, userName);
			statement.setString(3, (new Date()).toString());

			// execute the preparedstatement
			preparedStmt.execute();
			connection.close();
			return wishId;
		} catch (Exception e) {
			System.err.println("Cannot connect to database server");
			e.printStackTrace();
		}
		return -1;
	}

	public boolean checkIfVolunteerExists(String userName, String password,
			String database) {
		try {
			Connection connection = new CreateConnection()
					.getConnection(database);
			String selectQuery = "select * from volunteers where userName = ?";
			PreparedStatement preparedStmt = connection
					.prepareStatement(selectQuery);
			preparedStmt.setString(1, userName);
			ResultSet rs = preparedStmt.executeQuery();
			while (rs.next()) {
				if (rs.getString("password").equals(password)) {
					return true;
				} else {
					return false;
				}
			}

		} catch (Exception e) {
			System.err.println("Cannot connect to database server");
			e.printStackTrace();
		}
		return false;
	}

}
