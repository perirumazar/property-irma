/* Demo data (sostituisci con API/CRM quando vuoi) */

window.IRMA_DATA = {
  brand: {
    name: "Irma Rosato",
    tagline: "Property Manager • Costiera Amalfitana & Salerno",
    email: "irma.rosato@example.com",
    phone: "+39 3XX XXX XXXX",
    baseCity: "Maiori (SA)",
    instagram: "#",
    facebook: "#",
    whatsapp: "+39XXXXXXXXXX" // solo numeri se vuoi: "393401234567"
  },

  listings: [
    {
      id: "maiori-sky-house",
      name: "Maiori Sky House",
      city: "Maiori",
      area: "Costiera Amalfitana",
      guests: 4,
      bedrooms: 1,
      bathrooms: 1,
      highlights: ["Vista mare", "Self check-in", "Pulizia professionale"],
      cover:
        "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1600&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1600&q=80",
        "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&w=1600&q=80",
        "https://images.unsplash.com/photo-1501876725168-00c445821c9e?auto=format&fit=crop&w=1600&q=80"
      ],
      description:
        "Un appartamento luminoso pensato per soggiorni brevi: accoglienza curata, comunicazione rapida e standard professionali. Perfetto per coppie e piccoli gruppi.",
      amenities: ["Wi-Fi", "Aria condizionata", "Cucina", "Lavatrice", "Asciugacapelli"],
      ctaUrl: "#", // qui puoi mettere Lodgify/Airbnb/Booking
      ctaLabel: "Verifica disponibilità"
    },
    {
      id: "salerno-urban-nest",
      name: "Salerno Urban Nest",
      city: "Salerno",
      area: "Centro",
      guests: 3,
      bedrooms: 1,
      bathrooms: 1,
      highlights: ["Check-in smart", "Ottimo rating", "Vicino ai trasporti"],
      cover:
        "https://images.unsplash.com/photo-1560185007-5f0bb1866cab?auto=format&fit=crop&w=1600&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?auto=format&fit=crop&w=1600&q=80",
        "https://images.unsplash.com/photo-1565182999561-18d7dc61c393?auto=format&fit=crop&w=1600&q=80",
        "https://images.unsplash.com/photo-1522156373667-4c7234bbd804?auto=format&fit=crop&w=1600&q=80"
      ],
      description:
        "Stile moderno, foto professionali e ottimizzazione prezzi: un esempio di come piccoli dettagli migliorano recensioni e occupancy.",
      amenities: ["Wi-Fi", "Smart TV", "Cucina", "Ferro da stiro"],
      ctaUrl: "#",
      ctaLabel: "Richiedi info"
    },
    {
      id: "minori-sea-breeze",
      name: "Minori Sea Breeze",
      city: "Minori",
      area: "Costiera Amalfitana",
      guests: 2,
      bedrooms: 1,
      bathrooms: 1,
      highlights: ["Esperienza locale", "Guide ospiti", "Accoglienza premium"],
      cover:
        "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1600&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1600&q=80",
        "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&w=1600&q=80",
        "https://images.unsplash.com/photo-1501876725168-00c445821c9e?auto=format&fit=crop&w=1600&q=80"
      ],
      description:
        "Accoglienza e qualità percepita: staging leggero, foto coerenti e messaggistica pre-soggiorno per ridurre frizioni e aumentare conversione.",
      amenities: ["Wi-Fi", "A/C", "Cucina"],
      ctaUrl: "#",
      ctaLabel: "Prenota"
    }
  ],

  posts: [
    {
      id: "come-aumentare-prenotazioni",
      title: "Come aumentare le prenotazioni senza abbassare troppo i prezzi",
      date: "2026-01-10",
      category: "Strategia",
      readingTime: "5 min",
      cover:
        "https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=1600&q=80",
      excerpt:
        "Tre leve semplici: foto, descrizioni e pricing dinamico. Un approccio pratico per migliorare conversione e valore medio.",
      content: `
        <p>Quando un annuncio non converte, spesso il problema non è “il prezzo” ma <strong>la percezione</strong> del valore.</p>
        <h3>1) Foto: ordine, luce, coerenza</h3>
        <p>Una sequenza chiara (ingresso → living → camera → bagno → esterni) riduce dubbi e aumenta fiducia.</p>
        <h3>2) Descrizione: benefici, non solo elenco</h3>
        <p>Trasforma i servizi in vantaggi: “Wi-Fi” → “smart working senza stress”.</p>
        <h3>3) Prezzi: micro-aggiustamenti</h3>
        <p>Lavora con regole minime (weekend/eventi/last minute) e osserva la risposta del mercato.</p>
      `
    },
    {
      id: "checkin-perfetto",
      title: "Il check-in perfetto: meno messaggi, più recensioni",
      date: "2026-01-03",
      category: "Operatività",
      readingTime: "4 min",
      cover:
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1600&q=80",
      excerpt:
        "Template messaggi, guide ospiti e self check-in: come ridurre gli imprevisti e migliorare l’esperienza.",
      content: `
        <p>Un check-in ben progettato riduce richieste, evita attriti e migliora il punteggio.</p>
        <ul>
          <li>Messaggio “T-24h” con istruzioni essenziali</li>
          <li>Guida ospiti con FAQ (Wi-Fi, parcheggio, raccolta differenziata)</li>
          <li>Contatti emergenze e regole casa in chiaro</li>
        </ul>
      `
    },
    {
      id: "home-staging-leggero",
      title: "Home staging leggero: 10 interventi che cambiano tutto",
      date: "2025-12-15",
      category: "Home Staging",
      readingTime: "6 min",
      cover:
        "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1600&q=80",
      excerpt:
        "Non serve ristrutturare: bastano scelte mirate per rendere l’immobile più “prenotabile”.",
      content: `
        <p>Con pochi interventi, puoi migliorare <strong>foto, comfort e recensioni</strong>.</p>
        <ol>
          <li>Luci calde e punti luce extra</li>
          <li>Tessili coordinati</li>
          <li>Kit benvenuto minimal</li>
          <li>Decluttering e storage</li>
        </ol>
      `
    }
  ]
};
