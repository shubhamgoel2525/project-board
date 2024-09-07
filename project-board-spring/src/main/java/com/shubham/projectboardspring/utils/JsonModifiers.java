package com.shubham.projectboardspring.utils;

import io.jsonwebtoken.Claims;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

@Component
public class JsonModifiers {
    public Map<String, Object> getMapFromIoJsonWebTokenClaims(Claims claims) {

        return new HashMap<>(claims);
    }
}
