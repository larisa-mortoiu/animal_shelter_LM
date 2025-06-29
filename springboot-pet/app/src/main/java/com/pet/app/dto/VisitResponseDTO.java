package com.pet.app.dto;

import com.pet.app.model.VisitAppointment;

import java.util.List;
import java.util.Map;

public class VisitResponseDTO {
    private List<VisitAppointment> visitAppointmentList;
    private Map<String, Long> appointmentsCounts;

    public VisitResponseDTO(List<VisitAppointment> visitAppointmentList, Map<String, Long> appointmentsCounts) {
        this.visitAppointmentList = visitAppointmentList;
        this.appointmentsCounts = appointmentsCounts;
    }

    public List<VisitAppointment> getVisitAppointmentList() {
        return visitAppointmentList;
    }

    public void setVisitAppointmentList(List<VisitAppointment> visitAppointmentList) {
        this.visitAppointmentList = visitAppointmentList;
    }

    public Map<String, Long> getAppointmentsCounts() {
        return appointmentsCounts;
    }

    public void setAppointmentsCounts(Map<String, Long> appointmentsCounts) {
        this.appointmentsCounts = appointmentsCounts;
    }
}
