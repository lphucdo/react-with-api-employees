package com.lamdo.service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.function.Function;

import javax.crypto.SecretKey;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import com.lamdo.entity.Employee;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureException;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtils {
	
	private static final long EXPIRATION_TIME = 8640000;
	private SecretKey KEY_SIGNIN;
	
	public JwtUtils() {
		String keys = "mc7RKTCtZyMe5/SBuVCRZhya7txTqAi1leo0tSeVAZ5DZ5CrczoD1z3N7bhmaLwh\n";
		byte[] keybyte = Decoders.BASE64.decode(keys);
		KEY_SIGNIN = Keys.hmacShaKeyFor(keybyte);
	}
	
	public String generateToken(Employee userDetails) {
		return Jwts.builder()
				.subject(userDetails.getUsername())
				.claim("user_id", userDetails.getId())
				.claim("roles", userDetails.getRole())
				.issuedAt(new Date(System.currentTimeMillis()))
				.expiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
				.signWith(KEY_SIGNIN)
				.compact();
	}
	
	public String generateRefreshToken(HashMap<String, Object> claims ,UserDetails userDetails) {
		return Jwts.builder()
				.claims(claims)
				.subject(userDetails.getUsername())
				.issuedAt(new Date(System.currentTimeMillis()))
				.expiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
				.signWith(KEY_SIGNIN)
				.compact();
	}
	
	public String extractUsername(String token) {
		return extractClaims(token, Claims::getSubject);
	}
	public Integer extractUserId(String token) {
        try {
            Claims claims = Jwts.parser()
					.verifyWith(KEY_SIGNIN)
					.build()
					.parseSignedClaims(token)
					.getPayload();
            
            return claims.get("user_id", Integer.class);
        } catch (RuntimeException e) {
            throw new RuntimeException("Invalid JWT signature");
        } catch (Exception e) {
            throw new RuntimeException("Invalid JWT token");
        }
	}

	public <T> T extractClaims(String token, Function<Claims, T> claimsResolver) {
		
		return claimsResolver.apply(
				Jwts.parser()
						.verifyWith(KEY_SIGNIN)
						.build()
						.parseSignedClaims(token)
						.getPayload()
				);
	}
	
	public boolean isTokenValid(String token, UserDetails userDetails) {
		String username = extractUsername(token);
		
		return (username.equals(userDetails.getUsername()));
	}
	
	public boolean isTokenExpired(String token) {
		return extractClaims(token, Claims::getExpiration).before(new Date());
	}
	
	
}
