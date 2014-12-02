package com.examples.disha.database;

import java.sql.Connection;
import java.sql.DriverManager;
import java.util.Properties;

public class CreateConnection {

	public Connection getConnection(String dataBase) {
		Connection connection;
		String url = "jdbc:mysql://localhost:3306/";
		url += dataBase;
		try {
			DriverManager.registerDriver(new com.mysql.jdbc.Driver());
			Properties userInfo = new Properties();
			userInfo.put("user", "root");
			userInfo.put("password", "");
			connection = DriverManager.getConnection(url, userInfo);
			return connection;
		} catch (Exception e) {
			System.err.println("Cannot connect to database server");
			e.printStackTrace();
		}

		return null;
	}
}
