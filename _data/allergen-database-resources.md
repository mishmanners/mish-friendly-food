# Food Allergen Database Resources

This document contains links to known databases and information sources for food allergens and dietary restrictions that should be referenced when updating the Mish Friendly Food database.

## Scraping Date
Last updated: 2025-10-27

## Database Sources

### 1. Global Nutrition Report
- **URL:** https://globalnutritionreport.org/reports/2020-global-nutrition-report/executive-summary/
- **Description:** Comprehensive global nutrition data including dietary information
- **Content Type:** Research report on global nutrition trends
- **Usage:** Reference for understanding global dietary patterns and nutrition

### 2. Healthline - Common Food Allergies
- **URL:** https://www.healthline.com/nutrition/common-food-allergies
- **Description:** Article listing the 8 most common food allergies
- **Content Type:** Medical/nutritional information
- **Known Allergens Covered:**
  - Cow's Milk
  - Eggs
  - Tree Nuts (almonds, walnuts, hazelnuts, pecans, cashews, pistachios)
  - Peanuts
  - Shellfish (shrimp, crab, lobster)
  - Wheat
  - Soy
  - Fish

### 3. Food Safety Australia - Top 10 Food Allergies
- **URL:** https://www.foodsafety.com.au/blog/top-10-most-common-food-allergies
- **Description:** Australian perspective on the top 10 most common food allergies
- **Content Type:** Educational blog post
- **Known Allergens Covered:**
  - Milk
  - Eggs
  - Peanuts
  - Tree nuts
  - Sesame seeds
  - Fish
  - Shellfish
  - Soy
  - Wheat/Gluten
  - Lupin

### 4. FARRP InformAll Database
- **URL:** https://farrp.unl.edu/resources/gi-fas/informall
- **Description:** Food Allergy Research and Resource Program database of allergens
- **Content Type:** Research database
- **Features:** Comprehensive allergen information database maintained by University of Nebraska-Lincoln

### 5. AllergenOnline Database
- **URL:** http://www.allergenonline.org/
- **Description:** Peer-reviewed allergen protein sequence database
- **Content Type:** Scientific database
- **Features:** Contains allergen sequences, evaluates potential allergenicity of novel proteins

### 6. Food Standards Australia & New Zealand - Food Allergen Portal
- **URL:** https://www.foodstandards.gov.au/consumer/foodallergies/foodallergenportal/Pages/default.aspx
- **Description:** Official food allergen information portal for Australia/New Zealand
- **Content Type:** Government resource
- **Regulated Allergens:**
  - Cereals containing gluten
  - Crustacea
  - Egg
  - Fish
  - Milk
  - Peanuts
  - Soybeans
  - Tree nuts
  - Sesame seeds
  - Sulphites (in concentrations of 10mg/kg or more)
  - Lupin

### 7. COMPARE Database
- **URL:** https://comparedatabase.org/
- **Description:** Comprehensive Protein Allergen Resource
- **Content Type:** Scientific allergen database
- **Features:** Structural allergen database with 3D protein structures

## Common Food Allergens (Consolidated)

Based on the sources above, here are the most commonly recognized food allergens:

### Major Allergens (The Big 9 in US, varying by region)
1. **Milk/Dairy** - Including all cow's milk products
2. **Eggs** - Both egg whites and yolks
3. **Fish** - All finned fish (salmon, tuna, cod, etc.)
4. **Shellfish** - Crustaceans (shrimp, crab, lobster) and mollusks (clams, mussels, oysters)
5. **Tree Nuts** - Almonds, walnuts, pecans, cashews, pistachios, hazelnuts, macadamia nuts, Brazil nuts
6. **Peanuts** - Technically a legume, not a tree nut
7. **Wheat** - Including all wheat varieties
8. **Soybeans** - All soy products
9. **Sesame** - Seeds and oil (added as 9th major allergen in many countries)

### Additional Common Allergens
- **Lupin** - Common in European and Australian regulations
- **Sulphites** - Preservatives (when above certain concentrations)
- **Celery** - Required labeling in EU
- **Mustard** - Required labeling in EU
- **Molluscs** - Separate from crustaceans in some regulations
- **Gluten** - Found in wheat, barley, rye, and sometimes oats

## Dietary Restrictions

### Common Dietary Types
- Vegetarian
- Vegan
- Pescatarian
- Paleo
- Ketogenic
- Gluten-free
- Dairy-free
- Lactose-free
- Halal
- Kosher
- Low FODMAP

## Regional Variations

Different countries have different allergen labeling requirements:
- **US:** Big 9 allergens (milk, eggs, fish, shellfish, tree nuts, peanuts, wheat, soybeans, sesame)
- **EU:** 14 allergens (includes celery, mustard, lupin, molluscs, sulphites)
- **Australia/NZ:** 10 allergens (includes lupin, sulphites)
- **Japan:** 8 allergens (includes buckwheat, excludes sesame as mandatory)
- **Canada:** 11 priority allergens

## Scraping Instructions

### Manual Data Collection
Since automated web scraping may be limited:

1. **Visit each database URL** listed above
2. **Extract allergen information** including:
   - Allergen name
   - Alternative names/synonyms
   - Common foods containing the allergen
   - Regional variations in terminology
   - Cross-reactivity information (if available)

3. **Update the database.json** file with:
   - New allergens found
   - Additional synonyms for existing allergens
   - Translation improvements

### Automated Scraping (when network access available)
Run the scraper script:
```bash
npm run scrape
```

This will:
- Scrape available databases
- Generate `_data/scraped-allergens.json` with raw data
- Generate `_data/scraping-summary.md` with a human-readable summary
- Extract allergen names and descriptions

## Notes for Contributors

1. **Verify translations** - Don't rely solely on automated translations
2. **Check regional terminology** - "Dairy" may mean different things in different regions
3. **Include cross-reactivity** - Some allergens are related (e.g., latex-fruit syndrome)
4. **Consider cultural context** - Some allergens are more common in certain regions
5. **Medical accuracy is critical** - Incorrect information could harm users

## References

- Food Allergy Research & Education (FARE): https://www.foodallergy.org/
- European Food Safety Authority (EFSA): https://www.efsa.europa.eu/
- US FDA Food Allergen Labeling: https://www.fda.gov/food/food-labeling-nutrition/food-allergies
- Codex Alimentarius: http://www.fao.org/fao-who-codexalimentarius/

## Last Updated
2025-10-27

## Maintenance
This resource list should be reviewed and updated quarterly to ensure links are valid and information is current.
