/* Original questions based on the instructor's uploaded Fall 2026 lecture PDFs. */
window.PR_CONTENT.lectureSources = {
  intro:{title:'Chapter 1 · Intro to PR',file:'CPRE2200_Ch1_Intro_to_PR_Fall2026.pptx.pdf',pages:18},
  models:{title:'Chapter 2, Part 2 · Four Models',file:'PRE2200_Ch2_Part2_Four_Models_Fall2026_.pptx (1).pdf',pages:25},
  ethics:{title:'Chapter 3 · Ethics and Law',file:'PRE2200_Ch3_Ethics_and_Law_Fall2026.pptx (1).pdf',pages:26},
  diversity:{title:'Week 4, Day 2 · Diversity',file:'PRE2200_W4_D2_Diversity_Thu.pptx.pdf',pages:27}
};
window.PR_CONTENT.cases = [
  {
    id:'lc-netflix',chapter:1,points:200,kind:'mc',lecture:true,topic:'Netflix priorities',
    prompt:'In the Netflix classroom example, which group is classified as a primary public because it supplies the shows and films?',
    options:['Media critics','Regulators','Content creators and studios','People who do not subscribe'],correct:2,
    answer:'Content creators and studios.',
    explanation:'The lecture identifies subscribers, content creators and studios, and employees as primary publics in this example. Priorities depend on the situation: a regulator, for instance, could become a primary public during a regulatory issue.',
    lectureRefs:[{deck:'intro',page:17,slide:'25'}]
  },
  {
    id:'lc-uncp',chapter:1,points:300,kind:'short',lecture:true,topic:'UNCP enrollment',
    prompt:'Return to the UNCP publics-mapping activity. For a campaign to increase fall enrollment, name one internal public and one external public, then explain why one should be a primary public.',
    answer:'For example, admissions staff are an internal public, and prospective students are an external public. Prospective students are a primary public because their enrollment decisions directly affect the campaign goal.',
    explanation:'Publics should be prioritized in relation to the campaign objective. Accept other defensible examples, such as faculty, parents, school counselors, or community partners, when the student clearly explains their role.',
    rubric:['Names an appropriate internal public.','Names an appropriate external public.','Connects a primary-public choice to the enrollment objective.'],
    lectureRefs:[{deck:'intro',page:14,slide:'22'},{deck:'intro',page:15,slide:'23'}]
  },
  {
    id:'lc-astronomer',chapter:1,points:400,kind:'short',lecture:true,topic:'Astronomer’s spokesperson video',
    prompt:'The lecture discusses Astronomer using Gwyneth Paltrow as a temporary spokesperson after an unwanted viral moment. Give one potential communication benefit and one risk of using humor in that situation.',
    answer:'A benefit is redirecting attention toward what the company does. A risk is making light of concerns that employees or other stakeholders consider serious.',
    explanation:'The class discussion explicitly allows “smart,” “risky,” or both. Grade the explanation of audience effects, rather than agreement with a single opinion about the campaign.',
    rubric:['Explains a plausible communication benefit of humor or the spokesperson choice.','Explains a plausible stakeholder or credibility risk.'],
    lectureRefs:[{deck:'intro',page:9,slide:'10'}]
  },
  {
    id:'lc-severance',chapter:2,points:200,kind:'mc',lecture:true,topic:'Severance at Grand Central',
    prompt:'In the lecture’s Severance example, actors worked inside a glass office at Grand Central while commuters filmed them. The lecture emphasizes spectacle and attention, with no audience dialogue in the performance. Which model best fits that description?',
    options:['Press agentry and publicity','Public information','Two-way asymmetrical','Two-way symmetrical'],correct:0,
    answer:'Press agentry and publicity.',
    explanation:'The event is used in class as an attention-generating spectacle. The classification rests on the activity described, not on an assumption that every part of the wider campaign used the same model.',
    lectureRefs:[{deck:'models',page:10,slide:'7'}]
  },
  {
    id:'lc-announcement',chapter:2,points:200,kind:'mc',lecture:true,topic:'Taylor and Travis’s announcement',
    prompt:'The lecture presents Taylor Swift and Travis Kelce’s engagement announcement as a truthful message released in their own words through their own account. Which model describes the announcement’s one-way information function?',
    options:['Two-way symmetrical','Press agentry and publicity','Two-way asymmetrical','Public information'],correct:3,
    answer:'Public information.',
    explanation:'The lecture emphasizes a controlled, truthful announcement from the source. Likes, shares, and comments alone do not turn that activity into negotiation or mutual adjustment.',
    lectureRefs:[{deck:'models',page:11,slide:'8'}]
  },
  {
    id:'lc-spotify',chapter:2,points:300,kind:'mc',lecture:true,topic:'Spotify Wrapped',
    prompt:'In the Spotify Wrapped lecture example, listening data help Spotify understand users, but Spotify controls the message and encourages users to share it. Which model best captures that use of audience information?',
    options:['Public information','Two-way asymmetrical','Two-way symmetrical','Press agentry with no audience research'],correct:1,
    answer:'Two-way asymmetrical.',
    explanation:'Audience information influences communication, while the organization retains control of the frame and uses that information for persuasion. Personalization by itself does not establish equal influence or mutual adjustment.',
    lectureRefs:[{deck:'models',page:12,slide:'9'}]
  },
  {
    id:'lc-bananas',chapter:2,points:300,kind:'mc',lecture:true,topic:'The Savannah Bananas',
    prompt:'The lecture describes the Savannah Bananas changing the baseball experience in response to fan feedback and involving fans in the show. Which detail most strongly supports a two-way symmetrical interpretation?',
    options:['The team has a large social media audience','Fans create online content about the team','Fan feedback helps change the experience the organization provides','The entertainment attracts media attention'],correct:2,
    answer:'Fan feedback helps change the experience the organization provides.',
    explanation:'The key evidence is organizational adjustment in response to the audience. Popularity, publicity, or engagement alone would not be enough to establish symmetry.',
    lectureRefs:[{deck:'models',page:13,slide:'10'}]
  },
  {
    id:'lc-duolingo',chapter:2,points:400,kind:'short',lecture:true,topic:'Duolingo’s Duo storyline',
    prompt:'The lecture describes Duolingo announcing Duo’s fictional death and adapting the storyline after watching audience reactions. Make a case for either press agentry or two-way asymmetrical communication, using one specific detail.',
    answer:'Press agentry: the fictional announcement creates spectacle and attention. Two-way asymmetrical: the brand uses audience reactions to adjust a story aimed at its own engagement and usage goals.',
    explanation:'Both interpretations are explicitly discussed in class. A strong answer connects an observed tactic to the model. Also accept a well-supported mixed-model argument. Audience participation alone does not prove symmetry.',
    rubric:['Selects press agentry, two-way asymmetrical, or a defensible combination.','Uses a specific case detail to explain how the model operates.'],
    lectureRefs:[{deck:'models',page:14,slide:'11'},{deck:'models',page:15,slide:'12'}]
  },
  {
    id:'lc-guess',chapter:3,points:400,kind:'short',lecture:true,topic:'The Guess ad in Vogue',
    prompt:'The lecture’s Guess/Vogue case raises concerns about a small AI disclosure and narrow representation in AI-generated models. Connect each concern to one of the Page Center’s pillars of truth.',
    answer:'The visibility and clarity of the AI disclosure raise veracity concerns. Representation and whose opportunities or perspectives are excluded raise fairness concerns.',
    explanation:'Disclosure needs to support audience understanding. The lecture also asks whose likeness, labor, or representation is affected. Accept another pillar when the student gives a clear, relevant justification.',
    rubric:['Connects disclosure or transparency to veracity, with an explanation.','Connects representation or unequal effects to fairness, or makes another well-supported ethical connection.'],
    lectureRefs:[{deck:'ethics',page:4,slide:'4'},{deck:'ethics',page:12,slide:'10'}]
  },
  {
    id:'lc-bell',chapter:3,points:300,kind:'mc',lecture:true,topic:'Bell Pottinger’s campaign',
    prompt:'The Bell Pottinger lecture case describes a campaign that exploited racial divisions. Which Page Center pillar most directly names the duty to avoid causing harm?',
    options:['Confidentiality','Expertise','Loyalty','Non-maleficence'],correct:3,
    answer:'Non-maleficence.',
    explanation:'Non-maleficence means avoiding harm. The lecture also connects this case to fairness. Expertise and loyalty are among the PRSA values, not the Page Center’s five pillars.',
    lectureRefs:[{deck:'ethics',page:4,slide:'4'},{deck:'ethics',page:13,slide:'11'}]
  },
  {
    id:'lc-poppi',chapter:3,points:400,kind:'short',lecture:true,topic:'Poppi’s health claims',
    prompt:'The lecture classifies the challenge to Poppi’s gut-health claims as alleged misleading advertising rather than puffery. Explain that distinction. Does a settlement without admitting wrongdoing, by itself, prove the company violated the law?',
    answer:'A claimed health benefit can convey a factual message that audiences expect to be supported by evidence, unlike a vague superlative such as “the best.” No: a settlement without an admission is not, by itself, proof of a legal violation.',
    explanation:'The lesson is to distinguish a checkable benefit claim from subjective exaggeration, and to distinguish an allegation from an adjudicated finding. The lecture labels the Poppi issue as alleged deception and notes no admission of wrongdoing.',
    rubric:['Explains the difference between a factual benefit claim and subjective exaggeration.','Does not treat settlement as proof or an admission of wrongdoing.'],
    lectureRefs:[{deck:'ethics',page:20,slide:'17'},{deck:'ethics',page:22}]
  },
  {
    id:'lc-brochure',chapter:4,points:200,kind:'mc',lecture:true,topic:'The brochure cover',
    prompt:'In the lecture warm-up, a campus organization puts one international student on its brochure cover but changes nothing about participation or decision-making. What concern does this example most directly raise?',
    options:['Tokenism: visible representation without meaningful inclusion','Equity: resources tailored to different needs','Belonging: everyone feels able to contribute','Evidence that inclusion is fully achieved'],correct:0,
    answer:'Tokenism: visible representation without meaningful inclusion.',
    explanation:'The concern is the gap between symbolic visibility and substantive participation. A diverse image alone does not establish that people have influence or feel welcomed.',
    lectureRefs:[{deck:'diversity',page:2,slide:'2'}]
  },
  {
    id:'lc-pepsi',chapter:4,points:400,kind:'short',lecture:true,topic:'Pepsi and Kendall Jenner',
    prompt:'The lecture uses the Pepsi/Kendall Jenner protest ad to discuss audience insight. Name one step before launch where affected audiences could have influenced the campaign, and explain how it might have helped.',
    answer:'For example, consult people with relevant lived experience while developing the concept, then use their feedback to revise or reject the idea before production.',
    explanation:'Accept audience interviews, concept testing, a diverse review team, or another concrete process that gives relevant perspectives real influence. Do not assume we know the actual demographics of the team behind the ad.',
    rubric:['Identifies a specific pre-launch step involving relevant perspectives.','Explains how input could change the message or expose a cultural risk.'],
    lectureRefs:[{deck:'diversity',page:18,slide:'18'}]
  },
  {
    id:'lc-renaming',chapter:4,points:400,kind:'short',lecture:true,topic:'A program’s new name',
    prompt:'The lecture asks whether renaming a DEI program “belonging” changes its substance. Name two pieces of evidence you would examine before deciding.',
    answer:'For example, compare resources and program access before and after the change, and examine whether hiring, mentoring, or decision-making practices actually changed.',
    explanation:'A label alone cannot establish the nature of a program. Accept evidence about budgets, staffing, participation, opportunity, leadership practices, or employee experiences. Either conclusion can earn credit when supported.',
    rubric:['Names one concrete measure of what the organization does.','Names a second distinct source of evidence that goes beyond the program’s name.'],
    lectureRefs:[{deck:'diversity',page:11,slide:'11'}]
  },
  {
    id:'lc-evidence',chapter:5,points:400,kind:'short',lecture:true,topic:'Diversity and business evidence',
    prompt:'In the diversity lecture, a report associates executive-team diversity with financial performance. Why is that association alone insufficient to say diversity caused the performance difference?',
    answer:'Correlation alone does not establish causation. Successful firms might recruit more broadly, or other factors might affect both diversity and performance.',
    explanation:'The lecture asks students to examine causal direction, replication, and measurement. This case connects that discussion to Chapter 5’s focus on evaluating research and using evidence honestly.',
    rubric:['States that association alone does not demonstrate cause and effect.','Offers a plausible alternative explanation, such as reverse causation or another factor affecting both.'],
    lectureRefs:[{deck:'diversity',page:16,slide:'16'},{deck:'diversity',page:17,slide:'17'}]
  }
];
