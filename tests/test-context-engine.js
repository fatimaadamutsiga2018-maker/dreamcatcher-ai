const { getContextualAdvice, STATE_TO_ENERGY_MAP } = require('../src/shared/lib/dreamcatcher/contextual-engine');
const { getTodayState } = require('../src/shared/lib/dreamcatcher/decision-dashboard');

// Mock data
const mockState = 'INITIATE'; // or whatever state holds for today
const domains = [
    'CAREER_WORK',
    'MONEY_FINANCE',
    'RELATIONSHIP_SOCIAL',
    'PERSONAL_LIFE',
    'ENVIRONMENT_MOVEMENT',
    'GENERAL',
    'QUICK'
];

console.log("Testing Context Engine...");

domains.forEach(domain => {
    try {
        const result = getContextualAdvice(mockState, domain);
        if (!result || !result.advice || !result.advice.conclusion) {
            console.error(`FAIL: ${domain} returned empty result or missing conclusion`);
        } else {
            console.log(`PASS: ${domain} -> ${result.advice.conclusion.substring(0, 20)}...`);
        }
    } catch (e) {
        console.error(`ERROR: ${domain} crashed:`, e.message);
    }
});
