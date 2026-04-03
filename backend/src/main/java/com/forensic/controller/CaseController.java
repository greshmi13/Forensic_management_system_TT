package com.forensic.controller;

import com.forensic.entity.CaseEntity;
import com.forensic.service.CaseService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cases")
public class CaseController {

    private final CaseService caseService;

    public CaseController(CaseService caseService) {
        this.caseService = caseService;
    }

    @GetMapping
    public ResponseEntity<List<CaseEntity>> getAllCases() {
        return ResponseEntity.ok(caseService.getAllCases());
    }

    @GetMapping("/search")
    public ResponseEntity<List<CaseEntity>> searchCases(@RequestParam String query) {
        return ResponseEntity.ok(caseService.searchCases(query));
    }

    @GetMapping("/{id}")
    public ResponseEntity<CaseEntity> getCaseById(@PathVariable Long id) {
        return caseService.getCaseById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<CaseEntity> createCase(@RequestBody CaseEntity caseEntity) {
        CaseEntity createdCase = caseService.createCase(caseEntity);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdCase);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CaseEntity> updateCase(@PathVariable Long id, @RequestBody CaseEntity caseEntity) {
        CaseEntity updatedCase = caseService.updateCase(id, caseEntity);
        if (updatedCase != null) {
            return ResponseEntity.ok(updatedCase);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCase(@PathVariable Long id) {
        caseService.deleteCase(id);
        return ResponseEntity.noContent().build();
    }
}