"use client";

import React, { useState, useEffect } from "react";

// Types for Quiz
type QuizAnswers = {
  turnover?: string;
  currentUsage?: string;
  listSize?: string;
  challenge?: string;
};

const workflowStepsLT = [
  {
    id: "1",
    day: "DIENA 1",
    title: "Auditas ir strategija",
    subtitle: "Per 24 h pasakome, kur prarandate pajamas ir koks tikslus planas.",
    bullets: [
      "Esamos duomenų bazės kokybės auditas",
      "Pristatomumo ir siuntėjo reputacijos patikra",
      "Individuali el. pašto strategija",
    ],
  },
  {
    id: "2",
    day: "DIENA 2",
    title: "Integracija ir paruošimas",
    subtitle: "Sujungiame jūsų CRM ar registracijų sistemą be jokių programuotojų pagalbos.",
    bullets: [
      "POS / registracijos sistemos integracija",
      "El. pašto paskyrų konfigūravimas",
      "Kontaktų rinkimo formų diegimas",
    ],
  },
  {
    id: "3-4",
    day: "DIENOS 3-4",
    title: "Tekstų kūrimas ir automatizacijos",
    subtitle: "Parašome konvertuojančius tekstus ir sujungiame automatinius srautus.",
    bullets: [
      "Naujienlaiškių ir laiškų copywritingas",
      "Automatiniai apleistų krepšelių / praleistų vizitų srautai",
      "Asmeniniai pasiūlymai pagal tikslinius segmentus",
    ],
  },
  {
    id: "5-6",
    day: "DIENOS 5-6",
    title: "Testavimas ir pristatomumas",
    subtitle: "Tikriname pranešimų gavimą ir suderiname techninius SPF/DKIM nustatymus.",
    bullets: [
      "Pilnas techninis testavimas prieš paleidimą",
      "El. pašto dėžutės pasiekiamumo testai",
      "Pirmųjų testinių kontaktų aktyvavimas",
    ],
  },
  {
    id: "7",
    day: "DIENA 7",
    title: "Startas ir stebėjimas",
    subtitle: "Sistema veikia pilnu pajėgumu ir pradeda nešti pajamas.",
    bullets: [
      "Visų sugrąžinimo automatizacijų paleidimas",
      "Live rezultatų stebėjimo skydelio aktyvavimas",
      "Pirmosios ataskaitos ir rezultatų fiksavimas",
    ],
  },
];

const workflowStepsEN = [
  {
    id: "1",
    day: "DAY 1",
    title: "Audit & strategy",
    subtitle: "Within 24 hours we tell you where you are losing revenue and the exact plan.",
    bullets: [
      "Audit of existing database quality",
      "Deliverability and sender reputation check",
      "Individual email strategy",
    ],
  },
  {
    id: "2",
    day: "DAY 2",
    title: "Integration & setup",
    subtitle: "We connect your CRM or registration system without any developer help.",
    bullets: [
      "POS / registration system integration",
      "Email accounts configuration",
      "Contact collection forms setup",
    ],
  },
  {
    id: "3-4",
    day: "DAYS 3-4",
    title: "Copywriting & automations",
    subtitle: "We write high-converting copy and connect automated flows.",
    bullets: [
      "Newsletter and email copywriting",
      "Automated abandoned cart / missed visit flows",
      "Personalized offers for target segments",
    ],
  },
  {
    id: "5-6",
    day: "DAYS 5-6",
    title: "Testing & deliverability",
    subtitle: "We check message delivery and align technical SPF/DKIM settings.",
    bullets: [
      "Full technical testing before launch",
      "Email inbox deliverability tests",
      "Activation of first test contacts",
    ],
  },
  {
    id: "7",
    day: "DAY 7",
    title: "Launch & monitoring",
    subtitle: "The system is fully active and starts generating revenue.",
    bullets: [
      "Launch of all retention automations",
      "Activation of live results dashboard",
      "First reports and results tracking",
    ],
  },
];

const faqItemsLT = [
  {
    question: "Kokių rezultatų galiu tikėtis?",
    answer: "Pirmieji rezultatai pasirodo per 2–4 savaites, kai paleidžiami pagrindiniai automatiniai srautai (sveikinimo serija, apleistas krepšelis, po-pirkiminis srautas). Stabilus +20–30 % pajamų padidėjimas iš el. pašto kanalo paprastai pasiekiamas per 60–90 dienų, kai įsibėgėja kampanijos ir segmentavimas.",
  },
  {
    question: "Ar tinka mano verslui?",
    answer: "Mūsų klientų mėnesinė apyvarta svyruoja nuo 10 000 € iki 500 000 €+. Nors el. prekyba yra pagrindinė mūsų sritis, sėkmingai dirbame ir su paslaugų verslais (agentūromis, konsultacijomis, B2B SaaS). Atsisakome dirbti tik su tais verslais, kurių mėnesinė apyvarta vis dar nesiekia 10 000 € — šiame etape investicija tiesiog neatsipirktų.",
  },
  {
    question: "Ar man jau reikia turėti el. pašto sąrašą?",
    answer: "Ne. Jei jūsų sąrašas mažas arba jo visai neturite — pirmasis žingsnis yra registracijos formos ir iššokantys langai (pop-up). Per 30–60 dienų sąrašas paprastai išauga 3–5 kartus. Dirbame su viskuo — nuo nulinių kontaktų sąrašų iki 50 000+ kontaktų duomenų bazių.",
  },
  {
    question: "Ką gaunu už mėnesinį mokestį?",
    answer: "Pilnas jūsų el. pašto kanalo valdymas: auditas, strategija, sukurtos 5+ automatinės sekos, reguliarios kampanijos (8 per mėnesį), tekstų rašymas, dizainas, A/B testavimas, segmentavimas, pristatymo rodiklių stebėjimas ir ataskaitos. Jokių papildomų sąskaitų — viskas įskaičiuota.",
  },
  {
    question: "Kiek laiko užtrunka paleidimas?",
    answer: "Auditas ir strategija — per 12–24 valandas po pirmojo skambučio. Pagrindiniai automatiniai srautai — per 5 darbo dienas, o pirmoji kampanija startuoja per 2–3 savaites. Pilnas pagrindas paruošiamas per pirmąjį mėnesį, o tolesni mėnesiai skiriami augimui, optimizavimui ir naujų kampanijų kūrimui.",
  },
  {
    question: "Su kokiomis platformomis dirbate?",
    answer: "Omnisend",
  },
];

const faqItemsEN = [
  {
    question: "What results can I expect?",
    answer: "The first results show up within 2-4 weeks – once the core automated flows go live (welcome series, abandoned cart, post-purchase). A stable +20-30% revenue lift from the email channel is typically reached within 60-90 days, as campaigns and segmentation gain momentum.",
  },
  {
    question: "Is it suitable for my business?",
    answer: "Monthly revenue among our clients ranges from €10,000 to €500,000+. While e-commerce is our core focus, we also work successfully with service businesses (agencies, consulting, B2B SaaS). We only turn away businesses whose monthly revenue is still under €10,000 — at that stage, the investment simply would not pay off.",
  },
  {
    question: "Do I need to have an email list already?",
    answer: "No. If your list is small — or you do not have one at all — the first step is signup forms and pop-ups. Within 30-60 days the list typically grows 3-5x. We work with everything from zero-contact lists to 50,000+ contact databases.",
  },
  {
    question: "What do I get for the monthly fee?",
    answer: "Full management of your email channel: audit, strategy, 5+ automated flows built, regular campaigns (8 per month), copywriting, design, A/B testing, segmentation, deliverability monitoring and reporting. No extra invoices — everything is included.",
  },
  {
    question: "How long does the launch take?",
    answer: "Audit and strategy — 12-24 hours after the first call. Core automated flows — 5 business days, with the first campaign launching within 2-3 weeks. The full foundation is live within the first month; the months after that are about growth, optimization and rolling out new campaigns.",
  },
  {
    question: "Which platforms do you work with?",
    answer: "Omnisend",
  },
];

