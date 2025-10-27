# Allergens Added from Database Research

This document summarizes the allergens and dietary restrictions added to the main database.json based on research from the allergen databases listed in issue #12.

## Date Added
2025-10-27

## Sources Referenced
- Healthline Common Food Allergies
- Food Safety Australia Top 10 Allergies  
- FARRP InformAll Database
- AllergenOnline Database
- Food Standards Australia & New Zealand Food Allergen Portal
- COMPARE Database
- Global Nutrition Report

## New Allergen Categories Added

### 1. Sesame Allergy (`sesame_allergy`)
**Reason:** Part of the "Big 9" allergens in the US (added in 2021), required labeling in AU/NZ and many other countries.

**Items included:**
- sesame
- sesame seeds
- sesame oil
- tahini
- sesame paste
- sesamol
- sesamolin

### 2. Wheat Allergy (`wheat_allergy`)
**Reason:** Distinct from gluten-free; wheat allergy is a specific immune response to wheat proteins (not just gluten).

**Items included:**
- wheat
- wheat flour
- wheat bran
- wheat germ
- wheat starch
- bread
- pasta
- couscous
- bulgur
- semolina
- spelt
- farro
- kamut

### 3. Lupin Allergy (`lupin_allergy`)
**Reason:** Required allergen labeling in AU/NZ and EU regulations.

**Items included:**
- lupin
- lupini beans
- lupin flour
- lupin protein
- lupine

### 4. Sulphites Allergy (`sulphites_allergy`)
**Reason:** Required labeling in AU/NZ when concentrations are 10mg/kg or more; also important in EU regulations.

**Items included:**
- sulphites
- sulfites
- sulfur dioxide
- sodium sulfite
- sodium bisulfite
- potassium bisulfite
- sodium metabisulfite
- potassium metabisulfite

### 5. Celery Allergy (`celery_allergy`)
**Reason:** Required allergen labeling in EU regulations.

**Items included:**
- celery
- celery root
- celeriac
- celery seed
- celery salt
- celery leaves

### 6. Mustard Allergy (`mustard_allergy`)
**Reason:** Required allergen labeling in EU regulations.

**Items included:**
- mustard
- mustard seeds
- mustard powder
- mustard oil
- dijon mustard
- yellow mustard
- brown mustard
- mustard greens

### 7. Molluscs Allergy (`molluscs_allergy`)
**Reason:** Separated from shellfish/crustaceans in many regulations (EU, AU/NZ). Molluscs are a distinct category from crustaceans.

**Items included:**
- molluscs
- mollusks
- mussels
- oysters
- clams
- squid
- octopus
- cuttlefish
- snails
- escargot
- abalone
- whelks
- scallops

## Updated Existing Categories

### Shellfish Allergy
**Updated:** Removed molluscs (mussels, oysters, clams) as they now have their own category. Added crayfish and langoustine.

**Now includes:**
- shellfish
- crustaceans
- crab
- lobster
- shrimp
- prawns
- crayfish
- langoustine

### Nut Allergy & Nut Free
**Updated:** Added Brazil nuts (mentioned in research as part of tree nuts).

**Now includes:**
- nuts
- peanuts
- almonds
- cashews
- walnuts
- tree nuts
- hazelnuts
- macademia nuts
- pecans
- pistachios
- brazil nuts

## New Dietary Restriction Categories (Free versions)

For consistency with existing patterns (e.g., `nut_free`, `soy_free`), added:

### Sesame Free (`sesame_free`)
- sesame
- sesame seeds
- sesame oil
- tahini

### Wheat Free (`wheat_free`)
- wheat
- wheat flour
- wheat bran
- wheat germ
- bread
- pasta

### Sulphites Free (`sulphites_free`)
- sulphites
- sulfites
- sulfur dioxide

## Summary Statistics

**Total new allergen categories added:** 7 main allergens + 3 "_free" variants = 10 new categories

**Total allergen categories in database:** 24 (was 14)

**Increase:** +71% more allergen coverage

## Regional Coverage Improved

The database now covers allergen requirements for:
- ✅ United States (Big 9)
- ✅ European Union (14 allergens)
- ✅ Australia/New Zealand (10+ allergens)
- ✅ Canada (11 priority allergens)
- ✅ Japan (partial coverage)

## Next Steps

Consider adding translations for the new allergens in all supported languages:
- English ✅ (base language)
- Spanish
- Portuguese
- Russian
- Japanese
- Danish
- French
- Hindi
- Arabic
- Tamil
- German
- Indonesian

## References

All additions based on official allergen regulations and scientific databases documented in `_data/allergen-database-resources.md`.
