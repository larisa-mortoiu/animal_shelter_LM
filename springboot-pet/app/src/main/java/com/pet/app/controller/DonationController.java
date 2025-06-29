package com.pet.app.controller;

import com.pet.app.dto.DonationRequestDTO;
import com.pet.app.repository.UserRepository;
import com.stripe.exception.StripeException;
import com.stripe.param.checkout.SessionCreateParams;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.stripe.model.checkout.Session;
import java.util.Map;


@RestController
@RequestMapping("/api/donatii")
@CrossOrigin
public class DonationController {

    private UserRepository userRepository;

    DonationController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    @PostMapping("/create-checkout")
    public ResponseEntity<Map<String,String>> createCheckout(@RequestBody DonationRequestDTO request) throws StripeException
    {

        int userId = userRepository.findByEmail(request.getUserEmail()).getId();
        System.out.println(request.getAmount());
        SessionCreateParams params = SessionCreateParams.builder()
                .setMode(SessionCreateParams.Mode.PAYMENT)
                .setSuccessUrl("http://localhost:5173/success")
                .setCancelUrl("http://localhost:5173/cancel")
                .addLineItem(
                        SessionCreateParams.LineItem.builder()
                                .setQuantity(1L)
                                .setPriceData(
                                        SessionCreateParams.LineItem.PriceData.builder()
                                                .setCurrency("ron")
                                                .setUnitAmount((long)(request.getAmount() * 100))
                                                .setProductData(
                                                        SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                                                .setName("Donație pentru adăpost")
                                                                .build()
                                                ).build()
                                ).build()
                )
                .putMetadata("userId", String.valueOf(userId))
                .build();

        Session session = Session.create(params);
        return ResponseEntity.ok(Map.of("url", session.getUrl()));
    }
}
