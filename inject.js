const fs = require('fs');
const path = require('path');

const htmlFiles = [
  "c:\\Users\\stefa\\OneDrive\\Desktop\\UZUS-\\index.html",
  "c:\\Users\\stefa\\OneDrive\\Desktop\\UZUS-\\galerija.html",
  "c:\\Users\\stefa\\OneDrive\\Desktop\\UZUS-\\kontakt.html",
  "c:\\Users\\stefa\\OneDrive\\Desktop\\UZUS-\\postignuvanja.html",
  "c:\\Users\\stefa\\OneDrive\\Desktop\\UZUS-\\profesori.html",
  "c:\\Users\\stefa\\OneDrive\\Desktop\\UZUS-\\struki.html"
];

const mk_dict = {
  "nav_home": "Почетна",
  "nav_about": "За Нас",
  "nav_programs": "Струки",
  "nav_teachers": "Професори",
  "nav_gallery": "Галерија",
  "nav_achievements": "Успеси",
  "nav_contact": "Контакт",
  "nav_signup": "Пријави се",
  "nav_contact_info": "Контакт информации",
  "hero_badge": "Регионален центар за стручно образование",
  "hero_title_1": "Добредојдовте во <span class=\"hero-title-gold\">ДСУ РЦСОО</span><br>",
  "hero_title_2": "<span class=\"hero-title-gold\">Коле Неделковски</span>",
  "hero_subtitle": "Подобро образование за подобар свет",
  "hero_quote": "\"Образованието е најмоќното оружје што можете да го користите за да го промените светот\"",
  "hero_quote_author": "— Нелсон Мандела",
  "btn_explore_programs": "Истражете ги нашите програми",
  "btn_contact_us": "Контактирајте не",
  "btn_learn_more": "Дознај повеќе",
  "btn_read_more": "Прочитај повеќе",
  "stat_students": "Ученици",
  "stat_classes": "Паралелки",
  "stat_years": "Години",
  "scroll_down": "Лизгајте надолу",
  "sect_quick_links": "Брзи линкови",
  "title_explore_opportunities": "Истражете ги нашите можности",
  "desc_explore_opportunities": "Откријте ги сите можности што ги нудиме за вашето образование и идна кариера",
  "feat_programs_title": "Образовни Профили",
  "feat_programs_desc": "Стручни програми за иднината во машинска, електротехничка, сообраќајна и угостителска струка.",
  "feat_enrollments_title": "Уписи",
  "feat_enrollments_desc": "Пријавете се за новата учебна година и станете дел од нашето образовно семејство.",
  "feat_dual_title": "Дуално Образование",
  "feat_dual_desc": "Учете преку работа во водечки компании и стекнете практично искуство.",
  "feat_erasmus_title": "Еразмус+",
  "feat_erasmus_desc": "Меѓународна соработка и размена со училишта од цела Европа.",
  "sect_about_us": "За Нас",
  "title_our_mission": "Нашата <span>Мисија</span>",
  "about_text_1": "ДСУ РЦСОО <strong>\"Коле Неделковски\"</strong> е водечка образовна институција во Велес со богата традиција во стручното образование. Основано во 1965 година, училиштето непрекинато врши образовно-воспитна дејност.",
  "about_text_2": "Наша цел е да обезбедиме квалитетно образование што ќе ги подготви учениците за успешна кариера. Располагаме со сопствена училишна зграда, машинска работилница, електро работилници, спортска сала и сите просторни услови потребни за реализација на наставата.",
  "about_hl_1": "Основано во 1965 година",
  "about_hl_2": "Акредитирана образовна институција",
  "about_hl_3": "Модерни училници и работилници",
  "about_hl_4": "Високо квалификуван наставен кадар",
  "about_hl_5": "Соработка со водечки компании",
  "about_hl_6": "Меѓународни програми и размени",
  "about_stat_established": "Основано",
  "about_stat_teachers": "Наставници",
  "about_stat_fields": "Струки",
  "badge_mission_title": "Мисија",
  "badge_mission_desc": "Квалитетно образование",
  "badge_tradition_title": "60+ години",
  "badge_tradition_desc": "Традиција",
  "sect_teaching": "Настава",
  "title_educational_profiles": "Образовни Профили",
  "desc_educational_profiles": "Нудиме широк спектар на стручни програми кои одговараат на потребите на современиот пазар на труд",
  "mech_title": "Машинска Струка",
  "mech_desc": "Образование за идни машински техничари, автомеханичари, заварувачи и металостругари.",
  "elec_title": "Електротехничка Струка",
  "elec_desc": "Најголема струка во училиштето со фокус на електротехника и електроника.",
  "traf_title": "Сообраќајна Струка",
  "traf_desc": "Образование за транспорт, логистика и шпедиција.",
  "cat_title": "Угостителско-Туристичка Струка",
  "cat_desc": "Образование за угостителство, туризам и кулинарство.",
  "sect_numbers": "Бројки",
  "title_achievements": "Нашите достигнувања",
  "desc_achievements": "Горди сме на нашата долгогодишна традиција и постојан напредок во образованието",
  "stat_students_desc": "Активни ученици во тековната учебна година",
  "stat_classes_desc:": "Организирани паралелки во сите струки",
  "stat_teachers_desc": "Високо квалификуван наставен кадар",
  "stat_fields_desc": "Различни образовни струки",
  "extra_tradition": "Традиција",
  "extra_shifts_value": "2 смени",
  "extra_shifts": "Настава",
  "extra_profiles_value": "25+",
  "extra_profiles": "Профили",
  "extra_graduates_value": "5000+",
  "extra_graduates": "Завршени ученици",
  "sect_activities": "Активности",
  "title_news_events": "Новости и Настани",
  "view_all": "Види ги сите",
  "title_testimonials": "Што Велат Нашите Ученици",
  "test_1": "\"Одлично училиште со врвни професори кои ни помагаат да го развиеме својот потенцијал. Практичната настава ни овозможува да ги примениме знаењата веднаш.\"",
  "test_1_role": "Ученик, IV година",
  "test_2": "\"Практичната настава ме подготви за вистинска работа уште пред да дипломирам. Благодарение на дуалното образование, веднаш по дипломирањето се вработив.\"",
  "test_2_role": "Поранешен ученик, Автомеханичар",
  "test_3": "\"Дуалното образование ми овозможи да работам во водечка компанија уште додека учам. Ги стекнав практичните вештини кои се клучни за мојата идна кариера.\"",
  "test_3_role": "Ученик, III година",
  "cta_title": "Подготвени сте да започнете?",
  "cta_desc": "Пријавете се денес и започнете ја вашата патување кон успешна кариера. Нашите врати се секогаш отворени за нови ученици.",
  "btn_signup_now": "Пријави се сега",
  "cta_trust_1": "Бесплатна консултација",
  "cta_trust_2": "Индивидуален пристап",
  "cta_trust_3": "Гаранција за квалитет",
  "footer_text": "Квалитетно стручно образование од 1965 година. Подготвуваме идни професионалци за пазарот на труд.",
  "footer_resources": "Ресурси",
  "footer_follow": "Следете не",
  "footer_social_text": "Бидете во тек со најновите информации и настани.",
  "footer_copyright": "© 2025 ДСУ РЦСОО \"Коле Неделковски\". Сите права задржани.",
  "footer_privacy": "Политика за приватност",
  "footer_terms": "Услови за користење"
};

