# Scripts Directory

This directory contains utility scripts for the Mish Friendly Food project.

## Available Scripts

### scrape-allergen-databases.js

A web scraper that collects food allergen information from various online databases.

#### Usage

```bash
npm run scrape
```

#### What it does

1. Scrapes the following databases for allergen information:
   - Healthline Common Food Allergies
   - Food Safety Australia Top 10 Allergies
   - (Additional databases can be added to the script)

2. Generates two output files in the `_data/` directory:
   - `scraped-allergens.json` - Raw JSON data of all scraped allergens
   - `scraping-summary.md` - Human-readable markdown summary

#### Requirements

- Node.js with ES module support
- Dependencies: axios, cheerio (installed as dev dependencies)
- Internet access to reach the database URLs

#### Network Limitations

Note that this scraper requires internet access to external websites. In restricted environments (like CI/CD pipelines or sandboxed environments), the scraper may not be able to access external URLs. In such cases:

1. Run the script locally in an environment with internet access
2. Review the generated files
3. Commit the results to the repository

#### Adding New Databases

To add a new database source:

1. Add a scraper function for the specific website structure
2. Add the database to the `databases` array in the script:

```javascript
{
  name: 'Database Name',
  url: 'https://example.com/allergens',
  scraper: scrapeDatabaseName
}
```

3. Implement the scraper function following the existing patterns

#### Output Format

The JSON output has this structure:

```json
{
  "scrapedAt": "2025-10-27T08:00:00.000Z",
  "sources": [
    {
      "name": "Database Name",
      "url": "https://...",
      "allergensFound": 8,
      "scrapedAt": "2025-10-27T08:00:00.000Z"
    }
  ],
  "allergens": [
    {
      "name": "Allergen Name",
      "description": "Description of the allergen...",
      "source": "Database Name"
    }
  ]
}
```

#### Best Practices

1. **Respect rate limits** - The scraper includes delays between requests
2. **Handle errors gracefully** - Failed scrapes are logged but don't stop the entire process
3. **Verify data** - Always manually verify scraped data before adding to the main database
4. **Update regularly** - Allergen information may change; re-run periodically
5. **Check robots.txt** - Ensure you're allowed to scrape each website
6. **Be a good citizen** - Use reasonable timeouts and user agents

#### Security Considerations

- Uses axios with request size limits (10MB) to prevent DoS attacks
- Limits description length to prevent excessive data storage
- Uses safe version of axios (1.12.0) to avoid known vulnerabilities
- Validates and sanitizes scraped content

#### Future Enhancements

Potential improvements for the scraper:

- [ ] Add support for more database sources
- [ ] Implement caching to avoid re-scraping unchanged data
- [ ] Add data validation and schema checking
- [ ] Create a differential update system (only update changed data)
- [ ] Add support for authenticated access to databases that require it
- [ ] Implement retry logic with exponential backoff
- [ ] Add translation extraction for multilingual sites
- [ ] Create automated tests for scrapers

## Reference Documentation

See `_data/allergen-database-resources.md` for:
- Complete list of database URLs
- Manual data collection instructions
- Information about common allergens
- Regional variations in allergen requirements
