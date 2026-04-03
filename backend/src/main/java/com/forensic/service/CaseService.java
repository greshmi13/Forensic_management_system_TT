package com.forensic.service;

import com.forensic.entity.CaseEntity;
import com.forensic.repository.CaseRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CaseService {

    private final CaseRepository caseRepository;

    public CaseService(CaseRepository caseRepository) {
        this.caseRepository = caseRepository;
    }

    public List<CaseEntity> getAllCases() {
        return caseRepository.findAll();
    }

    public Optional<CaseEntity> getCaseById(Long id) {
        return caseRepository.findById(id);
    }

    public Optional<CaseEntity> getCaseByNumber(String caseNumber) {
        return caseRepository.findByCaseNumber(caseNumber);
    }

    public List<CaseEntity> searchCases(String query) {
        return caseRepository.findByTitleContainingIgnoreCaseOrDescriptionContainingIgnoreCaseOrCaseNumberContainingIgnoreCase(query, query, query);
    }

    public CaseEntity createCase(CaseEntity caseEntity) {
        return caseRepository.save(caseEntity);
    }

    public CaseEntity updateCase(Long id, CaseEntity updatedCase) {
        return caseRepository.findById(id)
                .map(existingCase -> {
                    existingCase.setTitle(updatedCase.getTitle());
                    existingCase.setDescription(updatedCase.getDescription());
                    existingCase.setStatus(updatedCase.getStatus());
                    existingCase.setAssignedTo(updatedCase.getAssignedTo());
                    return caseRepository.save(existingCase);
                })
                .orElse(null);
    }

    public void deleteCase(Long id) {
        caseRepository.deleteById(id);
    }
}