const dashboardStatesLT = [
  {
    totalRevenue: 578,
    symbol: "€",
    items: [
      { id: "1", type: "user", title: "Naujas prenumeratorius", subtitle: "Pop-up forma · -10% kodas išsiųstas", badge: "✓", isSuccess: true },
      { id: "2", type: "email", title: "Po-pirkiminis srautas", subtitle: "Cross-sell pasiūlymas → papildomas užsakymas", badge: "+€66" },
      { id: "3", type: "send", title: "Savaitės kampanija išsiųsta", subtitle: "Akcijos laiškas · 4 821 gavėjui", badge: "+€356" },
      { id: "4", type: "star", title: "Welcome serija · 2 laiškas", subtitle: "Naujas prenumeratorius → pirmas pirkimas", badge: "+€26" },
      { id: "5", type: "cart", title: "Apleistas krepšelis atgautas", subtitle: "Priminimo laiškas → užsakymas", badge: "+€130" },
    ]
  },
  {
    totalRevenue: 2496,
    symbol: "€",
    items: [
      { id: "6", type: "star", title: "Welcome serija · 1 laiškas", subtitle: "Pasisveikinimas + bestselerių gidas", badge: "+€48" },
      { id: "7", type: "email", title: "Atsiliepimo prašymas", subtitle: "Klientas paliko 5★ įvertinimą", badge: "✓", isSuccess: true },
      { id: "8", type: "send", title: "Segmentuota kampanija", subtitle: "VIP klientams · pakartotiniai pirkimai", badge: "+€164" },
      { id: "9", type: "cart", title: "Apleistas krepšelis atgautas", subtitle: "2-as priminimas su nuolaida → užsakymas", badge: "+€128" },
      { id: "10", type: "user", title: "Naujas prenumeratorius", subtitle: "Pop-up forma · -10% kodas išsiųstas", badge: "✓", isSuccess: true },
    ]
  },
  {
    totalRevenue: 2892,
    symbol: "€",
    items: [
      { id: "11", type: "send", title: "Savaitės kampanija išsiųsta", subtitle: "Akcijos laiškas · 4 821 gavėjui", badge: "+€169" },
      { id: "12", type: "star", title: "Welcome serija · 2 laiškas", subtitle: "Naujas prenumeratorius → pirmas pirkimas", badge: "+€85" },
      { id: "13", type: "cart", title: "Apleistas krepšelis atgautas", subtitle: "Priminimo laiškas → užsakymas", badge: "+€142" },
      { id: "14", type: "star", title: "Welcome serija · 1 laiškas", subtitle: "Pasisveikinimas + bestselerių gidas", badge: "+€48" },
      { id: "15", type: "email", title: "Atsiliepimo prašymas", subtitle: "Klientas paliko 5★ įvertinimą", badge: "✓", isSuccess: true },
    ]
  }
];

const dashboardStatesEN = [
  {
    totalRevenue: 578,
    symbol: "£",
    items: [
      { id: "1", type: "user", title: "New subscriber", subtitle: "Pop-up form · -10% code sent", badge: "✓", isSuccess: true },
      { id: "2", type: "email", title: "Post-purchase flow", subtitle: "Cross-sell offer → extra order", badge: "+£66" },
      { id: "3", type: "send", title: "Weekly campaign sent", subtitle: "Promo email · to 4 821 recipients", badge: "+£356" },
      { id: "4", type: "star", title: "Welcome series · email 2", subtitle: "New subscriber → first purchase", badge: "+£26" },
      { id: "5", type: "cart", title: "Abandoned cart recovered", subtitle: "Reminder email → order", badge: "+£130" },
    ]
  },
  {
    totalRevenue: 2496,
    symbol: "£",
    items: [
      { id: "6", type: "star", title: "Welcome series · email 1", subtitle: "Welcome + bestsellers guide", badge: "+£48" },
      { id: "7", type: "email", title: "Review request", subtitle: "Customer left a 5★ rating", badge: "✓", isSuccess: true },
      { id: "8", type: "send", title: "Segmented campaign", subtitle: "To VIP customers · repeat purchases", badge: "+£164" },
      { id: "9", type: "cart", title: "Abandoned cart recovered", subtitle: "2nd reminder with discount → order", badge: "+£128" },
      { id: "10", type: "user", title: "New subscriber", subtitle: "Pop-up form · -10% code sent", badge: "✓", isSuccess: true },
    ]
  },
  {
    totalRevenue: 2892,
    symbol: "£",
    items: [
      { id: "11", type: "send", title: "Weekly campaign sent", subtitle: "Promo email · to 4 821 recipients", badge: "+£169" },
      { id: "12", type: "star", title: "Welcome series · email 2", subtitle: "New subscriber → first purchase", badge: "+£85" },
      { id: "13", type: "cart", title: "Abandoned cart recovered", subtitle: "Reminder email → order", badge: "+£142" },
      { id: "14", type: "star", title: "Welcome series · email 1", subtitle: "Welcome + bestsellers guide", badge: "+£48" },
      { id: "15", type: "email", title: "Review request", subtitle: "Customer left a 5★ rating", badge: "✓", isSuccess: true },
    ]
  }
];

const renderDashboardIcon = (type: string) => {
  switch (type) {
    case "user":
      return (
        <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      );
    case "email":
      return (
        <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      );
    case "send":
      return (
        <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
        </svg>
      );
    case "star":
      return (
        <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.907c.961 0 1.36 1.246.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.564-.386-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      );
    case "cart":
      return (
        <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      );
    default:
      return null;
  }
};

const formatNumber = (num: number) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};

