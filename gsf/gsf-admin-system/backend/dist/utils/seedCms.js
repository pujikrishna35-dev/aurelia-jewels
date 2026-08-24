"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
async function seed() {
    const rootDir = path_1.default.join(__dirname, '../../../../');
    try {
        const destinationsPath = 'file://' + path_1.default.resolve(rootDir, 'src/data/destinations.js');
        const countryLoansPath = 'file://' + path_1.default.resolve(rootDir, 'src/data/countryLoans.js');
        const loanCategoriesPath = 'file://' + path_1.default.resolve(rootDir, 'src/data/loanCategories.js');
        const loanProcessPath = 'file://' + path_1.default.resolve(rootDir, 'src/data/loanProcess.js');
        const testimonialsPath = 'file://' + path_1.default.resolve(rootDir, 'src/data/testimonials.js');
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
        const dbPath = path_1.default.join(__dirname, '../../data/db.json');
        const dataDir = path_1.default.dirname(dbPath);
        if (!fs_1.default.existsSync(dataDir)) {
            fs_1.default.mkdirSync(dataDir, { recursive: true });
        }
        let db = {};
        if (fs_1.default.existsSync(dbPath)) {
            db = JSON.parse(fs_1.default.readFileSync(dbPath, 'utf8'));
        }
        db.cmsStore = cmsData;
        fs_1.default.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
        console.log('✅ CMS Store seeded successfully in db.json!');
    }
    catch (error) {
        console.error('❌ Failed to seed CMS Store:', error);
        process.exit(1);
    }
}
seed();
