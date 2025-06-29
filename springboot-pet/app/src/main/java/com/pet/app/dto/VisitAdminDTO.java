// src/main/java/com/pet/app/dto/VisitAdminDTO.java
package com.pet.app.dto;

import com.pet.app.model.VisitAppointment;
import com.pet.app.model.VisitAppointment.VisitStatus;
import java.time.LocalDate;

public class VisitAdminDTO {
    private Long      id;
    private String    phone;
    private String    observations;
    private LocalDate appointmentDate;
    private VisitStatus status;
    private Integer      userId;
    private String    userEmail;
    private String    userName;

    public VisitAdminDTO(Long id, String phone, String observations,
                         LocalDate appointmentDate, VisitStatus status,
                         Integer userId, String userEmail, String userName) {
        this.id              = id;
        this.phone           = phone;
        this.observations    = observations;
        this.appointmentDate = appointmentDate;
        this.status          = status;
        this.userId          = userId;
        this.userEmail       = userEmail;
        this.userName       = userName;
    }

    public static VisitAdminDTO fromEntity(VisitAppointment v) {
        String fullName = v.getUser().getFirstName() + " " + v.getUser().getLastName();
        return new VisitAdminDTO(
                v.getId(),
                v.getPhone(),
                v.getObservations(),
                v.getAppointmentDate(),
                v.getStatus(),
                v.getUser().getId(),
                v.getUser().getEmail(),
                fullName
        );
    }

    public Long getId() {
        return id;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getObservations() {
        return observations;
    }

    public void setObservations(String observations) {
        this.observations = observations;
    }

    public LocalDate getAppointmentDate() {
        return appointmentDate;
    }

    public void setAppointmentDate(LocalDate appointmentDate) {
        this.appointmentDate = appointmentDate;
    }

    public VisitStatus getStatus() {
        return status;
    }

    public void setStatus(VisitStatus status) {
        this.status = status;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }
}
