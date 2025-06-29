package com.pet.app.dto;

public record AnimalRequestDTO(
        String name,
        String breed,
        String size,
        String age,
        String temperament,
        String gender,
        String animalType,
        String image,
        Boolean friendly,
        Boolean specialFood,
        Boolean childSafe,
        Boolean sterilized,
        Boolean microchip

) {}
