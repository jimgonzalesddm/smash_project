package com.zuitt.smash.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "bookings")
public class Booking {

    @Id
    private String id;
    private int courtNum;
    private String date;
    private int startTime;
    private int endTime;
    private List<Integer> timeSlot;
    private int hours;
    private int price;

    private String status;

    @DBRef
    private User user;

    public Booking() {}

    public Booking(int courtNum, String date, int startTime, int endTime, List<Integer> timeSlot, int hours, int price, String status) {
        this.courtNum = courtNum;
        this.date = date;
        this.startTime = startTime;
        this.endTime = endTime;
        this.timeSlot = timeSlot;
        this.hours = hours;
        this.price = price;
        this.status = status;
    }

    public String getId() {
        return id;
    }

    public int getCourtNum() {
        return courtNum;
    }

    public void setCourtNum(int courtNum) {
        this.courtNum = courtNum;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public int getStartTime() {
        return startTime;
    }

    public void setStartTime(int startTime) {
        this.startTime = startTime;
    }

    public int getEndTime() {
        return endTime;
    }

    public void setEndTime(int endTime) {
        this.endTime = endTime;
    }

    public List<Integer> getTimeSlot() {
        return timeSlot;
    }

    public void setTimeSlot(List<Integer> timeSlot) {
        this.timeSlot = timeSlot;
    }

    public int getHours() {
        return hours;
    }

    public void setHours(int hours) {
        this.hours = hours;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
