package com.pet.app.controller;

import com.pet.app.model.User;
import com.pet.app.repository.UserRepository;
import com.stripe.exception.SignatureVerificationException;
import com.stripe.model.Event;
import com.stripe.model.checkout.Session;
import com.stripe.net.Webhook;
import com.pet.app.model.Donation;
import com.pet.app.repository.DonationRepository;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/stripe")
public class StripeWebhookController {

    private final UserRepository userRepository;
    @Value("${stripe.webhook.secret}")
    private String endpointSecret;

    private final DonationRepository donatieRepository;

    public StripeWebhookController(DonationRepository donatieRepository, UserRepository userRepository) {
        this.donatieRepository = donatieRepository;
        this.userRepository = userRepository;
    }

    @PostMapping("/webhook")
    public ResponseEntity<String> handleStripeWebhook(HttpServletRequest request) throws IOException {
        String sigHeader = request.getHeader("Stripe-Signature");
        String payload = new String(request.getInputStream().readAllBytes(), StandardCharsets.UTF_8);

        Event event;
        try {
            event = Webhook.constructEvent(payload, sigHeader, endpointSecret);
        } catch (SignatureVerificationException e) {
            System.out.println("Semnătură invalidă: " + e.getMessage());
            return ResponseEntity.badRequest().build();
        }

        if ("checkout.session.completed".equals(event.getType())) {
            var deserializer = event.getDataObjectDeserializer();
            if (deserializer.getObject().isPresent()) {
                Session session = (Session) deserializer.getObject().get();

                Donation donatie = new Donation();
                int userId = Long.valueOf(session.getMetadata().get("userId")).intValue();
                User user = userRepository.findById(userId).orElse(null);
                donatie.setUser(user);
                donatie.setAmount(session.getAmountTotal() / 100.0);
                donatie.setDate(LocalDateTime.now());

                donatieRepository.save(donatie);
                System.out.println("Donație salvată cu succes: " + donatie.getAmount() + " RON");
            } else {
                System.out.println("Sesiune invalidă");
            }
        } else {
            System.out.println("Eveniment ignorat: " + event.getType());
        }

        return ResponseEntity.ok("Received");
    }


}
