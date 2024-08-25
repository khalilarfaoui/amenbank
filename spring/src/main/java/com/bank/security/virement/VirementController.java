package com.bank.security.virement;


import com.bank.security.compte.Compte;
import com.bank.security.compte.CompteRepository;
import com.bank.security.mouvement.MouvementRepository;
import com.bank.security.user.User;
import com.bank.security.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/virements")

public class VirementController {
    @Autowired
    private CompteRepository compteRepository;

    @Autowired
    private MouvementRepository mouvementRepository;

    @Autowired
    private UserRepository userRepository;
    private final VirementRepository virementRepository;

    public VirementController(VirementRepository virementRepository) {
        this.virementRepository = virementRepository;
    }

    // Obtenir tous les virements
    @GetMapping
    public ResponseEntity<List<Virement>> getAllVirements() {
        List<Virement> virements = virementRepository.findAll();
        return ResponseEntity.ok(virements);
    }

    @GetMapping("mes-virement-sources/get/{id}")
    public ResponseEntity<List<Virement>> getAllMesVirementsSource(@PathVariable Long id) {
        List<Virement> virements = virementRepository.findAll();
        List<Virement> virementList = new ArrayList<>() ;
        for (Virement virement : virements){
            System.out.println(virement);
            if(virement.getCompteDest().getUser().getId() == id || virement.getCompteSource().getUser().getId() == id ){
                virementList.add(virement);
            }
        }


        return ResponseEntity.ok(virementList);
    }


    @GetMapping("mes-virement-desc/get/{id}")
    public ResponseEntity<List<Virement>> getAllMesVirementsDesc(@PathVariable Long id) {
        Compte compte = compteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Source account not found"));
        List<Virement> virements = virementRepository.findByCompteDest_Id(compte.getId());
        return ResponseEntity.ok(virements);
    }

    // Obtenir un virement par ID
    @GetMapping("/{id}")
    public ResponseEntity<Virement> getVirementById(@PathVariable Long id) {
        Optional<Virement> virement = virementRepository.findById(id);
        return virement.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Créer un nouveau virement
    @Transactional
    @PostMapping
    public ResponseEntity<Virement> createVirement(@RequestBody VirementDTO virementDTO) {
        Compte compteSource = compteRepository.findById(virementDTO.getCompteSourceId())
                .orElseThrow(() -> new RuntimeException("Source account not found"));
        Compte compteDest = compteRepository.findById(virementDTO.getCompteDestId())
                .orElseThrow(() -> new RuntimeException("Destination account not found"));
        Virement virement = new Virement();
        virement.setCompteSource(compteSource);
        virement.setCompteDest(compteDest);
        virement.setMontant(virementDTO.getMontant());
        virement.setDevise(virementDTO.getDevise());
        virement.setMotif(virementDTO.getMotif());
        virement.setDate(LocalDateTime.now());
        virement.setStatut(StatusEnum.IN_PROGRESS);

        Virement savedVirement = virementRepository.save(virement);

        compteSource.setSolde(compteSource.getSolde() - virement.getMontant());
        compteDest.setSolde(compteDest.getSolde() + virement.getMontant());

        compteRepository.save(compteSource);
        compteRepository.save(compteDest);

        
        return ResponseEntity.ok(savedVirement);
    }

    // Mettre à jour un virement existant
    @PutMapping("/{id}")
    public ResponseEntity<Virement> updateVirement(@PathVariable Long id, @RequestBody Virement virementDetails) {
        Optional<Virement> virementOptional = virementRepository.findById(id);
        if (virementOptional.isPresent()) {
            Virement virement = virementOptional.get();
            virement.setCompteSource(virementDetails.getCompteSource());
            virement.setCompteDest(virementDetails.getCompteDest());
            virement.setMontant(virementDetails.getMontant());
            virement.setDate(virementDetails.getDate());
            virement.setStatut(virementDetails.getStatut());
            virement.setDevise(virementDetails.getDevise());
            virement.setMotif(virementDetails.getMotif());

            Virement updatedVirement = virementRepository.save(virement);
            return ResponseEntity.ok(updatedVirement);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Supprimer un virement
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVirement(@PathVariable Long id) {
        Optional<Virement> virement = virementRepository.findById(id);
        if (virement.isPresent()) {
            virementRepository.delete(virement.get());
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}