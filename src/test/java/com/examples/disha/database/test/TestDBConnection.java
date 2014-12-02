package com.examples.disha.database.test;

import java.sql.Connection;
import java.sql.DriverManager;
import java.util.Properties;

public class TestDBConnection {
	@SuppressWarnings("unused")
	public static void main(String[] args) {
		System.out.println("Starting Connection test");
		Connection connection;
		// String url =
		// "jdbc:sqlserver://GAURAV-PC\\MySQLServer;databaseName=BeMySanta;integratedSecurity=true";
		String url = "jdbc:mysql://localhost:3306/mysql";
		// jdbc:mysql://localhost/?user=root&password=rootpassword")
		try {
			DriverManager.registerDriver(new com.mysql.jdbc.Driver());
			Properties userInfo = new Properties();
			userInfo.put("user", "root");
			userInfo.put("password", "");
			connection = DriverManager.getConnection(url, userInfo);
			System.out.println("Connection successful");
		} catch (Exception e) {
			System.err.println("Cannot connect to database server");
			e.printStackTrace();
		}
	}
}
