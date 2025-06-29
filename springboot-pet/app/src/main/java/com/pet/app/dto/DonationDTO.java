package com.pet.app.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class DonationDTO {
    private int userId;
    private String firstName;
    private String secondName;
    private double amount;
    private LocalDateTime date;

    public DonationDTO(String firstName, String secondName, double amount, LocalDateTime date) {
        this.firstName = firstName;
        this.secondName = secondName;
        this.amount = amount;
        this.date = date;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getSecondName() {
        return secondName;
    }

    public void setSecondName(String secondName) {
        this.secondName = secondName;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }
}
