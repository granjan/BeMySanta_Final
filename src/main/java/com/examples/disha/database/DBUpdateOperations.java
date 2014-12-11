package com.examples.disha.database;

import java.sql.Connection;
import java.sql.PreparedStatement;

import com.examples.disha.domain.Wish;

public class DBUpdateOperations {

	public int registerForWish(Wish wish, String dataBase) {
		try {
			Connection connection = new CreateConnection()
					.getConnection(dataBase);
			String registerWishQuery = "Update wish set wishStatus = ?, employeeName = ?, employeeEmail=?, employeeRacfId = ?, employeeBuilding = ?, employeeDeskNumber = ? where wishId = ?";
			PreparedStatement preparedStmt = connection
					.prepareStatement(registerWishQuery);
			preparedStmt.setString(1, "REGISTERED");
			preparedStmt.setString(2, wish.getEmployeeName());
			preparedStmt.setString(3, wish.getEmployeeEmail());
			preparedStmt.setString(4, wish.getEmployeeRacfId());
			preparedStmt.setString(5, wish.getEmployeeBuilding());
			preparedStmt.setString(6, wish.getEmployeeDeskNumber());
			preparedStmt.setInt(7, wish.getWishId());

			preparedStmt.executeUpdate();

			connection.close();
			return wish.getWishId();
		} catch (Exception e) {
			System.err.println("Cannot connect to database server");
			e.printStackTrace();
		}
		return -1;
	}

}
