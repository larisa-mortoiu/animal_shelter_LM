package com.pet.app.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;


@Entity
public class AnimalImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "imageId")
    private Long imageId;
    private String imageUrl;
    private int position;

    @ManyToOne(fetch = FetchType.LAZY)

    @JsonBackReference
    private Animal animal;

    public AnimalImage(String imageUrl, int position, Animal animal) {
        this.imageUrl = imageUrl;
        this.position = position;
        this.animal = animal;
    }

    public AnimalImage() {}

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    @JsonProperty("id")
    public Long getImageId() {
        return imageId;
    }

    public void setId(Long id) {
        this.imageId = id;
    }

    public Animal getAnimal() {
        return animal;
    }

    public int getPosition() {
        return position;
    }

    public void setPosition(int position) {
        this.position = position;
    }

    public void setAnimal(Animal animal) {
        this.animal = animal;
    }
}
