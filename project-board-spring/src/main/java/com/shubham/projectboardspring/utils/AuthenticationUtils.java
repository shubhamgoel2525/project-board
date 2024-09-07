package com.shubham.projectboardspring.utils;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Component;

@Component
public class AuthenticationUtils {
    private final AuthenticationManager authenticationManager;

    public AuthenticationUtils(AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
    }

    // TODO: Make dedicated exceptions
    public void authenticate(String username, String password) throws Exception {

        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        } catch (DisabledException e) {
            throw new Exception("User Disabled", e);
        } catch (BadCredentialsException e) {
            throw new Exception("Invalid Credentials", e);
        }
    }
}
