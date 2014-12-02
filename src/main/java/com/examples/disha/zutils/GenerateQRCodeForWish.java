package com.examples.disha.zutils;

import java.awt.Color;
import java.awt.Graphics2D;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.util.Hashtable;

import javax.imageio.ImageIO;

import com.examples.disha.domain.Wish;
import com.google.zxing.BarcodeFormat;
import com.google.zxing.EncodeHintType;
import com.google.zxing.WriterException;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;
import com.google.zxing.qrcode.decoder.ErrorCorrectionLevel;

/**
 * Generates and saves a QR code for the wish details received
 * 
 * @author Gaurav
 */

public class GenerateQRCodeForWish {
	
	private final String imageDirectory = "Q:/Downloads/wildfly-9.0.0.Alpha1/wildfly-9.0.0.Alpha1/beMySantaResources/images/";
	private final String imageURL = "http://localhost:12030/imageStore/";

	public String generateQRCodeForWishImpl(Wish wish) {

		String myCodeText = generateStringForWishDetails(wish);
//		String filePath = imageDirectory
//				+ wish.getWishId().toString() + ".png";
//		String fileURL = imageURL + wish.getWishId().toString() + ".png";
		int size = 256;
		String fileType = "png";
		String filePath = "";
		File myFile = new File(filePath);
		try {
			Hashtable<EncodeHintType, ErrorCorrectionLevel> hintMap = new Hashtable<EncodeHintType, ErrorCorrectionLevel>();
			hintMap.put(EncodeHintType.ERROR_CORRECTION, ErrorCorrectionLevel.L);
			QRCodeWriter qrCodeWriter = new QRCodeWriter();
			BitMatrix byteMatrix = qrCodeWriter.encode(myCodeText,
					BarcodeFormat.QR_CODE, size, size, hintMap);
			int imageWidth = byteMatrix.getWidth();
			BufferedImage image = new BufferedImage(imageWidth, imageWidth,
					BufferedImage.TYPE_INT_RGB);
			image.createGraphics();

			Graphics2D graphics = (Graphics2D) image.getGraphics();
			graphics.setColor(Color.WHITE);
			graphics.fillRect(0, 0, imageWidth, imageWidth);
			graphics.setColor(Color.BLACK);

			for (int i = 0; i < imageWidth; i++) {
				for (int j = 0; j < imageWidth; j++) {
					if (byteMatrix.get(i, j)) {
						graphics.fillRect(i, j, 1, 1);
					}
				}
			}
			ImageIO.write(image, fileType, myFile);
		} catch (WriterException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}

//		System.out.println("\nSuccessfully created QR Code for Wish: "
//				+ wish.getWishId().toString());

		String fileURL = "";
		return fileURL;

	}

	private String generateStringForWishDetails(Wish wish) {
		String imageText = "";

		imageText = "WishId: " + wish.getWishId() + "\n" + "Wish: "
				+ wish.getWish() + "\n" + "For Child: " + wish.getChildName()
				+ "\n" + "Child Age: " + wish.getChildAge() + "\n"
				+ "Child Gender: " + wish.getChildGender() + "\n"
				+ "Charity Name: " + wish.getCharityName() + "\n"
				+ "Registered To: " + wish.getEmployeeName() + "\n"
				+ "With RacfID: " + wish.getEmployeeRacfId() + "\n"
				+ "In Building: " + wish.getEmployeeBuilding() + "\n";

		return imageText;
	}
}