package com.forensic.config;

import com.forensic.entity.CaseEntity;
import com.forensic.repository.CaseRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDateTime;
import java.util.Arrays;

@Configuration
public class DataSeeder implements CommandLineRunner {

    private final CaseRepository caseRepository;

    public DataSeeder(CaseRepository caseRepository) {
        this.caseRepository = caseRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        // Seed alternative fake cases if Db is empty
        if (caseRepository.count() == 0) {
            
            CaseEntity c1 = new CaseEntity();
            c1.setCaseNumber("FC-2024-001");
            c1.setTitle("Bank Robbery Investigation");
            c1.setDescription("Investigation details regarding the central branch robbery.");
            c1.setStatus("Open");
            c1.setAssignedTo("John Smith");
            
            CaseEntity c2 = new CaseEntity();
            c2.setCaseNumber("FC-2024-002");
            c2.setTitle("Digital Fraud Analysis");
            c2.setDescription("Analyzing digital footprints of financial fraud.");
            c2.setStatus("In Progress");
            c2.setAssignedTo("Sarah Wilson");
            
            CaseEntity c3 = new CaseEntity();
            c3.setCaseNumber("FC-2024-003");
            c3.setTitle("Cyber Crime Evidence");
            c3.setDescription("Ransomware tracking and analysis.");
            c3.setStatus("Closed");
            c3.setAssignedTo("Mike Johnson");

            CaseEntity c4 = new CaseEntity();
            c4.setCaseNumber("FC-2024-004");
            c4.setTitle("Corporate Embezzlement");
            c4.setDescription("Audit and forensic accounting for massive company loss.");
            c4.setStatus("Open");
            c4.setAssignedTo("Emma Davis");

            caseRepository.saveAll(Arrays.asList(c1, c2, c3, c4));
            System.out.println("Seeded database with alternative fake cases.");
        }
    }
}
