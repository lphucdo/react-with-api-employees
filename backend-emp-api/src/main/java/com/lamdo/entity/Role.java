package com.lamdo.entity;

import static com.lamdo.entity.Permission.ADMIN_CREATE;
import static com.lamdo.entity.Permission.ADMIN_READ;
import static com.lamdo.entity.Permission.USER_CREATE;
import static com.lamdo.entity.Permission.USER_READ;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.security.core.authority.SimpleGrantedAuthority;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public enum Role {
  ADMIN(
          Set.of(
                  ADMIN_READ,
                  ADMIN_CREATE,
                  USER_READ,
                  USER_CREATE
          )
  ),
  USER(
          Set.of(
        		  USER_READ,
        		  USER_CREATE
          )
  ),
  EDITOR(
		  Set.of(
				  ADMIN_READ,
                  ADMIN_CREATE,
                  USER_READ,
                  USER_CREATE
		  )
	
  )
  

  ;

  @Getter
  private final Set<Permission> permissions;

  public List<SimpleGrantedAuthority> getAuthorities() {
    var authorities = getPermissions()
            .stream()
            .map(authority -> new SimpleGrantedAuthority(authority.getPermission()))
            .collect(Collectors.toList());
    authorities.add(new SimpleGrantedAuthority("ROLE_" + this.name()));
    return authorities;
  }
}