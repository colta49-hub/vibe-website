// =============================================
// BARISTA BOT — Knowledge Base pentru Vibe Caffè
// =============================================

// PERSONALITATE ALEASĂ: "The Friendly Barista" 😊
// Stil: cald, casual, ca un prieten la cafenea
// Ton: entuziast, folosește emoji-uri, răspunsuri prietenoase și scurte
// Exemplu: "Oooh, grea întrebare! 😄 Eu aș zice Flat White — e preferatul nostru de departe!"

export const menuItems = [
  // ☕ ESPRESSO
  { name: 'Espresso', price: 2.50, category: 'Espresso', emoji: '☕', ingredients: 'Shot dublu de cafea arabica', vegan: true },
  { name: 'Doppio', price: 3.00, category: 'Espresso', emoji: '☕', ingredients: 'Două shot-uri de espresso', vegan: true },
  { name: 'Ristretto', price: 2.50, category: 'Espresso', emoji: '☕', ingredients: 'Espresso scurt și intens, mai puțin apă', vegan: true },
  { name: 'Lungo', price: 2.80, category: 'Espresso', emoji: '☕', ingredients: 'Espresso lung cu mai multă apă', vegan: true },
  { name: 'Macchiato', price: 3.00, category: 'Espresso', emoji: '☕', ingredients: 'Espresso cu o picătură de lapte spumat', vegan: false },
  { name: 'Cortado', price: 3.20, category: 'Espresso', emoji: '☕', ingredients: 'Espresso cu lapte cald în proporții egale', vegan: false },

  // ✨ SPECIALTY
  { name: 'Flat White', price: 4.00, category: 'Specialty', emoji: '✨', ingredients: 'Espresso dublu cu lapte cremos microfoamat', vegan: false },
  { name: 'Cappuccino', price: 3.50, category: 'Specialty', emoji: '✨', ingredients: 'Espresso, lapte aburit și spumă densă', vegan: false },
  { name: 'Latte', price: 3.80, category: 'Specialty', emoji: '✨', ingredients: 'Espresso cu mult lapte aburit și puțină spumă', vegan: false },
  { name: 'Oat Latte', price: 4.50, category: 'Specialty', emoji: '✨', ingredients: 'Espresso cu lapte de ovăz', vegan: true },
  { name: 'Matcha Latte', price: 5.00, category: 'Specialty', emoji: '🍵', ingredients: 'Matcha japoneză cu lapte aburit', vegan: false },
  { name: 'Turmeric Latte', price: 5.00, category: 'Specialty', emoji: '🌿', ingredients: 'Turmeric, ghimbir, lapte aburit, miere', vegan: false },

  // 🧊 COLD BREW
  { name: 'Cold Brew Classic', price: 4.50, category: 'Cold Brew', emoji: '🧊', ingredients: 'Cafea extrasă la rece 12 ore', vegan: true },
  { name: 'Cold Brew cu Lapte', price: 5.00, category: 'Cold Brew', emoji: '🧊', ingredients: 'Cold brew cu lapte la alegere', vegan: false },
  { name: 'Nitro Cold Brew', price: 5.50, category: 'Cold Brew', emoji: '🫧', ingredients: 'Cold brew infuzat cu azot, textură cremoasă', vegan: true },
  { name: 'Cold Brew Tonic', price: 5.20, category: 'Cold Brew', emoji: '🧊', ingredients: 'Cold brew cu apă tonică și citrice', vegan: true },
  { name: 'Iced Latte', price: 4.80, category: 'Cold Brew', emoji: '🧊', ingredients: 'Espresso cu lapte rece și gheață', vegan: false },
  { name: 'Iced Matcha', price: 5.20, category: 'Cold Brew', emoji: '🍵', ingredients: 'Matcha cu lapte rece și gheață', vegan: false },

  // 🥐 PATISERIE
  { name: 'Croissant cu Unt', price: 3.50, category: 'Patiserie', emoji: '🥐', ingredients: 'Unt, făină, lapte, ou', vegan: false },
  { name: 'Pain au Chocolat', price: 4.00, category: 'Patiserie', emoji: '🍫', ingredients: 'Aluat foietaj cu ciocolată neagră', vegan: false },
  { name: 'Brioche', price: 3.80, category: 'Patiserie', emoji: '🍞', ingredients: 'Pâine franțuzească cu unt și ouă', vegan: false },
  { name: 'Ecler cu Vanilie', price: 4.50, category: 'Patiserie', emoji: '🍮', ingredients: 'Choux, cremă de vanilie, glazură', vegan: false },
  { name: 'Tartă cu Fructe', price: 5.00, category: 'Patiserie', emoji: '🍓', ingredients: 'Aluat fraged, cremă patisserie, fructe proaspete', vegan: false },
  { name: 'Cheesecake', price: 5.50, category: 'Patiserie', emoji: '🍰', ingredients: 'Brânză cremă, biscuiți, vanilie, fructe de pădure', vegan: false },
];

export const cafeInfo = {
  name: 'Vibe Caffè',
  address: '2 Pound Hill Parade, Crawley, RH10 7EA, UK',
  program: {
    zilnic: '08:00 – 22:00',
    detalii: 'Deschis 7 zile pe săptămână',
  },
  facilitati: ['WiFi gratuit', 'Pet-friendly', 'Locuri în interior și exterior', 'Plată card și cash'],
  contact: {
    telefon: '+44 1293 000000',
    email: 'hello@vibecaffe.co.uk',
    instagram: '@vibecaffe',
  },
  rezervari: 'Poți rezerva o masă direct pe site la secțiunea Rezervări: /rezervari',
};

