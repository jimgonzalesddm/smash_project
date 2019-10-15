package com.zuitt.smash.filters;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class AuthFilter implements Filter  {

    @Value("${jwt.secret}")
    private String secretKey;

    @Override
    public void doFilter(
            ServletRequest request,
            ServletResponse response,
            FilterChain chain) throws IOException, ServletException {
        HttpServletRequest req = (HttpServletRequest) request;
        HttpServletResponse res = (HttpServletResponse) response;
        res.addHeader("Access-Control-Allow-Origin", "*");
        res.addHeader("Access-Control-Allow-Methods","GET, OPTIONS, HEAD, PUT, POST, DELETE");
        res.addHeader("Access-Control-Allow-Headers","*");
        if (req.getMethod().equals("OPTIONS")) {
            res.setStatus(HttpServletResponse.SC_ACCEPTED);
            return;
        }

        if(req.getRequestURI().startsWith("/users") || req.getRequestURI().startsWith("/bookings") ||
                req.getRequestURI().startsWith("/messages") || req.getRequestURI().startsWith("/posts") ||
                req.getRequestURI().startsWith("/comments")) {
            String token = req.getHeader("x-auth-token");
            String username = null;
            try {
                Claims claims = Jwts.parser()
                        .setSigningKey(secretKey)
                        .parseClaimsJws(token).getBody();
                username = claims.getSubject();
            } catch (JwtException | IllegalArgumentException e) {
                username = "error";
            }

            if( username.equals("error") ) {
                res.setStatus(400);
                response.getOutputStream().print("Token is invalid");
                return;
            }
        }
        chain.doFilter(request, response);
    }
}
