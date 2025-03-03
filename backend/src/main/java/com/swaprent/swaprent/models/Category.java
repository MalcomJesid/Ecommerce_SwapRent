package com.swaprent.swaprent.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString

public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer idCategory;
    String name;
    String descripcion;


    @OneToMany(targetEntity = Product.class, fetch = FetchType.EAGER, mappedBy = "category")
    private List<Product> products;

}
