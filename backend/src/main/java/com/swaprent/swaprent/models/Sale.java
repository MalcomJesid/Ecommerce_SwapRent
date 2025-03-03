package com.swaprent.swaprent.models;


import jakarta.persistence.Entity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.time.LocalDate;
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Data

public class Sale {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer idSale;
    LocalDate date_init;
    LocalDate date_end;
    Double total_price;
    int quantity;
    String description;

    @OneToMany(targetEntity = Product.class)
    private List<Product> products;

}
