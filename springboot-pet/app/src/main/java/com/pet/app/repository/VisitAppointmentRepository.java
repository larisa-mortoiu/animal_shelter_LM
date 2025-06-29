package com.pet.app.repository;

import com.pet.app.dto.VisitAdminDTO;
import com.pet.app.model.User;
import com.pet.app.model.VisitAppointment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface VisitAppointmentRepository extends JpaRepository<VisitAppointment, Long> {
    boolean existsByUser(User user);
    Optional<VisitAppointment> findByUser(User user);
    void deleteByUser(User user);
    long countByAppointmentDate(LocalDate appointmentDate);
    List<VisitAppointment> findByStatus(VisitAppointment.VisitStatus status);
}
