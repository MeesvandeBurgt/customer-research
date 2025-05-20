export const companyDataStore = {
  claireundgeorge: {
    companyName: "Claire & George",
    companyInfo: `About Us
Our vision: Inclusive and Accessible Holidays for All – regardless of an individual's needs or age. 

Claire & George is a Swiss non-profit foundation based Bern. Since its establishment in 2013, Claire & George has been committed to enable holidays to be inclusive and accessible for all – regardless of an individual's needs or age. 

It is often forgotten how difficult it can be to go on holidays as a single person, with family or with friends, due to an illness, an accident, life-changing medical/health condition, or age. 

The Foundation serves as a centre of excellence for 'barrier-free' holidays and as mediator between clients, the hospitality industry and providers of care and support services. 

Since 2018, the Foundation has also been serving as one of the official hotel certification agency for accessibility.

Claire & George collaborates with hotels, tourism partners and local service providers in arranging required accommodations and services such as care, accompanied walks, transport, shower chairs or lifters. Starting in 2019 we have also been offering accompanied day trips and private tours from which not only the affected but also their family or travel companions can benefit. We all need relief not only from work, but also from everyday life. A change of scenery does wonders for mental and physical health.`,
    researchChallenge: `C&G is a swiss travel agency for people with disabilities. They have a website where they list a bunch of swiss hotels with information regarding accessibility, but also offer guided tours. However, while there is some income from that, the foundation gets most money from doing projects that are funded by other NGO's or innovation funds. This means that they live off of innovation projects around accessible tourism.

However, they do very little user research. Most of the project are based in workshops with experts form NGO's and such. They are thus also very unfamiliar with actual user research and integration into the innovation process. They are also currently looking for AI based innovation projects.

Our challenge here is C&G's unfamiliarity with proper user research, and thus skepticism towards is usefulness or unclarity about when to use it.
However, the opportunity lies in the fact that this research could lay the basis for highly relevant innovation projects to further sustain the NGO. The goal of our tool is thus to help C&G identify innovation opportunities that will attract funding.`,
    potentialRQs: [
      'How does the booking journey of a client look like?',
      'What are the travel needs for people with mental disabilities and how can they be met?',
      'How do people with disabilities relate to sustainable travel?',
      'What are gaps in knowledge in our service offering. Which assumptions are not tested?',
      'Which features of accessible tours are most highly appreciated by our customers?',
      'How should accessible tours be framed for people with disabilities?'
    ],
    projects: [
      {
        id: 'cg_project_1',
        title: 'Understanding the Client Booking Journey',
        date: '2024-03-15', // Example date
        description: 'Investigating the current booking process for Claire & George clients to identify pain points, needs, and opportunities for AI-driven innovation.',
        // Pre-filled data for the briefing page for this specific project
        briefingState: {
          companyInfo: `About Us
Our vision: Inclusive and Accessible Holidays for All – regardless of an individual's needs or age. 

Claire & George is a Swiss non-profit foundation based Bern. Since its establishment in 2013, Claire & George has been committed to enable holidays to be inclusive and accessible for all – regardless of an individual's needs or age. 

It is often forgotten how difficult it can be to go on holidays as a single person, with family or with friends, due to an illness, an accident, life-changing medical/health condition, or age. 

The Foundation serves as a centre of excellence for 'barrier-free' holidays and as mediator between clients, the hospitality industry and providers of care and support services. 

Since 2018, the Foundation has also been serving as one of the official hotel certification agency for accessibility.

Claire & George collaborates with hotels, tourism partners and local service providers in arranging required accommodations and services such as care, accompanied walks, transport, shower chairs or lifters. Starting in 2019 we have also been offering accompanied day trips and private tours from which not only the affected but also their family or travel companions can benefit. We all need relief not only from work, but also from everyday life. A change of scenery does wonders for mental and physical health.`,
          learningObjectives: 'How does the booking journey of a client look like?',
          participants: 12, // Example
          showProposal: true // Pre-generate proposal for this project
        }
      }
    ]
  },
  // Future companies can be added here
  rugennek: {
    companyName: "Centrum Rug & Nek",
    companyInfo: `Het bedrijf richt zich op het behandelen van rug- en nekklachten, sportblessures en biedt daarnaast aanvullende behandelmethodes aan zoals hyperbare zuurstoftherapie, shockwave-therapie en echografie. De organisatie hecht veel waarde aan de totale klantbeleving: de customer journey vormt een centraal uitgangspunt binnen de dienstverlening. Klantvriendelijkheid en een positieve ervaring voor de patiënt staan dan ook op de eerste plaats.\nHet centrum is een middelgroot bedrijf met circa 60 medewerkers, verdeeld over 8 vestigingen in de provincies Limburg en Noord-Brabant. Door de schaalgrootte en beperkte interne onderzoekscapaciteit is het voor de organisatie uitdagend om zelfstandig kwalitatief onderzoek te doen naar de klantreis en -beleving tijdens het behandeltraject. In de praktijk wordt er daarom vaak teruggevallen op eigen ervaringen, informele feedback van klanten of het inschakelen van een extern bureau. Dit maakt het verkrijgen van betrouwbare, gerichte en betaalbare inzichten lastig.\nJuist daarom zou het zeer waardevol zijn om op een efficiënte en toegankelijke manier kwalitatieve inzichten te verzamelen over de klantbeleving. Idealiter zou dit per klantensegment en per vestiging in kaart worden gebracht, zodat er een helder overzicht ontstaat van terugkerende ervaringen, positieve contactmomenten en concrete verbeterpunten. Dergelijke inzichten kunnen direct bijdragen aan het optimaliseren van de klantreis en het versterken van de kwaliteit van zorg en service binnen het centrum.`,
    researchChallenge: `The primary challenge for Centrum Rug & Nek is to gain deep, qualitative insights into the client experience across their treatment journey and various locations. Due to limited internal research capacity, the center currently relies on informal feedback, making it difficult to obtain reliable, structured, and affordable insights. The goal is to efficiently collect and analyze client experiences to identify recurring themes, positive touchpoints, and concrete areas for improvement, ultimately enhancing the quality of care, service, and the overall customer journey, potentially segmented by client type and location.`,
    potentialRQs: [
      'Hoe ervaren klanten het traject van intake tot nazorg binnen de verschillende vestigingen?',
      'Welke momenten in de klantreis worden als het meest positief en het meest negatief ervaren?',
      'Hoe goed sluit de geboden behandeling aan op de verwachtingen van de klant?',
      'In hoeverre voelen klanten zich gehoord, begrepen en betrokken bij hun behandelplan?',
      'Welke elementen dragen het meest bij aan een positieve klantbeleving (bijv. communicatie, wachttijd, sfeer)?',
      'Wat zijn de grootste frustraties of drempels die klanten ervaren tijdens hun behandelingstraject?',
      'Hoe verschilt de klantbeleving tussen vestigingen of klantensegmenten (bijv. sporters, chronische patiënten, nieuwe klanten)?',
      'Hoe ervaren klanten het contact met het personeel aan de balie en met de behandelend specialisten?'
    ],
    projects: [
      {
        id: 'rn_project_1',
        title: 'Klantbeleving Behandeltraject',
        date: '2024-05-21', // Example date
        description: 'Een onderzoek naar de totale klantbeleving, van intake tot nazorg, om pijnpunten en verbeterkansen te identificeren binnen Centrum Rug & Nek.',
        briefingState: {
          companyInfo: `Het bedrijf richt zich op het behandelen van rug- en nekklachten, sportblessures en biedt daarnaast aanvullende behandelmethodes aan zoals hyperbare zuurstoftherapie, shockwave-therapie en echografie. De organisatie hecht veel waarde aan de totale klantbeleving: de customer journey vormt een centraal uitgangspunt binnen de dienstverlening. Klantvriendelijkheid en een positieve ervaring voor de patiënt staan dan ook op de eerste plaats.`,
          learningObjectives: 'Hoe ervaren klanten het traject van intake tot nazorg binnen de verschillende vestigingen?',
          participants: 10, // Example
          showProposal: true 
        }
      }
    ]
  }
}; 