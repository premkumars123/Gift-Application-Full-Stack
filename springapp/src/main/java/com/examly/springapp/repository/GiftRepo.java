
package com.examly.springapp.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.examly.springapp.model.Gift;

public interface GiftRepo extends JpaRepository<Gift, Integer> { }
