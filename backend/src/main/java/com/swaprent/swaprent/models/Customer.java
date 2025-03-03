package com.swaprent.swaprent.models;

import com.swaprent.swaprent.auth.entities.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString

public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    Integer idCustomer;
    String neighborhood;
    String race;
    int house_number;


    @OneToOne(targetEntity = User.class)
    private User user;

}
