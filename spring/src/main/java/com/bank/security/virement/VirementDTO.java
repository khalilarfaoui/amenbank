package com.bank.security.virement;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class VirementDTO {
    private Long compteSourceId;
    private Long compteDestId;
    private double montant;
    private String devise;
    private String motif;
}
