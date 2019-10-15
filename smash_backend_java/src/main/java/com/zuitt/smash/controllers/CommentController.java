package com.zuitt.smash.controllers;


import com.zuitt.smash.models.Comment;
import com.zuitt.smash.repositories.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class CommentController {


    @Autowired
    CommentRepository commentRepository;


    @PutMapping("/comments/{comment_id}/{comment}")
    public Comment editComment(@PathVariable String comment_id,
                         @PathVariable String comment) {
        Comment c = commentRepository.findById(comment_id).get();
        c.setComment(comment);
        commentRepository.save(c);
        return c;
    }

    @DeleteMapping("/comments/{comment_id}")
    public void deleteComment(@PathVariable String comment_id) {
        commentRepository.deleteById(comment_id);
    }
}
