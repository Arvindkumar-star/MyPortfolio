const fs = require('fs');

const raw = fs.readFileSync('C:/Users/shiva/.gemini/antigravity-ide/brain/59d24343-2a6a-4897-939b-6f4b2febed96/.system_generated/steps/262/content.md', 'utf8');
const jsonText = raw.substring(raw.indexOf('['));
const repos = JSON.parse(jsonText);

console.log("Total repos found:", repos.length);

const deployed = repos.filter(r => r.homepage && r.homepage.trim().length > 0);
console.log("\n=== DEPLOYED REPOS (" + deployed.length + ") ===");
deployed.forEach(r => {
  console.log(`- Name: ${r.name}`);
  console.log(`  Live URL: ${r.homepage}`);
  console.log(`  Repo: ${r.html_url}`);
  console.log(`  Description: ${r.description}`);
  console.log(`  Language: ${r.language}`);
  console.log(`  Stars: ${r.stargazers_count}, Forks: ${r.forks_count}`);
  console.log(`  Pushed: ${r.pushed_at}`);
  console.log("");
});

console.log("\n=== ALL REPOS LIST ===");
repos.forEach(r => {
  console.log(`- ${r.name} | Deployed: ${r.homepage || "None"}`);
});
