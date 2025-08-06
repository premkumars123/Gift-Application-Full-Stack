package com.examly.springapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.examly.springapp.model.Gift;

@Repository
public interface GiftRepo extends JpaRepository<Gift,Integer>{

}
