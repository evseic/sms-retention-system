"use client";

import React, { useState, useEffect } from "react";

// Types for Quiz
type QuizAnswers = {
  turnover?: string;
  currentUsage?: string;
  listSize?: string;
  challenge?: string;
};

// Workflow Steps data
const workflowSteps = [
  {
    id: "1",
    day: "DIENA 1",
    title: "Auditas ir strategija",
    subtitle: "Per 24 h pasakome, kur prarandate pajamas ir koks tikslus planas.",
    bullets: [
      "Esamos duomenų bazės kokybės auditas",
      "Pristatomumo ir siuntėjo reputacijos patikra",
      "Individuali strategija ir aiškus planas",
    ],
  },
  {
    id: "2",
    day: "DIENA 2",
    title: "Integracija ir paruošimas",
    subtitle: "Sujungiame jūsų CRM ar registracijų sistemą be jokių programuotojų pagalbos.",
    bullets: [
      "POS / registracijos sistemos integracija",
      "SMS ir WhatsApp siuntėjo paskyrų konfigūravimas",
      "Kontaktų rinkimo formų diegimas",
    ],
  },
  {
    id: "3-4",
    day: "DIENOS 3-4",
    title: "Tekstų kūrimas ir automatizacijos",
    subtitle: "Parašome konvertuojančius tekstus ir sujungiame automatinius srautus.",
    bullets: [
      "Pasisveikinimo ir sugrąžinimo žinučių copywritingas",
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
      "Gavėjo ekrano (inbox delivery) pasiekiamumo testai",
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

// FAQ items
const faqItems = [
  {
    question: "Per kiek laiko pamatysiu rezultatus?",
    answer: "Pirmieji papildomi užsakymai ir sugrąžinti klientai pasirodo jau per pirmąsias 48 valandas po sistemos paleidimo. Stabilios pakartotinės pajamos iš šio kanalo nusistovi per pirmąsias 30 dienų.",
  },
  {
    question: "Ką tiksliai gaunu už €350/mėn. fiksuotą mokestį?",
    answer: "Pilną klientų išlaikymo kanalo valdymą: esamos bazės auditą, strategijos paruošimą, integracijų su CRM/POS pajungimą, profesionalų tekstų rašymą (copywriting), automatinių srautų valdymą, reguliarių kampanijų siuntimą bei kasmėnesines ataskaitas.",
  },
  {
    question: "Ar tai tinka mažesniems paslaugų verslams?",
    answer: "Taip, mūsų sprendimas idealiai tinka klinikoms, grožio salonams, automobilių servisams ir kitiems vietiniams verslams. Vienintelis reikalavimas — jūsų mėnesinė apyvarta turėtų viršyti €5 000, kad investicija atneštų aukštą ROI.",
  },
  {
    question: "Ar turime patys kurti žinučių tekstus?",
    answer: "Ne. Mes teikiame pilną paslaugą (done-for-you). Patys parašome visus žinučių tekstus, suderiname siuntimo laikus ir atliekame techninius nustatymus. Jums tereikia patvirtinti galutinius tekstus.",
  },
  {
    question: "Kaip skaičiuojamas papildomų žinučių (SMS/WhatsApp) siuntimo mokestis?",
    answer: "Into €350/mėn. paslaugos kainą įeina pilnas sistemos valdymas. Pačių žinučių siuntimo išlaidos (keli centai už žinutę) yra mokamos tiesiogiai paslaugų tiekėjui pagal faktinį sunaudojimą.",
  },
];

// SMS Live Conversation mock data
const smsMessages = [
  { sender: "system", text: "Sveiki! Pastebėjome, kad praėjo 3 mėnesiai po jūsų paskutinio vizito klinikoje. Ar norėtumėte užsiregistruoti profilaktinei patikrai?" },
  { sender: "system", text: "Dovanojame €10 nuolaidą šiam vizitui. Registruokitės čia: gp.lt/auditas" },
  { sender: "client", text: "Sveiki, taip, norėčiau. Ar turite laisvą laiką šį penktadienį po pietų?" },
  { sender: "system", text: "Taip! Turime laisvą laiką penktadienį 15:30 val. Registraciją patvirtinome, lauksime jūsų! 🌟" },
];

// Helper to format numbers consistently to prevent hydration mismatches
const formatNumber = (num: number) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [quizStep, setQuizStep] = useState<"intro" | "questions" | "form" | "success" | "disqualified">("intro");
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

  // Workflow Active Step State
  const [activeWorkflowStepIdx, setActiveWorkflowStepIdx] = useState(0);
  
  // FAQ Active Index State
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(null);

  // SMS Live simulation state
  const [visibleSMSCount, setVisibleSMSCount] = useState(1);

  // Database Calculator State
  const [calcContacts, setCalcContacts] = useState(1500);
  const [calcTicket, setCalcTicket] = useState(40);

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

  // Loop SMS preview animation
  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleSMSCount((prev) => {
        if (prev >= smsMessages.length) {
          return 1; // Restart loop
        }
        return prev + 1;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Calculator logic values (smaller, more realistic coefficients: 20% lost annually, 10% recoverable monthly of the annual lost amount)
  const lostAnnualRevenue = Math.round(calcContacts * calcTicket * 0.20);
  const monthlyRecoverable = Math.round((calcContacts * calcTicket * 0.10) / 12);

  // Lithuanian quiz questions
  const questions = [
    {
      id: "turnover",
      title: "Mėnesinė apyvarta",
      subtitle: "Kokia maždaug jūsų verslo vidutinė mėnesinė apyvarta?",
      options: ["Iki 5 000 €", "5 000 – 20 000 €", "20 000 – 50 000 €", "Daugiau nei 50 000 €"],
    },
    {
      id: "currentUsage",
      title: "SMS ir „WhatsApp“ rinkodara",
      subtitle: "Kaip šiuo metu naudojate klientų išlaikymo įrankius savo versle?",
      options: [
        "Reguliariai siunčiame žinutes ir turime automatinius srautus",
        "Kartais išsiunčiame pasiūlymus rankiniu būdu, be automatizacijos",
        "Turime klientų bazę, bet jos praktiškai nenaudojame",
        "Rinkodaros per SMS ar „WhatsApp“ dar visiškai nedarome",
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
        "Mažas gavėjų įsitraukimas (žemas žinučių atidarymo rodiklis)",
        "Neturime veikiančių automatinių žinučių srautų",
        "Trūksta aiškaus plano (ką ir kada reikėtų siųsti)",
      ],
    },
  ];

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

    // Disqualification check: if turnover is under 5,000 €
    if (questionId === "turnover" && option === "Iki 5 000 €") {
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
    if (!contactInfo.name.trim()) newErrors.name = "Vardas yra privalomas";
    if (!contactInfo.email.trim() || !/\S+@\S+\.\S+/.test(contactInfo.email)) {
      newErrors.email = "Įveskite galiojantį el. pašto adresą";
    }
    if (!contactInfo.phone.trim() || contactInfo.phone.length < 8) {
      newErrors.phone = "Įveskite galiojantį telefono numerį";
    }
    if (!contactInfo.website.trim()) newErrors.website = "Įveskite svetainės adresą arba įmonės pavadinimą";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

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
        throw new Error("Nepavyko išsaugoti užklausos.");
      }

      setIsSubmitting(false);
      setQuizStep("success");
    } catch (error) {
      console.error("Klaida siunčiant duomenis:", error);
      setErrors({ submit: "Įvyko klaida siunčiant užklausą. Bandykite dar kartą vėliau." });
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

  return (
    <div className="bg-surface text-on-surface min-h-screen font-sans selection:bg-emerald-growth/20 overflow-x-hidden">
      {/* Header */}
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md border-b border-border-subtle shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-container-max mx-auto h-20 px-margin-mobile md:px-margin-desktop flex justify-between items-center">
          <div className="flex items-center gap-2">
            <svg className="w-8 h-8 text-deep-navy" viewBox="0 0 100 100" fill="none">
              <path d="M15 15 h70 a10 10 0 0 1 10 10 v45 a10 10 0 0 1 -10 10 h-45 l-15 15 v-15 h-10 a10 10 0 0 1 -10 -10 v-45 a10 10 0 0 1 10 -10 z" 
                    stroke="currentColor" strokeWidth="8" strokeLinejoin="round" strokeLinecap="round"/>
              <text x="50" y="52" fontFamily="sans-serif" fontWeight="900" fontSize="28" fill="currentColor" textAnchor="middle" dominantBaseline="middle">
                SMS
              </text>
            </svg>
            <span className="text-xl font-display font-bold text-deep-navy tracking-tight">
              SMSflow
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#about" className="text-sm font-semibold text-on-surface-variant hover:text-emerald-growth transition-colors">
              Kaip veikia
            </a>
            <a href="#pillars" className="text-sm font-semibold text-on-surface-variant hover:text-emerald-growth transition-colors">
              Paslaugos
            </a>
            <a href="#workflow" className="text-sm font-semibold text-on-surface-variant hover:text-emerald-growth transition-colors">
              Procesas
            </a>
            <a href="#pricing" className="text-sm font-semibold text-on-surface-variant hover:text-emerald-growth transition-colors">
              Apie
            </a>
            <a href="#faq" className="text-sm font-semibold text-on-surface-variant hover:text-emerald-growth transition-colors">
              D.U.K.
            </a>
          </div>

          <a
            href="#audit"
            className="bg-deep-navy text-white px-5 py-3 rounded-full text-sm font-bold hover:scale-95 transition-transform"
          >
            Nemokamas auditas
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto bg-mesh-gradient">
        {/* Animated Background Blobs with fixed z-index above background but below text */}
        <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] bg-emerald-growth/15 rounded-full blur-[100px] animate-float-slow pointer-events-none z-0"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-deep-navy/10 rounded-full blur-[120px] animate-float-reverse pointer-events-none z-0"></div>

        <div className="grid md:grid-cols-2 gap-stack-lg items-center relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary-container text-on-secondary-container text-[11px] font-bold uppercase tracking-wider mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-growth animate-pulse"></span>
              PILNAS KANALŲ VALDYMAS
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-deep-navy leading-none mb-6">
              Padidinkite pajamas ir sugrąžinkite buvusius klientus automatiškai
            </h1>
            <p className="text-body-lg text-on-surface-variant mb-8 max-w-lg">
              Padėsime įdarbinti jūsų turimą kontaktų bazę per automatizuotą SMS ir „WhatsApp“ komunikaciją. Pilnas paslaugos administravimas — už fiksuotą €350/mėn. mokestį.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#audit"
                className="bg-deep-navy text-white text-center px-8 py-4 rounded-full font-bold hover:bg-black transition-all shadow-lg flex items-center justify-center gap-2"
              >
                Gauti nemokamą auditą
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </a>
              <a
                href="#pillars"
                className="bg-white border border-border-subtle text-deep-navy text-center px-8 py-4 rounded-full font-bold hover:bg-surface-container transition-all"
              >
                Sužinoti daugiau
              </a>
            </div>
          </div>

          {/* Animated SMS iPhone-style Preview Mockup Container */}
          <div className="relative mt-8 md:mt-0 flex flex-col gap-6">
            <div className="bg-white rounded-2xl border border-border-subtle p-6 md:p-8 shadow-xl relative z-10">
              
              {/* Phone Status bar mock */}
              <div className="flex items-center justify-between border-b border-border-subtle pb-4 mb-4 text-xs text-on-surface-variant font-semibold">
                <div className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-emerald-growth" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                  </svg>
                  <span>Mano Klinika</span>
                </div>
                <span className="text-[10px] bg-emerald-growth/10 text-emerald-growth px-2 py-0.5 rounded uppercase tracking-tighter">
                  SMS Aktyvuota
                </span>
              </div>

              {/* Chat thread mockup container */}
              <div className="space-y-3 h-[380px] max-h-[380px] overflow-y-auto transition-all duration-300 pr-1 flex flex-col justify-end">
                {smsMessages.slice(0, visibleSMSCount).map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex flex-col max-w-[85%] rounded-[18px] px-4 py-2.5 text-xs md:text-sm leading-relaxed transition-all duration-500 scale-95 origin-bottom ${
                      msg.sender === "system"
                        ? "bg-[#E9E9EB] text-black self-start rounded-tl-[4px]"
                        : "bg-[#007AFF] text-white self-end rounded-tr-[4px] ml-auto"
                    }`}
                  >
                    <p>{msg.text}</p>
                  </div>
                ))}
              </div>
            </div>
            {/* Decorative stack shadow backing */}
            <div className="absolute -top-6 -right-6 w-full h-full bg-deep-navy/5 rounded-2xl -z-10"></div>
          </div>
        </div>
      </section>

      {/* Logo Strip */}
      <section className="py-12 border-y border-border-subtle bg-white overflow-hidden">
        <div className="max-w-container-max mx-auto px-margin-mobile text-center">
          <p className="text-xs uppercase font-bold tracking-wider text-on-surface-variant/60 mb-6">
            Mumis pasitiki paslaugų ir vietiniai verslai Lietuvoje pakartotiniams užsakymams gauti
          </p>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-50 grayscale">
            <span className="text-lg font-bold tracking-widest text-deep-navy">SALONAS.AUGIMAS</span>
            <span className="text-lg font-bold tracking-widest text-deep-navy">KLINIKA.PRO</span>
            <span className="text-lg font-bold tracking-widest text-deep-navy">FITNESS.SYSTEMS</span>
            <span className="text-lg font-bold tracking-widest text-deep-navy">AUTO.SPARK</span>
          </div>
        </div>
      </section>

      {/* Intro Section with interactive Revenue Calculator */}
      <section id="about" className="relative py-20 md:py-28 max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop overflow-hidden">
        <div className="absolute top-1/2 right-0 w-[300px] h-[300px] bg-emerald-growth/10 rounded-full blur-[100px] animate-float-slow pointer-events-none z-0"></div>

        <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
          <div>
            <span className="text-emerald-growth font-bold text-xs uppercase tracking-widest block mb-2">
              Klientų bazės įdarbinimas
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-deep-navy leading-tight mb-6">
              Uždirbkite daugiau iš to, <span className="text-emerald-growth italic">ką jau turite</span>.
            </h2>
            <p className="text-body-lg text-on-surface-variant leading-relaxed mb-6">
              Vietoj to, kad kasdien leistumėte biudžetą brangiai reklamai („Facebook“ ar „Google“), pritraukdami visiškai naujus ir šaltus lankytojus, mes padedame uždirbti iš jūsų turimos duomenų bazės. Sukuriame automatinius SMS bei „WhatsApp“ pranešimus, kurie laiku ir vietoje sugrąžina jūsų buvusius klientus pakartotiniams vizitams ar užsakymams.
            </p>
          </div>

          {/* Interactive Calculator widget */}
          <div className="bg-white rounded-2xl border border-border-subtle p-6 md:p-8 shadow-xl">
            <h3 className="font-display text-lg font-bold text-deep-navy mb-6 text-center">
              Apskaičiuokite savo bazės potencialą 📊
            </h3>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center text-sm font-semibold mb-2">
                  <span className="text-on-surface-variant">Turimų kontaktų skaičius:</span>
                  <span className="text-deep-navy font-bold">{formatNumber(calcContacts)}</span>
                </div>
                <input
                  type="range"
                  min="100"
                  max="10000"
                  step="100"
                  value={calcContacts}
                  onChange={(e) => setCalcContacts(Number(e.target.value))}
                  className="w-full h-2 bg-surface-container rounded-lg appearance-none cursor-pointer accent-emerald-growth"
                />
              </div>

              <div>
                <div className="flex justify-between items-center text-sm font-semibold mb-2">
                  <span className="text-on-surface-variant">Vidutinė paslaugos / krepšelio vertė:</span>
                  <span className="text-deep-navy font-bold">{calcTicket} €</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="150"
                  step="5"
                  value={calcTicket}
                  onChange={(e) => setCalcTicket(Number(e.target.value))}
                  className="w-full h-2 bg-surface-container rounded-lg appearance-none cursor-pointer accent-emerald-growth"
                />
              </div>

              <div className="pt-6 border-t border-border-subtle grid grid-cols-2 gap-4 text-center">
                <div className="p-3 bg-red-500/5 rounded-xl border border-red-500/10">
                  <span className="text-[10px] text-on-surface-variant uppercase font-bold">Prarandate kasmet</span>
                  <p className="font-display text-base md:text-lg font-bold text-red-500 mt-1">
                    -{formatNumber(lostAnnualRevenue)} €
                  </p>
                </div>
                <div className="p-3 bg-emerald-growth/5 rounded-xl border border-emerald-growth/10">
                  <span className="text-[10px] text-on-surface-variant uppercase font-bold">Sugrąžinsime kas mėnesį</span>
                  <p className="font-display text-base md:text-lg font-bold text-emerald-growth mt-1">
                    +{formatNumber(monthlyRecoverable)} €
                  </p>
                </div>
              </div>

              <a
                href="#audit"
                className="block text-center w-full bg-deep-navy hover:bg-black text-white font-bold py-3.5 rounded-full text-sm transition-all"
              >
                Gauti išsamų mano bazės auditą
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Pillars Section */}
      <section id="pillars" className="relative py-20 md:py-28 bg-deep-navy text-white overflow-hidden">
        {/* Animated Background Blobs */}
        <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] bg-emerald-growth/20 rounded-full blur-[140px] animate-float-slow pointer-events-none z-0"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-white/10 rounded-full blur-[140px] animate-float-reverse pointer-events-none z-0"></div>

        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop relative z-10">
          <div className="max-w-3xl mb-16">
            <span className="text-emerald-growth font-bold text-xs uppercase tracking-widest block mb-2">
              Sistemos galimybės
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Mūsų 6 klientų išlaikymo pilonai
            </h2>
            <div className="h-1 w-12 bg-emerald-growth"></div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
            <div className="p-8 border border-white/10 rounded-xl bg-white/5 backdrop-blur-sm hover:border-emerald-growth/40 transition-colors">
              <div className="text-emerald-growth mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </div>
              <h3 className="font-display text-lg font-bold mb-2">Kontaktų surinkimas</h3>
              <p className="text-sm text-white/60 leading-relaxed">
                Formos, pop-up'ai ir integracijos svetainėje. Kiekvienas naujas lankytojas automatiškai patenka į jūsų bazę, o ne pradingsta po pirmojo vizito.
              </p>
            </div>
            <div className="p-8 border border-white/10 rounded-xl bg-white/5 backdrop-blur-sm hover:border-emerald-growth/40 transition-colors">
              <div className="text-emerald-growth mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 8H18.5" />
                </svg>
              </div>
              <h3 className="font-display text-lg font-bold mb-2">Automatiniai srautai</h3>
              <p className="text-sm text-white/60 leading-relaxed">
                Sveikinimo žinutės, priminimai apie apleistą krepšelį ar praleistą vizitą. Sistema pagal kliento atliktus veiksmus dirba už jus 24/7.
              </p>
            </div>
            <div className="p-8 border border-white/10 rounded-xl bg-white/5 backdrop-blur-sm hover:border-emerald-growth/40 transition-colors">
              <div className="text-emerald-growth mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-display text-lg font-bold mb-2">Reguliarios kampanijos</h3>
              <p className="text-sm text-white/60 leading-relaxed">
                Pranešimai apie naujas paslaugas, atsilaisvinusius vizitų laikus ar specialius pasiūlymus tiems, kurie jus jau pažįsta ir pasitiki.
              </p>
            </div>
            <div className="p-8 border border-white/10 rounded-xl bg-white/5 backdrop-blur-sm hover:border-emerald-growth/40 transition-colors">
              <div className="text-emerald-growth mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a2 2 0 01-2 2H9a2 2 0 01-2-2V4a2 2 0 012-2h2z" />
                </svg>
              </div>
              <h3 className="font-display text-lg font-bold mb-2">Segmentavimas</h3>
              <p className="text-sm text-white/60 leading-relaxed">
                Auditorijos skirstymas pagal pirkimų istoriją, paslaugų tipus bei įsitraukimą, kad klientai gautų tik asmeniškai aktualius pasiūlymus.
              </p>
            </div>
            <div className="p-8 border border-white/10 rounded-xl bg-white/5 backdrop-blur-sm hover:border-emerald-growth/40 transition-colors">
              <div className="text-emerald-growth mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="font-display text-lg font-bold mb-2">A/B testavimas ir analizė</h3>
              <p className="text-sm text-white/60 leading-relaxed">
                Testuojame skirtingas temas, tekstų stilius, pasiūlymus ir siuntimo laikus, kad kiekviena žinutė atneštų kuo daugiau užsakymų.
              </p>
            </div>
            <div className="p-8 border border-white/10 rounded-xl bg-white/5 backdrop-blur-sm hover:border-emerald-growth/40 transition-colors">
              <div className="text-emerald-growth mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="font-display text-lg font-bold mb-2">Pristatymas į gavėjo dėžutę</h3>
              <p className="text-sm text-white/60 leading-relaxed">
                DKIM, SPF, DMARC ir siuntėjo reputacijos valdymas, garantuojantis, kad pranešimai pasieks gavėją, o ne nuguls į „Spamą“.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Workflow Section */}
      <section id="workflow" className="py-20 md:py-28 bg-[#0B0F14] text-white overflow-hidden relative">
        {/* Animated Background Blobs */}
        <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] bg-emerald-growth/20 rounded-full blur-[140px] animate-float-slow pointer-events-none z-0"></div>

        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop relative z-10">
          
          {/* Pill Tag */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-[9px] tracking-[0.2em] uppercase font-bold text-white/80 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-growth animate-pulse"></span>
            PRISTATYMO TERMINAS
          </div>

          {/* Titles */}
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 relative z-10">
            Pilna, veikianti sistema — <br />
            <span className="text-emerald-growth italic font-medium">per 7 dienas.</span>
          </h2>
          <p className="text-white/60 text-sm md:text-base max-w-xl mb-12 font-medium relative z-10">
            Ne mėnesiai derinimo. Žingsnis po žingsnio — nuo audito iki pilnai automatizuoto, pajamas nešančio SMS ir „WhatsApp“ kanalo per vieną savaitę.
          </p>

          {/* Horizontal Timeline Switcher */}
          <div className="relative mb-12 z-10">
            {/* Background Line */}
            <div className="absolute top-[18px] left-0 right-0 h-[2px] bg-white/10 z-0"></div>
            
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
                        ? "bg-[#0B0F14] border-emerald-growth text-emerald-growth shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                        : "bg-[#0B0F14] border-white/20 text-white/40"
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
          <div className="relative bg-[#131B2E]/40 border border-white/10 rounded-2xl p-6 md:p-10 backdrop-blur-md z-10">
            <div className="grid md:grid-cols-[100px_1fr] gap-6 items-start relative z-10">
              
              {/* Big Square Counter */}
              <div className="hidden md:flex w-20 h-20 rounded-2xl bg-white/5 border border-white/10 items-center justify-center font-display font-bold text-3xl text-white">
                {workflowSteps[activeWorkflowStepIdx].id}
              </div>

              {/* Text Area */}
              <div>
                <span className="text-[10px] tracking-wider uppercase font-bold text-emerald-growth block mb-1">
                  {workflowSteps[activeWorkflowStepIdx].day}
                </span>
                <h3 className="font-display text-2xl font-bold text-white mb-3">
                  {workflowSteps[activeWorkflowStepIdx].title}
                </h3>
                <p className="text-sm text-white/70 leading-relaxed mb-6">
                  {workflowSteps[activeWorkflowStepIdx].subtitle}
                </p>

                {/* Bullets List */}
                <ul className="space-y-3">
                  {workflowSteps[activeWorkflowStepIdx].bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex items-center gap-3 text-sm text-white/80">
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
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-emerald-growth disabled:opacity-30 disabled:hover:border-white/10 disabled:hover:text-white/60 transition-all focus:outline-none bg-deep-navy/30"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                disabled={activeWorkflowStepIdx === workflowSteps.length - 1}
                onClick={nextWorkflowStep}
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-emerald-growth disabled:opacity-30 disabled:hover:border-white/10 disabled:hover:text-white/60 transition-all focus:outline-none bg-deep-navy/30"
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
      <section id="results" className="py-20 md:py-28 bg-surface-container-low border-b border-border-subtle relative overflow-hidden">
        {/* Animated Background Blobs */}
        <div className="absolute top-1/2 left-1/3 w-[300px] h-[300px] bg-emerald-growth/10 rounded-full blur-[100px] animate-float-slow pointer-events-none z-0"></div>

        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop text-center relative z-10">
          <span className="text-emerald-growth font-bold text-xs uppercase tracking-widest block mb-2">
            Skaičiai patys kalba už save
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-deep-navy mb-16">
            Mūsų pasiekiami rezultatai
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-white border border-border-subtle rounded-xl shadow-sm relative z-10">
              <p className="font-display text-3xl lg:text-4xl font-bold text-emerald-growth mb-2">+34%</p>
              <p className="text-xs text-on-surface-variant font-semibold uppercase">vidutinis pajamų augimas</p>
            </div>
            <div className="p-6 bg-white border border-border-subtle rounded-xl shadow-sm relative z-10">
              <p className="font-display text-3xl lg:text-4xl font-bold text-deep-navy mb-2">24/7</p>
              <p className="text-xs text-on-surface-variant font-semibold uppercase">automatizuoti srautai</p>
            </div>
            <div className="p-6 bg-white border border-border-subtle rounded-xl shadow-sm relative z-10">
              <p className="font-display text-3xl lg:text-4xl font-bold text-emerald-growth mb-2">&lt; 24h</p>
              <p className="text-xs text-on-surface-variant font-semibold uppercase">audito paruošimas</p>
            </div>
            <div className="p-6 bg-white border border-border-subtle rounded-xl shadow-sm relative z-10">
              <p className="font-display text-3xl lg:text-4xl font-bold text-deep-navy mb-2">50+</p>
              <p className="text-xs text-on-surface-variant font-semibold uppercase">dirbančių įmonių</p>
            </div>
          </div>
        </div>
      </section>

      {/* Investment / Pricing Section */}
      <section id="pricing" className="py-20 md:py-28 bg-[#0B0F14] text-white overflow-hidden relative border-t border-white/5">
        <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] bg-emerald-growth/10 rounded-full blur-[140px] animate-float-slow pointer-events-none z-0"></div>
        
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop relative z-10 text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-[9px] tracking-[0.2em] uppercase font-bold text-white/80 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-growth"></span>
            INVESTICIJA
          </div>
          
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6">
            Pradėkite uždirbti <span className="text-emerald-growth italic font-medium">jau šį mėnesį.</span>
          </h2>
          <p className="text-white/60 text-sm md:text-base max-w-xl mx-auto font-medium">
            Vienas mėnesinis paketas, kuris padengia visą SMS ir WhatsApp kanalą — nuo strategijos iki kasdieninės priežiūros.
          </p>
        </div>

        <div className="max-w-[1000px] mx-auto px-margin-mobile md:px-margin-desktop grid md:grid-cols-2 gap-8 relative z-10">
          
          {/* Left Card: +20% pajamu */}
          <div className="bg-gradient-to-br from-[#4A7285] to-[#7AA2AC] rounded-3xl p-8 md:p-10 flex flex-col justify-between relative overflow-hidden min-h-[380px] md:min-h-[420px] shadow-lg border border-white/10">
            {/* Grid pattern backdrop overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none"></div>
            
            <div className="relative z-10">
              <span className="inline-block border border-white/30 bg-white/10 text-[9px] uppercase tracking-wider font-bold rounded-full px-3 py-1 text-white mb-8">
                SMSFLOW · PAKETAS
              </span>
              
              <h3 className="font-display text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
                +20% pajamų per 60 dienų.
              </h3>
              <p className="text-white/80 text-sm max-w-xs leading-relaxed">
                Vienas mokestis. Pilna sistema. Augimas, kurio nereikia Jums prižiūrėti.
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
          <div className="bg-[#121824] rounded-3xl p-8 md:p-10 border border-white/10 flex flex-col justify-between shadow-lg">
            <div>
              <div className="flex justify-between items-center mb-6">
                <span className="inline-flex items-center gap-1.5 bg-emerald-growth/10 border border-emerald-growth/20 text-emerald-growth text-[9px] uppercase tracking-wider font-bold rounded-full px-3 py-1">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                  VISKAS ĮSKAIČIUOTA
                </span>
              </div>

              <h3 className="font-display text-2xl font-bold text-white mb-2">Pilna sistema</h3>
              <p className="text-white/50 text-xs mb-8">
                Mėnesinis paketas, kuris padengia visą komunikacijos kanalą — be papildomų sąskaitų.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div>
                  <span className="text-[10px] text-white/40 uppercase font-bold tracking-wider block mb-1">KAINA</span>
                  <p className="font-display text-3xl font-bold text-white">
                    350€ <span className="text-xs text-white/40 font-normal">/ mėn.</span>
                  </p>
                </div>
                <div>
                  <span className="text-[10px] text-white/40 uppercase font-bold tracking-wider block mb-1">VIDUTINIS REZULTATAS</span>
                  <p className="font-display text-3xl font-bold text-emerald-growth">
                    +20% <span className="text-xs text-emerald-growth/70 font-normal">pajamų</span>
                  </p>
                </div>
              </div>

              <div className="border-t border-white/5 pt-6 mb-8">
                <span className="text-[10px] text-white/40 uppercase font-bold tracking-wider block mb-4">KĄ GAUSITE</span>
                <ul className="space-y-3">
                  {[
                    "Pilnai automatizuota SMS ir WhatsApp sistema",
                    "4-6 tikslinės žinučių kampanijos per mėnesį",
                    "A/B testai, profesionalūs tekstai ir pilna priežiūra",
                    "Be jokių integracijos mokesčių ar staigmenų",
                    "Mėnesinė ataskaita su rezultatais ir įžvalgomis",
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-xs text-white/80">
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
                className="w-full bg-white text-deep-navy font-bold py-4 px-6 rounded-full flex items-center justify-between hover:bg-white/95 transition-all text-sm group"
              >
                <span>Gauti nemokamą auditą</span>
                <div className="w-7 h-7 rounded-full bg-[#8CB4BE] text-white flex items-center justify-center group-hover:translate-x-1 transition-transform">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </a>
              <p className="text-center text-[10px] text-white/30 mt-4">
                50+ Lietuvos verslų jau pasitiki smsflow.lt
              </p>
            </div>

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
              DUK
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-deep-navy mb-4">
              Dažniausiai užduodami klausimai
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
                    openFaqIdx === idx ? "max-h-[300px] border-t border-border-subtle" : "max-h-0"
                  }`}
                >
                  <p className="p-6 text-sm text-on-surface-variant leading-relaxed bg-white">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quiz / Audit Section */}
      <section id="audit" className="relative py-20 md:py-28 bg-deep-navy text-white border-t border-white/10 overflow-hidden">
        {/* Animated Background Blobs */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-growth/10 rounded-full blur-[140px] animate-float-slow pointer-events-none z-0"></div>

        <div className="max-w-[700px] mx-auto px-margin-mobile relative z-10">
          <div className="text-center mb-10">
            <span className="text-emerald-growth font-bold text-xs uppercase tracking-widest block mb-2">
              NEMOKAMAS AUGIMO AUDITAS
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 relative z-10">
              Sužinokite savo bazės potencialą
            </h2>
            <p className="text-sm text-white/60 relative z-10">
              Atsakykite į 4 klausimus ir sužinokite, ar jūsų duomenų bazė gali sugeneruoti papildomus €3 000+ per mėnesį.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-md relative z-10">
            {quizStep === "intro" && (
              <div className="text-center py-6">
                <p className="text-white/80 mb-6">
                  Pasiruošę įvertinti savo klientų bazės galimybes? Auditas užtruks vos 60 sekundžių.
                </p>
                <button
                  onClick={handleStartQuiz}
                  className="bg-emerald-growth text-deep-navy font-bold px-8 py-4 rounded-full hover:scale-95 transition-transform"
                >
                  Pradėti auditą
                </button>
              </div>
            )}

            {quizStep === "questions" && (
              <div>
                <div className="flex justify-between items-center mb-6 text-xs text-white/50">
                  <span>Klausimas {currentQuestionIdx + 1} iš {questions.length}</span>
                  <span>{Math.round(((currentQuestionIdx + 1) / questions.length) * 100)}% Atlikta</span>
                </div>
                <h3 className="text-xl font-bold mb-2">
                  {questions[currentQuestionIdx].title}
                </h3>
                <p className="text-sm text-white/60 mb-6">
                  {questions[currentQuestionIdx].subtitle}
                </p>
                <div className="space-y-3">
                  {questions[currentQuestionIdx].options.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleOptionSelect(option)}
                      className="w-full text-left p-4 rounded-xl bg-white/5 border border-white/10 hover:border-emerald-growth/50 hover:bg-white/10 transition-all text-sm font-semibold"
                    >
                      {option}
                    </button>
                  ))}
                </div>
                <div className="flex justify-between items-center mt-6">
                  <button
                    onClick={handlePrevQuestion}
                    className="text-xs text-white/50 hover:text-white transition-colors flex items-center gap-1"
                  >
                    ← Atgal
                  </button>
                </div>
              </div>
            )}

            {quizStep === "disqualified" && (
              <div className="text-center py-6">
                <div className="text-red-400 mb-4">
                  <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Apyvarta per maža</h3>
                <p className="text-sm text-white/65 leading-relaxed mb-6">
                  Mūsų paslaugos efektyviausiai atsiperka paslaugų verslams, generuojantiems virš €5 000 mėnesinės apyvartos. Esant mažesnei apyvartai, €350/mėn. administravimo kaina gali neduoti teigiamo ROI.
                </p>
                <button
                  onClick={() => setQuizStep("intro")}
                  className="text-emerald-growth text-sm font-bold hover:underline"
                >
                  Pradėti iš naujo
                </button>
              </div>
            )}

            {quizStep === "form" && (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-xl font-bold mb-4">Įveskite savo kontaktus nemokamam auditui gauti</h3>
                
                <div>
                  <label className="block text-xs font-semibold text-white/70 mb-1.5">Jūsų vardas</label>
                  <input
                    type="text"
                    name="name"
                    value={contactInfo.name}
                    onChange={handleInputChange}
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm focus:border-emerald-growth focus:ring-1 focus:ring-emerald-growth outline-none"
                    placeholder="Vardas Pavardė"
                  />
                  {errors.name && <span className="text-red-400 text-xs mt-1 block">{errors.name}</span>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white/70 mb-1.5">Svetainės adresas (arba įmonės pavadinimas)</label>
                  <input
                    type="text"
                    name="website"
                    value={contactInfo.website}
                    onChange={handleInputChange}
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm focus:border-emerald-growth focus:ring-1 focus:ring-emerald-growth outline-none"
                    placeholder="manosvetaine.lt"
                  />
                  {errors.website && <span className="text-red-400 text-xs mt-1 block">{errors.website}</span>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white/70 mb-1.5">Darbinis el. paštas</label>
                  <input
                    type="email"
                    name="email"
                    value={contactInfo.email}
                    onChange={handleInputChange}
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm focus:border-emerald-growth focus:ring-1 focus:ring-emerald-growth outline-none"
                    placeholder="vardas@imone.lt"
                  />
                  {errors.email && <span className="text-red-400 text-xs mt-1 block">{errors.email}</span>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white/70 mb-1.5">Telefono numeris</label>
                  <input
                    type="tel"
                    name="phone"
                    value={contactInfo.phone}
                    onChange={handleInputChange}
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm focus:border-emerald-growth focus:ring-1 focus:ring-emerald-growth outline-none"
                    placeholder="+370 600 00000"
                  />
                  {errors.phone && <span className="text-red-400 text-xs mt-1 block">{errors.phone}</span>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-emerald-growth text-deep-navy font-bold py-4 rounded-full hover:scale-95 transition-all text-sm mt-4 disabled:opacity-50"
                >
                  {isSubmitting ? "Siunčiama..." : "Gauti nemokamą audito sesiją"}
                </button>
                {errors.submit && <span className="text-red-400 text-xs mt-2 text-center block">{errors.submit}</span>}
              </form>
            )}

            {quizStep === "success" && (
              <div className="text-center py-6">
                <div className="text-emerald-growth mb-4">
                  <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-2">Užklausą sėkmingai gavome!</h3>
                <p className="text-sm text-white/60 mb-6 leading-relaxed">
                  Ačiū, {contactInfo.name}. Pradėjome analizuoti svetainės `{contactInfo.website}` klientų išlaikymo potencialą. Per 24 valandas susisieksime su jumis el. paštu `{contactInfo.email}` suderinti nemokamo skambučio laiko.
                </p>
                <button
                  onClick={() => setQuizStep("intro")}
                  className="text-emerald-growth text-sm font-bold hover:underline"
                >
                  Pateikti kitą užklausą
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-surface-container-lowest border-t border-border-subtle w-full py-12 relative z-10">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop flex flex-col md:flex-row justify-between items-center md:items-start gap-8">
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="flex items-center gap-2">
              <svg className="w-6 h-6 text-deep-navy" viewBox="0 0 100 100" fill="none">
                <path d="M15 15 h70 a10 10 0 0 1 10 10 v45 a10 10 0 0 1 -10 10 h-45 l-15 15 v-15 h-10 a10 10 0 0 1 -10 -10 v-45 a10 10 0 0 1 10 -10 z" 
                      stroke="currentColor" strokeWidth="8" strokeLinejoin="round" strokeLinecap="round"/>
                <text x="50" y="52" fontFamily="sans-serif" fontWeight="900" fontSize="28" fill="currentColor" textAnchor="middle" dominantBaseline="middle">
                  SMS
                </text>
              </svg>
              <span className="text-lg font-display font-bold text-deep-navy tracking-tight">
                SMSflow
              </span>
            </div>
            
            <div className="flex flex-col items-center md:items-start gap-2 text-xs text-on-surface-variant font-medium">
              <a href="mailto:info@smsflow.lt" className="hover:text-emerald-growth transition-colors flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-on-surface-variant/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                info@smsflow.lt
              </a>
              <a href="tel:+37067911191" className="hover:text-emerald-growth transition-colors flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-on-surface-variant/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                +370 679 11191
              </a>
            </div>
          </div>

          <div className="text-xs text-on-surface-variant opacity-60 md:self-end">
            © 2026 SMSflow. Visos teisės saugomos.
          </div>
        </div>
      </footer>
    </div>
  );
}