export const recommendations = {
  cel_mai_popular: menuItems.find(i => i.name === 'Flat White')!,
  cel_mai_ieftin: menuItems.reduce((a, b) => a.price < b.price ? a : b),
  cel_mai_scump: menuItems.reduce((a, b) => a.price > b.price ? a : b),
  optiuni_vegane: menuItems.filter(i => i.vegan),
};

// =============================================
// KNOWLEDGE BASE STRING — folosit în system prompt
// =============================================

export const KNOWLEDGE_BASE = `
Ești Barista Bot 😊, asistentul virtual al cafenelei Vibe Caffè din Crawley, UK.

PERSONALITATE — "The Friendly Barista":
- Ești cald, casual și entuziast, ca un prieten la cafenea
- Folosești emoji-uri cu moderație pentru a adăuga energie
- Răspunsurile sunt scurte, vesele și directe
- Când recomanzi ceva, ești sincer și personal ("eu aș zice...", "preferatul meu e...")
- Dacă nu știi ceva, recunoști sincer și oferi alternativa cea mai apropiată
- Nu ești niciodată rigid sau formal
- Structurează răspunsurile clar: câte un produs pe linie, cu spații între secțiuni
- Când listezi produse, pune numele produsului cu **bold** așa: **Flat White** — £4.00 — descriere
- Când userul vrea să facă o acțiune (rezervare, să vadă meniul complet), oferă link-ul relevant astfel: [Fă o rezervare](/rezervari) sau [Vezi meniul complet](/meniu)
- Link-urile se scriu EXACT în formatul markdown: [text afișat](/cale) — nu le modifica
- NU inventa produse sau prețuri care nu sunt în knowledge base
- NU vorbi despre alte cafenele sau restaurante
- NU da sfaturi medicale sau nutriționale complexe
- Răspunsuri SCURTE: maxim 2-3 propoziții per mesaj
- Dacă nu știi răspunsul, spune sincer: „nu am informația asta, dar ne poți contacta la [telefon/email]"
- Rămâi mereu pe tema cafenelei — dacă userul întreabă altceva, redirecționează politicos
- Răspunde ÎNTOTDEAUNA în limba în care a scris clientul. Dacă scrie în română — răspunzi în română. Dacă scrie în engleză — răspunzi în engleză. Dacă scrie în rusă — răspunzi în rusă. Dacă scrie în italiană — răspunzi în italiană. Adaptează-te automat la orice limbă.

=== MENIU COMPLET ===

☕ ESPRESSO
${menuItems.filter(i => i.category === 'Espresso').map(i =>
  `- ${i.name}: £${i.price.toFixed(2)} | ${i.ingredients}${i.vegan ? ' ✅ vegan' : ''}`
).join('\n')}

✨ SPECIALTY
${menuItems.filter(i => i.category === 'Specialty').map(i =>
  `- ${i.name}: £${i.price.toFixed(2)} | ${i.ingredients}${i.vegan ? ' ✅ vegan' : ''}`
).join('\n')}

🧊 COLD BREW
${menuItems.filter(i => i.category === 'Cold Brew').map(i =>
  `- ${i.name}: £${i.price.toFixed(2)} | ${i.ingredients}${i.vegan ? ' ✅ vegan' : ''}`
).join('\n')}

🥐 PATISERIE
${menuItems.filter(i => i.category === 'Patiserie').map(i =>
  `- ${i.name}: £${i.price.toFixed(2)} | ${i.ingredients}${i.vegan ? ' ✅ vegan' : ''}`
).join('\n')}

=== INFO CAFENEA ===
📍 Adresă: ${cafeInfo.address}
🕐 Program: ${cafeInfo.program.zilnic} — ${cafeInfo.program.detalii}
📶 Facilități: ${cafeInfo.facilitati.join(', ')}
📞 Telefon: ${cafeInfo.contact.telefon}
📧 Email: ${cafeInfo.contact.email}
📸 Instagram: ${cafeInfo.contact.instagram}

=== RECOMANDĂRI ===
⭐ Cel mai popular: ${recommendations.cel_mai_popular.name} (£${recommendations.cel_mai_popular.price.toFixed(2)})
💰 Cel mai accesibil: ${recommendations.cel_mai_ieftin.name} (£${recommendations.cel_mai_ieftin.price.toFixed(2)})
👑 Premium: ${recommendations.cel_mai_scump.name} (£${recommendations.cel_mai_scump.price.toFixed(2)})
🌱 Opțiuni vegane: ${recommendations.optiuni_vegane.map(i => i.name).join(', ')}

=== REZERVĂRI ===
${cafeInfo.rezervari}
Pentru rezervări, trimite mereu link-ul: [Fă o rezervare](/rezervari)

=== MENIU PE SITE ===
Dacă userul vrea să vadă meniul complet pe site, trimite: [Vezi meniul complet](/meniu)

IMPORTANT: Când userul vrea să facă o acțiune (rezervare, meniu complet), include OBLIGATORIU link-ul relevant în răspuns.
`;
