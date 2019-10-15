package com.zuitt.smash.repositories;

import com.zuitt.smash.models.Booking;
import com.zuitt.smash.models.Comment;
import com.zuitt.smash.models.Post;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface PostRepository extends MongoRepository<Post, String> {
    Post findByUserId(String id);

}