const TRANSLATIONS = {
  LT: {
    nav: {
      howItWorks: "Kaip veikia",
      calculator: "Skaičiuoklė",
      faq: "D.U.K.",
      results: "Rezultatai",
      bookConsultation: "Rezervuoti konsultaciją",
    },
    hero: {
      tag: "PILNAS KANALŲ VALDYMAS",
      title1: "Pašto dėžutė,",
      title2: "kuri ",
      underline: "uždirba.",
      subtitle: "Pilnas el. pašto rinkodaros valdymas. Uždirbame papildomas pajamas iš jūsų jau turimų klientų.",
      ctaAudit: "Gauti nemokamą auditą",
      ctaMore: "Sužinoti daugiau",
      trust: "10+ el. parduotuvių pasitiki mumis",
    },
    dashboard: {
      title: "SMSflow · automatizacijos",
      live: "GYVAI",
      earnedToday: "EL. PAŠTAS ŠIANDIEN UŽDIRBO",
      simulation: "Taip atrodo jūsų parduotuvės savaitė su el. pašto komunikacija – simuliacija pagal realius srautus"
    },
    retention: {
      tag: "Klientų bazės įdarbinimas",
      title1: "Realios pajamos iš ",
      italic: "el. pašto kanalo",
      title2: ".",
      text: "Vietoj to, kad kasdien leistumėte biudžetą brangiai reklamai („Facebook“ ar „Google“), pritraukdami visiškai naujus ir šaltus lankytojus, mes padedame uždirbti iš jūsų turimos duomenų bazės. Sukuriame automatinius el. laiškus, kurie laiku ir vietoje sugrąžina jūsų buvusius klientus pakartotiniams vizitams ar užsakymams.",
    },
    calculator: {
      tag: "SKAIČIUOKLĖ",
      title: "Kiek el. paštas galėtų uždirbti jums?",
      desc: "Sėkmingos el. parduotuvės iš el. pašto kanalo generuoja 20-30% visų pajamų. Pastumkite slankiklį ir pamatykite savo skaičius.",
      revenueLabel: "JŪSŲ MĖNESINĖ APYVARTA",
      monthlyLabel: "galimos pajamos iš el. pašto / mėn. (20–30%)",
      annualLabel: "papildomai per metus (skaičiuojant konservatyviai)",
      note: "Vid. mūsų klientų rezultatas: +34% pajamų augimas iš el. pašto kanalo. Tikslų skaičių jūsų parduotuvei parodo auditas.",
      cta: "Rezervuoti konsultaciją",
    },
    pillars: {
      tag: "Kaip veikia el. pašto rinkodara",
      title: "Uždirbkite iš to, ką jau turite.",
      desc: "Vietoj to, kad kasdien leistumėte biudžetą brangiai reklamai („Facebook“ ar „Google“), pritraukdami visiškai naujus ir šaltus lankytojus, mes padedame uždirbti iš jūsų turimos duomenų bazės.",
      list: [
        {
          title: "Kontaktų surinkimas",
          desc: "Formos, pop-up'ai ir integracijos svetainėje. Kiekvienas naujas lankytojas automatiškai patenka į jūsų bazę, o ne pradingsta po pirmojo vizito."
        },
        {
          title: "Automatiniai srautai",
          desc: "Sveikinimo žinutės, priminimai apie apleistą krepšelį ar praleistą vizitą. Sistema pagal kliento atliktus veiksmus dirba už jus 24/7."
        },
        {
          title: "Reguliarios kampanijos",
          desc: "Pranešimai apie naujas paslaugas, atsilaisvinusius vizitų laikus ar specialius pasiūlymus tiems, kurie jus jau pažįsta ir pasitiki."
        },
        {
          title: "Segmentavimas",
          desc: "Auditorijos skirstymas pagal pirkimų istoriją, paslaugų tipus bei įsitraukimą, kad klientai gautų tik asmeniškai aktualius pasiūlymus."
        },
        {
          title: "A/B testavimas ir analizė",
          desc: "Testuojame skirtingas temas, tekstų stilius, pasiūlymus ir siuntimo laikus, kad kiekviena žinutė atneštų kuo daugiau užsakymų."
        },
        {
          title: "Pristatymas į gavėjo dėžutę",
          desc: "DKIM, SPF, DMARC ir siuntėjo reputacijos valdymas, garantuojantis, kad pranešimai pasieks gavėją, o ne nuguls į „Spamą“."
        }
      ]
    },
    workflow: {
      tag: "PRISTATYMO TERMINAS",
      title1: "Pilna, veikianti sistema — ",
      italic: "per 7 dienas.",
      desc: "Ne mėnesiai derinimo. Žingsnis po žingsnio — nuo audito iki pilnai automatizuotų, pajamas nešančių el. pašto kanalų per vieną savaitę.",
    },
    stats: {
      tag: "Skaičiai patys kalba už save",
      title: "Mūsų pasiekiami rezultatai",
      items: [
        { value: "+34%", label: "vidutinis pajamų augimas" },
        { value: "24/7", label: "automatizuoti srautai" },
        { value: "< 24h", label: "audito paruošimas" },
        { value: "50+", label: "dirbančių įmonių" }
      ]
    },
    pricing: {
      tag: "INVESTICIJA",
      title1: "Pradėkite uždirbti ",
      italic: "jau šį mėnesį.",
      desc: "Vienas mėnesinis paketas, kuris padengia el. pašto kanalą — nuo strategijos iki kasdieninės priežiūros.",
      cardLeft: {
        tag: "SMSFLOW · PAKETAS",
        title: "+20% pajamų per 60 dienų.",
        desc: "Vienas mokestis. Pilna sistema. Augimas, kurio nereikia Jums prižiūrėti."
      },
      cardRight: {
        tag: "VISKAS ĮSKAIČIUOTA",
        title: "Pilna sistema",
        desc: "Mėnesinis paketas, kuris padengia visą komunikacijos kanalą — be papildomų sąskaitų.",
        kaina: "KAINA",
        priceValue: "800€",
        pricePeriod: "/ mėn.",
        avgResultLabel: "VIDUTINIS REZULTATAS",
        avgResultValue: "+20%",
        avgResultSuffix: "pajamų",
        cta: "Gauti nemokamą auditą",
        trust: "10+ el. parduotuvių pasitiki smsflow.lt",
        checklist: [
          "Pilnai automatizuota el. pašto sistema",
          "4-6 tikslinės el. pašto kampanijos per mėnesį",
          "A/B testai, profesionalūs tekstai ir pilna priežiūra",
          "Be jokių integracijos mokesčių ar staigmenų",
          "Mėnesinė ataskaita su rezultatais ir įžvalgomis"
        ]
      }
    },
    quiz: {
      tag: "NEMOKAMA KONSULTACIJA",
      title: "Atsakykite į kelis klausimus ir pasikalbėkime!",
      introDesc: "Atsakykite į kelis trumpus klausimus ir užsiregistruokite nemokamai konsultacijai.",
      startBtn: "Pradėti",
      qDone: "Atlikta",
      qText: "Klausimas",
      qOf: "iš",
      backBtn: "← Atgal",
      disqualified: {
        title: "Apyvarta per maža",
        desc: "Mūsų paslaugos efektyviausiai atsiperka paslaugų verslams, generuojantiems virš €10 000 mėnesinės apyvartos. Esant mažesnei apyvartai, €800/mėn. administravimo kaina gali neduoti teigiamo ROI.",
        restart: "Pradėti iš naujo"
      },
      form: {
        title: "Įveskite savo kontaktus nemokamai konsultacijai gauti",
        nameLabel: "Jūsų vardas",
        namePlaceholder: "Vardas Pavardė",
        nameError: "Vardas yra privalomas",
        websiteLabel: "Svetainės adresas (arba įmonės pavadinimas)",
        websitePlaceholder: "manosvetaine.lt",
        websiteError: "Įveskite svetainės adresą arba įmonės pavadinimą",
        emailLabel: "Darbinis el. paštas",
        emailPlaceholder: "vardas@imone.lt",
        emailError: "Įveskite galiojantį el. pašto adresą",
        phoneLabel: "Telefono numeris",
        phonePlaceholder: "+370 600 00000",
        phoneError: "Įveskite galiojantį telefono numerį",
        submitBtn: "Gauti nemokamą konsultaciją",
        submitting: "Siunčiama...",
        submitError: "Įvyko klaida siunčiant užklausą. Bandykite dar kartą vėliau."
      },
      success: {
        title: "Užklausą sėkmingai gavome!",
        desc: "Ačiū, {name}. Rezervuokite nemokamos konsultacijos laiką tiesiogiai žemiau esančiame kalendoriuje:",
        anotherRequest: "Pateikti kitą užklausą"
      }
    },
    faq: {
      tag: "DUK",
      title: "Dažniausiai užduodami klausimai"
    },
    ctaSection: {
      title: "Užsiregistruokite nemokamai konsultacijai",
      desc: "Atsakykite į kelis trumpus klausimus ir užsiregistruokite nemokamai konsultacijai.",
      btn: "Registruotis"
    },
    footer: {
      rights: "© 2026 SMSflow. Visos teisės saugomos."
    },
    founder: {
      hello: "Labas.",
      intro: "Esu Nikolajus (SMSflow įkūrėjas).",
      text: "Mano tikslas — padėti jūsų e-parduotuvei uždirbti daugiau iš klientų, kuriuos jau turite. Nereikia leisti tūkstančių naujai reklamai, kai jūsų duomenų bazėje slepiasi neišnaudotas pelno potencialas.",
      cta: "Rezervuoti konsultaciją",
    }
  },
  EN: {
    nav: {
      howItWorks: "How it works",
      calculator: "Calculator",
      faq: "FAQ",
      results: "Results",
      bookConsultation: "Book a consultation",
    },
    hero: {
      tag: "FULL CHANNEL MANAGEMENT",
      title1: "The inbox ",
      title2: "that ",
      underline: "earns.",
      subtitle: "Full email marketing management. We make extra revenue from your existing clients.",
      ctaAudit: "Get free audit",
      ctaMore: "Find out more",
      trust: "10+ e-shops trust us",
    },
    dashboard: {
      title: "SMSflow · automations",
      live: "LIVE",
      earnedToday: "EMAIL EARNED TODAY",
      simulation: "This is what your store's week looks like with email communication - simulation based on real flows"
    },
    retention: {
      tag: "Customer database activation",
      title1: "Real revenue from the ",
      italic: "email channel",
      title2: ".",
      text: "Instead of spending budget on expensive ads (Facebook or Google) everyday, attracting completely new and cold visitors, we help you earn from your existing database. We create automated emails that return your past clients for repeat visits or orders at the right time and place.",
    },
    calculator: {
      tag: "CALCULATOR",
      title: "How much could email earn for you?",
      desc: "Successful online stores generate 20-30% of all revenue from the email channel. Slide to see your numbers.",
      revenueLabel: "YOUR MONTHLY REVENUE",
      monthlyLabel: "potential email income / mo. (20–30%)",
      annualLabel: "additional per year (conservative estimate)",
      note: "Avg. client result: +34% revenue growth from the email channel. The exact number for your store is revealed by an audit.",
      cta: "Book a consultation",
    },
    pillars: {
      tag: "How Email Marketing Works",
      title: "Email earns from what you already have.",
      desc: "Instead of paying for new traffic over and over, email helps you earn more from the people who have already visited your store.",
      list: [
        {
          title: "Contact collection",
          desc: "Forms, pop-ups and website integrations. Every new visitor is automatically added to your database, rather than disappearing after their first visit."
        },
        {
          title: "Automated flows",
          desc: "Welcome messages, abandoned cart or missed visit reminders. The system works for you 24/7 based on customer actions."
        },
        {
          title: "Regular campaigns",
          desc: "Newsletters about new services, open slots, or special offers for those who already know and trust you."
        },
        {
          title: "Segmentation",
          desc: "Audience division by purchase history, service types, and engagement, so customers get only personally relevant offers."
        },
        {
          title: "A/B testing & analysis",
          desc: "We test different subject lines, copywriting styles, offers, and send times to maximize orders from every message."
        },
        {
          title: "Inbox deliverability",
          desc: "DKIM, SPF, DMARC and sender reputation management, ensuring messages reach the inbox, not the spam folder."
        }
      ]
    },
    workflow: {
      tag: "DELIVERY TIMELINE",
      title1: "A complete, working system — ",
      italic: "in 7 days.",
      desc: "Not months of alignment. Step by step — from audit to fully automated, revenue-generating email channels in one week.",
    },
    stats: {
      tag: "The numbers speak for themselves",
      title: "Our achievable results",
      items: [
        { value: "+34%", label: "average revenue growth" },
        { value: "24/7", label: "automated flows" },
        { value: "< 24h", label: "audit preparation" },
        { value: "50+", label: "active clients" }
      ]
    },
    pricing: {
      tag: "INVESTMENT",
      title1: "Start earning ",
      italic: "this month.",
      desc: "One monthly package that covers the email channel — from strategy to daily maintenance.",
      cardLeft: {
        tag: "SMSFLOW · PACKAGE",
        title: "+20% revenue in 60 days.",
        desc: "One fee. Full system. Growth that you don't need to manage."
      },
      cardRight: {
        tag: "ALL INCLUDED",
        title: "Full system",
        desc: "Monthly package that covers the entire communication channel — no extra bills.",
        kaina: "PRICE",
        priceValue: "800£",
        pricePeriod: "/ mo.",
        avgResultLabel: "AVERAGE RESULT",
        avgResultValue: "+20%",
        avgResultSuffix: "revenue",
        cta: "Get free audit",
        trust: "10+ e-shops trust smsflow.eu",
        checklist: [
          "Fully automated email system",
          "4-6 targeted email campaigns per month",
          "A/B tests, professional copy and full management",
          "No integration fees or surprises",
          "Monthly report with results and insights"
        ]
      }
    },
    quiz: {
      tag: "FREE CONSULTATION",
      title: "Answer a few questions and let's talk!",
      introDesc: "Answer a few short questions and register for a free consultation.",
      startBtn: "Start",
      qDone: "Done",
      qText: "Question",
      qOf: "of",
      backBtn: "← Back",
      disqualified: {
        title: "Turnover too low",
        desc: "Our services are most effective for businesses generating over 10 000 £ monthly turnover. Below that, the 800£/mo. management fee may not yield a positive ROI.",
        restart: "Start over"
      },
      form: {
        title: "Enter your contact details to get a free consultation",
        nameLabel: "Your name",
        namePlaceholder: "John Doe",
        nameError: "Name is required",
        websiteLabel: "Website address (or company name)",
        websitePlaceholder: "mywebsite.com",
        websiteError: "Enter website address or company name",
        emailLabel: "Work email",
        emailPlaceholder: "name@company.com",
        emailError: "Enter a valid email address",
        phoneLabel: "Phone number",
        phonePlaceholder: "+1 600 00000",
        phoneError: "Enter a valid phone number",
        submitBtn: "Get free consultation",
        submitting: "Sending...",
        submitError: "An error occurred while sending. Please try again later."
      },
      success: {
        title: "We received your request successfully!",
        desc: "Thank you, {name}. Book a free consultation directly in the calendar below:",
        anotherRequest: "Submit another request"
      }
    },
    faq: {
      tag: "FAQ",
      title: "Frequently asked questions"
    },
    ctaSection: {
      title: "Register for a free consultation",
      desc: "Answer a few short questions and register for a free consultation.",
      btn: "Register"
    },
    footer: {
      rights: "© 2026 SMSflow. All rights reserved."
    },
    founder: {
      hello: "Hello.",
      intro: "I am Nick (Founder of SMSflow).",
      text: "My goal is to help your e-shop earn more from the customers you already have. No need to spend thousands on new ads when there is untapped profit potential hiding in your database.",
      cta: "Book a consultation",
    }
  }
};

