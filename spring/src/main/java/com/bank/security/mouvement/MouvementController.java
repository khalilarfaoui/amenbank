package com.bank.security.mouvement;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
@CrossOrigin("*")
@RestController
@RequestMapping("/api/mouvements")
public class MouvementController {

    @Autowired
    private MouvementRepository mouvementRepository;

    // Get all Mouvements
    @GetMapping
    public List<Mouvement> getAllMouvements() {
        return mouvementRepository.findAll();
    }

    // Get a single Mouvement by ID
    @GetMapping("/{id}")
    public ResponseEntity<Mouvement> getMouvementById(@PathVariable Long id) {
        Optional<Mouvement> mouvement = mouvementRepository.findById(id);
        return mouvement.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Create a new Mouvement
    @PostMapping
    public ResponseEntity<Mouvement> createMouvement(@RequestBody Mouvement mouvement) {
        Mouvement savedMouvement = mouvementRepository.save(mouvement);
        return ResponseEntity.ok(savedMouvement);
    }

    // Update an existing Mouvement
    @PutMapping("/{id}")
    public ResponseEntity<Mouvement> updateMouvement(@PathVariable Long id, @RequestBody Mouvement mouvementDetails) {
        Optional<Mouvement> mouvementOptional = mouvementRepository.findById(id);

        if (mouvementOptional.isPresent()) {
            Mouvement mouvement = mouvementOptional.get();
            mouvement.setCompte(mouvementDetails.getCompte());
            mouvement.setMontant(mouvementDetails.getMontant());
            mouvement.setDevise(mouvementDetails.getDevise());
            mouvement.setDate(mouvementDetails.getDate());
            mouvement.setDescription(mouvementDetails.getDescription());
            Mouvement updatedMouvement = mouvementRepository.save(mouvement);
            return ResponseEntity.ok(updatedMouvement);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Delete a Mouvement
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMouvement(@PathVariable Long id) {
        if (mouvementRepository.existsById(id)) {
            mouvementRepository.deleteById(id);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}