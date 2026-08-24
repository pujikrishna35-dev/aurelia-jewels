import fs from 'fs';
import path from 'path';

async function seed() {
  const rootDir = path.join(__dirname, '../../../../');
  
  try {
    const destinationsPath = 'file://' + path.resolve(rootDir, 'src/data/destinations.js');
    const countryLoansPath = 'file://' + path.resolve(rootDir, 'src/data/countryLoans.js');
    const loanCategoriesPath = 'file://' + path.resolve(rootDir, 'src/data/loanCategories.js');
    const loanProcessPath = 'file://' + path.resolve(rootDir, 'src/data/loanProcess.js');
    const testimonialsPath = 'file://' + path.resolve(rootDir, 'src/data/testimonials.js');

    const { DESTINATIONS } = await import(destinationsPath);
    const { COUNTRY_LOAN_DATA } = await import(countryLoansPath);
    const { LOAN_CATEGORIES } = await import(loanCategoriesPath);
    const { LOAN_PROCESS_STEPS } = await import(loanProcessPath);
    const { TESTIMONIALS } = await import(testimonialsPath);

    const cmsData = {
      destinations: DESTINATIONS,
      countryLoans: COUNTRY_LOAN_DATA,
      loanCategories: LOAN_CATEGORIES,
      loanProcess: LOAN_PROCESS_STEPS,
      testimonials: TESTIMONIALS
    };

    const dbPath = path.join(__dirname, '../../data/db.json');
    const dataDir = path.dirname(dbPath);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    let db: any = {};
    if (fs.existsSync(dbPath)) {
      db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
    }
    db.cmsStore = cmsData;
    
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
    console.log('✅ CMS Store seeded successfully in db.json!');
  } catch (error) {
    console.error('❌ Failed to seed CMS Store:', error);
    process.exit(1);
  }
}

seed();
