package com.lamdo.entity;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public enum Permission {

    ADMIN_READ("admin:read"),
    ADMIN_CREATE("admin:create"),
    USER_READ("user:read"),
    USER_CREATE("user:create"),

    ;

    @Getter
    private final String permission;
}
