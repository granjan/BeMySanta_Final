package com.examples.disha.database;

import java.sql.Connection;
import java.sql.PreparedStatement;

import com.examples.disha.domain.Wish;

public class DBInsertOperations {

	public int insertWish(Wish wish, String dataBase) {

		try {
			Connection connection = new CreateConnection()
					.getConnection(dataBase);

			String insertQuerySQL = "insert into wish (WISHID,CHILDNAME, CHILDAGE, CHARITYNAME, WISH, WISHSTATUS, CHILDGENDER, EMPLOYEENAME, EMPLOYEERACFID, EMPLOYEEBUILDING, EMPLOYEEDESKNUMBER)"
					+ " values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

			// create the mysql insert preparedstatement
			PreparedStatement preparedStmt = connection
					.prepareStatement(insertQuerySQL);
			preparedStmt.setInt(1, wish.getWishId());
			preparedStmt.setString(2, wish.getChildName());
			preparedStmt.setString(3, wish.getChildAge());
			preparedStmt.setString(4, wish.getChildGender());
			preparedStmt.setString(5, wish.getCharityName());
			preparedStmt.setString(6, wish.getWish());
			preparedStmt.setString(7, wish.getWishStatus());
			preparedStmt.setString(8, wish.getEmployeeName());
			preparedStmt.setString(9, wish.getEmployeeRacfId());
			preparedStmt.setString(10, wish.getEmployeeBuilding());
			preparedStmt.setString(11, wish.getEmployeeDeskNumber());

			// execute the preparedstatement
			preparedStmt.execute();
			connection.close();
			return wish.getWishId();
		} catch (Exception e) {
			System.err.println("Cannot connect to database server");
			e.printStackTrace();
		}
		return -1;
	}

}
