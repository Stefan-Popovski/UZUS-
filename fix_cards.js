const fs = require('fs');
let html = fs.readFileSync('postignuvanja.html', 'utf8');

const regex = /<article class="n-card reveal"[^>]*onclick="openModal\('([^']+)'\)"[^>]*>[\s\S]*?<div class="n-card-img">[\s\S]*?<span class="n-card-tag-float[^"]*">([^<]+)<\/span>[\s\S]*?<img src="([^"]+)"[^>]*>[\s\S]*?<\/div>[\s\S]*?<div class="n-card-body">[\s\S]*?<span class="n-card-date">[\s\S]*?<\/svg>\s*([\s\S]*?)\s*<\/span>[\s\S]*?<h4 class="n-card-title">([^<]+)<\/h4>[\s\S]*?<p class="n-card-desc">([\s\S]*?)<\/p>[\s\S]*?<div class="n-card-footer">[\s\S]*?<\/div>[\s\S]*?<\/div>[\s\S]*?<\/article>/g;

html = html.replace(regex, (match, id, tag, imgSrc, date, title, desc) => {
  let badgeClass = '';
  if (tag.includes('Натпревар') || tag.includes('Теренска') || tag.includes('Настан') || tag.includes('Награда')) {
    badgeClass = 'projects';
  }
  
  return `<article class="activity-card reveal" onclick="openModal('${id}')" role="button" tabindex="0">
          <div class="activity-image">
            <img src="${imgSrc}" alt="${title.replace(/"/g, '&quot;')}" loading="lazy">
            <div class="activity-image-overlay"></div>
            <span class="activity-badge ${badgeClass}">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="2" x2="22" y1="12" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
              ${tag.trim()}
            </span>
            <span class="activity-date">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              ${date.trim()}
            </span>
          </div>
          <div class="activity-content">
            <h3 class="activity-title">${title.trim()}</h3>
            <p class="activity-description">${desc.trim()}</p>
            <span class="activity-link">
              Прочитај повеќе
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </span>
          </div>
        </article>`;
});

fs.writeFileSync('postignuvanja.html', html, 'utf8');
console.log('Done replacing n-cards');
