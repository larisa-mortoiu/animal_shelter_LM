package com.pet.app.dto;

import com.pet.app.model.Animal;
import java.util.List;
import java.util.Map;

public class AnimalResponseDto {
    private List<Animal> animals;
    private Map<String, Long> totalCounts;

    public AnimalResponseDto(List<Animal> animals, Map<String, Long> totalCounts) {
        this.animals = animals;
        this.totalCounts = totalCounts;
    }

    public List<Animal> getAnimals() {
        return animals;
    }

    public void setAnimals(List<Animal> animals) {
        this.animals = animals;
    }

    public Map<String, Long> getTotalCounts() {
        return totalCounts;
    }

    public void setTotalCounts(Map<String, Long> totalCounts) {
        this.totalCounts = totalCounts;
    }
}
