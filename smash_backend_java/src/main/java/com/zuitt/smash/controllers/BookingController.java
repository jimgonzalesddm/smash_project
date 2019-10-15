package com.zuitt.smash.controllers;

import com.zuitt.smash.models.Booking;
import com.zuitt.smash.repositories.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class BookingController {

    @Autowired
    BookingRepository bookingRepository;

    @GetMapping("/all-bookings")
    public Iterable<Booking>  getBookings() {
        return bookingRepository.findAll();
    }

    @PutMapping("/bookings/{booking_id}/{date}/{startTime}/{endTime}/{timeSlot}/{hours}/{price}")
    public Booking editBookingDate(@PathVariable String booking_id,
                                   @PathVariable String date,
                                   @PathVariable int startTime,
                                   @PathVariable int endTime,
                                   @PathVariable List<Integer> timeSlot,
                                   @PathVariable int hours,
                                   @PathVariable int price) {
        Booking b = bookingRepository.findById(booking_id).get();
        b.setDate(date);
        b.setStartTime(startTime);
        b.setEndTime(endTime);
        b.setTimeSlot(timeSlot);
        b.setHours(hours);
        b.setPrice(price);
        bookingRepository.save(b);
        return b;
    }

    @PutMapping("/bookings/{booking_id}/{status}")
    public Booking editBookingStatus(@PathVariable String booking_id,
                                   @PathVariable String status) {
        Booking b = bookingRepository.findById(booking_id).get();
        b.setStatus(status);
        bookingRepository.save(b);
        return b;
    }


    @DeleteMapping("/bookings/{booking_id}")
    public void deleteBooking(@PathVariable String booking_id) {
        bookingRepository.deleteById(booking_id);
    }

}
