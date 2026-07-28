/* Illinois AI Guidance Companion — content model.
   Every title and page range below is transcribed from the ISBE
   "Artificial Intelligence Guidance" (June 2026, 408 pp.) and from the
   role-based reading paths spec. This file is NAVIGATIONAL data only —
   it contains no summaries or interpretations of the guidance itself. */
window.IL_DATA = {

  meta: {
    siteTitle: "Illinois AI Guidance Companion",
    edition: "June 2026",
    pageCount: 408,
    pdfFile: "AIGuidance.pdf",
    officialLanding: "https://www.isbe.net/AIGuidance",
    officialFaq: "https://www.isbe.net/Pages/AI-Guidance-FAQ.aspx",
    source: "Illinois State Board of Education, Artificial Intelligence Guidance, June 2026",
    stats: [
      { figure: "408", label: "pages of official guidance" },
      { figure: "8", label: "role-based reading paths" },
      { figure: "4", label: "stages: start → reference" },
      { figure: "50", label: "Quick Start FAQ questions" }
    ],
    tenets: [
      "Teaching and learning are shaped by human relationships and by the experiences, interests, and assets each child brings into school",
      "Schools serve academic, developmental, and civic purposes concurrently",
      "Artificial intelligence is a means to inform teaching and learning rather than an end in itself",
      "Informed use requires deliberate, context-sensitive, and locally determined purpose and use"
    ],
    orientation: [
      { label: "Quick Start FAQ introduction", pages: "4" },
      { label: "Welcome Letter", pages: "25–26" },
      { label: "Start Here: How to Use This Guidance", pages: "27–30" }
    ],
    resourceNote: "ISBE notes (p. 243) that resources and tools listed in the guidance are neither endorsed nor required. That note travels with every resource reference on this site."
  },

  stages: [
    { id: "start", name: "Start Here", blurb: "The common orientation plus this role's featured Quick Start FAQ questions." },
    { id: "first", name: "First Pass", blurb: "A short, ordered sequence of official section summaries and high-priority sections." },
    { id: "deep", name: "Deep Dive", blurb: "The complete set of role-relevant sections, in a suggested order." },
    { id: "shelf", name: "Reference Shelf", blurb: "ISBE appendices, templates, matrices, cases, and resource tables for this role." },
    { id: "send", name: "Send Along", blurb: "Ready-made handoffs: open a colleague's path with the sections they need." }
  ],

  /* ---------- Master source map: main guidance ---------- */
  sections: [
    { key: "quick-start-faq",      title: "Quick Start FAQ", pages: "4–21" },
    { key: "welcome-letter",       title: "Welcome Letter", pages: "25–26" },
    { key: "how-to-use",           title: "Start Here: How to Use This Guidance", pages: "27–30" },
    { key: "illinois-context",     title: "The Emergence of AI and Illinois Context", pages: "31–37" },
    { key: "core-concepts",        title: "Core AI Concepts for Schools", pages: "38–67" },
    { key: "teaching-learning",    title: "AI for Teaching and Learning", pages: "68–102" },
    { key: "policy-readiness",     title: "AI for Policy I — Building Readiness, Shared Understanding, and Innovation", pages: "103–166" },
    { key: "policy-governance",    title: "AI for Policy II — District Policy, Governance, and Accountability", pages: "167–179" },
    { key: "literacy-citizenship", title: "AI Literacy and Digital Citizenship: Healthy Development and Informed Use of AI", pages: "180–229" },
    { key: "equity-accessibility", title: "Equity, Accessibility, and Student Groups", pages: "230–242" },
    { key: "resources-tools",      title: "AI Resources, Tools, and Decision Supports", pages: "243–252", note: "resources" },
    { key: "final-considerations", title: "Final Considerations and Next Steps", pages: "253–254" }
  ],

  /* ---------- High-value subsection anchors ---------- */
  subsections: [
    { key: "taxonomy-planning",  title: "Taxonomy as a Lens for Instructional Planning and grade-band planning examples", pages: "70–79", parent: "teaching-learning" },
    { key: "prompt-development", title: "Developing Prompts Using AI for Instructional Planning", pages: "80–89", parent: "teaching-learning" },
    { key: "grade-band-prompts", title: "Using AI for Instructional Planning — Prompt Examples by Grade Bands", pages: "90–99", parent: "teaching-learning" },
    { key: "students-at-center", title: "Using AI for Instructional Planning — Keeping Students at the Center", pages: "100–102", parent: "teaching-learning" },
    { key: "collaboration-adoption", title: "Practices That Support Collaboration in AI Adoption", pages: "104–107", parent: "policy-readiness" },
    { key: "determining-need",   title: "Determining Instructional and Operational Need for AI Use", pages: "108–119", parent: "policy-readiness" },
    { key: "perceptions-beliefs", title: "Collecting Perceptions and Beliefs — Item Development", pages: "120–121", parent: "policy-readiness" },
    { key: "stakeholder-cases",  title: "Stakeholder Engagement, Communication, and Readiness Cases", pages: "122–138", parent: "policy-readiness" },
    { key: "application-selection", title: "District and Teacher Selection of AI Applications", pages: "139–143", parent: "policy-readiness" },
    { key: "application-review", title: "AI Application Review for Instruction and Operations and Goodness-of-Fit Example", pages: "144–158", parent: "policy-readiness" },
    { key: "innovation-zones",   title: "Innovation Zones", pages: "159–166", parent: "policy-readiness" },
    { key: "policy-components",  title: "Components of Strong Policies: District-wide, Authorized Use Policy, and Informed Use Policy", pages: "169–176", parent: "policy-governance" },
    { key: "policy-templates",   title: "Model Templates and Drafting Resources — District AI Policy, AUP, and IUP", pages: "177–179", parent: "policy-governance" },
    { key: "ecological-framework", title: "Development as an Individual and Citizen — An Ecological Framework", pages: "181–182", parent: "literacy-citizenship" },
    { key: "grade-band-cases",   title: "Development as a Student and Citizen — Cases by Grade Band", pages: "183–199", parent: "literacy-citizenship" },
    { key: "student-application-selection", title: "Selection of AI Applications", pages: "200–201", parent: "literacy-citizenship" },
    { key: "grade-band-curricula", title: "Digital Citizenship and AI Literacy Curricula by Grade Band", pages: "202–216", parent: "literacy-citizenship" },
    { key: "competencies",       title: "The Integration of Development of Self and Citizen and AI Competencies", pages: "217–229", parent: "literacy-citizenship" },
    { key: "special-populations", title: "Resources — Informed Use of AI with Special Populations", pages: "239–242", parent: "equity-accessibility", note: "resources" }
  ],

  /* ---------- Appendices ---------- */
  appendices: [
    { key: "acronym-glossary",        title: "Appendix: Acronym Glossary", pages: "255–258" },
    { key: "key-concepts-appendix",   title: "Appendix: Key AI Concepts for Teaching, Learning, and Governance", pages: "259–266" },
    { key: "grade-band-uses",         title: "Appendix: AI Uses by Grade Band (PK–12)", pages: "267–279" },
    { key: "grade-band-unit-plans",   title: "Unit Plans by Grade Band: Without AI and With AI", pages: "280–288" },
    { key: "implementation-checklist", title: "Appendix: Implementation Checklist", pages: "289–291" },
    { key: "question-survey-resources", title: "Appendix: Question and Survey Development Resources", pages: "292–293", note: "resources" },
    { key: "tool-review-resources",   title: "Appendix: Tool Review and Goodness-of-Fit Resources", pages: "294–298", note: "resources" },
    { key: "misalignment-examples",   title: "Appendix: Misalignment Scenarios and Prompt Quality Examples", pages: "299–302" },
    { key: "rubric-examples",         title: "Appendix: Example Rubric Scores and Rationale", pages: "303–304" },
    { key: "readiness-resources",     title: "Appendix: Readiness Resources", pages: "305", note: "resources" },
    { key: "student-ai-challenges",   title: "Appendix: Student AI Challenges", pages: "306–307" },
    { key: "vendor-relationships",    title: "Appendix: School District Vendor Relationships", pages: "308–309" },
    { key: "internet-safety",         title: "Appendix: Internet Safety Curriculum", pages: "310–311" },
    { key: "privacy-laws",            title: "Appendix: Federal and Illinois Privacy and Data Security Laws", pages: "312–320" },
    { key: "district-policy-next-steps", title: "Appendix: District Next Steps for AI Policy, AUP, and IUP", pages: "321–326" },
    { key: "sel-alignment",           title: "Appendix: Social and Emotional Learning Standards Alignment for the 16 Cases", pages: "327–328" },
    { key: "student-selfhood",        title: "Appendix: Student Selfhood, Engagement, and Agency in AI-Mediated Schoolwork", pages: "329–330" },
    { key: "content-alignment",       title: "Appendix: Digital Citizenship and AI Literacy Alignment by Content Area", pages: "331–338" },
    { key: "content-area-literacy",   title: "Appendix: Digital Citizenship and AI Literacy in Specific Content Areas", pages: "339–350" },
    { key: "expanded-cases",          title: "Appendix: 16 Cases with Social and Emotional Learning, Content, and Special Population Strategies", pages: "351–398" }
  ],

  /* ---------- Stable cross-role handoff bundles ---------- */
  bundles: [
    { slug: "district-executive-first-pass", label: "District executive first pass", pages: "25–30, 103–107, 167–179, 253–254", role: "district-executive" },
    { slug: "technology-governance-review",  label: "Technology and governance review", pages: "38–67, 139–158, 169–179, 294–326", role: "technology-operations" },
    { slug: "instructional-leadership-first-pass", label: "Instructional leadership first pass", pages: "68–102, 180–229", role: "curriculum-instruction" },
    { slug: "building-readiness",            label: "Building readiness", pages: "103–138, 167–179, 289–305", role: "building-leader" },
    { slug: "family-community-engagement",   label: "Family and community engagement", pages: "114–138, 180–203, 230–242", role: "family-caregiver" },
    { slug: "board-governance",              label: "Board and governance", pages: "167–179, 312–326", role: "board-governance" },
    { slug: "student-literacy",              label: "Student AI literacy and digital citizenship", pages: "180–226 + grade-band pages", role: "student" },
    { slug: "special-populations",           label: "Equity, accessibility, and special populations", pages: "230–242, 327–398", role: "student-support" }
  ],

  /* ---------- Teacher / student grade-band bundles ---------- */
  gradeBands: [
    { id: "pk2",  label: "PreK–2",      planning: "72–73", prompt: "91", cases: "184–187", studentCases: "186–187", curriculum: "209–210", uses: "267–270", unit: "280–282", expanded: "351–362", studentExpanded: "357–362" },
    { id: "g35",  label: "Grades 3–5",  planning: "74–75", prompt: "92", cases: "188–191", studentCases: "190–191", curriculum: "211–212", uses: "271–273", unit: "283–284", expanded: "363–374", studentExpanded: "369–374" },
    { id: "g68",  label: "Grades 6–8",  planning: "76–77", prompt: "93", cases: "192–195", studentCases: "194–195", curriculum: "213–214", uses: "274–276", unit: "285–286", expanded: "375–386", studentExpanded: "381–386" },
    { id: "g912", label: "Grades 9–12", planning: "78–79", prompt: "94", cases: "196–199", studentCases: "198–199", curriculum: "215–216", uses: "277–279", unit: "287–288", expanded: "387–398", studentExpanded: "393–398" }
  ],

  /* ---------- Roles & reading paths ---------- */
  roles: [
    {
      id: "district-executive",
      name: "District / System Executive",
      short: "Executive",
      icon: "compass",
      includes: "Superintendent, cabinet, senior system leadership",
      faq: [
        { q: "Q33", pages: "16", title: "What should precede district introduction or adoption?" },
        { q: "Q36", pages: "17", title: "How are decision-making roles and accountability addressed?" },
        { q: "Q37", pages: "17", title: "Which decisions call for superintendent or board approval?" },
        { q: "Q41", pages: "18–19", title: "How are high-impact uses treated?" },
        { q: "Q50", pages: "21", title: "How are pilot success and scale/pause/stop/renew decisions defined?" }
      ],
      firstPass: [
        { label: "Common Orientation", pages: "4, 25–30" },
        { label: "AI for Policy I summary", pages: "103" },
        { label: "Practices That Support Collaboration in AI Adoption", pages: "104–107" },
        { label: "AI for Policy II summary", pages: "167–168" },
        { label: "Components of Strong Policies", pages: "169–176" },
        { label: "Final Considerations and Next Steps", pages: "253–254" }
      ],
      deepDive: [
        { label: "Determining Instructional and Operational Need", pages: "108–119" },
        { label: "Collecting Perceptions and Beliefs + stakeholder cases", pages: "120–138" },
        { label: "Application selection, review, and goodness of fit", pages: "139–158" },
        { label: "Innovation Zones", pages: "159–166" },
        { label: "Model Templates and Drafting Resources", pages: "177–179" },
        { label: "AI Resources, Tools, and Decision Supports", pages: "243–252", note: "resources" }
      ],
      shelf: [
        { label: "Implementation Checklist", pages: "289–291" },
        { label: "Question and Survey Development Resources", pages: "292–293", note: "resources" },
        { label: "Tool Review and Goodness-of-Fit Resources", pages: "294–298", note: "resources" },
        { label: "Example Rubric Scores and Rationale", pages: "303–304" },
        { label: "Readiness Resources", pages: "305", note: "resources" },
        { label: "Federal and Illinois Privacy and Data Security Laws", pages: "312–320" },
        { label: "District Next Steps for AI Policy, AUP, and IUP", pages: "321–326" }
      ],
      sendAlong: [
        { to: "Technology / operations leadership", role: "technology-operations", label: "Core concepts, application review, policy components, vendor/privacy appendices", pages: "38–67, 139–158, 169–179, 294–326" },
        { to: "Curriculum / academic leadership", role: "curriculum-instruction", label: "Teaching and learning + AI literacy/digital citizenship", pages: "68–102, 180–229" },
        { to: "Building leaders", role: "building-leader", label: "Stakeholder/readiness cases, policy responsibilities, implementation resources", pages: "122–138, 167–179, 289–305" },
        { to: "Board / governance", role: "board-governance", label: "Policy II and legal/policy appendices", pages: "167–179, 312–326" },
        { to: "Families / community", role: "family-caregiver", label: "Stakeholder cases, student development, and equity/accessibility", pages: "122–138, 180–203, 230–242" }
      ]
    },

    {
      id: "technology-operations",
      name: "Technology, Data & Operations",
      short: "Technology",
      icon: "shield",
      includes: "CTO/CIO, technology director, data/privacy/security, procurement, operational systems",
      faq: [
        { q: "Q31", pages: "15", title: "How does the guidance address data security?" },
        { q: "Q40", pages: "18", title: "How does the guidance describe risk tiering?" },
        { q: "Q43", pages: "19", title: "How are procurement, vendor review, and vendor data use addressed?" },
        { q: "Q44", pages: "19", title: "How is embedded AI in SIS, LMS, or assessment systems governed?" },
        { q: "Q45", pages: "20", title: "How is data governance addressed?" },
        { q: "Q46", pages: "20", title: "How is incident response addressed?" },
        { q: "Q48", pages: "21", title: "What security controls are highlighted?" },
        { q: "Q50", pages: "21", title: "How are pilot success and lifecycle decisions defined?" }
      ],
      firstPass: [
        { label: "Common Orientation", pages: "4, 25–30" },
        { label: "Core AI Concepts for Schools summary and introduction", pages: "38–40" },
        { label: "District and Teacher Selection of AI Applications", pages: "139–143" },
        { label: "AI Application Review and Goodness-of-Fit Example", pages: "144–158" },
        { label: "AI for Policy II summary and policy components", pages: "167–176" },
        { label: "AI Resources, Tools, and Decision Supports", pages: "243–252", note: "resources" }
      ],
      deepDive: [
        { label: "AI Concepts", pages: "40–67" },
        { label: "Determining Instructional and Operational Need", pages: "108–119" },
        { label: "Application selection and review", pages: "139–158" },
        { label: "Innovation Zones", pages: "159–166" },
        { label: "Policy components and templates", pages: "169–179" }
      ],
      shelf: [
        { label: "Key AI Concepts for Teaching, Learning, and Governance", pages: "259–266" },
        { label: "Implementation Checklist", pages: "289–291" },
        { label: "Tool Review and Goodness-of-Fit Resources", pages: "294–298", note: "resources" },
        { label: "Example Rubric Scores and Rationale", pages: "303–304" },
        { label: "Readiness Resources", pages: "305", note: "resources" },
        { label: "School District Vendor Relationships", pages: "308–309" },
        { label: "Internet Safety Curriculum", pages: "310–311" },
        { label: "Federal and Illinois Privacy and Data Security Laws", pages: "312–320" },
        { label: "District Next Steps for AI Policy, AUP, and IUP", pages: "321–326" }
      ],
      sendAlong: [
        { to: "Superintendent / cabinet", role: "district-executive", label: "Policy summaries, application review, policy components", pages: "103, 139–158, 167–179" },
        { to: "Curriculum / assessment", role: "curriculum-instruction", label: "Teaching and learning, application selection, literacy and citizenship", pages: "68–102, 139–143, 180–229" },
        { to: "Building leaders", role: "building-leader", label: "Stakeholder cases, application review, implementation checklist", pages: "122–158, 289–291" },
        { to: "Board / legal / governance", role: "board-governance", label: "Policy components, vendor relationships, privacy laws, next steps", pages: "169–179, 308–326" }
      ]
    },

    {
      id: "curriculum-instruction",
      name: "Curriculum, Instruction & Assessment",
      short: "Curriculum",
      icon: "layers",
      includes: "Academic leadership, curriculum, assessment, instructional technology, professional learning",
      faq: [
        { q: "Q2–Q3", pages: "5–6", title: "Prompt development and instructional planning/delivery" },
        { q: "Q6", pages: "6–7", title: "Differentiating student AI use by age or grade level" },
        { q: "Q12", pages: "8", title: "Teacher use for planning, feedback, and communications" },
        { q: "Q16", pages: "10", title: "AI literacy and digital citizenship resources for students" },
        { q: "Q29–Q30", pages: "14–15", title: "Professional learning, student agency, and adult oversight" },
        { q: "Q49", pages: "21", title: "Academic integrity, assessment boundaries, attribution, and intellectual property" }
      ],
      firstPass: [
        { label: "Common Orientation", pages: "4, 25–30" },
        { label: "AI for Teaching and Learning summary and framing", pages: "68–70" },
        { label: "Developing Prompts Using AI for Instructional Planning introduction", pages: "80–82" },
        { label: "Keeping Students at the Center", pages: "100–102" },
        { label: "AI Literacy and Digital Citizenship summary and ecological framework", pages: "180–182" },
        { label: "Introduction to the grade-band cases", pages: "183" },
        { label: "Integration of Development of Self and Citizen and AI Competencies introduction", pages: "217–219" }
      ],
      deepDive: [
        { label: "Taxonomy and grade-band planning examples", pages: "70–79" },
        { label: "Prompt development and examples", pages: "80–99" },
        { label: "Grade-band cases, application selection, and curricula", pages: "183–216" },
        { label: "AI competencies and supporting research/resources", pages: "217–229" },
        { label: "Equity, Accessibility, and Student Groups", pages: "230–242" }
      ],
      shelf: [
        { label: "AI Uses by Grade Band", pages: "267–279" },
        { label: "Unit Plans by Grade Band", pages: "280–288" },
        { label: "Misalignment Scenarios and Prompt Quality Examples", pages: "299–302" },
        { label: "SEL alignment", pages: "327–328" },
        { label: "Student selfhood, engagement, and agency", pages: "329–330" },
        { label: "Digital citizenship / AI literacy by content area", pages: "331–350" },
        { label: "Expanded 16 cases", pages: "351–398" }
      ],
      sendAlong: [
        { to: "Teachers", role: "teacher", label: "The relevant grade-band bundle in the Teacher/Educator path", pages: "see Teacher path" },
        { to: "Technology leadership", role: "technology-operations", label: "Application selection/review and policy components", pages: "139–158, 169–179" },
        { to: "Principals", role: "building-leader", label: "Teaching and learning summary, student-centered planning, grade-band cases", pages: "68–70, 100–102, 180–216" },
        { to: "Student services / equity", role: "student-support", label: "Ecological framework, grade-band cases, equity/accessibility", pages: "181–201, 230–242" },
        { to: "Superintendent / cabinet", role: "district-executive", label: "Teaching and learning summary, literacy summary, competencies introduction", pages: "68, 180, 217–219" }
      ]
    },

    {
      id: "building-leader",
      name: "School / Building Leader",
      short: "Principal",
      icon: "building",
      includes: "Principal, assistant principal, dean, building leadership",
      faq: [
        { q: "Q17–Q18", pages: "10–11", title: "Stakeholder engagement, communication, transparency, and notification" },
        { q: "Q27–Q30", pages: "13–15", title: "Application selection, evaluation, professional learning, agency, and oversight" },
        { q: "Q38", pages: "17", title: "School-level implementation responsibilities" },
        { q: "Q39–Q42", pages: "18–19", title: "Accountability, risk, high-impact boundaries, and prohibited uses" },
        { q: "Q46", pages: "20", title: "Incident response" }
      ],
      firstPass: [
        { label: "Common Orientation", pages: "4, 25–30" },
        { label: "AI for Policy I summary", pages: "103" },
        { label: "Practices That Support Collaboration in AI Adoption", pages: "104–107" },
        { label: "Stakeholder Engagement, Communication, and Readiness Cases", pages: "122–138" },
        { label: "AI for Policy II summary and introduction", pages: "167–170" },
        { label: "AI Literacy and Digital Citizenship summary and ecological framework", pages: "180–182" },
        { label: "Introduction to grade-band cases", pages: "183" },
        { label: "Implementation Checklist", pages: "289–291" }
      ],
      deepDive: [
        { label: "Determining need, collecting perceptions, and stakeholder cases", pages: "108–138" },
        { label: "Application selection and review", pages: "139–158" },
        { label: "Policy components and templates", pages: "169–179" },
        { label: "Grade-band cases, application selection, and curricula", pages: "183–216" },
        { label: "Equity, Accessibility, and Student Groups", pages: "230–242" }
      ],
      shelf: [
        { label: "Question and Survey Development Resources", pages: "292–293", note: "resources" },
        { label: "Tool Review and Goodness-of-Fit Resources", pages: "294–298", note: "resources" },
        { label: "Misalignment Scenarios", pages: "299–302" },
        { label: "Readiness Resources", pages: "305", note: "resources" },
        { label: "Internet Safety Curriculum", pages: "310–311" },
        { label: "District policy next steps", pages: "321–326" }
      ],
      sendAlong: [
        { to: "Teachers", role: "teacher", label: "Teacher first pass + the relevant grade-band bundle", pages: "see Teacher path" },
        { to: "Technology / operations", role: "technology-operations", label: "Application review, policy components, implementation and privacy resources", pages: "139–179, 289–320" },
        { to: "Families", role: "family-caregiver", label: "Stakeholder cases, literacy/citizenship, equity/accessibility", pages: "122–138, 180–216, 230–242" },
        { to: "Superintendent / cabinet", role: "district-executive", label: "Policy I summary, stakeholder cases, Policy II", pages: "103, 122–138, 167–179" }
      ]
    },

    {
      id: "teacher",
      name: "Teacher / Educator",
      short: "Teacher",
      icon: "pencil",
      includes: "Classroom teacher, instructional coach, librarian/media specialist",
      hasGradeBands: true,
      faq: [
        { q: "Q2–Q6", pages: "5–7", title: "Prompting, instructional planning, student experience, verification, and grade-band differentiation" },
        { q: "Q12", pages: "8", title: "Planning, feedback, and communication" },
        { q: "Q14, Q16", pages: "9–10", title: "Student preparation, AI literacy, and digital citizenship" },
        { q: "Q26", pages: "13", title: "Minimizing hallucinations" },
        { q: "Q29–Q30", pages: "14–15", title: "Professional learning, agency, and adult oversight" },
        { q: "Q49", pages: "21", title: "Academic integrity, assessment boundaries, attribution, and intellectual property" }
      ],
      firstPass: [
        { label: "Quick Start FAQ introduction", pages: "4" },
        { label: "Start Here: How to Use This Guidance", pages: "27–30" },
        { label: "AI for Teaching and Learning summary and framing", pages: "68–70" },
        { label: "Developing Prompts introduction", pages: "80–82" },
        { label: "Keeping Students at the Center", pages: "100–102" },
        { label: "AI Literacy and Digital Citizenship summary and ecological framework", pages: "180–182" },
        { label: "Introduction to grade-band cases", pages: "183" },
        { label: "Continue into your grade-band bundle below", pages: "" }
      ],
      deepDive: [
        { label: "Complete taxonomy and prompt-development sections", pages: "70–99" },
        { label: "Relevant grade-band cases and curricula", pages: "183–216", gradeBandKey: ["cases", "curriculum"] },
        { label: "AI competencies", pages: "217–226" },
        { label: "Equity/accessibility overview and the relevant population pages", pages: "230–242" }
      ],
      shelf: [
        { label: "Misalignment Scenarios and Prompt Quality Examples", pages: "299–302" },
        { label: "Student AI Challenges", pages: "306–307" },
        { label: "Digital citizenship / AI literacy alignment by content area", pages: "331–350" },
        { label: "Expanded grade-band cases", pages: "351–398", gradeBandKey: ["expanded"] }
      ],
      sendAlong: [
        { to: "Curriculum leadership", role: "curriculum-instruction", label: "Teaching/learning section and relevant grade-band materials", pages: "68–102 + grade-band pages" },
        { to: "Principal", role: "building-leader", label: "Keeping Students at the Center, grade-band cases, implementation checklist", pages: "100–102, 183–199, 289–291" },
        { to: "Technology leadership", role: "technology-operations", label: "Application selection/review and tool-review appendix", pages: "139–158, 294–298" },
        { to: "Families", role: "family-caregiver", label: "Relevant grade-band cases and literacy/citizenship resources", pages: "183–216 (selected)" }
      ]
    },

    {
      id: "student-support",
      name: "Student Support, Equity & Accessibility",
      short: "Support",
      icon: "heart",
      includes: "Special education, multilingual education, gifted education, counseling, MTSS, SEL, accessibility",
      faq: [
        { q: "Q7–Q11", pages: "7–8", title: "Healthy development, social/emotional health, gifted learners, and special education" },
        { q: "Q13", pages: "9", title: "Counseling triage, MTSS, and attendance interventions" },
        { q: "Q15", pages: "9–10", title: "Equitable access" },
        { q: "Q19–Q22", pages: "11–12", title: "Accessibility, language access, equity/bias, misinformation, and deepfakes" },
        { q: "Q30", pages: "14–15", title: "Student agency and adult oversight" },
        { q: "Q41", pages: "18–19", title: "High-impact boundaries" },
        { q: "Q46", pages: "20", title: "Incident response" }
      ],
      firstPass: [
        { label: "Common Orientation", pages: "4, 25–30" },
        { label: "AI Literacy and Digital Citizenship summary and ecological framework", pages: "180–182" },
        { label: "Introduction and relevant grade-band cases", pages: "183–199" },
        { label: "Equity, Accessibility, and Student Groups", pages: "230–239" },
        { label: "District and Teacher Selection of AI Applications", pages: "139–143" },
        { label: "AI for Policy II summary and introduction", pages: "167–170" }
      ],
      deepDive: [
        { label: "All grade-band cases and student application selection", pages: "183–201" },
        { label: "Grade-band curricula and AI competencies", pages: "202–229" },
        { label: "Equity, accessibility, bias, and special-population resources", pages: "230–242" },
        { label: "Application review and goodness of fit", pages: "144–158" },
        { label: "Policy components", pages: "169–176" }
      ],
      populations: [
        { label: "Multilingual Learners", pages: "233" },
        { label: "Gifted and Talented", pages: "234" },
        { label: "High-Incidence Learning Disability", pages: "235" },
        { label: "Twice Exceptional", pages: "236" },
        { label: "Bias checks and suggestions", pages: "237–238" },
        { label: "Resources for special populations", pages: "239–242" }
      ],
      shelf: [
        { label: "Special-population resources in the main resource index", pages: "246–247", note: "resources" },
        { label: "Tool Review and Goodness-of-Fit Resources", pages: "294–298", note: "resources" },
        { label: "Internet Safety Curriculum", pages: "310–311" },
        { label: "Privacy and Data Security Laws", pages: "312–320" },
        { label: "SEL alignment", pages: "327–328" },
        { label: "Student selfhood, engagement, and agency", pages: "329–330" },
        { label: "Expanded cases with special-population strategies", pages: "351–398" }
      ],
      sendAlong: [
        { to: "Superintendent / cabinet", role: "district-executive", label: "Student services FAQ Q13, application review, policy summary", pages: "9, 144–158, 167–170" },
        { to: "Curriculum leadership", role: "curriculum-instruction", label: "Ecological framework, grade-band cases, equity/accessibility", pages: "181–201, 230–242" },
        { to: "Technology leadership", role: "technology-operations", label: "Application review, policy components, privacy laws", pages: "144–158, 169–176, 312–320" },
        { to: "Teachers", role: "teacher", label: "Relevant grade-band cases + the relevant special-population pages", pages: "183–199 + 230–242 (selected)" },
        { to: "Families", role: "family-caregiver", label: "Relevant grade-band cases, equity/accessibility, special-population resources", pages: "183–216, 230–242 (selected)" }
      ]
    },

    {
      id: "student",
      name: "Student",
      short: "Student",
      icon: "star",
      includes: "Student readers and student advisory groups",
      hasGradeBands: true,
      faq: [
        { q: "Q4–Q5", pages: "6", title: "Student experience and avoiding undue reliance" },
        { q: "Q8", pages: "7", title: "Social/emotional health and healthy development" },
        { q: "Q14, Q16", pages: "9–10", title: "Preparation, AI literacy, and digital citizenship" },
        { q: "Q22", pages: "12", title: "Misinformation, deepfakes, and safe media practices" },
        { q: "Q26", pages: "13", title: "Minimizing hallucinations" },
        { q: "Q30", pages: "14–15", title: "Student agency and adult oversight" },
        { q: "Q39", pages: "18", title: "Accountability for staff and student use" },
        { q: "Q42", pages: "19", title: "Prohibited uses" },
        { q: "Q49", pages: "21", title: "Academic integrity, attribution, and intellectual property" }
      ],
      firstPass: [
        { label: "Quick Start FAQ introduction", pages: "4" },
        { label: "Start Here: How to Use This Guidance", pages: "27–30" },
        { label: "Keeping Students at the Center", pages: "100–102" },
        { label: "AI Literacy and Digital Citizenship summary and ecological framework", pages: "180–182" },
        { label: "Your grade band's student-led cases", pages: "184–199", gradeBandKey: ["studentCases"] },
        { label: "AI competencies", pages: "217–226" }
      ],
      deepDive: [
        { label: "All cases in your grade band", pages: "184–199", gradeBandKey: ["cases"] },
        { label: "Grade-band curricula / resources", pages: "202–216", gradeBandKey: ["curriculum"] },
        { label: "Selection of AI Applications", pages: "200–201" },
        { label: "Relevant accountability and policy components", pages: "169–176" },
        { label: "Equity, Accessibility, and Student Groups", pages: "230–242" }
      ],
      shelf: [
        { label: "Student AI Challenges", pages: "306–307" },
        { label: "Internet Safety Curriculum", pages: "310–311" },
        { label: "Student selfhood, engagement, and agency", pages: "329–330" },
        { label: "Your grade band's expanded student-led cases", pages: "351–398", gradeBandKey: ["studentExpanded"] }
      ],
      sendAlong: [
        { to: "Teacher", role: "teacher", label: "Relevant grade-band cases and curriculum/resources", pages: "grade-band pages" },
        { to: "Principal", role: "building-leader", label: "Accountability, prohibited uses, and implementation", pages: "169–176, 289–291" },
        { to: "Family / caregiver", role: "family-caregiver", label: "Relevant grade-band cases and literacy/citizenship materials", pages: "grade-band pages" },
        { to: "Student support staff", role: "student-support", label: "Ecological framework, relevant cases, equity/accessibility", pages: "181–201, 230–242" }
      ]
    },

    {
      id: "family-community",
      name: "Family, Board & Community",
      short: "Community",
      icon: "people",
      includes: "Parent/caregiver, board member, advocate, stakeholder group, community member",
      branches: ["family-caregiver", "board-governance", "community-advocate"]
    },

    {
      id: "family-caregiver",
      name: "Family / Caregiver",
      short: "Family",
      icon: "home",
      parent: "family-community",
      includes: "Parents, guardians, and caregivers of Illinois students",
      faq: [
        { q: "Q1, Q4–Q8", pages: "5–7", title: "Assumptions, student experience, development, and reliance" },
        { q: "Q13–Q20", pages: "9–11", title: "Student services, readiness, equity, stakeholder engagement, transparency, accessibility, and language access" },
        { q: "Q30–Q31", pages: "15", title: "Student agency, adult oversight, and data security" },
        { q: "Q39, Q41–Q46", pages: "18–20", title: "Accountability, high-impact uses, prohibited uses, vendor/data governance, and incident response" },
        { q: "Q49", pages: "21", title: "Academic integrity and attribution" }
      ],
      firstPass: [
        { label: "Common Orientation", pages: "4, 25–30" },
        { label: "Stakeholder Engagement, Communication, and Readiness Cases", pages: "122–138" },
        { label: "AI Literacy and Digital Citizenship summary and ecological framework", pages: "180–182" },
        { label: "Relevant grade-band cases", pages: "184–199" },
        { label: "Equity, Accessibility, and Student Groups", pages: "230–242" }
      ],
      deepDive: [
        { label: "Policy summary and components", pages: "167–176" },
        { label: "Grade-band curricula and resources", pages: "202–216" },
        { label: "AI competencies", pages: "217–226" },
        { label: "Relevant expanded cases", pages: "351–398" }
      ],
      shelf: [],
      sendAlong: [
        { to: "Principal", role: "building-leader", label: "Stakeholder cases and relevant grade-band cases", pages: "122–138, 184–199" },
        { to: "Teacher", role: "teacher", label: "Relevant grade-band instructional and literacy materials", pages: "grade-band pages" },
        { to: "Technology leadership", role: "technology-operations", label: "Family communication cases, application review, privacy laws", pages: "122–138, 144–158, 312–320" },
        { to: "Student support staff", role: "student-support", label: "Ecological framework, cases, equity/accessibility", pages: "181–201, 230–242" }
      ]
    },

    {
      id: "board-governance",
      name: "Board / Governance",
      short: "Board",
      icon: "gavel",
      parent: "family-community",
      includes: "Board of education members and governance partners",
      faqNote: "Q37 (p. 17) is the only Quick Start FAQ item explicitly tagged for boards of education. Related governance questions are listed with their original audience tags preserved.",
      faq: [
        { q: "Q31–Q32", pages: "15", title: "Data security and district policy" },
        { q: "Q37", pages: "17", title: "Superintendent and board approval" },
        { q: "Q41", pages: "18–19", title: "High-impact uses" },
        { q: "Q43", pages: "19", title: "Procurement and vendor review" },
        { q: "Q45", pages: "20", title: "Data governance" },
        { q: "Q48", pages: "21", title: "Security controls" }
      ],
      firstPass: [
        { label: "Common Orientation", pages: "4, 25–30" },
        { label: "AI for Policy I summary and collaboration section", pages: "103–107" },
        { label: "Application selection and review", pages: "139–158" },
        { label: "AI for Policy II", pages: "167–179" },
        { label: "Federal and Illinois Privacy and Data Security Laws", pages: "312–320" },
        { label: "District Next Steps for AI Policy, AUP, and IUP", pages: "321–326" }
      ],
      deepDive: [
        { label: "Full readiness, stakeholder, application-review, and innovation sections", pages: "103–166" },
        { label: "AI Resources, Tools, and Decision Supports", pages: "243–252", note: "resources" },
        { label: "Implementation, tool-review, rubric, and readiness appendices", pages: "289–305" }
      ],
      shelf: [],
      sendAlong: [
        { to: "Superintendent / cabinet", role: "district-executive", label: "Policy I and Policy II", pages: "103–179" },
        { to: "Technology leadership", role: "technology-operations", label: "Application review, vendor, privacy, and policy next steps", pages: "139–158, 308–326" },
        { to: "Curriculum leadership", role: "curriculum-instruction", label: "Teaching/learning and literacy summaries", pages: "68, 180" },
        { to: "Community / families", role: "family-caregiver", label: "Stakeholder cases and family-facing student-development sections", pages: "122–138, 180–203" }
      ]
    },

    {
      id: "community-advocate",
      name: "Advocate / Community Stakeholder",
      short: "Advocate",
      icon: "megaphone",
      parent: "family-community",
      includes: "Advocates, stakeholder groups, and community members",
      faq: [
        { q: "Q1", pages: "5", title: "Assumptions underlying the guidance" },
        { q: "Q17–Q18", pages: "10–11", title: "Stakeholder engagement, communication, and transparency" },
        { q: "Q20", pages: "11", title: "Language access and communication" },
        { q: "Q22", pages: "12", title: "Misinformation, deepfakes, and safe media practices" },
        { q: "Q33", pages: "16", title: "What should precede district introduction or adoption" },
        { q: "Q46", pages: "20", title: "Incident response" }
      ],
      firstPass: [
        { label: "Common Orientation", pages: "4, 25–30" },
        { label: "Practices That Support Collaboration in AI Adoption", pages: "104–107" },
        { label: "Stakeholder mapping, focus groups, and interviews", pages: "114–119" },
        { label: "Stakeholder Engagement, Communication, and Readiness Cases", pages: "122–138" },
        { label: "AI for Policy II summary and introduction", pages: "167–170" },
        { label: "Equity, Accessibility, and Student Groups", pages: "230–242" }
      ],
      deepDive: [
        { label: "Application selection and review", pages: "139–158" },
        { label: "Policy components and templates", pages: "169–179" },
        { label: "AI Literacy and Digital Citizenship", pages: "180–229" },
        { label: "AI Resources, Tools, and Decision Supports", pages: "243–252", note: "resources" },
        { label: "Question/survey, tool-review, vendor, internet-safety, and privacy appendices", pages: "292–320" }
      ],
      shelf: [],
      sendAlong: [
        { to: "Superintendent / cabinet", role: "district-executive", label: "Collaboration, stakeholder cases, and policy summaries", pages: "104–138, 167–170" },
        { to: "Board", role: "board-governance", label: "Policy II, privacy laws, district next steps", pages: "167–179, 312–326" },
        { to: "Families", role: "family-caregiver", label: "Stakeholder cases, grade-band cases, equity/accessibility", pages: "122–138, 184–199, 230–242" },
        { to: "Student advisory groups", role: "student", label: "Student first-pass path", pages: "see Student path" }
      ]
    }
  ]
};
