package com.zuitt.smash.controllers;


import com.zuitt.smash.models.Booking;
import com.zuitt.smash.models.Comment;
import com.zuitt.smash.models.Post;
import com.zuitt.smash.models.User;
import com.zuitt.smash.repositories.BookingRepository;
import com.zuitt.smash.repositories.CommentRepository;
import com.zuitt.smash.repositories.PostRepository;
import com.zuitt.smash.repositories.UserRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;


@RestController

@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    UserRepository userRepository;
    @Autowired
    BookingRepository bookingRepository;
    @Autowired
    PostRepository postRepository;
    @Autowired
    CommentRepository commentRepository;

    @Value("${jwt.secret}")
    private String secretKey;

    @GetMapping("/")
    public Iterable<User> getUsers() {
        return userRepository.findAll();
    }

    @GetMapping("/users/{user_id}")
    public User getUser(@PathVariable String user_id) {
        return userRepository.findById(user_id).get();
    }

    @PutMapping("/users/{user_id}/{firstName}/{lastName}/{username}")
    public User editInfo(@PathVariable String user_id,
                         @PathVariable String firstName,
                         @PathVariable String lastName,
                         @PathVariable String username) {
        User user = userRepository.findById(user_id).get();
        user.setFirstName(firstName);
        user.setLastName(lastName);
        user.setUsername(username);
        userRepository.save(user);

        try {
            Booking booking = bookingRepository.findByUserId(user_id);
            booking.getUser().setFirstName(firstName);
            booking.getUser().setLastName(lastName);
            booking.getUser().setUsername(username);
            bookingRepository.save(booking);
            Post post = postRepository.findByUserId(user_id);
            post.getUser().setFirstName(firstName);
            post.getUser().setLastName(lastName);
            post.getUser().setUsername(username);
            postRepository.save(post);
            Comment comment = commentRepository.findByUserId(user_id);
            comment.getUser().setFirstName(firstName);
            comment.getUser().setLastName(lastName);
            comment.getUser().setUsername(username);
            commentRepository.save(comment);
        }
        catch(NullPointerException e) {
           return user;
        }
        return user;
    }

    @PostMapping("/register/{isAdmin}")
    public String registerUser(@RequestBody User user,
                             @PathVariable boolean isAdmin) {
        String hashedpw = BCrypt.hashpw(user.getPassword(), BCrypt.gensalt());
        user.setPassword(hashedpw);
        user.setAdmin(isAdmin);
        User newUser = userRepository.save(user);

        Claims claims = Jwts.claims().setSubject(newUser.getId());
        return Jwts.builder()
                .setClaims(claims)
                .signWith(SignatureAlgorithm.HS512, secretKey)
                .claim("user", newUser)
                .compact();
    }

    @PostMapping("/login")
    public String loginUser(@RequestBody User user) {
        User foundUser = userRepository.findByUsername(user.getUsername());
        if(foundUser != null && BCrypt.checkpw(user.getPassword(), foundUser.getPassword())) {
            Claims claims = Jwts.claims().setSubject(foundUser.getId());

            return Jwts.builder()
                    .setClaims(claims)
                    .signWith(SignatureAlgorithm.HS512, secretKey)
                    .claim("user", foundUser)
                    .compact();
        }
        return null;

    }

    @PostMapping("/users/{id}/bookings")
    public Booking addAppointment(@PathVariable String id,
                                  @RequestBody Booking booking) {
        User user = userRepository.findById(id).get();
        booking.setUser(user);
        return bookingRepository.save(booking);
    }

    @PostMapping("/users/{id}/posts")
    public Post addPost(@PathVariable String id,
                        @RequestBody Post post) {
        User user = userRepository.findById(id).get();
        post.setUser(user);
        return postRepository.save(post);
    }

    private static String UPLOADED_FOLDER = "src/main/resources/static/images/";

    @PostMapping("/users/{user_id}/upload")
    public String singleFileUpload(@PathVariable String user_id,
                                   @RequestParam("file") MultipartFile file,
                                   RedirectAttributes redirectAttributes) {

        if (file.isEmpty()) {
            redirectAttributes.addFlashAttribute("message", "Please select a file to upload");
            return "error. no image uploaded.";
        }

        try {
            System.out.println(file.getOriginalFilename());
            // Get the file and save it somewhere
            byte[] bytes = file.getBytes();
            Path path = Paths.get(UPLOADED_FOLDER + file.getOriginalFilename());
            Files.write(path, bytes);

            User user = userRepository.findById(user_id).get();
            user.setImage(file.getOriginalFilename());
            userRepository.save(user);

            redirectAttributes.addFlashAttribute("message",
                    "You successfully uploaded '" + file.getOriginalFilename() + "'");

        } catch (IOException e) {
            e.printStackTrace();
        }

        return user_id;
    }


}
