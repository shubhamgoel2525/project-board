package com.shubham.projectboardspring.controller;

import com.shubham.projectboardspring.config.JwtTokenUtil;
import com.shubham.projectboardspring.dto.JwtRequest;
import com.shubham.projectboardspring.dto.JwtResponse;
import com.shubham.projectboardspring.dto.UserDTO;
import com.shubham.projectboardspring.service.JwtUserDetailsService;
import com.shubham.projectboardspring.utils.AuthenticationUtils;
import com.shubham.projectboardspring.utils.JsonModifiers;
import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

@RestController
@CrossOrigin
public class JwtAuthenticationController {

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private JwtUserDetailsService userDetailsService;

    @Autowired
    private JsonModifiers jsonModifiers;

    @Autowired
    private AuthenticationUtils authenticationUtils;

    @RequestMapping(value = "/authenticate", method = RequestMethod.POST)
    public ResponseEntity<?> createAuthenticationToken(@RequestBody JwtRequest authenticationRequest) throws Exception {

        authenticationUtils.authenticate(authenticationRequest.getUsername(), authenticationRequest.getPassword());

        final UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getUsername());

        final String token = jwtTokenUtil.generateToken(userDetails);

        return ResponseEntity.ok(new JwtResponse(token));
    }

    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public ResponseEntity<?> saveUser(@RequestBody UserDTO user) {

        return ResponseEntity.ok(userDetailsService.save(user));
    }

    @RequestMapping(value = "/refreshToken", method = RequestMethod.GET)
    public ResponseEntity<?> refreshToken(HttpServletRequest request) {

        // Get claims from the HTTP request
        Claims claims = (Claims) request.getAttribute("claims");

        Map<String, Object> expectedMap = jsonModifiers.getMapFromIoJsonwebtokenClaims(claims);
        String token = jwtTokenUtil.doGenerateRefreshToken(expectedMap, expectedMap.get("sub").toString());

        return ResponseEntity.ok(new JwtResponse(token));
    }
}