const placeholder_dict = {
  "nav_search_placeholder": "Пребарувајте на страницата..."
};

const nav_actions_insertion_point = '<a href="kontakt.html" class="navbar-cta"';

const lang_dropdown_html = `        <div class="lang-selector" style="position: relative; margin-left:10px;">
          <button class="navbar-btn lang-toggle" aria-label="Language" style="display:flex; align-items:center; gap:5px; background:none; border:none; color:white; font-size:16px; font-weight:bold; cursor:pointer;">
            <span class="current-lang-emoji" style="font-size:20px;">🇲🇰</span>
            <span class="current-lang-name">MK</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg>
          </button>
          <div class="lang-dropdown" style="display:none; position:absolute; top:100%; right:0; background:#111827; border: 1px solid rgba(255,255,255,0.1); border-radius:8px; padding:10px; z-index:100; min-width:150px; flex-direction:column; gap:5px;">
            <a href="#" class="lang-btn" data-lang="mk" style="display:flex; align-items:center; gap:10px; color:white; text-decoration:none; padding:8px; border-radius:5px; transition:0.3s;"><span class="lang-emoji">🇲🇰</span> <span class="lang-name">Македонски</span></a>
            <a href="#" class="lang-btn" data-lang="en" style="display:flex; align-items:center; gap:10px; color:white; text-decoration:none; padding:8px; border-radius:5px; transition:0.3s;"><span class="lang-emoji">🇬🇧</span> <span class="lang-name">English</span></a>
            <a href="#" class="lang-btn" data-lang="al" style="display:flex; align-items:center; gap:10px; color:white; text-decoration:none; padding:8px; border-radius:5px; transition:0.3s;"><span class="lang-emoji">🇦🇱</span> <span class="lang-name">Shqip</span></a>
          </div>
        </div>
`;

function processFile(filepath) {
  if (!fs.existsSync(filepath)) return;

  let content = fs.readFileSync(filepath, 'utf8');
  let original = content;

  for (let key in mk_dict) {
    let val = mk_dict[key];

    let target = ' data-i18n="' + key + '">' + val + '<';

    // Ensure no infinite duplication
    if (content.includes(target)) continue;

    content = content.split('>' + val + '<').join(' data-i18n="' + key + '">' + val + '<');
    // handle slight whitespace
    content = content.split('>' + val + '\n').join(' data-i18n="' + key + '">' + val + '\n');
    content = content.split(' ' + val + '\n').join(' data-i18n="' + key + '"> ' + val + '\n');
    content = content.split('>' + val + ' ').join(' data-i18n="' + key + '">' + val + ' ');
  }

  for (let key in placeholder_dict) {
    let val = placeholder_dict[key];
    if (!content.includes('data-i18n="' + key + '"')) {
      content = content.split('placeholder="' + val + '"').join('placeholder="' + val + '" data-i18n="' + key + '"');
    }
  }

  if (!content.includes('lang-selector')) {
    // Find <div class="navbar-actions">... <a ...>Пријави се</a>
    const ctaStart = content.indexOf(nav_actions_insertion_point);
    if (ctaStart !== -1) {
      const nextTag = content.indexOf('</a>', ctaStart);
      if (nextTag !== -1) {
        content = content.slice(0, nextTag + 4) + "\n" + lang_dropdown_html + content.slice(nextTag + 4);
      }
    }
  }

  if (!content.includes('<script src="js/translations.js"></script>')) {
    content = content.replace('<script src="js/main.js"></script>', '<script src="js/translations.js"></script>\n  <script src="js/main.js"></script>');
  }

  // specific hack for the first text nodes
  content = content.replace(/>Добредојдовте во </, ' data-i18n="hero_title_1">Добредојдовте во <');

  if (content !== original) {
    fs.writeFileSync(filepath, content, 'utf8');
    console.log("Updated " + filepath);
  } else {
    console.log("No changes for " + filepath);
  }
}

htmlFiles.forEach(processFile);
