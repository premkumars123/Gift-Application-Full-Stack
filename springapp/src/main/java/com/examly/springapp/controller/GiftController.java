package com.examly.springapp.controller;

import java.util.List;
import java.util.Optional;
import com.examly.springapp.model.Gift;
import com.examly.springapp.service.GiftService;
import com.examly.springapp.exception.InvalidPhoneNumberException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class GiftController {
    @Autowired
    private GiftService giftService;

    @PostMapping("/addGift")
    public ResponseEntity<Gift> addGift(@RequestBody Gift gift) {
        validatePhoneNumber(gift.getPhoneNumber());
        Gift savedGift = giftService.addGift(gift);
        return ResponseEntity.ok(savedGift);
    }

    @GetMapping("/getAllGifts")
    public ResponseEntity<List<Gift>> getAllGifts() {
        return ResponseEntity.ok(giftService.getAllGifts());
    }

    @GetMapping("/getGift/{id}")
    public ResponseEntity<?> getGiftById(@PathVariable Integer id) {
        Optional<Gift> gift = giftService.getGiftById(id);
        return gift.isPresent() ? ResponseEntity.ok(gift.get()) : ResponseEntity.notFound().build();
    }


    @PutMapping("/editGift/{id}")
    public ResponseEntity<?> updateGift(@PathVariable Integer id, @RequestBody Gift gift) {
        validatePhoneNumber(gift.getPhoneNumber());
        Gift updated = giftService.updateGift(id, gift);
        return updated != null ? ResponseEntity.ok(updated) : ResponseEntity.notFound().build();
    }


    @DeleteMapping("/deleteGift/{id}")
    public ResponseEntity<String> deleteGift(@PathVariable Integer id) {
        boolean deleted = giftService.deleteGift(id);
        return deleted ? ResponseEntity.ok("Gift deleted successfully.") : ResponseEntity.notFound().build();
    }


    @ExceptionHandler(InvalidPhoneNumberException.class)
    public ResponseEntity<String> handleInvalidPhoneNumber(InvalidPhoneNumberException ex) {
        return ResponseEntity.badRequest().body(ex.getMessage());
    }


    private void validatePhoneNumber(String phoneNumber) {
        if (phoneNumber == null || phoneNumber.trim().isEmpty()) {
            throw new InvalidPhoneNumberException("Phone number is required.");
        }
        if (!phoneNumber.startsWith("+91")) {
            throw new InvalidPhoneNumberException("Phone number must start with +91.");
        }
        if (phoneNumber.length() != 13) {
            throw new InvalidPhoneNumberException("Phone number must be 13 digits long, including the country code.");
        }
        if (!phoneNumber.matches("\\+91[0-9]{10}")) {
            throw new InvalidPhoneNumberException(
                    "Invalid phone number format. It should start with +91 and have exactly 10 digits after it.");
        }
    }
}