const questionsLT = [
  {
    id: "turnover",
    title: "Mėnesinė apyvarta",
    subtitle: "Kokia maždaug jūsų verslo vidutinė mėnesinė apyvarta?",
    options: ["Iki 10 000 €", "10 000 – 20 000 €", "20 000 – 50 000 €", "Daugiau nei 50 000 €"],
  },
  {
    id: "currentUsage",
    title: "El. pašto rinkodara",
    subtitle: "Kaip šiuo metu naudojate klientų išlaikymo įrankius savo versle?",
    options: [
      "Reguliariai siunčiame laiškus ir turime automatinius srautus",
      "Kartais išsiunčiame pasiūlymus rankiniu būdu, be automatizacijos",
      "Turime klientų bazę, bet jos praktiškai nenaudojame",
      "El. pašto rinkodaros dar visiškai nedarome",
    ],
  },
  {
    id: "listSize",
    title: "Kontaktų bazės dydis",
    subtitle: "Koks maždaug jūsų turimos klientų bazės dydis?",
    options: ["1 – 500", "500 – 2 000", "2 000 – 10 000", "Virš 10 000"],
  },
  {
    id: "challenge",
    title: "Didžiausias iššūkis",
    subtitle: "Kas šiuo metu labiausiai trukdo didinti pakartotinius pardavimus?",
    options: [
      "Trūksta laiko ir vidinių resursų sistemai prižiūrėti",
      "Mažas gavėjų įsitraukimas (žemas žinučių/laiškų atidarymo rodiklis)",
      "Neturime veikiančių automatinių žinučių srautų",
      "Trūksta aiškaus plano (ką ir kada reikėtų siųsti)",
    ],
  },
];

