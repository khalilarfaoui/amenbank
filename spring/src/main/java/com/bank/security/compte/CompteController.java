package com.bank.security.compte;

import com.bank.security.user.User;
import com.bank.security.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
@CrossOrigin("*")
@RestController
@RequestMapping("/api/comptes")
public class CompteController {

    @Autowired
    private CompteRepository compteRepository;
    @Autowired
    private UserRepository userRepository ;

    // Get all comptes
    @GetMapping("/{id}")
    public List<Compte> getAllComptes(@PathVariable Long id) {
        return compteRepository.findByUserId(id);
    }

    // Get a compte by ID
    @GetMapping("/compteId/{id}")
    public ResponseEntity<Compte> getCompteById(@PathVariable Long id) {
        Optional<Compte> compte = compteRepository.findById(id);
        return compte.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Create a new compte
    @PostMapping("/{id}")
    public Compte createCompte(@RequestBody Compte compte , @PathVariable Long id) {
        User user = userRepository.findById(id).orElse(null) ;
        System.out.println("tagtag"+user.getId());
        compte.setUser(user);
        return compteRepository.save(compte);
    }

    // Update a compte
    @PutMapping("/{id}")
    public ResponseEntity<Compte> updateCompte(@PathVariable Long id, @RequestBody Compte compteDetails) {
        Optional<Compte> optionalCompte = compteRepository.findById(id);
        if (optionalCompte.isPresent()) {
            Compte compte = optionalCompte.get();
            compte.setNumeroCompte(compteDetails.getNumeroCompte());
            compte.setSolde(compteDetails.getSolde());
            compte.setMouvements(compteDetails.getMouvements());
            final Compte updatedCompte = compteRepository.save(compte);
            return ResponseEntity.ok(updatedCompte);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Delete a compte
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCompte(@PathVariable Long id) {
        Optional<Compte> optionalCompte = compteRepository.findById(id);
        if (optionalCompte.isPresent()) {
            compteRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
