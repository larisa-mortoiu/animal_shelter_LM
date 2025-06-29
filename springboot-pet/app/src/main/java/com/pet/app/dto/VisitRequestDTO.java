package com.pet.app.dto;

import com.pet.app.model.VisitAppointment;

import java.time.LocalDate;

public class VisitRequestDTO {
    private String phone;
    private String observations;
    private LocalDate appointmentDate;
    private VisitAppointment.VisitStatus status;

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

    public VisitAppointment.VisitStatus getStatus() {
        return status;
    }

    public void setStatus(VisitAppointment.VisitStatus status) {
        this.status = status;
    }


}

