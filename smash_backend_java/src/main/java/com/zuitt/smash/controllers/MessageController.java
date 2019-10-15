package com.zuitt.smash.controllers;


import com.zuitt.smash.models.Message;
import com.zuitt.smash.repositories.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class MessageController {

    @Autowired
    MessageRepository messageRepository;

    @GetMapping("/all-messages")
    public Iterable<Message>  getMessages() {
        return messageRepository.findAll();
    }

    @PostMapping("/add/messages")
    public Message addMessage(@RequestBody Message message) {
        return messageRepository.save(message);
    }

    @DeleteMapping("/messages/{message_id}")
    public void deleteMessages(@PathVariable String message_id) {
        messageRepository.deleteById(message_id);
    }
}
