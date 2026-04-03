package com.forensic.repository;

import com.forensic.entity.CaseEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CaseRepository extends JpaRepository<CaseEntity, Long> {
    Optional<CaseEntity> findByCaseNumber(String caseNumber);
    List<CaseEntity> findByTitleContainingIgnoreCaseOrDescriptionContainingIgnoreCaseOrCaseNumberContainingIgnoreCase(String title, String description, String caseNumber);
}
