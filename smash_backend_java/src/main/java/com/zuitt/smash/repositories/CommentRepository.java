package com.zuitt.smash.repositories;

import com.zuitt.smash.models.Comment;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface CommentRepository extends MongoRepository<Comment, String> {
    List<Comment> findAllByPostId(String id);
    Comment deleteByPostId(String id);
    Comment findByUserId(String id);
}
