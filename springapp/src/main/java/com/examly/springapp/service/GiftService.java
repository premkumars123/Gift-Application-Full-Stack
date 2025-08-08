package com.examly.springapp.service;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.examly.springapp.model.Gift;
import com.examly.springapp.repository.GiftRepo;

@Service
public class GiftService {
    @Autowired
    private GiftRepo giftRepo;


    public Gift addGift(Gift giftData) {
        return giftRepo.save(giftData);
    }


    public List<Gift> getAllGifts() {
        return giftRepo.findAll();
    }


    public Optional<Gift> getGiftById(Integer id) {
        return giftRepo.findById(id);
    }


    public Gift updateGift(Integer id, Gift updatedGift) {
        Optional<Gift> optionalGift = giftRepo.findById(id);
        if (optionalGift.isPresent()) {
            Gift existingGift = optionalGift.get();
            existingGift.setName(updatedGift.getName());
            existingGift.setGiftCategories(updatedGift.getGiftCategories());
            existingGift.setExperience(updatedGift.getExperience());
            existingGift.setSpecialization(updatedGift.getSpecialization());
            existingGift.setPhoneNumber(updatedGift.getPhoneNumber());
            return giftRepo.save(existingGift);
        } else {
            return null; // Or throw an exception for not found
        }
    }


    public boolean deleteGift(Integer id) {
        if (giftRepo.existsById(id)) {
            giftRepo.deleteById(id);
            return true;
        } else {
            return false;
        }
    }
}
