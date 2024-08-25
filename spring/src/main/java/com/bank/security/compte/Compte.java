package com.bank.security.compte;

import com.bank.security.mouvement.Mouvement;
import com.bank.security.user.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Compte {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String numeroCompte;
    private double solde;
    private CompteEnum compteEnum;
    private LocalDateTime localDateTime ;
    private String devise ;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user ;
    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Mouvement> mouvements;


}