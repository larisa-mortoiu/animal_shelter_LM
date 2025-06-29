package com.pet.app.dto;

import java.math.BigDecimal;

public class DonationRequestDTO {

    private String userEmail;
    private double amount;

    public DonationRequestDTO(String userEmail, double amount) {
        this.userEmail = userEmail;
        this.amount = amount;
    }

    public DonationRequestDTO() {}

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }
}
