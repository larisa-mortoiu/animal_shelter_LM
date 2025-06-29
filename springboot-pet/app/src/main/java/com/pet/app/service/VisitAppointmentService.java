package com.pet.app.service;

import com.pet.app.dto.VisitAdminDTO;
import com.pet.app.dto.VisitRequestDTO;
import com.pet.app.model.User;
import com.pet.app.model.VisitAppointment;
import com.pet.app.repository.UserRepository;
import com.pet.app.repository.VisitAppointmentRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
public class VisitAppointmentService {
    @Autowired
    private VisitAppointmentRepository visitAppointmentRepository;
    private UserRepository userRepository;

    public VisitAppointmentService(VisitAppointmentRepository visitAppointmentRepository, UserRepository userRepository) {
        this.visitAppointmentRepository = visitAppointmentRepository;
        this.userRepository = userRepository;
    }

    public void createVisitAppointment(VisitRequestDTO dto, User user) {

        System.out.println("DATE from request: " + dto.getAppointmentDate());
        if (visitAppointmentRepository.existsByUser(user)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Utilizatorul are deja o programare activa.");
        }

        long appointmentCount = visitAppointmentRepository.countByAppointmentDate(dto.getAppointmentDate());
        if (appointmentCount >= 3) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Numărul maxim de programări pentru această zi a fost atins. Te rugăm să alegi altă dată.");
        }

        VisitAppointment visitAppointment = new VisitAppointment();
        visitAppointment.setUser(user);
        visitAppointment.setPhone(dto.getPhone());
        visitAppointment.setObservations(dto.getObservations());
        visitAppointment.setAppointmentDate(dto.getAppointmentDate());
        visitAppointmentRepository.save(visitAppointment);
    }

    public Optional<VisitAppointment> getAppointmentForUser(User user) {
        return visitAppointmentRepository.findByUser(user);
    }

    @Transactional
    public void cancelVisitAppointment(User user) {
       user = userRepository.findById(user.getId()).orElseThrow();

       VisitAppointment visitAppointment = visitAppointmentRepository.findByUser(user).orElseThrow(() -> new RuntimeException("Visit Appointment not found"));
       visitAppointmentRepository.delete(visitAppointment);
    }

    public List<VisitAdminDTO> getAllVisits(){
        return visitAppointmentRepository
                .findAll()
                .stream()
                .map(VisitAdminDTO::fromEntity)
                .toList();
    }

    @Transactional
    public void changeStatus(Long appointmentId, VisitAppointment.VisitStatus newStatus) {
        VisitAppointment visitAppointment = visitAppointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Programarea nu exista"));
        visitAppointment.setStatus(newStatus);
        visitAppointmentRepository.save(visitAppointment);
    }
}
