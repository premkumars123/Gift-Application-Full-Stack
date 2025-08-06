package com.examly.springapp.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Gift {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;
    private String giftCategories;
    private String experience; // Note: String type as expected by tests
    private String specialization;
    private String phoneNumber;

    public Gift() {
    }

    public Gift(Integer id, String name, String giftCategories, String experience,
            String specialization, String phoneNumber) {
        this.id = id;
        this.name = name;
        this.giftCategories = giftCategories;
        this.experience = experience;
        this.specialization = specialization;
        this.phoneNumber = phoneNumber;
    }

    // Getters and Setters for all fields

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getGiftCategories() {
        return giftCategories;
    }

    public void setGiftCategories(String giftCategories) {
        this.giftCategories = giftCategories;
    }

    public String getExperience() {
        return experience;
    }

    public void setExperience(String experience) {
        this.experience = experience;
    }

    public String getSpecialization() {
        return specialization;
    }

    public void setSpecialization(String specialization) {
        this.specialization = specialization;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }
}
