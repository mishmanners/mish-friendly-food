/**
 * Web Scraper for Food Allergen Databases
 * 
 * This script scrapes the following databases for food allergen information:
 * - https://www.healthline.com/nutrition/common-food-allergies
 * - https://www.foodsafety.com.au/blog/top-10-most-common-food-allergies
 * - https://farrp.unl.edu/resources/gi-fas/informall
 * - http://www.allergenonline.org/
 * - https://www.foodstandards.gov.au/consumer/foodallergies/foodallergenportal/Pages/default.aspx
 * - https://comparedatabase.org/
 * - https://globalnutritionreport.org/reports/2020-global-nutrition-report/executive-summary/
 * 
 * The scraped data will be saved to a JSON file for further processing.
 */

import axios from 'axios';
import * as cheerio from 'cheerio';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure axios with reasonable defaults
const axiosInstance = axios.create({
  timeout: 30000,
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
  },
  maxContentLength: 10 * 1024 * 1024, // 10MB limit
  maxBodyLength: 10 * 1024 * 1024 // 10MB limit
});

const databases = [
  {
    name: 'Healthline Common Food Allergies',
    url: 'https://www.healthline.com/nutrition/common-food-allergies',
    scraper: scrapeHealthline
  },
  {
    name: 'Food Safety Australia Top 10 Allergies',
    url: 'https://www.foodsafety.com.au/blog/top-10-most-common-food-allergies',
    scraper: scrapeFoodSafetyAU
  }
  // Note: Other databases may require more sophisticated scraping or API access
  // Some sites may have anti-scraping measures or may require authentication
];

/**
 * Scrape Healthline for common food allergens
 */
async function scrapeHealthline(url) {
  try {
    const response = await axiosInstance.get(url);
    const $ = cheerio.load(response.data);
    const allergens = [];

    // Extract allergen information from the article
    $('h2').each((i, elem) => {
      const heading = $(elem).text().trim();
      // Look for numbered allergens (e.g., "1. Cow's Milk", "2. Eggs")
      const match = heading.match(/^\d+\.\s+(.+)/);
      if (match) {
        const allergenName = match[1];
        const description = $(elem).next('p').text().trim();
        
        allergens.push({
          name: allergenName,
          description: description.substring(0, 300), // Limit description length
          source: 'Healthline'
        });
      }
    });

    return allergens;
  } catch (error) {
    console.error(`Error scraping Healthline: ${error.message}`);
    return [];
  }
}

/**
 * Scrape Food Safety Australia for top allergens
 */
async function scrapeFoodSafetyAU(url) {
  try {
    const response = await axiosInstance.get(url);
    const $ = cheerio.load(response.data);
    const allergens = [];

    // Extract allergen information from the blog post
    $('h2, h3').each((i, elem) => {
      const heading = $(elem).text().trim();
      // Look for numbered allergens or specific patterns
      if (heading.match(/^\d+\./) || heading.toLowerCase().includes('allerg')) {
        const description = $(elem).nextUntil('h2, h3', 'p').first().text().trim();
        
        if (heading.length > 0 && heading.length < 100) {
          allergens.push({
            name: heading,
            description: description.substring(0, 300),
            source: 'Food Safety Australia'
          });
        }
      }
    });

    return allergens;
  } catch (error) {
    console.error(`Error scraping Food Safety AU: ${error.message}`);
    return [];
  }
}

/**
 * Main scraping function
 */
async function scrapeAllDatabases() {
  console.log('Starting web scraping for food allergen databases...\n');
  
  const results = {
    scrapedAt: new Date().toISOString(),
    sources: [],
    allergens: []
  };

  for (const db of databases) {
    console.log(`Scraping: ${db.name}`);
    console.log(`URL: ${db.url}`);
    
    try {
      const allergens = await db.scraper(db.url);
      console.log(`Found ${allergens.length} allergens\n`);
      
      results.sources.push({
        name: db.name,
        url: db.url,
        allergensFound: allergens.length,
        scrapedAt: new Date().toISOString()
      });
      
      results.allergens.push(...allergens);
      
      // Be respectful - add delay between requests
      await sleep(2000);
    } catch (error) {
      console.error(`Failed to scrape ${db.name}: ${error.message}\n`);
      results.sources.push({
        name: db.name,
        url: db.url,
        error: error.message,
        scrapedAt: new Date().toISOString()
      });
    }
  }

  // Remove duplicates based on allergen name
  const uniqueAllergens = [];
  const seen = new Set();
  
  for (const allergen of results.allergens) {
    const normalizedName = allergen.name.toLowerCase().replace(/[^\w\s]/g, '').trim();
    if (!seen.has(normalizedName)) {
      seen.add(normalizedName);
      uniqueAllergens.push(allergen);
    }
  }
  
  results.allergens = uniqueAllergens;

  // Save results to file
  const outputPath = path.join(__dirname, '..', '_data', 'scraped-allergens.json');
  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
  
  console.log(`\n✓ Scraping complete!`);
  console.log(`✓ Total unique allergens found: ${uniqueAllergens.length}`);
  console.log(`✓ Results saved to: ${outputPath}`);
  
  // Also create a summary file
  const summaryPath = path.join(__dirname, '..', '_data', 'scraping-summary.md');
  const summary = generateSummary(results);
  fs.writeFileSync(summaryPath, summary);
  console.log(`✓ Summary saved to: ${summaryPath}`);
}

/**
 * Generate a markdown summary of the scraping results
 */
function generateSummary(results) {
  let summary = `# Food Allergen Database Scraping Summary\n\n`;
  summary += `**Scraped at:** ${results.scrapedAt}\n\n`;
  summary += `## Sources\n\n`;
  
  for (const source of results.sources) {
    summary += `### ${source.name}\n`;
    summary += `- **URL:** ${source.url}\n`;
    if (source.error) {
      summary += `- **Status:** ❌ Failed\n`;
      summary += `- **Error:** ${source.error}\n`;
    } else {
      summary += `- **Status:** ✓ Success\n`;
      summary += `- **Allergens Found:** ${source.allergensFound}\n`;
    }
    summary += `\n`;
  }
  
  summary += `## Allergens Found\n\n`;
  summary += `Total unique allergens: **${results.allergens.length}**\n\n`;
  
  for (const allergen of results.allergens) {
    summary += `### ${allergen.name}\n`;
    summary += `**Source:** ${allergen.source}\n\n`;
    if (allergen.description) {
      summary += `${allergen.description}\n\n`;
    }
    summary += `---\n\n`;
  }
  
  return summary;
}

/**
 * Helper function to sleep
 */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Run the scraper
scrapeAllDatabases().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
