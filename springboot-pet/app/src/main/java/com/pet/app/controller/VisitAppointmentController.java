package com.pet.app.controller;

import com.pet.app.dto.VisitAdminDTO;
import com.pet.app.dto.VisitRequestDTO;
import com.pet.app.dto.VisitResponseDTO;
import com.pet.app.model.User;
import com.pet.app.model.VisitAppointment;
import com.pet.app.repository.UserRepository;
import com.pet.app.repository.VisitAppointmentRepository;
import com.pet.app.service.VisitAppointmentService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.security.Principal;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@CrossOrigin
@RequestMapping("/api/appointments")
public class VisitAppointmentController {

    private final UserRepository userRepository;
    private final VisitAppointmentRepository visitAppointmentRepository;
    private VisitAppointmentService visitAppointmentService;

    public VisitAppointmentController(VisitAppointmentService visitAppointmentService, UserRepository userRepository, VisitAppointmentRepository visitAppointmentRepository) {
        this.visitAppointmentService = visitAppointmentService;
        this.userRepository = userRepository;
        this.visitAppointmentRepository = visitAppointmentRepository;
    }

    @PostMapping
    public ResponseEntity<?> createVisitAppointment(@RequestBody VisitRequestDTO dto, HttpSession session) {

        User user = (User) session.getAttribute("user");
        try {
            visitAppointmentService.createVisitAppointment(dto, user);
            return ResponseEntity.ok().build();
        }
        catch (ResponseStatusException ex) {
            return ResponseEntity.status(ex.getStatusCode()).body(ex.getReason());
        }
    }

    @GetMapping("/user")
    public ResponseEntity<?> getAppointmentForUser(HttpSession session) {
        User user = (User) session.getAttribute("user");
        System.out.println("User: " + user);

        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Utilizator neautentificat");
        }

        Optional<VisitAppointment> appointmentOptional = visitAppointmentService.getAppointmentForUser(user);
        if (appointmentOptional.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
    return ResponseEntity.ok().body(appointmentOptional.get());
    }

    @DeleteMapping("/user")
    public ResponseEntity<?> deleteAppointmentForUser(HttpSession session) {
        User sessionUser = (User) session.getAttribute("user");
        if (sessionUser == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Utilizator neautentificat");
        }

        User user = userRepository.findById(sessionUser.getId()).orElseThrow(() -> new RuntimeException("User not found"));
        visitAppointmentService.cancelVisitAppointment(user);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/all")
    public ResponseEntity<List<VisitAdminDTO>> getAllAppointments()
    {
        List<VisitAdminDTO> allAppointments = visitAppointmentService.getAllVisits();
        return ResponseEntity.ok().body(allAppointments);
    }

    @GetMapping("/all/{status}")
    public ResponseEntity<VisitResponseDTO> getAllAppointmentsByStatus(@PathVariable VisitAppointment.VisitStatus status)
    {
      List<VisitAppointment> allAppointments = visitAppointmentRepository.findAll();
      Map<String, Long> countAppointments = allAppointments.stream().collect(Collectors.groupingBy(appointment -> appointment.getStatus().toString(), Collectors.counting()));

      countAppointments.put("toate", (long) allAppointments.size());

      List<VisitAppointment> filteredAppointments;
      if(status == VisitAppointment.VisitStatus.TOATE)
          filteredAppointments = allAppointments;
      else
          filteredAppointments = visitAppointmentRepository.findByStatus(status);

        VisitResponseDTO visitResponseDTO = new VisitResponseDTO(filteredAppointments, countAppointments);
        return ResponseEntity.ok(visitResponseDTO);
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<?> changeAppointmentStatus(
            @PathVariable("id") Long id,
            @RequestParam VisitAppointment.VisitStatus status
    )
    {
        try {
            visitAppointmentService.changeStatus(id, status);
            return ResponseEntity.ok().build();
        }
            catch (ResponseStatusException exception){
            return ResponseEntity.status(exception.getStatusCode()).body(exception.getReason());
        }
    }


}
