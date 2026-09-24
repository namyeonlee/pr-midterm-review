(() => {
  'use strict';
  const C = window.PR_CONTENT;
  const CASES = C.cases || [];
  const QUESTIONS = [...C.questions, ...CASES];
  const boardCount = () => C.questions.filter(q=>state.completed[q.id]).length;
  const caseCount = () => CASES.filter(q=>state.completed[q.id]).length;
  const KEY = 'pr-playbook-v1';
  const $ = id => document.getElementById(id);
  const escape = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const clone = value => JSON.parse(JSON.stringify(value));
  const number = value => Number(value).toLocaleString('en-US');
  const makeTeam = i => ({id:'t'+(i+1),name:'Team '+(i+1),score:0});
  const fresh = () => ({version:1,teams:Array.from({length:4},(_,i)=>makeTeam(i)),turn:0,completed:{},final:null,history:[]});
  let state = fresh();
  let storageWorks = true;
  try {
    const saved = JSON.parse(localStorage.getItem(KEY));
    if (saved?.version === 1 && Array.isArray(saved.teams) && saved.teams.length >= 2 && saved.teams.length <= 6 && saved.teams.every((t,i)=>t.id==='t'+(i+1) && typeof t.name==='string' && t.name.length<=30 && Number.isSafeInteger(t.score)) && Number.isInteger(saved.turn) && saved.turn>=0 && saved.turn<saved.teams.length && saved.completed && typeof saved.completed === 'object' && !Array.isArray(saved.completed)) {
      state = saved;
      state.history = Array.isArray(saved.history) ? saved.history.slice(-30) : [];
      for (const id of Object.keys(state.completed)) if (!QUESTIONS.some(q=>q.id===id)) delete state.completed[id];
    }
  } catch (_) { storageWorks = false; }
  let view = null;
  let timer = {seconds:45,running:false,interval:null,deadline:0};
  const active = () => state.teams[state.turn];
  const questionById = id => QUESTIONS.find(q=>q.id===id);
  function announce(message) { $('announcement').textContent = message; }
  function persist() {
    try { localStorage.setItem(KEY, JSON.stringify(state)); }
    catch (_) { storageWorks = false; }
    $('storage-note').textContent = storageWorks ? 'Game progress stays in this browser.' : 'Progress is available in this tab only.';
  }
  function snapshot() {
    state.history.push(clone({teams:state.teams,turn:state.turn,completed:state.completed,final:state.final}));
    if(state.history.length>30) state.history.shift();
  }
  function winners() {
    const max = Math.max(...state.teams.map(t=>t.score));
    return state.teams.filter(t=>t.score===max);
  }
  function render() {
    const done = boardCount();
    $('app').innerHTML = `${state.final ? `<section class="winner-banner" aria-label="Game results"><div><p class="eyebrow">${winners().length>1?'Joint winners':'Game winner'}</p><h2>${winners().map(t=>escape(t.name)).join(' & ')} <span class="small">· ${number(winners()[0].score)} points</span></h2></div><button class="secondary-button" data-action="results">View results</button></section>` : ''}
      <div class="game-layout"><section aria-labelledby="board-title">
        <div class="board-heading"><div><p class="eyebrow">Chapters 01—05</p><h2 id="board-title">The review board</h2><p>Pick a chapter. Choose your challenge. Explain your thinking.</p></div><div class="progress"><strong>${done}</strong> / 25 reviewed<div class="progress-track" role="progressbar" aria-label="Questions reviewed" aria-valuemin="0" aria-valuemax="25" aria-valuenow="${done}"><span style="width:${done*4}%"></span></div></div></div>
        <div class="round-tools"><div class="round-buttons"><button class="warmup-button" data-action="warmup">Warm-up <span class="warmup-count">5 quick questions</span></button><button class="warmup-button case-round-button" data-action="cases">Lecture cases <span class="warmup-count">${caseCount()} / ${CASES.length} reviewed</span></button></div><p class="turn-label">${state.final?'Game complete':`Choosing: <strong>${escape(active().name)}</strong>`}</p></div>
        <div id="board" class="board" tabindex="-1">${C.chapters.map(ch=>`<section class="chapter-column" style="--chapter:${ch.color}" aria-label="Chapter ${ch.id}: ${escape(ch.short)}"><div class="chapter-head"><span>CHAPTER 0${ch.id}</span><h3>${escape(ch.short)}</h3></div>${C.questions.filter(q=>q.chapter===ch.id).map(q=>`<button class="tile ${state.completed[q.id]?'used':''}" data-action="question" data-id="${q.id}" ${state.final&&!state.completed[q.id]?'disabled':''} aria-label="${escape(ch.short)}, ${q.points} points${state.completed[q.id]?', reviewed; open explanation':''}"><span class="points">${state.completed[q.id]?'✓ ':''}${q.points}</span><span class="tile-kind">${state.completed[q.id]?'Reviewed':q.kind==='short'?'Explain':q.scenario?'Apply':'Recall'}</span></button>`).join('')}</section>`).join('')}</div>
        <div class="board-end"><div><h3>Final challenge</h3><p>One campus scenario. All five chapters. Wager up to 500 points.</p></div><button class="primary-button" data-action="final">${state.final?'Final answer & results':'Play the final'}</button></div>
      </section><aside class="score-panel" aria-labelledby="score-title"><div class="score-title"><h2 id="score-title">Scoreboard</h2><button class="text-button" data-action="teams">Edit teams</button></div>
        <div class="teams">${state.teams.map((t,i)=>`<section class="team ${i===state.turn&&!state.final?'active':''}" aria-label="${escape(t.name)}, ${t.score} points"><div class="team-head"><span class="team-n" aria-hidden="true">${i+1}</span><button class="team-select" data-action="turn" data-index="${i}" aria-label="Let ${escape(t.name)} choose next" ${state.final?'disabled':''}>${escape(t.name)}</button></div><div class="team-bottom"><span class="team-score">${number(t.score)}</span><div class="score-adjust"><button data-action="adjust" data-index="${i}" data-delta="-100" aria-label="Subtract 100 points from ${escape(t.name)}" ${state.final?'disabled':''}>−</button><button data-action="adjust" data-index="${i}" data-delta="100" aria-label="Add 100 points to ${escape(t.name)}" ${state.final?'disabled':''}>+</button></div></div></section>`).join('')}</div>
        <p class="score-help">Select a team to choose next. Score buttons adjust by 100.</p><div class="sidebar-actions"><button class="small-button" data-action="undo" ${!state.history.length?'disabled':''}>↶ Undo last change</button><button class="text-button" data-action="reset">Reset game</button></div>
      </aside></div>`;
    persist();
  }
  function stopTimer() { clearInterval(timer.interval); timer.interval=null; timer.running=false; }
  function resetTimer(seconds) { stopTimer(); timer.seconds=seconds; updateTimer(); }
  function updateTimer() {
    const display=$('timer-display');
    if(display){display.textContent=`${Math.floor(timer.seconds/60)}:${String(timer.seconds%60).padStart(2,'0')}`;display.classList.toggle('expired',timer.seconds===0);}
    const button=$('timer-toggle'); if(button){button.textContent=timer.running?'Pause':'Start';button.disabled=timer.seconds===0;}
    const message=$('timer-message'); if(message) message.textContent=timer.seconds===0?'Time is up. Discuss, then reveal.':'';
  }
  function toggleTimer() {
    if(timer.running){timer.seconds=Math.max(0,Math.ceil((timer.deadline-Date.now())/1000));stopTimer();updateTimer();return;}
    if(timer.seconds<=0)return;
    timer.running=true;timer.deadline=Date.now()+timer.seconds*1000;
    timer.interval=setInterval(()=>{timer.seconds=Math.max(0,Math.ceil((timer.deadline-Date.now())/1000));if(timer.seconds===0){stopTimer();announce('Time is up. Discuss, then reveal the answer.');}updateTimer();},200);updateTimer();
  }
  function timerHTML() {return `<div class="timer" aria-label="Optional discussion timer"><span id="timer-display" class="timer-time">0:45</span><button id="timer-toggle" class="small-button" data-action="timer">Start</button><button class="text-button" data-action="timer-reset">Reset timer</button></div>`;}
  function show(html) {
    const focused=document.activeElement?.id;
    $('dialog-content').innerHTML=html;
    if(!$('game-dialog').open) $('game-dialog').showModal();
    else if(focused&&$(focused)) $(focused).focus();
    updateTimer();
  }
  function top(title,badge='') {return `<header class="dialog-top"><div class="dialog-kicker">${badge?`<span class="points-badge">${escape(badge)}</span>`:''}<h2 id="dialog-title">${escape(title)}</h2></div><button class="close-button" data-action="close" aria-label="Close dialog">×</button></header>`;}
  function close() {stopTimer();view=null;$('game-dialog').close();}
  function source(q) {
    if(q.lectureRefs)return q.lectureRefs.map(ref=>`Dr. Lee’s lecture: ${escape(C.lectureSources[ref.deck].title)} · PDF page ${ref.page}${ref.slide?` (printed slide ${escape(ref.slide)})`:''}`).join('<br>');
    if(q.sources)return q.sources.map(s=>`Freberg Chapter ${s.chapter}, slides ${s.slides.join(', ')}`).join(' · ');
    return `Freberg Chapter ${q.chapter}, ${q.slides.length===1?'slide':'slides'} ${q.slides.join(', ')} · ${escape(q.section)}`;
  }
  function openCases() {
    stopTimer();view={type:'cases'};
    show(`${top('Cases from your lectures',`${caseCount()} / ${CASES.length} reviewed`)}<div class="dialog-body"><p class="dialog-intro">Choose an example discussed in class. Points count toward the same scoreboard. ${state.final?'The game is complete; reviewed cases can still be reopened.':`${escape(active().name)} chooses next.`}</p>${C.chapters.map(ch=>`<section class="case-group" style="--chapter:${ch.color}"><h3>Chapter ${ch.id} · ${escape(ch.short)}</h3><div class="case-grid">${CASES.filter(q=>q.chapter===ch.id).map(q=>`<button class="case-card ${state.completed[q.id]?'used':''}" data-action="question" data-id="${q.id}" ${state.final&&!state.completed[q.id]?'disabled':''}><span class="case-points">${q.points}</span><span><strong>${escape(q.topic)}</strong><span class="case-kind">${state.completed[q.id]?'Reviewed · open explanation':q.kind==='short'?'Explain your reasoning':'Choose one answer'}</span></span></button>`).join('')}</div></section>`).join('')}</div><footer class="dialog-footer"><button class="primary-button" data-action="close">Back to the board</button></footer>`);
  }
  function answerHTML(q) {return `<section class="answer-panel"><p class="eyebrow">${q.kind==='short'?'Sample answer':'Correct answer'}</p><h3>${escape(q.answer)}</h3><p>${escape(q.explanation)}</p>${q.rubric?`<ul>${q.rubric.map(r=>`<li>${escape(r)}</li>`).join('')}</ul>`:''}${q.grading?`<p><strong>${escape(q.grading)}</strong></p>`:''}<p class="source"><strong>Review in your materials:</strong> ${source(q)}</p></section>`;}
  function openQuestion(id) {
    const q=questionById(id);if(!q)throw Error('Unknown question.');
    if(state.final&&!state.completed[id]){announce('The game is complete. Reset the game to score new questions.');return;}
    view={type:'question',q,revealed:!!state.completed[id],readonly:!!state.completed[id],selected:state.completed[id]?.selected??null,awards:[]};
    resetTimer(q.kind==='short'?60:45);renderQuestion();
  }
  function openWarmup(index=0) {view={type:'warmup',q:C.warmups[index],index,revealed:false,selected:null,awards:[]};resetTimer(30);renderQuestion();}
  function renderQuestion() {
    const v=view,q=v.q,warm=v.type==='warmup';
    show(`${top(warm?`Warm-up ${v.index+1} of 5`:q.lecture?q.topic:`Chapter ${q.chapter} · ${C.chapters.find(ch=>ch.id===q.chapter).short}`,warm?'No points':`${q.points} points`)}<div class="dialog-body">
      <div class="question-meta"><p class="eyebrow">${q.lecture?'Lecture case':q.scenario?'Classroom scenario':'Concept check'}${!warm?' · '+(q.kind==='short'?'Explain your answer':'Choose one answer'):''}</p>${!v.revealed?timerHTML():''}</div>
      <p class="question-prompt">${escape(q.prompt)}</p>
      ${q.options?`<div class="options" role="group" aria-label="Answer choices">${q.options.map((op,i)=>`<button id="choice-${i}" class="option ${v.selected===i?'selected':''} ${v.revealed&&q.correct===i?'correct':''} ${v.revealed&&v.selected===i&&q.correct!==i?'incorrect':''}" data-action="choice" data-index="${i}" aria-pressed="${v.selected===i}" ${v.revealed?'disabled':''}><span class="letter">${'ABCD'[i]}</span><span>${escape(op)}${v.revealed&&q.correct===i?'<span class="option-status">Correct answer</span>':v.revealed&&v.selected===i?'<span class="option-status">Selected answer</span>':''}</span></button>`).join('')}</div>`:'<p class="response-note">Discuss with your team, then give a short explanation. Equivalent wording is welcome.</p>'}
      <p id="timer-message" class="small subtle" role="status"></p>
      ${v.revealed?answerHTML(q):''}
      ${v.revealed&&!warm&&!v.readonly?`<section class="award-area"><p>Award <strong>${q.points} points</strong> to each team with a correct response.</p><div class="award-teams">${state.teams.map(t=>`<button class="award-team" data-action="award" data-id="${t.id}" aria-pressed="${v.awards.includes(t.id)}">${escape(t.name)}${v.awards.includes(t.id)?' ✓':''}</button>`).join('')}</div><p class="small subtle" style="margin:12px 0 0">Leave all teams unselected for no points.</p></section>`:''}
    </div><footer class="dialog-footer"><button class="text-button" data-action="${q.lecture?'cases':'close'}">${q.lecture?'Back to lecture cases':v.readonly?'Back to board':warm?'Back to board':'Skip for now'}</button>
      ${!v.revealed?'<button id="reveal-answer" class="primary-button" data-action="reveal">Reveal answer</button>':v.readonly?'':warm?`<button class="primary-button" data-action="next-warmup">${v.index===4?'Return to the board':'Next warm-up'}</button>`:`<button class="primary-button" data-action="finish-question">${v.awards.length?'Save score & continue':'No points · continue'}</button>`}
    </footer>`);
  }
  function finishQuestion() {
    if(view?.type!=='question'||!view.revealed||view.readonly||state.completed[view.q.id]||state.final)return;
    const q=view.q;const awards=[...new Set(view.awards)].filter(id=>state.teams.some(t=>t.id===id));
    snapshot();
    state.teams.forEach(t=>{if(awards.includes(t.id))t.score+=q.points;});
    state.completed[q.id]={awards,selected:view.selected};
    state.turn=(state.turn+1)%state.teams.length;
    close();render();if(q.lecture)openCases();announce(`${q.points}-point question reviewed. ${active().name} chooses next.`);
  }
  function openTeams() {view={type:'teams',draft:clone(state.teams)};renderTeams();}
  function started() {return Object.keys(state.completed).length>0||state.teams.some(t=>t.score!==0)||!!state.final;}
  function renderTeams() {
    show(`${top('Teams & scores')}<div class="dialog-body"><p class="dialog-intro">Choose 2–6 teams. Edit names or enter exact scores for partial credit and corrections.</p><div class="form-grid"><label class="field">Number of teams<select id="team-count" ${started()?'disabled':''}>${[2,3,4,5,6].map(n=>`<option ${n===view.draft.length?'selected':''} value="${n}">${n} teams</option>`).join('')}</select></label><p class="small subtle">${started()?'Reset the game to change the number of teams.':'Team names and scores can be edited during the game.'}</p></div><div class="settings-teams">${view.draft.map((t,i)=>`<div class="team-edit"><label>Team ${i+1} name<input id="team-name-${i}" data-team-name="${i}" maxlength="30" value="${escape(t.name)}" autocomplete="off"></label><label>Score<input id="team-score-${i}" data-team-score="${i}" type="number" step="1" min="-99999" max="99999" value="${t.score}" ${state.final?'disabled':''}></label></div>`).join('')}</div><p id="form-error" class="form-error" role="alert"></p></div><footer class="dialog-footer"><button class="text-button" data-action="close">Cancel</button><button class="primary-button" data-action="save-teams">Save teams</button></footer>`);
  }
  function saveTeams() {
    if(view?.type!=='teams')return;
    const teams=view.draft.map((t,i)=>({id:'t'+(i+1),name:$('team-name-'+i).value.trim(),score:Number($('team-score-'+i).value)}));
    if(teams.some((t,i)=>!t.name||t.name.length>30||!Number.isSafeInteger(t.score)||Math.abs(t.score)>99999||$('team-score-'+i).value==='')){$('form-error').textContent='Enter a name and a whole-number score between −99,999 and 99,999 for every team.';return;}
    if(new Set(teams.map(t=>t.name.toLowerCase())).size!==teams.length){$('form-error').textContent='Use a different name for each team.';return;}
    if(state.final)teams.forEach((t,i)=>t.score=state.teams[i].score);
    snapshot();state.teams=teams;state.turn=Math.min(state.turn,teams.length-1);close();render();announce('Teams updated.');
  }
  function openHelp() {
    view={type:'help'};
    show(`${top('How to play')}<div class="dialog-body"><p class="dialog-intro">An instructor-led game for one shared classroom screen. Students discuss answers in teams and respond aloud or on paper.</p><ol class="rules"><li><strong>Set your teams.</strong> Use “Edit teams” to name 2–6 teams. Four teams are ready by default.</li><li><strong>Warm up together.</strong> The five warm-up questions carry no points.</li><li><strong>Choose a question.</strong> The highlighted team picks a board tile or opens “Lecture cases” for the 15 examples from class. Both use the same scoreboard. Higher-value questions ask for more explanation.</li><li><strong>Discuss, then reveal.</strong> The optional timer starts only when you press Start. It never reveals an answer automatically.</li><li><strong>Award points.</strong> After the explanation, select every team that answered correctly, then save. Unselected teams get zero; regular rounds have no penalty. Teams take turns choosing.</li><li><strong>Finish with the final.</strong> Each team wagers 0–500 points and writes a response. Successful responses gain the wager; other responses lose it. Scores may go below zero.</li></ol><p class="rules-note">For a 35–50 minute session, select a mix of board questions and lecture cases. Playing every question will take longer. Play the final whenever class time requires it. Reviewed tiles reopen without adding points again. Use “Undo last change” for scoring mistakes, and exact score fields for partial credit.<br><br>Progress stays in this browser. This version uses one instructor screen; it does not collect answers from students’ phones. “Instructor review” contains the answer key.</p></div><footer class="dialog-footer"><button class="primary-button" data-action="close">Return to the board</button></footer>`);
  }
  function reviewItem(q,label) {
    return `<details class="review-item"><summary><span>${escape(label)}</span>${escape(q.topic)}</summary><div class="review-detail"><p><strong>${escape(q.prompt)}</strong></p>${q.tasks?`<ol>${q.tasks.map(t=>`<li>${escape(t)}</li>`).join('')}</ol>`:''}${q.options?`<ol type="A">${q.options.map((op,i)=>`<li class="${i===q.correct?'correct-text':''}">${escape(op)}${i===q.correct?' (correct)':''}</li>`).join('')}</ol>`:''}<p class="correct-text"><strong>${q.kind==='short'?'Sample answer':'Answer'}:</strong> ${escape(q.answer)}</p><p>${escape(q.explanation)}</p>${q.rubric?`<ul>${q.rubric.map(r=>`<li>${escape(r)}</li>`).join('')}</ul>`:''}${q.grading?`<p><strong>${escape(q.grading)}</strong></p>`:''}<p class="source">${source(q)}</p></div></details>`;
  }
  function openReview() {
    view={type:'review'};stopTimer();
    const total=C.warmups.length+QUESTIONS.length+1;
    show(`${top('Instructor review',`${total} questions`)}<div class="dialog-body"><p class="dialog-intro">Answer key for preparation before class. Questions combine the supplied Freberg materials for Chapters 1–5 with Dr. Lee’s Fall 2026 lecture examples. Fictional practice situations are labeled “Classroom scenario.” Lecture cases refer to class examples and activities.</p><p class="small subtle" style="margin-top:12px">5 unscored warm-ups · 25 board questions · ${CASES.length} lecture cases · 1 final challenge. Lecture references give the PDF page and, when available, the slide number printed on the page. These can differ.</p>${C.chapters.map(ch=>`<section class="review-chapter" style="--chapter:${ch.color}"><h3>Chapter ${ch.id} · ${escape(ch.title)}</h3>${reviewItem(C.warmups.find(q=>q.chapter===ch.id),'Warm-up')}${C.questions.filter(q=>q.chapter===ch.id).map(q=>reviewItem(q,q.points+' points')).join('')}${CASES.filter(q=>q.chapter===ch.id).map(q=>reviewItem(q,'Lecture · '+q.points+' points')).join('')}</section>`).join('')}<section class="review-chapter" style="--chapter:var(--lime)"><h3>Final challenge</h3>${reviewItem(C.final,'Final')}</section><p class="source">Textbook sources: the supplied Freberg2e_LN01–LN05 and Freberg2e_PPT01–PPT05 files.</p><p class="source">Lecture PDFs:<br>${Object.values(C.lectureSources).map(d=>escape(d.file)).join('<br>')}</p><p class="source">Full source documents are not embedded in the game. Real-world cases are framed as presented in the lectures; questions do not ask students to memorize engagement metrics or resolve ongoing legal disputes.</p></div><footer class="dialog-footer"><button class="primary-button" data-action="close">Back to the board</button></footer>`);
  }
  function openFinal() {
    if(state.final){openFinalReview();return;}
    view={type:'final',stage:'wagers',wagers:Object.fromEntries(state.teams.map(t=>[t.id,100])),grades:{},revealed:false};stopTimer();renderFinal();
  }
  function renderFinal() {
    if(view.stage==='wagers') {
      show(`${top('Final challenge','Wager round')}<div class="dialog-body"><p class="eyebrow">The campus campaign</p><h3 class="results-title">Set your wagers</h3><p class="dialog-intro">Each team writes down a wager from 0 to 500. Enter it here before revealing the challenge. Teams gain their wager for a successful response and lose it otherwise. Teams may wager even with a zero or negative score.</p><div class="wager-rows">${state.teams.map(t=>`<div class="wager-row"><label for="wager-${t.id}">${escape(t.name)}<span>Current score: ${number(t.score)}</span></label><input id="wager-${t.id}" type="number" min="0" max="500" step="1" value="${view.wagers[t.id]}" aria-label="Wager for ${escape(t.name)}"></div>`).join('')}</div><p id="form-error" class="form-error" role="alert"></p></div><footer class="dialog-footer"><button class="text-button" data-action="close">Back to board</button><button class="primary-button" data-action="lock-wagers">Lock wagers & show challenge</button></footer>`);return;
    }
    const q=C.final;
    show(`${top('The campus campaign','Final challenge')}<div class="dialog-body"><div class="question-meta"><p class="eyebrow">All teams · Write your response</p>${!view.revealed?timerHTML():''}</div><p class="question-prompt">${escape(q.prompt)}</p><ol class="final-tasks">${q.tasks.map(t=>`<li>${escape(t)}</li>`).join('')}</ol><p class="small subtle">A successful response covers at least 4 of the 5 elements. Each team’s wager is locked.</p><p id="timer-message" class="small subtle" role="status"></p>${view.revealed?`${answerHTML(q)}<section class="award-area"><p><strong>Judge each team using the five criteria above.</strong></p><div class="grades">${state.teams.map(t=>`<div class="grade-row"><label for="grade-${t.id}">${escape(t.name)}<span>Wager: ${number(view.wagers[t.id])} points</span></label><select id="grade-${t.id}" data-grade="${t.id}"><option value="">Choose a result</option value="success" ${view.grades[t.id]==='success'?'selected':''}>4–5 elements: +${view.wagers[t.id]}</option><option value="miss" ${view.grades[t.id]==='miss'?'selected':''}>0–3 elements: −${view.wagers[t.id]}</option></select></div>`).join('')}</div></section>`:''}</div><footer class="dialog-footer"><button class="text-button" data-action="close">Back to board</button>${!view.revealed?'<button class="primary-button" data-action="reveal-final">Reveal sample answer</button>':`<button id="finish-final" class="primary-button" data-action="finish-final" ${state.teams.every(t=>['success','miss'].includes(view.grades[t.id]))?'':'disabled'}>Apply wagers & show results</button>`}</footer>`);
  }
  function lockWagers() {
    if(view?.type!=='final'||view.stage!=='wagers')return;
    const wagers={};
    for(const t of state.teams){const el=$('wager-'+t.id),n=Number(el.value);if(el.value===''||!Number.isInteger(n)||n<0||n>500){$('form-error').textContent='Enter a whole-number wager from 0 to 500 for every team.';return;}wagers[t.id]=n;}
    view.wagers=wagers;view.stage='challenge';resetTimer(120);renderFinal();
  }
  function finishFinal() {
    if(view?.type!=='final'||!view.revealed||state.final||!state.teams.every(t=>['success','miss'].includes(view.grades[t.id])))return;
    snapshot();const wagers=clone(view.wagers),grades=clone(view.grades);
    state.teams.forEach(t=>t.score+=grades[t.id]==='success'?wagers[t.id]:-wagers[t.id]);
    state.final={wagers,grades};stopTimer();render();openResults();announce('Final scores are ready.');
  }
  function openResults() {
    view={type:'results'};
    const sorted=[...state.teams].sort((a,b)=>b.score-a.score);const win=winners();
    show(`${top('Final scoreboard')}<div class="dialog-body"><p class="eyebrow">${win.length>1?'Joint winners':'Game winner'}</p><h3 class="results-title">${win.map(t=>escape(t.name)).join(' & ')}</h3><p class="dialog-intro">${boardCount()} board questions and ${caseCount()} lecture cases reviewed. Reopen a reviewed tile or lecture case to revisit its explanation.</p><ol class="leaderboard">${sorted.map(t=>`<li><span class="rank">${sorted.findIndex(x=>x.score===t.score)+1}</span><strong class="leader-name">${escape(t.name)}</strong><span class="leader-score">${number(t.score)}</span></li>`).join('')}</ol></div><footer class="dialog-footer"><button class="text-button" data-action="final-review">Review final answer</button><button class="primary-button" data-action="close">Back to the board</button></footer>`);
  }
  function openFinalReview() {
    view={type:'finalReview'};
    show(`${top('Final challenge review')}<div class="dialog-body"><p class="question-prompt">${escape(C.final.prompt)}</p><ol class="final-tasks">${C.final.tasks.map(t=>`<li>${escape(t)}</li>`).join('')}</ol>${answerHTML(C.final)}</div><footer class="dialog-footer"><button class="text-button" data-action="close">Back to board</button><button class="primary-button" data-action="results">View results</button></footer>`);
  }
  function undo() {
    if(!state.history.length)return;
    const prior=state.history.pop();Object.assign(state,prior);close();render();announce('Last change undone.');
  }
  function confirmReset() {
    view={type:'reset'};
    show(`${top('Reset this game?')}<div class="dialog-body"><p class="dialog-intro">This clears scores, reviewed questions, final wagers, and undo history. Team names are kept.</p></div><footer class="dialog-footer"><button class="secondary-button" data-action="close">Keep playing</button><button class="danger-button" data-action="confirm-reset">Reset game</button></footer>`);
  }
  document.addEventListener('click',event=>{
    const button=event.target.closest('button[data-action]');if(!button||button.disabled)return;
    const a=button.dataset.action,index=Number(button.dataset.index);
    if(a==='question')openQuestion(button.dataset.id);
    else if(a==='warmup')openWarmup();
    else if(a==='cases')openCases();
    else if(a==='close')close();
    else if(a==='help')openHelp();
    else if(a==='review')openReview();
    else if(a==='teams')openTeams();
    else if(a==='save-teams')saveTeams();
    else if(a==='turn'&&!state.final){state.turn=index;render();}
    else if(a==='adjust'&&!state.final){snapshot();state.teams[index].score+=Number(button.dataset.delta);render();announce(`${state.teams[index].name}: ${state.teams[index].score} points.`);}
    else if(a==='choice'&&view&&!view.revealed){view.selected=index;renderQuestion();}
    else if(a==='reveal'&&view){view.revealed=true;stopTimer();renderQuestion();announce('Answer revealed.');}
    else if(a==='award'&&view?.type==='question'&&!view.readonly){view.awards=view.awards.includes(button.dataset.id)?view.awards.filter(id=>id!==button.dataset.id):[...view.awards,button.dataset.id];renderQuestion();}
    else if(a==='finish-question')finishQuestion();
    else if(a==='next-warmup'&&view?.type==='warmup'){view.index===4?close():openWarmup(view.index+1);}
    else if(a==='timer')toggleTimer();
    else if(a==='timer-reset')resetTimer(view?.type==='final'?120:view?.type==='warmup'?30:view?.q?.kind==='short'?60:45);
    else if(a==='undo')undo();
    else if(a==='reset')confirmReset();
    else if(a==='confirm-reset'&&view?.type==='reset'){const teams=state.teams.map(t=>({...t,score:0}));state=fresh();state.teams=teams;close();render();announce('Game reset.');}
    else if(a==='final')openFinal();
    else if(a==='lock-wagers')lockWagers();
    else if(a==='reveal-final'&&view?.type==='final'){view.revealed=true;stopTimer();renderFinal();}
    else if(a==='finish-final')finishFinal();
    else if(a==='results')openResults();
    else if(a==='final-review')openFinalReview();
  });
  document.addEventListener('change',event=>{
    if(event.target.id==='team-count'&&view?.type==='teams'&&!started()){
      view.draft=view.draft.map((t,i)=>({...t,name:$('team-name-'+i).value,score:Number($('team-score-'+i).value)}));
      const n=Number(event.target.value);view.draft=Array.from({length:n},(_,i)=>view.draft[i]||makeTeam(i));renderTeams();
    }
    if(event.target.dataset.grade&&view?.type==='final'){
      view.grades[event.target.dataset.grade]=event.target.value;
      $('finish-final').disabled=!state.teams.every(t=>['success','miss'].includes(view.grades[t.id]));
    }
  });
  $('game-dialog').addEventListener('cancel',()=>{stopTimer();view=null;});
  $('game-dialog').addEventListener('close',()=>{if(!$('game-dialog').open){stopTimer();view=null;}});
  render();

  // Expose the same visible game actions when a browser supports WebMCP.
  if(document.modelContext?.registerTool) {
    const lifecycle=new AbortController();
    const register=tool=>{try{Promise.resolve(document.modelContext.registerTool(tool,{signal:lifecycle.signal})).catch(()=>{});}catch(_){}};
    register({name:'read_review_game',title:'Read review game',description:'Read team scores, the next choosing team, and reviewed question IDs. Does not reveal unopened answers.',inputSchema:{type:'object',properties:{},additionalProperties:false},annotations:{readOnlyHint:true,untrustedContentHint:true},execute(input){if(input&&Object.keys(input).length)throw Error('No arguments are accepted.');return {teams:clone(state.teams),choosingTeam:active().name,reviewedQuestions:Object.keys(state.completed),finalComplete:!!state.final};}});
    register({name:'open_review_question',title:'Open review question',description:'Open a board question or lecture case for discussion. Does not reveal its answer or award points; reviewed questions open their explanation.',inputSchema:{type:'object',properties:{questionId:{type:'string',enum:QUESTIONS.map(q=>q.id)}},required:['questionId'],additionalProperties:false},annotations:{readOnlyHint:false,untrustedContentHint:false},execute(input){if(!input||typeof input.questionId!=='string'||Object.keys(input).some(k=>k!=='questionId')||!questionById(input.questionId))throw Error('Provide a valid board or lecture-case question ID.');if(state.final&&!state.completed[input.questionId])throw Error('Reset the completed game before opening a new question.');openQuestion(input.questionId);return {questionId:view.q.id,question:view.q.prompt,answerRevealed:view.revealed};}});
    window.addEventListener('pagehide',()=>lifecycle.abort(),{once:true});
  }
})();