const questionsEN = [
  {
    id: "turnover",
    title: "Monthly turnover",
    subtitle: "What is your business's average monthly turnover?",
    options: ["Up to 10 000 £", "10 000 – 20 000 £", "20 000 – 50 000 £", "More than 50 000 £"],
  },
  {
    id: "currentUsage",
    title: "Email marketing",
    subtitle: "How do you currently use customer retention tools in your business?",
    options: [
      "We regularly send emails and have automated flows",
      "We sometimes send offers manually, without automation",
      "We have a customer base but barely use it",
      "We don't do email marketing at all",
    ],
  },
  {
    id: "listSize",
    title: "Database size",
    subtitle: "What is the approximate size of your customer database?",
    options: ["1 – 500", "500 – 2 000", "2 000 – 10 000", "Over 10 000"],
  },
  {
    id: "challenge",
    title: "Biggest challenge",
    subtitle: "What is currently the main obstacle to increasing repeat sales?",
    options: [
      "Lack of time and internal resources to manage the system",
      "Low subscriber engagement (low open rates)",
      "We don't have automated messages active",
      "Lack of a clear plan (what and when to send)",
    ],
  },
];

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [quizStep, setQuizStep] = useState<"intro" | "questions" | "form" | "success" | "disqualified">("intro");
  const [language, setLanguage] = useState("LT");
  const [activeSection, setActiveSection] = useState("about");
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [contactInfo, setContactInfo] = useState({
    name: "",
    email: "",
    phone: "",
    website: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const workflowSteps = language === "LT" ? workflowStepsLT : workflowStepsEN;
  const faqItems = language === "LT" ? faqItemsLT : faqItemsEN;
  const dashboardStates = language === "LT" ? dashboardStatesLT : dashboardStatesEN;
  const questions = language === "LT" ? questionsLT : questionsEN;

  // Workflow Active Step State
  const [activeWorkflowStepIdx, setActiveWorkflowStepIdx] = useState(0);
  
  // FAQ Active Index State
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  // Live Dashboard active state index
  const [activeDashboardStateIdx, setActiveDashboardStateIdx] = useState(0);

  // Database Calculator State
  const [calcRevenue, setCalcRevenue] = useState(10000);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Live Dashboard simulation cycle
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveDashboardStateIdx((prev) => (prev + 1) % dashboardStates.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [dashboardStates.length]);

  // Calculator logic values (smaller, more realistic coefficients: 20% lost annually, 10% recoverable monthly of the annual lost amount)
  const monthlyEmailLow = Math.round(calcRevenue * 0.20);
  const monthlyEmailHigh = Math.round(calcRevenue * 0.30);
  const annualEmailAdditional = monthlyEmailLow * 12;

  const handleStartQuiz = () => {
    setQuizStep("questions");
    setCurrentQuestionIdx(0);
    setAnswers({});
    setErrors({});
  };

  const handleOptionSelect = (option: string) => {
    const questionId = questions[currentQuestionIdx].id as keyof QuizAnswers;
    const newAnswers = { ...answers, [questionId]: option };
    setAnswers(newAnswers);

    // Disqualification check: if turnover is under 10,000 € / $
    if (questionId === "turnover" && (option === "Iki 10 000 €" || option === "Up to 10 000 £")) {
      setQuizStep("disqualified");
      return;
    }

    if (currentQuestionIdx < questions.length - 1) {
      setCurrentQuestionIdx(currentQuestionIdx + 1);
    } else {
      setQuizStep("form");
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIdx > 0) {
      setCurrentQuestionIdx(currentQuestionIdx - 1);
    } else {
      setQuizStep("intro");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setContactInfo({ ...contactInfo, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    const t = TRANSLATIONS[language as "LT" | "EN"];
    if (!contactInfo.name.trim()) newErrors.name = t.quiz.form.nameError;
    if (!contactInfo.email.trim() || !/\S+@\S+\.\S+/.test(contactInfo.email)) {
      newErrors.email = t.quiz.form.emailError;
    }
    if (!contactInfo.phone.trim() || contactInfo.phone.length < 8) {
      newErrors.phone = t.quiz.form.phoneError;
    }
    if (!contactInfo.website.trim()) newErrors.website = t.quiz.form.websiteError;
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const t = TRANSLATIONS[language as "LT" | "EN"];
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: contactInfo.name,
          email: contactInfo.email,
          phone: contactInfo.phone,
          website: contactInfo.website,
          answers: answers,
          status: "qualified",
        }),
      });

      if (!response.ok) {
        throw new Error(language === "LT" ? "Nepavyko išsaugoti užklausos." : "Failed to save request.");
      }

      setIsSubmitting(false);
      setQuizStep("success");
    } catch (error) {
      console.error("Klaida siunčiant duomenis:", error);
      setErrors({ submit: t.quiz.form.submitError });
      setIsSubmitting(false);
    }
  };

  const nextWorkflowStep = () => {
    if (activeWorkflowStepIdx < workflowSteps.length - 1) {
      setActiveWorkflowStepIdx(activeWorkflowStepIdx + 1);
    }
  };

  const prevWorkflowStep = () => {
    if (activeWorkflowStepIdx > 0) {
      setActiveWorkflowStepIdx(activeWorkflowStepIdx - 1);
    }
  };

  const t = TRANSLATIONS[language as "LT" | "EN"];

  return (
    <div className="bg-surface text-on-surface min-h-screen font-sans selection:bg-emerald-growth/20 overflow-x-hidden">
      {/* Header */}
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/85 backdrop-blur-[24px] border-b border-border-subtle shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-container-max mx-auto h-20 px-margin-mobile md:px-margin-desktop flex justify-between items-center">
          <a href="#" className="flex items-center gap-2 hover:opacity-85 transition-opacity">
            <svg className="w-5 h-5 sm:w-6 h-6 text-deep-navy shrink-0" viewBox="0 0 100 100" fill="none">
              <path d="M15 15 h70 a10 10 0 0 1 10 10 v45 a10 10 0 0 1 -10 10 h-45 l-15 15 v-15 h-10 a10 10 0 0 1 -10 -10 v-45 a10 10 0 0 1 10 -10 z" 
                    stroke="currentColor" strokeWidth="8" strokeLinejoin="round" strokeLinecap="round"/>
              <text x="50" y="52" fontFamily="sans-serif" fontWeight="900" fontSize="28" fill="currentColor" textAnchor="middle" dominantBaseline="middle">
                SMS
              </text>
            </svg>
            <span className="text-base sm:text-lg font-display font-bold text-deep-navy tracking-tight shrink-0">
              SMSflow
            </span>
          </a>

          <div className="hidden lg:flex items-center gap-7">
            <a 
              href="#pillars" 
              onClick={() => setActiveSection("pillars")}
              className={`text-[13px] font-bold py-1 transition-all relative ${
                activeSection === "pillars" 
                  ? "text-deep-navy after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#0EA87E]" 
                  : "text-on-surface-variant/80 hover:text-deep-navy"
              }`}
            >
              {t.nav.howItWorks}
            </a>
            <a 
              href="#about" 
              onClick={() => setActiveSection("calculator")}
              className={`text-[13px] font-bold py-1 transition-all relative ${
                activeSection === "calculator" 
                  ? "text-deep-navy after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#0EA87E]" 
                  : "text-on-surface-variant/80 hover:text-deep-navy"
              }`}
            >
              {t.nav.calculator}
            </a>
            <a 
              href="#results" 
              onClick={() => setActiveSection("results")}
              className={`text-[13px] font-bold py-1 transition-all relative ${
                activeSection === "results" 
                  ? "text-deep-navy after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#0EA87E]" 
                  : "text-on-surface-variant/80 hover:text-deep-navy"
              }`}
            >
              {t.nav.results}
            </a>
            <a 
              href="#faq" 
              onClick={() => setActiveSection("faq")}
              className={`text-[13px] font-bold py-1 transition-all relative ${
                activeSection === "faq" 
                  ? "text-deep-navy after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#0EA87E]" 
                  : "text-on-surface-variant/80 hover:text-deep-navy"
              }`}
            >
              {t.nav.faq}
            </a>
          </div>

          <div className="flex items-center gap-4">
            {/* LT/EN Language Switcher Toggle */}
            <div className="bg-[#EAF1EE] border border-border-subtle rounded-full p-1 flex items-center gap-0.5">
              <button 
                onClick={() => setLanguage("LT")}
                className={`text-[10px] font-bold px-2.5 py-1 rounded-full transition-all ${
                  language === "LT" ? "bg-deep-navy text-white" : "text-on-surface-variant/70 hover:text-deep-navy"
                }`}
              >
                LT
              </button>
              <button 
                onClick={() => setLanguage("EN")}
                className={`text-[10px] font-bold px-2.5 py-1 rounded-full transition-all ${
                  language === "EN" ? "bg-deep-navy text-white" : "text-on-surface-variant/70 hover:text-deep-navy"
                }`}
              >
                EN
              </button>
            </div>

            <a
              href="#audit"
              className="bg-[#0B222C] hover:bg-[#0F2E3A] text-white py-2.5 pl-5 pr-2.5 rounded-full flex items-center gap-2.5 hover:scale-95 transition-all text-xs sm:text-sm font-bold shrink-0 whitespace-nowrap"
            >
              <span>{t.nav.bookConsultation}</span>
              <div className="w-6 h-6 rounded-full bg-[#0EA87E] text-white flex items-center justify-center shrink-0">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto bg-mesh-gradient">
        {/* Animated Background Blobs */}
        <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] bg-emerald-growth/10 rounded-full blur-[100px] animate-float-slow pointer-events-none z-0"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#0E3E34]/5 rounded-full blur-[120px] animate-float-reverse pointer-events-none z-0"></div>

        <div className="grid md:grid-cols-2 gap-stack-lg items-center relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary-container text-on-secondary-container text-[11px] font-bold uppercase tracking-wider mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-growth animate-pulse"></span>
              {t.hero.tag}
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-deep-navy leading-none mb-6">
              {t.hero.title1}<br />{t.hero.title2}<span className="text-emerald-growth underline underline-offset-8 decoration-3 decoration-emerald-growth">{t.hero.underline}</span>
            </h1>
            <p className="text-body-lg text-on-surface-variant mb-8 max-w-lg">
              {t.hero.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#audit"
                className="bg-deep-navy text-white text-center px-8 py-4 rounded-full font-bold hover:bg-forest-dark transition-all shadow-lg flex items-center justify-center gap-2"
              >
                {t.hero.ctaAudit}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </a>
              <a
                href="#pillars"
                className="bg-white border border-border-subtle text-deep-navy text-center px-8 py-4 rounded-full font-bold hover:bg-surface-container-low transition-all"
              >
                {t.hero.ctaMore}
              </a>
            </div>
            <p className="text-xs text-on-surface-variant/70 mt-4 pl-2 flex items-center gap-1.5 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-growth animate-pulse"></span>
              {t.hero.trust}
            </p>
          </div>

          {/* Animated Automation Live Dashboard Preview */}
          <div className="relative mt-8 md:mt-0 flex flex-col gap-6 w-full max-w-[480px] mx-auto">
            <div className="bg-white rounded-3xl border border-border-subtle p-5 md:p-6 shadow-xl relative z-10">
              
              {/* Dashboard Top bar mock */}
              <div className="flex items-center justify-between border-b border-border-subtle pb-4 mb-5 text-xs text-on-surface-variant font-semibold">
                <div className="flex items-center gap-4">
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-black/10"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-black/10"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-black/10"></span>
                  </div>
                  <span className="text-[11px] text-on-surface-variant/50 font-mono tracking-wider">{t.dashboard.title}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-growth animate-pulse"></span>
                  <span className="text-[10px] text-emerald-growth uppercase font-bold tracking-wider font-sans">{t.dashboard.live}</span>
                </div>
              </div>

              {/* Today Earnings Display */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-on-surface-variant/60 block mb-1">
                    {t.dashboard.earnedToday}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-3xl md:text-4xl font-display font-bold text-deep-navy tracking-tight">
                    {dashboardStates[activeDashboardStateIdx]?.symbol || "€"}{dashboardStates[activeDashboardStateIdx]?.totalRevenue}
                  </span>
                </div>
              </div>

              {/* Dashboard live rows container with transitions */}
              <div className="space-y-2.5 h-[340px] max-h-[340px] overflow-hidden flex flex-col justify-start">
                {dashboardStates[activeDashboardStateIdx]?.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-3.5 bg-surface border border-border-subtle rounded-2xl transition-all duration-500 hover:border-emerald-growth/30 hover:shadow-sm animate-sms-pop"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="w-9 h-9 rounded-xl bg-secondary-container/30 border border-secondary-container flex items-center justify-center shrink-0">
                        {renderDashboardIcon(item.type)}
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-[13px] font-semibold text-deep-navy truncate">{item.title}</h4>
                        <p className="text-[11px] text-on-surface-variant/70 truncate mt-0.5">{item.subtitle}</p>
                      </div>
                    </div>
                    <div className="shrink-0 pl-2">
                      <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${
                        item.isSuccess 
                          ? "bg-surface-container-low text-on-surface-variant border border-border-subtle" 
                          : "bg-secondary-container text-on-secondary-container border border-secondary-container"
                       }`}>
                        {item.badge}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom live stats caption */}
              <div className="border-t border-border-subtle mt-5 pt-3 text-center">
                <p className="text-[10px] text-on-surface-variant/50 font-mono">
                  {t.dashboard.simulation}
                </p>
              </div>

            </div>{/* end dashboard card */}
          </div>{/* end dashboard col */}
        </div>{/* end hero grid */}
      </section>{/* end hero section */}



      {/* Pillars Section - Redesigned as a Light Bento Grid */}
      <section id="pillars" className="relative py-20 md:py-28 bg-[#F4F7F6] text-on-surface overflow-hidden">
        {/* Animated Background Blobs */}
        <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] bg-emerald-growth/5 rounded-full blur-[140px] animate-float-slow pointer-events-none z-0"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-deep-navy/5 rounded-full blur-[140px] animate-float-reverse pointer-events-none z-0"></div>

        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop relative z-10">
          <div className="max-w-3xl mb-16">
            <span className="text-emerald-growth font-bold text-xs uppercase tracking-widest flex items-center gap-2 mb-4">
              <span className="w-6 h-px bg-emerald-growth"></span>
              {t.pillars.tag}
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-deep-navy leading-tight mb-6">
              {t.pillars.title}
            </h2>
            <p className="text-body-lg text-on-surface-variant leading-relaxed max-w-2xl">
              {t.pillars.desc}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
            {t.pillars.list.map((pillar, idx) => (
              <div key={idx} className="p-8 border border-border-subtle rounded-2xl bg-white hover:border-emerald-growth/40 transition-all shadow-sm hover:shadow-md">
                <div className="text-emerald-growth mb-4 bg-secondary-container/30 w-12 h-12 rounded-xl flex items-center justify-center">
                  {idx === 0 && (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                  )}
                  {idx === 1 && (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 8H18.5" />
                    </svg>
                  )}
                  {idx === 2 && (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  )}
                  {idx === 3 && (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a2 2 0 01-2 2H9a2 2 0 01-2-2V4a2 2 0 012-2h2z" />
                    </svg>
                  )}
                  {idx === 4 && (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  )}
                  {idx === 5 && (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  )}
                </div>
                <h3 className="font-display text-lg font-bold text-deep-navy mb-2">{pillar.title}</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Intro Section with interactive Revenue Calculator */}
      <section id="about" className="relative py-20 md:py-28 max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop overflow-hidden">
        <div className="absolute top-1/2 right-0 w-[300px] h-[300px] bg-emerald-growth/5 rounded-full blur-[100px] animate-float-slow pointer-events-none z-0"></div>

        <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
          <div>
            <span className="text-emerald-growth font-bold text-xs uppercase tracking-widest flex items-center gap-2 mb-4">
              <span className="w-6 h-px bg-emerald-growth"></span>
              {t.calculator.tag}
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-deep-navy leading-tight mb-6">
              {t.calculator.title}
            </h2>
            <p className="text-body-lg text-on-surface-variant leading-relaxed mb-8">
              {t.calculator.desc}
            </p>
            <a
              href="#audit"
              className="inline-flex items-center gap-3 border-2 border-deep-navy text-deep-navy font-bold py-3.5 px-6 rounded-full text-sm transition-all hover:bg-deep-navy hover:text-white group"
            >
              <span>{t.calculator.cta}</span>
              <div className="w-7 h-7 rounded-full bg-deep-navy group-hover:bg-white flex items-center justify-center transition-colors">
                <svg className="w-4 h-4 text-white group-hover:text-deep-navy transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </a>
          </div>

          {/* Interactive Calculator widget */}
          <div className="bg-gradient-to-br from-[#0F2E3A] to-[#0B222C] text-white rounded-3xl p-6 md:p-8 shadow-xl border border-white/10">
            {/* Revenue label + large number */}
            <p className="text-[10px] uppercase tracking-widest text-white/50 font-bold mb-2">{t.calculator.revenueLabel}</p>
            <p className="font-display text-4xl font-bold text-white mb-5">
              {language === "LT" ? "€" : "£"}{formatNumber(calcRevenue)}
            </p>

            {/* Slider */}
            <input
              type="range"
              min="10000"
              max="200000"
              step="1000"
              value={calcRevenue}
              onChange={(e) => setCalcRevenue(Number(e.target.value))}
              className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-growth mb-7"
            />

            {/* Result cards */}
            <div className="grid grid-cols-2 gap-4 mb-5">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                <p className="font-display text-2xl font-bold text-emerald-growth leading-tight mb-2">
                  {language === "LT" ? "€" : "£"}{formatNumber(monthlyEmailLow)}–<br/>{formatNumber(monthlyEmailHigh)}
                </p>
                <p className="text-[11px] text-white/50 leading-snug">{t.calculator.monthlyLabel}</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                <p className="font-display text-2xl font-bold text-white leading-tight mb-2">
                  {language === "LT" ? "€" : "£"}{formatNumber(annualEmailAdditional)}+
                </p>
                <p className="text-[11px] text-white/50 leading-snug">{t.calculator.annualLabel}</p>
              </div>
            </div>

            {/* Note */}
            <p className="text-[10px] text-white/30 leading-relaxed mb-6">{t.calculator.note}</p>

            <a
              href="#audit"
              className="flex items-center justify-between w-full bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold py-3.5 px-5 rounded-full text-sm transition-all group"
            >
              <span>{t.calculator.cta}</span>
              <div className="w-7 h-7 rounded-full bg-emerald-growth flex items-center justify-center group-hover:translate-x-1 transition-transform">
                <svg className="w-4 h-4 text-deep-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Interactive Workflow Section */}
      <section id="workflow" className="py-20 md:py-28 bg-[#F4F7F6] text-on-surface overflow-hidden relative">
        {/* Animated Background Blobs */}
        <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] bg-emerald-growth/5 rounded-full blur-[140px] animate-float-slow pointer-events-none z-0"></div>

        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop relative z-10">
          
          {/* Pill Tag */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border-subtle bg-white text-[9px] tracking-[0.2em] uppercase font-bold text-on-surface-variant/80 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-growth animate-pulse"></span>
            {t.workflow.tag}
          </div>

          {/* Titles */}
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 text-deep-navy relative z-10">
            {t.workflow.title1} <br />
            <span className="text-emerald-growth italic font-medium">{t.workflow.italic}</span>
          </h2>
          <p className="text-on-surface-variant text-sm md:text-base max-w-xl mb-12 font-medium relative z-10">
            {t.workflow.desc}
          </p>

          {/* Horizontal Timeline Switcher */}
          <div className="relative mb-12 z-10">
            {/* Background Line */}
            <div className="absolute top-[18px] left-0 right-0 h-[2px] bg-deep-navy/10 z-0"></div>
            
            {/* Active Indicator Line */}
            <div 
              className="absolute top-[18px] left-0 h-[2px] bg-emerald-growth z-10 transition-all duration-500"
              style={{
                width: `${(activeWorkflowStepIdx / (workflowSteps.length - 1)) * 100}%`
              }}
            ></div>

            {/* Nodes */}
            <div className="relative z-20 flex justify-between">
              {workflowSteps.map((step, idx) => (
                <button
                  key={step.id}
                  onClick={() => setActiveWorkflowStepIdx(idx)}
                  className="flex flex-col items-center group focus:outline-none"
                >
                  <div 
                    className={`w-9 h-9 rounded-full flex items-center justify-center font-display font-bold text-xs border-2 transition-all duration-300 ${
                      idx <= activeWorkflowStepIdx
                        ? "bg-white border-emerald-growth text-emerald-growth shadow-[0_0_15px_rgba(14,168,126,0.25)]"
                        : "bg-white border-deep-navy/20 text-deep-navy/40"
                    }`}
                  >
                    {idx === activeWorkflowStepIdx && (
                      <span className="absolute -top-1 w-2.5 h-2.5 rounded-full bg-emerald-growth animate-ping"></span>
                    )}
                    {step.id}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Content Card with Arrow Navifiers */}
          <div className="relative bg-white border border-border-subtle rounded-2xl p-6 md:p-10 shadow-sm z-10">
            <div className="grid md:grid-cols-[100px_1fr] gap-6 items-start relative z-10">
              
              {/* Big Square Counter */}
              <div className="hidden md:flex w-20 h-20 rounded-2xl bg-surface border border-border-subtle items-center justify-center font-display font-bold text-3xl text-deep-navy">
                {workflowSteps[activeWorkflowStepIdx].id}
              </div>

              {/* Text Area */}
              <div>
                <span className="text-[10px] tracking-wider uppercase font-bold text-emerald-growth block mb-1">
                  {workflowSteps[activeWorkflowStepIdx].day}
                </span>
                <h3 className="font-display text-2xl font-bold text-deep-navy mb-3">
                  {workflowSteps[activeWorkflowStepIdx].title}
                </h3>
                <p className="text-sm text-on-surface-variant leading-relaxed mb-6">
                  {workflowSteps[activeWorkflowStepIdx].subtitle}
                </p>

                {/* Bullets List */}
                <ul className="space-y-3">
                  {workflowSteps[activeWorkflowStepIdx].bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex items-center gap-3 text-sm text-on-surface-variant">
                      <svg className="w-4 h-4 text-emerald-growth shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Navigation Buttons inside Card */}
            <div className="flex justify-end gap-3 mt-8 md:mt-0 md:absolute md:bottom-8 md:right-8 relative z-10">
              <button
                disabled={activeWorkflowStepIdx === 0}
                onClick={prevWorkflowStep}
                className="w-10 h-10 rounded-full border border-border-subtle flex items-center justify-center text-on-surface-variant/60 hover:text-emerald-growth hover:border-emerald-growth disabled:opacity-30 disabled:hover:border-border-subtle disabled:hover:text-on-surface-variant/60 transition-all focus:outline-none bg-white"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                disabled={activeWorkflowStepIdx === workflowSteps.length - 1}
                onClick={nextWorkflowStep}
                className="w-10 h-10 rounded-full border border-border-subtle flex items-center justify-center text-on-surface-variant/60 hover:text-emerald-growth hover:border-emerald-growth disabled:opacity-30 disabled:hover:border-border-subtle disabled:hover:text-on-surface-variant/60 transition-all focus:outline-none bg-white"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* Stats / Results Counters */}
      <section id="results" className="py-20 md:py-28 bg-[#F4F7F6] border-b border-border-subtle relative overflow-hidden">
        {/* Animated Background Blobs */}
        <div className="absolute top-1/2 left-1/3 w-[300px] h-[300px] bg-emerald-growth/5 rounded-full blur-[100px] animate-float-slow pointer-events-none z-0"></div>

        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop text-center relative z-10">
          <span className="text-emerald-growth font-bold text-xs uppercase tracking-widest block mb-2">
            {t.stats.tag}
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-deep-navy mb-16">
            {t.stats.title}
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {t.stats.items.map((item, idx) => (
              <div key={idx} className="p-6 bg-white border border-border-subtle rounded-xl shadow-sm relative z-10">
                <p className={`font-display text-3xl lg:text-4xl font-bold mb-2 ${idx % 2 === 0 ? "text-emerald-growth" : "text-deep-navy"}`}>
                  {item.value}
                </p>
                <p className="text-xs text-on-surface-variant font-semibold uppercase">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Investment / Pricing Section */}
      <section id="pricing" className="py-20 md:py-28 bg-[#F4F7F6] text-on-surface overflow-hidden relative border-t border-border-subtle">
        <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] bg-emerald-growth/5 rounded-full blur-[140px] animate-float-slow pointer-events-none z-0"></div>
        
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop relative z-10 text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border-subtle bg-white text-[9px] tracking-[0.2em] uppercase font-bold text-on-surface-variant/80 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-growth"></span>
            {t.pricing.tag}
          </div>
          
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-deep-navy mb-6">
            {t.pricing.title1}<span className="text-emerald-growth italic font-medium">{t.pricing.italic}</span>
          </h2>
          <p className="text-on-surface-variant text-sm md:text-base max-w-xl mx-auto font-medium">
            {t.pricing.desc}
          </p>
        </div>

        <div className="max-w-[1000px] mx-auto px-margin-mobile md:px-margin-desktop grid md:grid-cols-2 gap-8 relative z-10">
          
          {/* Left Card: +20% revenue */}
          <div className="bg-gradient-to-br from-[#1F4E5B] to-[#3A7E8C] rounded-3xl p-8 md:p-10 flex flex-col justify-between relative overflow-hidden min-h-[380px] md:min-h-[420px] shadow-lg border border-white/10">
            {/* Grid pattern backdrop overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none"></div>
            
            <div className="relative z-10">
              <span className="inline-block border border-white/30 bg-white/10 text-[9px] uppercase tracking-wider font-bold rounded-full px-3 py-1 text-white mb-8">
                {t.pricing.cardLeft.tag}
              </span>
              
              <h3 className="font-display text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
                {t.pricing.cardLeft.title}
              </h3>
              <p className="text-white/80 text-sm max-w-xs leading-relaxed">
                {t.pricing.cardLeft.desc}
              </p>
            </div>
            
            {/* White tilted Envelope Graphic at the bottom right */}
            <div className="self-end relative mt-8 md:mt-0 right-2 bottom-2 z-10">
              <svg className="w-24 h-24 text-white/95 drop-shadow-[0_4px_12px_rgba(0,0,0,0.1)] transform rotate-[12deg]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <rect width="20" height="14" x="2" y="5" rx="2" strokeWidth="1.5" />
                <path strokeWidth="1.5" d="M2 7l10 7 10-7" />
              </svg>
            </div>
          </div>

          {/* Right Card: Pricing & Checklist */}
          <div className="bg-white rounded-3xl p-8 md:p-10 border border-border-subtle flex flex-col justify-between shadow-lg text-on-surface">
            <div>
              <div className="flex justify-between items-center mb-6">
                <span className="inline-flex items-center gap-1.5 bg-secondary-container text-on-secondary-container text-[9px] uppercase tracking-wider font-bold rounded-full px-3 py-1 border border-secondary-container">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                  {t.pricing.cardRight.tag}
                </span>
              </div>

              <h3 className="font-display text-2xl font-bold text-deep-navy mb-2">{t.pricing.cardRight.title}</h3>
              <p className="text-on-surface-variant/80 text-xs mb-8">
                {t.pricing.cardRight.desc}
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div>
                  <span className="text-[10px] text-on-surface-variant/60 uppercase font-bold tracking-wider block mb-1">{t.pricing.cardRight.kaina}</span>
                  <p className="font-display text-3xl font-bold text-deep-navy">
                    {t.pricing.cardRight.priceValue} <span className="text-xs text-on-surface-variant/60 font-normal">{t.pricing.cardRight.pricePeriod}</span>
                  </p>
                </div>
                <div>
                  <span className="text-[10px] text-on-surface-variant/60 uppercase font-bold tracking-wider block mb-1">{t.pricing.cardRight.avgResultLabel}</span>
                  <p className="font-display text-3xl font-bold text-emerald-growth">
                    {t.pricing.cardRight.avgResultValue} <span className="text-xs text-emerald-growth/70 font-normal">{t.pricing.cardRight.avgResultSuffix}</span>
                  </p>
                </div>
              </div>

              <div className="border-t border-border-subtle pt-6 mb-8">
                <span className="text-[10px] text-on-surface-variant/60 uppercase font-bold tracking-wider block mb-4">
                  {language === "LT" ? "KĄ GAUSITE" : "WHAT YOU GET"}
                </span>
                <ul className="space-y-3">
                  {t.pricing.cardRight.checklist.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-xs text-on-surface-variant">
                      <svg className="w-4 h-4 text-emerald-growth shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <a
                href="#audit"
                className="w-full bg-deep-navy hover:bg-forest-dark text-white font-bold py-4 px-6 rounded-full flex items-center justify-between transition-all text-sm group"
              >
                <span>{t.pricing.cardRight.cta}</span>
                <div className="w-7 h-7 rounded-full bg-white/20 text-white flex items-center justify-center group-hover:translate-x-1 transition-transform">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </a>
              <p className="text-center text-[10px] text-on-surface-variant/60 mt-4 font-medium">
                {t.pricing.cardRight.trust}
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* Quiz / Audit Section - Redesigned as Light theme */}
      <section id="audit" className="relative py-20 md:py-28 bg-[#F4F7F6] text-on-surface border-y border-border-subtle overflow-hidden">
        {/* Animated Background Blobs */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-growth/5 rounded-full blur-[140px] animate-float-slow pointer-events-none z-0"></div>

        <div className="max-w-[700px] mx-auto px-margin-mobile relative z-10">
          <div className="text-center mb-10">
            <span className="text-emerald-growth font-bold text-xs uppercase tracking-widest block mb-2">
              {t.quiz.tag}
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-deep-navy mb-4 relative z-10">
              {t.quiz.title}
            </h2>
          </div>

          <div className="bg-white border border-border-subtle rounded-2xl p-6 md:p-8 shadow-xl relative z-10 text-on-surface">
            {quizStep === "intro" && (
              <div className="text-center py-6">
                <p className="text-on-surface-variant mb-6 font-medium">
                  {t.quiz.introDesc}
                </p>
                <button
                  onClick={handleStartQuiz}
                  className="bg-deep-navy hover:bg-forest-dark text-white font-bold px-8 py-4 rounded-full hover:scale-95 transition-transform"
                >
                  {t.quiz.startBtn}
                </button>
              </div>
            )}

            {quizStep === "questions" && (
              <div>
                <div className="flex justify-between items-center mb-6 text-xs text-on-surface-variant/60 font-semibold">
                  <span>{t.quiz.qText} {currentQuestionIdx + 1} {t.quiz.qOf} {questions.length}</span>
                  <span className="text-emerald-growth">{Math.round(((currentQuestionIdx + 1) / questions.length) * 100)}% {t.quiz.qDone}</span>
                </div>
                <h3 className="text-xl font-bold text-deep-navy mb-2">
                  {questions[currentQuestionIdx].title}
                </h3>
                <p className="text-sm text-on-surface-variant mb-6">
                  {questions[currentQuestionIdx].subtitle}
                </p>
                <div className="space-y-3">
                  {questions[currentQuestionIdx].options.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleOptionSelect(option)}
                      className="w-full text-left p-4 rounded-xl bg-surface hover:bg-secondary-container/30 border border-border-subtle hover:border-emerald-growth/50 transition-all text-sm font-semibold text-deep-navy"
                    >
                      {option}
                    </button>
                  ))}
                </div>
                <div className="flex justify-between items-center mt-6">
                  <button
                    onClick={handlePrevQuestion}
                    className="text-xs text-on-surface-variant/60 hover:text-deep-navy transition-colors font-bold flex items-center gap-1"
                  >
                    {t.quiz.backBtn}
                  </button>
                </div>
              </div>
            )}

            {quizStep === "disqualified" && (
              <div className="text-center py-6">
                <div className="text-red-500 mb-4">
                  <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-deep-navy mb-3">{t.quiz.disqualified.title}</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed mb-6">
                  {t.quiz.disqualified.desc}
                </p>
                <button
                  onClick={() => setQuizStep("intro")}
                  className="text-emerald-growth text-sm font-bold hover:underline"
                >
                  {t.quiz.disqualified.restart}
                </button>
              </div>
            )}

            {quizStep === "form" && (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-xl font-bold text-deep-navy mb-4">{t.quiz.form.title}</h3>
                
                <div>
                  <label className="block text-xs font-semibold text-on-surface-variant/80 mb-1.5">{t.quiz.form.nameLabel}</label>
                  <input
                    type="text"
                    name="name"
                    value={contactInfo.name}
                    onChange={handleInputChange}
                    className="w-full bg-surface border border-border-subtle rounded-lg p-3 text-sm focus:border-emerald-growth focus:ring-1 focus:ring-emerald-growth outline-none text-on-surface"
                    placeholder={t.quiz.form.namePlaceholder}
                  />
                  {errors.name && <span className="text-red-500 text-xs mt-1 block">{errors.name}</span>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-on-surface-variant/80 mb-1.5">{t.quiz.form.websiteLabel}</label>
                  <input
                    type="text"
                    name="website"
                    value={contactInfo.website}
                    onChange={handleInputChange}
                    className="w-full bg-surface border border-border-subtle rounded-lg p-3 text-sm focus:border-emerald-growth focus:ring-1 focus:ring-emerald-growth outline-none text-on-surface"
                    placeholder={t.quiz.form.websitePlaceholder}
                  />
                  {errors.website && <span className="text-red-500 text-xs mt-1 block">{errors.website}</span>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-on-surface-variant/80 mb-1.5">{t.quiz.form.emailLabel}</label>
                  <input
                    type="email"
                    name="email"
                    value={contactInfo.email}
                    onChange={handleInputChange}
                    className="w-full bg-surface border border-border-subtle rounded-lg p-3 text-sm focus:border-emerald-growth focus:ring-1 focus:ring-emerald-growth outline-none text-on-surface"
                    placeholder={t.quiz.form.emailPlaceholder}
                  />
                  {errors.email && <span className="text-red-500 text-xs mt-1 block">{errors.email}</span>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-on-surface-variant/80 mb-1.5">{t.quiz.form.phoneLabel}</label>
                  <input
                    type="tel"
                    name="phone"
                    value={contactInfo.phone}
                    onChange={handleInputChange}
                    className="w-full bg-surface border border-border-subtle rounded-lg p-3 text-sm focus:border-emerald-growth focus:ring-1 focus:ring-emerald-growth outline-none text-on-surface"
                    placeholder={t.quiz.form.phonePlaceholder}
                  />
                  {errors.phone && <span className="text-red-500 text-xs mt-1 block">{errors.phone}</span>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-deep-navy hover:bg-forest-dark text-white font-bold py-4 rounded-full hover:scale-95 transition-all text-sm mt-4 disabled:opacity-50"
                >
                  {isSubmitting ? t.quiz.form.submitting : t.quiz.form.submitBtn}
                </button>
                {errors.submit && <span className="text-red-500 text-xs mt-2 text-center block">{errors.submit}</span>}
              </form>
            )}

            {quizStep === "success" && (
              <div className="text-center py-4">
                <div className="text-emerald-growth mb-3">
                  <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-deep-navy mb-2">{t.quiz.success.title}</h3>
                <p className="text-sm text-on-surface-variant mb-6 leading-relaxed max-w-md mx-auto">
                  {t.quiz.success.desc.replace("{name}", contactInfo.name)}
                </p>

                {/* Calendly Inline Widget */}
                <div className="w-full rounded-xl overflow-hidden bg-white mb-6" style={{ height: "600px" }}>
                  <iframe 
                    src="https://calendly.com/smsflow/smsflow" 
                    width="100%" 
                    height="100%" 
                    frameBorder="0"
                    title="Calendly Booking"
                  ></iframe>
                </div>

                <button
                  onClick={() => setQuizStep("intro")}
                  className="text-emerald-growth text-sm font-bold hover:underline"
                >
                  {t.quiz.success.anotherRequest}
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="relative py-20 md:py-28 bg-white overflow-hidden">
        {/* Animated Background Blobs */}
        <div className="absolute bottom-10 right-10 w-[300px] h-[300px] bg-emerald-growth/10 rounded-full blur-[100px] animate-float-reverse pointer-events-none z-0"></div>

        <div className="max-w-3xl mx-auto px-margin-mobile md:px-margin-desktop relative z-10">
          <div className="text-center mb-16">
            <span className="text-emerald-growth font-bold text-xs uppercase tracking-widest block mb-2">
              {t.faq.tag}
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-deep-navy mb-4">
              {t.faq.title}
            </h2>
            <div className="h-1 w-12 bg-emerald-growth mx-auto"></div>
          </div>

          <div className="space-y-4 relative z-10">
            {faqItems.map((faq, idx) => (
              <div 
                key={idx}
                className="border border-border-subtle rounded-xl overflow-hidden transition-all duration-300 bg-surface/30"
              >
                <button
                  onClick={() => setOpenFaqIdx(openFaqIdx === idx ? null : idx)}
                  className="w-full text-left p-6 font-semibold text-deep-navy flex justify-between items-center transition-colors hover:bg-surface focus:outline-none"
                >
                  <span>{faq.question}</span>
                  <svg 
                    className={`w-5 h-5 text-on-surface-variant shrink-0 transition-transform duration-300 ${openFaqIdx === idx ? "rotate-180" : ""}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div 
                  className={`transition-all duration-300 overflow-hidden ${
                    openFaqIdx === idx ? "max-h-[500px] border-t border-border-subtle" : "max-h-0"
                  }`}
                >
                  <p className="p-6 text-sm text-on-surface-variant leading-relaxed bg-white whitespace-pre-line">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative py-20 md:py-28 bg-deep-navy text-white overflow-hidden text-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-emerald-growth/10 rounded-full blur-[140px] pointer-events-none z-0"></div>
        
        <div className="max-w-[800px] mx-auto px-margin-mobile relative z-10">
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">
            {t.ctaSection.title}
          </h2>
          <p className="text-white/80 text-sm md:text-base mb-8 max-w-lg mx-auto font-medium">
            {t.ctaSection.desc}
          </p>
          <a
            href="#audit"
            className="inline-block bg-emerald-growth hover:bg-emerald-growth/90 text-deep-navy font-bold px-8 py-4 rounded-full hover:scale-95 transition-transform"
          >
            {t.ctaSection.btn}
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-surface-container-lowest border-t border-border-subtle w-full py-12 relative z-10">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop flex flex-col md:flex-row justify-between items-center md:items-start gap-8">
          <div className="flex flex-col items-center md:items-start gap-4">
            <a href="#" className="flex items-center gap-2 hover:opacity-85 transition-opacity">
              <svg className="w-5 h-5 sm:w-6 h-6 md:w-8 md:h-8 text-deep-navy shrink-0" viewBox="0 0 100 100" fill="none">
                <path d="M15 15 h70 a10 10 0 0 1 10 10 v45 a10 10 0 0 1 -10 10 h-45 l-15 15 v-15 h-10 a10 10 0 0 1 -10 -10 v-45 a10 10 0 0 1 10 -10 z" 
                      stroke="currentColor" strokeWidth="8" strokeLinejoin="round" strokeLinecap="round"/>
                <text x="50" y="52" fontFamily="sans-serif" fontWeight="900" fontSize="28" fill="currentColor" textAnchor="middle" dominantBaseline="middle">
                  SMS
                </text>
              </svg>
              <span className="text-sm sm:text-base md:text-lg font-display font-bold text-deep-navy tracking-tight shrink-0">
                SMSflow
              </span>
            </a>
            <p className="text-xs text-on-surface-variant/80 max-w-[240px] mt-1 text-center md:text-left font-medium leading-relaxed">
              Email marketing agency for e-commerce stores and service businesses.
            </p>
            
            <div className="flex flex-col items-center md:items-start gap-2 text-xs text-on-surface-variant font-medium mt-2">
              <a href="mailto:info@smsflow.eu" className="hover:text-emerald-growth transition-colors flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-on-surface-variant/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                info@smsflow.eu
              </a>
            </div>
          </div>

          <div className="text-xs text-on-surface-variant opacity-60 md:self-end">
            {t.footer.rights}
          </div>
        </div>
      </footer>
    </div>
  );
}
