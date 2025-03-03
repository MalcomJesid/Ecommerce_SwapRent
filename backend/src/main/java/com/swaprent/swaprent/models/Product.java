package com.swaprent.swaprent.models;

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

public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer idProduct;
    String name;
    Double price;
    String description;
    boolean state;

   @ManyToOne(targetEntity = Category.class)
    private Category category;

   @ManyToOne(targetEntity = Sale.class)
    private Sale sale;

}
