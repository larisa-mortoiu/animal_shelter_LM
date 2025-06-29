package com.pet.app.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.util.List;

@Entity
public class Animal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String breed;
    private String size;
    private String age;
    private String temperament;
    private String gender;
    private String image;
    private String animalType;
    private Boolean friendly;
    private Boolean childSafe;
    private Boolean specialFood;
    private Boolean sterilized;
    private Boolean microchip;

    @Column(nullable = false)
    private boolean adopted = false;

    @OneToMany(mappedBy = "animal", orphanRemoval = true, cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<AnimalImage> animalImageList;

    public Animal(String name,
                  String breed,
                  String size,
                  String age,
                  String temperament,
                  String gender,
                  String image,
                  String animalType,
                  Boolean friendly,
                  Boolean childSafe,
                  Boolean specialFood,
                  Boolean sterilized,
                  Boolean microchip,
                  Boolean adopted,
                  List<AnimalImage> animalImageList) {
        this.name = name;
        this.breed = breed;
        this.size = size;
        this.age = age;
        this.temperament = temperament;
        this.gender = gender;
        this.image = image;
        this.animalType = animalType;
        this.friendly = friendly;
        this.childSafe = childSafe;
        this.specialFood = specialFood;
        this.sterilized = sterilized;
        this.microchip = microchip;
        this.adopted = adopted;
        this.animalImageList = animalImageList;
    }

    public Animal() {

    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getBreed() {
        return breed;
    }

    public void setBreed(String breed) {
        this.breed = breed;
    }


    public String getSize() {
        return size;
    }

    public void setSize(String size) {
        this.size = size;
    }

    public String getAge() {
        return age;
    }

    public void setAge(String age) {
        this.age = age;
    }

    public String getTemperament() {
        return temperament;
    }

    public void setTemperament(String temperament) {
        this.temperament = temperament;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getAnimalType() {
        return animalType;
    }

    public void setAnimalType(String animalType) {
        this.animalType = animalType;
    }

    public Boolean getFriendly() {
        return friendly;
    }

    public void setFriendly(Boolean friendly) {
        this.friendly = friendly;
    }

    public Boolean getChildSafe() {
        return childSafe;
    }

    public void setChildSafe(Boolean childSafe) {
        this.childSafe = childSafe;
    }

    public Boolean getSpecialFood() {
        return specialFood;
    }

    public void setSpecialFood(Boolean specialFood) {
        this.specialFood = specialFood;
    }

    public Boolean getSterilized() {
        return sterilized;
    }

    public void setSterilized(Boolean sterilized) {
        this.sterilized = sterilized;
    }

    public Boolean getMicrochip() {
        return microchip;
    }

    public void setMicrochip(Boolean microchip) {
        this.microchip = microchip;
    }

    public boolean isAdopted() {
        return adopted;
    }

    public void setAdopted(boolean adopted) {
        this.adopted = adopted;
    }
}
