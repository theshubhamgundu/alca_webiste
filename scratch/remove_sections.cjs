const fs = require('fs');
const filePath = 'public/bites/index.html';
let content = fs.readFileSync(filePath, 'utf8');

// Remove the navigation link
content = content.replace(/<li><a href="#story">Our Story<\/a><\/li>/gi, '');

// Remove the philosophy section
content = content.replace(/<section class="philosophy reveal">[\s\S]*?<\/section>/gi, '');

// Remove the story section
content = content.replace(/<section id="story" class="story-section">[\s\S]*?<\/section>/gi, '');

// Remove the reviews section
content = content.replace(/<section class="test-section" id="reviews">[\s\S]*?<\/section>/gi, '');

fs.writeFileSync(filePath, content);
console.log('Sections removed.');
