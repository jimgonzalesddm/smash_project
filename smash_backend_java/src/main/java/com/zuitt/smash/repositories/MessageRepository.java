package com.zuitt.smash.repositories;

import com.zuitt.smash.models.Message;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface MessageRepository extends MongoRepository<Message, String> {
//    Message findByUser_Id(String id);
}
