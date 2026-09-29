const fs = require('fs');

const raw = fs.readFileSync('C:/Users/shiva/.gemini/antigravity-ide/brain/59d24343-2a6a-4897-939b-6f4b2febed96/.system_generated/steps/320/content.md', 'utf8');
const jsonText = raw.substring(raw.indexOf('['));
const repos = JSON.parse(jsonText);

console.log("Total repositories returned from GitHub:", repos.length);

const targets = [
  "college",
  "rag",
  "pixel",
  "pounce",
  "resume",
  "ats",
  "interview",
  "agentflow",
  "macrosnap"
];

repos.forEach(r => {
  const text = `${r.name} ${r.description || ''}`.toLowerCase();
  const matched = targets.filter(t => text.includes(t));
  if (matched.length > 0) {
    console.log(`\n-----------------------------------------`);
    console.log(`Repo Name:    ${r.name}`);
    console.log(`Full Name:    ${r.full_name}`);
    console.log(`GitHub URL:   ${r.html_url}`);
    console.log(`Homepage:     ${r.homepage || 'None'}`);
    console.log(`Language:     ${r.language}`);
    console.log(`Description:  ${r.description}`);
    console.log(`Pushed:       ${r.pushed_at}`);
  }
});
