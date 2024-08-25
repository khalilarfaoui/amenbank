package com.bank.security.virement;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface VirementRepository extends JpaRepository<Virement ,Long> {
    // Find all Virements by compteSource ID
    List<Virement> findByCompteSource_Id(Long compteSourceId);

    // Find all Virements by compteDest ID
    List<Virement> findByCompteDest_Id(Long compteDestId);
}
