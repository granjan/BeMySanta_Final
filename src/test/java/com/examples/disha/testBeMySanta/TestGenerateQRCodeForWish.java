package com.examples.disha.testBeMySanta;

import static org.junit.Assert.*;

import org.junit.Test;

import com.examples.disha.domain.Wish;
import com.examples.disha.zutils.GenerateQRCodeForWish;

public class TestGenerateQRCodeForWish {

	GenerateQRCodeForWish generateQRCodeForWishObj = new GenerateQRCodeForWish();
	
	@Test
	public void testQRCode() {
		Wish wish = new Wish();
		wish.setCharityName("testCharity");
		wish.setChildName("testChild");
		wish.setChildGender("Male");
		wish.setChildAge("7");
		wish.setEmployeeName("testEmployee");
		wish.setEmployeeBuilding("testBuilding");
		wish.setEmployeeRacfId("testRacfId");
		wish.setWish("testWish");
		wish.setWishId(1);
		
		String imageURL = generateQRCodeForWishObj.generateQRCodeForWishImpl(wish);
		assertNotNull(imageURL);
	}

}
