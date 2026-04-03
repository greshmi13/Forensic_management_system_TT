package com.forensic.entity;
import jakarta.persistence.*;
@Entity
public class Case {
    @Id
    @GeneratedValue
    private Long id;
    private String name;
}