package com.zuitt.smash.controllers;

import com.zuitt.smash.models.Comment;
import com.zuitt.smash.models.Post;
import com.zuitt.smash.models.User;
import com.zuitt.smash.repositories.CommentRepository;
import com.zuitt.smash.repositories.PostRepository;
import com.zuitt.smash.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.SecurityProperties;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class PostController {

    @Autowired
    PostRepository postRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    CommentRepository commentRepository;

    @GetMapping("/all-posts")
    public Iterable<Post>  getPosts() {
        return postRepository.findAll();
    }

    @GetMapping("/posts/{post_id}/all-comments")
    public Iterable<Comment> getComments(@PathVariable String post_id) {
        return commentRepository.findAllByPostId(post_id);
    }

    @PutMapping("/posts/{post_id}/{content}")
    public Post editPost(@PathVariable String post_id,
                         @PathVariable String content) {
        Post p = postRepository.findById(post_id).get();
        p.setContent(content);
        postRepository.save(p);
        return p;
    }

    @DeleteMapping("/posts/{post_id}")
    public void deletePost(@PathVariable String post_id) {
        postRepository.deleteById(post_id);
        commentRepository.deleteByPostId(post_id);
    }

    @PostMapping("/posts/{post_id}/users/{user_id}/comments")
    public Comment addComment(@PathVariable String post_id,
                              @PathVariable String user_id,
                              @RequestBody Comment comment) {
        User user = userRepository.findById(user_id).get();
        Post post = postRepository.findById(post_id).get();
        comment.setUser(user);
        comment.setPost(post);
        return commentRepository.save(comment);
    }
}
