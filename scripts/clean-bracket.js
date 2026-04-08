const fs = require('fs');

const path = 'components/flag-day-page-content.tsx';
let content = fs.readFileSync(path, 'utf8');

// The file might contain multiple BracketSection implementations due to previous attempts.
// We'll split the file to the end of the main component which ends with:
//       </section>
//     </div>
//   )
// }
//
// Then anything after that we discard.

const endMarker = '    </div>\r\n  )\r\n}';
const endMarker2 = '    </div>\n  )\n}';

let idx = content.indexOf(endMarker);
if (idx === -1) idx = content.indexOf(endMarker2);

if (idx !== -1) {
    // Truncate
    content = content.substring(0, idx + endMarker.length);
}

// Ensure the import is there
if (!content.includes('ChampionsLeagueBracket')) {
    // Add import right after the first imports
    content = content.replace(
        "import { flagDayStatsData, flagDayMatches",
        "import ChampionsLeagueBracket from './ChampionsLeagueBracket'\nimport { flagDayStatsData, flagDayMatches"
    );
}

// Replace `<BracketSection />` with `<ChampionsLeagueBracket />` if it exists
if (content.includes('<BracketSection />')) {
    content = content.replace(/<BracketSection \/>/g, '<ChampionsLeagueBracket />');
}

fs.writeFileSync(path, content, 'utf8');
console.log('Successfully cleaned flag-day-page-content.tsx and integrated ChampionsLeagueBracket.');
