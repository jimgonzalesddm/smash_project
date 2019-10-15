package com.zuitt.smash.repositories;

import com.zuitt.smash.models.Booking;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface BookingRepository extends MongoRepository<Booking, String> {
    Booking findByUserId(String id);
}
