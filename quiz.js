/* Julebingo og terningespil bruger den eksisterende værtsstyrede live-forbindelse. */
(() => {
  const bank = [
    ['Hvilken måned fejrer vi juleaften i Danmark?', 'December', 'November', 'Januar'],
    ['Hvilken dato er juleaften i Danmark?', '24. december', '23. december', '31. december'],
    ['Hvad gemmer man traditionelt i risalamande?', 'En mandel', 'En valnød', 'En rosin'],
    ['Hvilken farve har Rudolfs næse?', 'Rød', 'Blå', 'Grøn'],
    ['Hvor mange lys er der traditionelt i en adventskrans?', 'Fire', 'Tre', 'Fem'],
    ['Hvad kaldes dagen den 31. december?', 'Nytårsaften', 'Juleaften', 'Sankthansaften'],
    ['Hvilket dyr trækker julemandens kane i fortællingerne?', 'Rensdyr', 'Løver', 'Pingviner'],
    ['Hvad hænger man ofte øverst på juletræet?', 'En stjerne', 'En stegepande', 'En støvle'],
    ['Hvilken grød forbindes traditionelt med nisser?', 'Risengrød', 'Havregrød', 'Byggrød'],
    ['Hvilken sauce serveres ofte til risalamande?', 'Kirsebærsauce', 'Bearnaisesauce', 'Tomatsauce'],
    ['Hvilken dato er første juledag?', '25. december', '24. december', '26. december'],
    ['Hvilken dato er anden juledag?', '26. december', '25. december', '27. december'],
    ['Hvad bruger man til at tælle dagene frem mod jul?', 'En julekalender', 'Et termometer', 'Et kompas'],
    ['Hvilken af disse er en klassisk dansk julesmåkage?', 'Vaniljekrans', 'Croissant', 'Baguette'],
    ['Hvad hedder Danmarks hovedstad?', 'København', 'Aarhus', 'Odense'],
    ['Hvilket land ligger Oslo i?', 'Norge', 'Sverige', 'Finland'],
    ['Hvilket land ligger Stockholm i?', 'Sverige', 'Norge', 'Island'],
    ['Hvilket land ligger Paris i?', 'Frankrig', 'Spanien', 'Italien'],
    ['Hvor mange dage er der i en uge?', 'Syv', 'Seks', 'Otte'],
    ['Hvor mange måneder er der i et år?', 'Tolv', 'Ti', 'Fjorten'],
    ['Hvor mange minutter er der i en time?', '60', '100', '30'],
    ['Hvor mange sider har en trekant?', 'Tre', 'Fire', 'Fem'],
    ['Hvor mange sider har en sekskant?', 'Seks', 'Fem', 'Otte'],
    ['Hvad er 7 + 8?', '15', '14', '16'],
    ['Hvad er 6 gange 4?', '24', '20', '28'],
    ['Hvad er halvdelen af 50?', '25', '20', '30'],
    ['Hvilken planet kaldes den røde planet?', 'Mars', 'Venus', 'Jupiter'],
    ['Hvilken planet bor vi på?', 'Jorden', 'Saturn', 'Neptun'],
    ['Hvad er Solen?', 'En stjerne', 'En planet', 'En måne'],
    ['Hvor mange ben har en edderkop?', 'Otte', 'Seks', 'Ti'],
    ['Hvor mange ben har et insekt?', 'Seks', 'Fire', 'Otte'],
    ['Hvilket dyr siger normalt mjav?', 'En kat', 'En ko', 'En and'],
    ['Hvilket dyr giver os uld til fåreuldsgarn?', 'Fåret', 'Hesten', 'Grisen'],
    ['Hvilket af disse dyr er et pattedyr?', 'Delfinen', 'Hajen', 'Torsken'],
    ['Hvilken fugl er kendt for ikke at kunne flyve?', 'Strudsen', 'Svalen', 'Ørnen'],
    ['Hvad laver bier af blomsternektar?', 'Honning', 'Smør', 'Mel'],
    ['Hvilken farve får man ved at blande blå og gul maling?', 'Grøn', 'Lilla', 'Orange'],
    ['Hvilket instrument har sorte og hvide tangenter?', 'Et klaver', 'En trompet', 'En violin'],
    ['Hvad måler et termometer?', 'Temperatur', 'Afstand', 'Vægt'],
    ['Hvilken retning peger et almindeligt kompas mod med nordenden?', 'Nord', 'Syd', 'Vest'],
    ['Hvilken årstid kommer efter vinter?', 'Forår', 'Sommer', 'Efterår'],
    ['Hvilken årstid kommer efter sommer?', 'Efterår', 'Vinter', 'Forår'],
    ['Hvilket af disse tal er et lige tal?', '12', '9', '15'],
    ['Hvad er 100 minus 25?', '75', '65', '85'],
    ['Hvilken frugt tørrer man for at lave rosiner?', 'Vindruer', 'Æbler', 'Pærer'],
    ['Hvilken grøntsag er normalt orange?', 'Gulerod', 'Agurk', 'Broccoli'],
    ['Hvad hedder en hunds unge?', 'En hvalp', 'Et føl', 'En kalv'],
    ['Hvad hedder en hests unge?', 'Et føl', 'Et lam', 'En killing']
  ];
  const shuffle = a => { for(let i=a.length-1;i>0;i--){const j=secureRandomInt(i+1);[a[i],a[j]]=[a[j],a[i]]}return a; };
  const oldRender=renderGame, oldPublic=publicStateFor, oldHandle=handleRealtimeAction;
  const oldInit=initState;
  const bingoSymbols=[
    {id:'santa',art:'bingo-santa',name:'Julemand'},{id:'gift',art:'lux-gift',name:'Gave'},{id:'tree',art:'lux-tree',name:'Juletræ'},
    {id:'deer',art:'bingo-deer',name:'Rensdyr'},{id:'snowman',art:'bingo-snowman',name:'Snemand'},{id:'bell',art:'lux-bell',name:'Klokke'},
    {id:'star',art:'lux-star',name:'Stjerne'},{id:'cookie',art:'bingo-cookie',name:'Småkage'},{id:'candle',art:'bingo-candle',name:'Julelys'},
    {id:'elf',art:'bingo-elf',name:'Nisse'},{id:'heart',art:'lux-star',name:'Julehjerte'},{id:'snow',art:'lux-snow',name:'Snefnug'},
    {id:'sock',art:'bingo-stocking',name:'Julesok'},{id:'candy',art:'bingo-candy',name:'Juleslik'},{id:'sled',art:'bingo-sleigh',name:'Kælk'},
    {id:'drum',art:'bingo-drum',name:'Tromme'},{id:'angel',art:'bingo-angel',name:'Engel'},{id:'porridge',art:'bingo-porridge',name:'Risengrød'}
  ];
  const bingoSymbolMarkup=symbol=>symbol?'<span class="bingoArt '+symbol.art+'" aria-hidden="true"></span>':'';
  let selectedGame='bingo';
  window.chooseChristmasGame=function(type){
    if(!['bingo','dice'].includes(type))return;
    selectedGame=type;show('host');
    document.getElementById('selectedGameLabel').textContent=type==='dice'?'Klassisk terningespil · Kun en 6’er giver en gave':'Julebingo · Få tre julemotiver på række og vælg en gave';
  };
  initState=function(){const s=oldInit();s.gameType=selectedGame;s.diceMisses=0;if(['dice','bingo'].includes(selectedGame))s.settings={...s.settings,chaos:false,duels:false,santa:false,chaosChance:0};return s;};
  const oldLobby=broadcastLobby, oldPlayerData=handlePlayerData;
  let sending=false;
  const turnKey=()=>String(state.turns)+':'+String(state.turnIndex);
  const bingoLines=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
  function makeBingoBoard(){return shuffle(bingoSymbols.map(x=>x.id).slice()).slice(0,9)}
  function ensureBingoBoards(){state.bingoBoards=state.bingoBoards||{};for(const p of state.players)if(!Array.isArray(state.bingoBoards[p.id])||state.bingoBoards[p.id].length!==9)state.bingoBoards[p.id]=makeBingoBoard()}
  function hasBingo(pid){const board=(state.bingoBoards||{})[pid]||[],drawn=(state.quiz&&state.quiz.drawn)||[];return bingoLines.some(line=>line.every(i=>drawn.includes(board[i])))}
  function prepare(){
    if(mode!=='host'||!state||!state.started||state.finished||state.awaitNext)return;
    /* Gemte quizspil fra ældre versioner åbnes sikkert som Julebingo. */
    if(state.gameType==='quiz'){state.gameType='bingo';state.quiz=null;state.bingoBoards={}}
    if(state.quiz && state.quiz.turn===turnKey())return;
    if(state.gameType==='dice'){
      state.quiz={turn:turnKey(),playerId:currentPlayer().id,status:'roll',recipient:null,options:[],die:null};
      state.event=currentPlayer().name+' skal slå med terningen.';return;
    }
    ensureBingoBoards();
    state.quiz={turn:turnKey(),playerId:null,status:'draw',drawPool:shuffle(bingoSymbols.map(x=>x.id).slice()),drawn:[],last:null,recipient:null};
    state.phase='Julebingo';state.event=' Julemanden er klar til at trække det første julemotiv.';
  }
  function active(pid,turn){return state&&state.started&&!state.finished&&!state.awaitNext&&state.quiz&&state.quiz.turn===turn&&state.quiz.playerId===pid&&currentPlayer().id===pid;}
  function giftTarget(){return state&&state.players.length&&state.giftCount%state.players.length===0?state.giftCount/state.players.length:Number.MAX_SAFE_INTEGER}
  function fairRecipient(preferred,exclude){
    const target=giftTarget(),preferredPlayer=state.players.find(p=>p.id===preferred);
    if(preferredPlayer&&preferredPlayer.id!==exclude&&(state.owners[preferredPlayer.id]||[]).length<target)return preferredPlayer;
    return state.players.filter(p=>p.id!==exclude&&(state.owners[p.id]||[]).length<target).sort((a,b)=>(state.owners[a.id]||[]).length-(state.owners[b.id]||[]).length)[0]||null;
  }
  function hostQuizAction(pid,d){
    if(mode!=='host'||!state||!state.started||state.finished||state.awaitNext||!state.quiz||state.quiz.turn!==d.turn)return false;
    const q=state.quiz;
    if(state.gameType==='bingo'){
      if(d.type==='bingoDraw'){
        if(pid!=='host'||q.status!=='draw'||!q.drawPool.length)return false;
        q.last=q.drawPool.shift();q.drawn.push(q.last);
        const symbol=bingoSymbols.find(x=>x.id===q.last);
        state.event='Julemanden trak '+symbol.name+'!';addLog(state.event);broadcastGame();return true;
      }
      if(d.type==='bingoClaim'){
        const player=state.players.find(p=>p.id===pid);
        if(q.status!=='draw'||!player||!hasBingo(pid)||(state.owners[pid]||[]).length>=giftTarget())return false;
        q.status='gift';q.playerId=pid;q.recipient=pid;q.correct=true;q.fairOverride=false;
        state.turnIndex=state.players.findIndex(p=>p.id===pid);
        state.event=' JULEBINGO! '+player.name+' har tre på række og må vælge en gave.';addLog(state.event);broadcastGame({kind:'bingo',emoji:'',title:'JULEBINGO!',text:player.name+' har fået tre julemotiver på række!'});return true;
      }
      if(d.type==='takeGift')return takeGiftHost(pid,d.gift,d.turn);
      return false;
    }
    if(!active(pid,d.turn))return false;
    if(d.type==='diceRoll'){
      if(state.gameType!=='dice'||q.status!=='roll')return false;
      q.die=secureRandomInt(6)+1;q.mercy=false;q.correct=q.die===6;state.diceMisses=0;
      const fair=q.correct?fairRecipient(pid):null;
      if(q.correct&&!fair){validateGameState();if(state.taken.length>=state.giftCount){finishGame();return true}q.correct=false;q.mercy=false}
      q.status=q.correct?'gift':'done';q.recipient=fair?fair.id:null;q.fairOverride=!!(fair&&fair.id!==pid);
      state.event=currentPlayer().name+' slog '+q.die+(q.correct?(q.fairOverride?' og vælger en gave til '+fair.name+', som mangler en gave!':' og må vælge en gave!'):'. Kun en 6’er giver en gave, så turen går videre.');
      addLog(state.event);
      if(!q.correct){state.awaitNext=true;state.turns++;if(state.turns%state.players.length===0)state.round++;}
      broadcastGame();return true;
    }
    if(d.type==='quizAnswer'){
      if(state.gameType==='dice')return false;
      if(q.status!=='question'||!Number.isInteger(d.answer)||d.answer<0||d.answer>2)return false;
      q.selected=d.answer;q.correct=d.answer===q.answerIndex;
      if(q.correct){const fair=fairRecipient(pid);q.recipient=fair.id;q.fairOverride=fair.id!==pid;q.status='gift';}
      else {const other=fairRecipient(null,pid);q.recipient=other?null:pid;q.fairOverride=!other;q.status=other?'recipient':'gift';}
      state.event=currentPlayer().name+(q.correct?(q.fairOverride?' svarede rigtigt – gaven går til '+state.players.find(p=>p.id===q.recipient).name+', som mangler en gave!':' svarede rigtigt!'):(q.fairOverride?' svarede forkert, men er den eneste, der mangler en gave.':' svarede forkert og giver en gave fra bunken til en anden.'));
      addLog(state.event);broadcastGame();return true;
    }
    if(d.type==='quizRecipient'){
      if(q.status!=='recipient'||d.recipient===pid||!state.players.some(p=>p.id===d.recipient&&(state.owners[p.id]||[]).length<giftTarget()))return false;
      q.recipient=d.recipient;q.status='gift';broadcastGame();return true;
    }
    if(d.type==='takeGift')return takeGiftHost(pid,d.gift,d.turn);
    return false;
  }
  publicStateFor=function(pid){
    prepare();const s=oldPublic(pid);delete s.quizDeck;
    if(s.quiz)delete s.quiz.drawPool;
    if(s.gameType==='bingo'&&s.bingoBoards)s.bingoBoards={[pid]:(s.bingoBoards[pid]||[])};
    if(s.quiz&&s.quiz.status==='question')delete s.quiz.answerIndex;
    return s;
  };
  // Presence/rejoin updates must not send a running player back to the lobby.
  broadcastLobby=function(){if(state&&state.started){broadcastGame();return}oldLobby();};
  handlePlayerData=function(d){
    if(d&&d.type==='lobby'&&d.state&&d.state.started)d={...d,type:'state'};
    if(d&&['state','welcome','lobby'].includes(d.type))sending=false;
    oldPlayerData(d);
  };
  handleRealtimeAction=function(d){
    if(!d||!['diceRoll','quizAnswer','quizRecipient','bingoClaim','takeGift','stealRoll','stealGift'].includes(d.type)){oldHandle(d);return}
    if(mode!=='host'||!state||d.roomCode!==roomCode)return;
    const p=state.players.find(p=>p.id!=='host'&&p.id===d.playerId&&p.sessionKey&&p.sessionKey===d.sessionKey&&p.device===d.device);
    if(!p)return;
    if(d.type==='stealRoll'){stealRollHost(p.id,d.turn);return}
    if(d.type==='stealGift'){stealGiftHost(p.id,+d.gift,d.turn);return}
    hostQuizAction(p.id,d);
    // Send authoritative state even when an action was stale or duplicated.
    rtSend('host-message',{target:p.device,type:'state',state:publicStateFor(p.id)});
  };
  hostSkipCurrentGameTurn=function(){
    if(mode!=='host'||!state||state.finished||state.awaitNext||state.gameType!=='dice'||!state.quiz||state.quiz.status!=='roll'||state.quiz.playerId==='host')return false;
    const p=state.players.find(x=>x.id===state.quiz.playerId);state.quiz.status='done';state.quiz.die=null;state.quiz.correct=false;state.awaitNext=true;state.turns++;if(state.turns%state.players.length===0)state.round++;
    state.event='⏭ Værten sprang '+(p?p.name:'spillerens')+' tur over.';addLog(state.event);broadcastGame();return true;
  };
  hostChooseGiftForPlayer=function(){
    if(mode!=='host'||!state||state.finished||state.awaitNext||!state.quiz||state.quiz.status!=='gift'||state.quiz.playerId==='host')return false;
    const gift=Array.from({length:state.giftCount},(_,i)=>i+1).find(n=>!state.taken.includes(n));
    if(!gift)return false;return takeGiftHost(state.quiz.playerId,gift,state.quiz.turn);
  };
  function addHostRecovery(panel,q){
    const mobileSlot=document.getElementById('hostMobileRecovery');if(mobileSlot)mobileSlot.innerHTML='';
    if(mode!=='host'||!q||q.playerId==='host'||state.awaitNext||state.finished)return;
    const player=state.players.find(p=>p.id===q.playerId);if(!player)return;
    let action='';
    if(state.gameType==='dice'&&q.status==='roll')action='<button type="button" class="btn ghost hostRecoveryBtn" onclick="hostSkipCurrentGameTurn()">⏭ VÆRT: SPRING '+escapeHtml(player.name).toUpperCase()+'S TUR OVER</button>';
    if(q.status==='gift')action='<button type="button" class="btn ghost hostRecoveryBtn" onclick="hostChooseGiftForPlayer()"> VÆRT: FORDEL EN GAVE FOR '+escapeHtml(player.name).toUpperCase()+'</button>';
    if(action&&window.innerWidth<=700&&q.status==='gift'&&mobileSlot){mobileSlot.innerHTML=action;return}
    if(action){const box=document.createElement('div');box.className='hostRecovery';box.innerHTML=action+'<small>Brug kun nødhjælpen, hvis spilleren er gået offline eller ikke kan fortsætte.</small>';panel.appendChild(box)}
  }
  function decorateRealGiftButtons(){
    const variants=[
      {key:'red',src:'julepakke-roed-v41.png'},
      {key:'green',src:'julepakke-groen-v41.png'},
      {key:'blue',src:'julepakke-blaa-v41.png'}
    ];
    const tray=document.getElementById('gifts'),buttons=tray?tray.querySelectorAll('.gift'):[];
    if(tray)tray.classList.toggle('fewRealGifts',buttons.length<=4);
    buttons.forEach((button,index)=>{
      const number=index+1,owner=ownerOf(number),variant=variants[index%variants.length];
      button.classList.add('realGift','giftVariant-'+variant.key);
      button.setAttribute('aria-label',owner?'Pakke nummer '+number+', ejet af '+owner.name:'Vælg pakke nummer '+number);
      button.replaceChildren();
      const image=document.createElement('img');image.className='realGiftImage';image.src=variant.src;image.alt='';image.setAttribute('aria-hidden','true');
      const badge=document.createElement('span');badge.className='realGiftNumber';badge.textContent='#'+number;
      button.append(image,badge);
      if(owner){const label=document.createElement('span');label.className='owned realGiftOwner';label.textContent=owner.name;button.append(label)}
    });
  }
  async function sendAction(type,extra={}){
    if(sending||!state||!state.quiz||!active(myId,state.quiz.turn))return;
    const d={roomCode,device:deviceKey(),playerId:myId,sessionKey:mySessionKey,type,turn:state.quiz.turn,actionId:nextActionId(),...extra};
    if(mode==='host'){hostQuizAction(myId,d);return}
    sending=true;renderGame();
    const ok=await rtSend('player-action',d);
    setTimeout(()=>{sending=false;if(state&&state.started&&!state.finished){renderGame();if(!ok){const b=document.getElementById('quizFeedback');if(b)b.textContent='Svaret blev ikke sendt. Kontrollér forbindelsen og prøv igen.'}}},ok?1800:0);
  }
  window.hostBingoDraw=function(){if(mode==='host'&&state&&state.quiz)hostQuizAction('host',{type:'bingoDraw',turn:state.quiz.turn})};
  window.requestBingo=async function(){
    if(sending||!state||state.gameType!=='bingo'||!state.quiz||state.quiz.status!=='draw'||!hasBingo(myId))return;
    const d={roomCode,device:deviceKey(),playerId:myId,sessionKey:mySessionKey,type:'bingoClaim',turn:state.quiz.turn,actionId:nextActionId()};
    if(mode==='host'){hostQuizAction(myId,d);return}
    sending=true;renderGame();const ok=await rtSend('player-action',d);setTimeout(()=>{sending=false;if(state&&state.started)renderGame()},ok?900:0);
  };
  requestGift=function(n){return sendAction('takeGift',{gift:n});};
  takeGiftHost=function(pid,n,turn){
    if(mode!=='host'||!active(pid,turn)||state.quiz.status!=='gift'||!Number.isInteger(n)||n<1||n>state.giftCount||state.taken.includes(n))return false;
    const q=state.quiz,to=state.players.find(p=>p.id===q.recipient);
    if(!to||(q.correct?(!q.fairOverride&&to.id!==pid):(!q.fairOverride&&to.id===pid))||(state.owners[to.id]||[]).length>=giftTarget())return false;
    q.status='done';q.gift=n;state.awaitNext=true;
    state.owners[to.id]=state.owners[to.id]||[];state.owners[to.id].push(n);state.taken.push(n);if(state.gameType==='bingo'){ensureBingoBoards();for(const p of state.players)state.bingoBoards[p.id]=makeBingoBoard()}validateGameState();state.turns++;
    state.event=currentPlayer().name+(q.correct?' valgte gave #'+n+' til '+(to.id===pid?'sig selv':to.name)+'.':' gav gave #'+n+' fra bunken til '+to.name+'.');addLog(state.event);
    if(state.taken.length>=state.giftCount){finishGame();return true}
    if(state.turns%state.players.length===0)state.round++;
    if(state.round>=2&&state.gameType==='quiz')state.phase='Julekaos';
    const cfg=state.settings||DEFAULT_SETTINGS;
    state.autoChaosPending=state.gameType==='quiz'&&state.round>=2&&cfg.chaos&&Math.random()<cfg.chaosChance/100;
    broadcastGame();
    if(state.autoChaosPending){clearTimeout(autoChaosTimer);autoChaosTimer=setTimeout(()=>{autoChaosTimer=null;if(mode==='host'&&state&&state.autoChaosPending)hostChaos(true)},700)}
    return true;
  };
  // Bonus games are still available between quiz turns, not during a question.
  for(const [name,fn] of [['hostChaos',hostChaos],['hostDuel',hostDuel],['hostSanta',hostSanta],['useBonusHost',useBonusHost]]){
    window[name]=function(...args){if(!state||state.finished||!state.awaitNext||state.gameType!=='quiz')return;return fn(...args)};
  }
  renderGame=function(){
    prepare();oldRender();if(!state||!state.started)return;
    decorateRealGiftButtons();
    const mobileRecovery=document.getElementById('hostMobileRecovery');if(mobileRecovery)mobileRecovery.innerHTML='';
    const q=state.quiz, mine=q&&q.playerId===myId, can=mine&&!sending&&!state.finished&&!state.awaitNext;
    if(window.innerWidth<=700)document.getElementById('game').classList.toggle('giftTrayOpen',!!(q&&q.status==='gift'));
    let panel=document.getElementById('quizPanel');
    if(!panel){panel=document.createElement('section');panel.id='quizPanel';panel.className='quizPanel';document.getElementById('gifts').before(panel)}
    panel.replaceChildren();
    panel.className='quizPanel '+(state.gameType==='dice'?'christmasDice':state.gameType==='bingo'?'christmasBingo':'christmasQuiz');
    const add=(tag,text,cls)=>{const el=document.createElement(tag);el.textContent=text;if(cls)el.className=cls;panel.appendChild(el);return el};
    add('div','JULECENTRALENS SPILLESTUE','christmasEyebrow');
    add('h2',state.gameType==='dice'?'KLASSISK TERNINGESPIL':state.gameType==='bingo'?'JULEBINGO':'JULEQUIZZEN');
    const target=giftTarget();if(Number.isFinite(target)&&target<Number.MAX_SAFE_INTEGER)add('div','⚖ RETFÆRDIG FORDELING · MÅL: '+target+' GAVER TIL HVER','fairShareBadge');
    let balance=document.getElementById('giftBalanceBoard');
    if(!balance){balance=document.createElement('div');balance.id='giftBalanceBoard';balance.className='giftBalanceBoard';document.getElementById('gifts').before(balance)}
    balance.innerHTML=state.players.map(p=>{const count=(state.owners[p.id]||[]).length,done=count===target;return '<div class="giftBalancePlayer '+(done?'complete':'')+'">'+avatarMarkup(p.avatar,'giftBalanceAvatar')+'<span><b>'+escapeHtml(p.name)+'</b><small>'+count+' / '+target+' gaver</small></span><i>'+(done?'✓':'')+'</i></div>'}).join('');
    if(!q){add('p','Venter på at Julecentralen starter …');return}
    if(state.gameType==='bingo'){
      document.getElementById('phase').textContent=' Julebingo';
      const me=state.players.find(p=>p.id===myId),board=(state.bingoBoards||{})[myId]||[],drawn=q.drawn||[],won=hasBingo(myId),winner=q.playerId&&state.players.find(p=>p.id===q.playerId);
      document.getElementById('turnLead').textContent=q.status==='gift'?' VI HAR JULEBINGO':' ALLE SPILLER MED';
      document.getElementById('turnName').textContent=q.status==='gift'?(winner?winner.name:'JULEBINGO'):(me?me.name:'DIN BINGOPLADE');
      const call=add('div','','bingoCaller');
      const last=bingoSymbols.find(x=>x.id===q.last);
      call.innerHTML=last?bingoSymbolMarkup(last)+'<div><small>JULEMANDEN TRAK</small><b>'+last.name+'</b></div>':'<span class="bingoArt bingo-santa" aria-hidden="true"></span><div><small>JULEMANDEN ER KLAR</small><b>Første motiv venter</b></div>';
      const boardEl=add('div','','bingoBoard');
      board.forEach((id,i)=>{const symbol=bingoSymbols.find(x=>x.id===id),cell=document.createElement('div');cell.className='bingoCell '+(drawn.includes(id)?'marked':'');cell.innerHTML=bingoSymbolMarkup(symbol)+'<small>'+symbol.name+'</small>';cell.setAttribute('aria-label',symbol.name+(drawn.includes(id)?' markeret':''));boardEl.appendChild(cell)});
      const progress=add('div',(drawn.length||0)+' af '+bingoSymbols.length+' motiver trukket','bingoProgress');
      if(q.status==='draw'){
        const action=add('div','','bingoActions');
        if(mode==='host'){const draw=document.createElement('button');draw.type='button';draw.className='btn gold';draw.textContent=' TRÆK NÆSTE MOTIV';draw.disabled=!q.drawPool||!q.drawPool.length;draw.onclick=hostBingoDraw;action.appendChild(draw)}
        const claim=document.createElement('button');claim.type='button';claim.className='btn green bingoClaim';claim.textContent=won?' JULEBINGO!':'⭐ MANGLER EN RÆKKE';claim.disabled=!won||sending||(state.owners[myId]||[]).length>=giftTarget();claim.onclick=requestBingo;action.appendChild(claim);
        document.getElementById('instruction').textContent=won?'Du har tre på række – tryk JULEBINGO!':'Følg Julemandens motiver på din egen plade.';
      }else{
        add('p',winner&&winner.id===myId?'Du har julebingo! Vælg nu en gave fra bunken.':winner.name+' har julebingo og vælger en gave.','quizFeedback');
        document.getElementById('instruction').textContent=winner&&winner.id===myId?'Vælg en gave fra bunken!':'Vent på gavevalget.';
      }
      document.querySelectorAll('#gifts .gift').forEach(b=>{b.disabled=!(q.status==='gift'&&q.playerId===myId&&!b.classList.contains('taken'));});
      addHostRecovery(panel,q);document.getElementById('secretCard').style.display='none';document.getElementById('hostBar').style.display='none';
      return;
    }
    if(state.gameType==='dice'){
      document.getElementById('phase').textContent='Slå en 6’er';
      const face=add('div','','diceFace');
      face.setAttribute('role','img');
      const pips={1:[5],2:[1,9],3:[1,5,9],4:[1,3,7,9],5:[1,3,5,7,9],6:[1,3,4,6,7,9]};
      if(q.die){pips[q.die].forEach(position=>{const pip=document.createElement('span');pip.className='diePip';pip.style.gridArea=Math.ceil(position/3)+' / '+((position-1)%3+1);pip.setAttribute('aria-hidden','true');face.appendChild(pip)});}
      else {face.textContent='✦';face.classList.add('unrolled');}
      face.setAttribute('aria-label',q.die?'Terningen viser '+q.die:'Terningen er ikke slået');
      const diceTo=q.recipient&&state.players.find(p=>p.id===q.recipient);
      const label=q.status==='roll'?(mine?'Slå med terningen. Kun en 6’er giver en gave!':'Vent, mens '+currentPlayer().name+' slår.') :q.status==='gift'?(mine?'Du slog en 6’er! Vælg en gave fra bunken til '+(diceTo&&diceTo.id!==q.playerId?diceTo.name:'dig selv')+'.':currentPlayer().name+' slog en 6’er og vælger en gave.') : 'Terningen viste '+q.die+'. '+(q.correct?'Gaven er fordelt. ':'Ingen gave denne gang. ')+'Værten fortsætter til næste spiller.';
      const feedback=add('p',sending?'Sender dit kast …':label,'quizFeedback');feedback.id='quizFeedback';feedback.setAttribute('aria-live','polite');
      if(q.status==='roll'){const b=add('button','SLÅ MED TERNINGEN','btn green');b.type='button';b.disabled=!can;b.addEventListener('click',()=>sendAction('diceRoll'));}
      document.getElementById('instruction').textContent=label;
      document.querySelectorAll('#gifts .gift').forEach(b=>{b.disabled=!(can&&q.status==='gift'&&!b.classList.contains('taken'));});
      addHostRecovery(panel,q);document.getElementById('secretCard').style.display='none';document.getElementById('hostBar').style.display='none';
      return;
    }
    add('p',q.question,'quizQuestion');
    const list=document.createElement('div');list.className='quizAnswers';panel.appendChild(list);
    q.options.forEach((text,i)=>{
      const b=document.createElement('button');b.type='button';b.className='btn ghost quizAnswer';b.textContent=String.fromCharCode(65+i)+' · '+text;
      b.disabled=!can||q.status!=='question';
      if(q.status!=='question'&&i===q.answerIndex)b.classList.add('quizRight');
      if(q.status!=='question'&&i===q.selected&&q.correct===false)b.classList.add('quizWrong');
      b.addEventListener('click',()=>sendAction('quizAnswer',{answer:i}));list.appendChild(b);
    });
    let text='';
    if(q.status==='question')text=mine?'Vælg ét svar. Rigtigt: en gave til dig. Forkert: en gave fra bunken til en anden.':'Vent, mens '+currentPlayer().name+' svarer.';
    else if(q.status==='recipient')text='Forkert svar. Det rigtige svar er '+q.options[q.answerIndex]+'. '+(mine?'Vælg, hvem der skal have en gave fra bunken.':'Spilleren vælger en modtager.');
    else if(q.status==='gift'){const to=state.players.find(p=>p.id===q.recipient);text=(q.correct?'Rigtigt svar! ':'Forkert svar. Det rigtige svar er '+q.options[q.answerIndex]+'. ')+(mine?'Vælg en gave fra bunken til '+(to.id===q.playerId?'dig selv':to.name)+'.':'Venter på gavevalget.');}
    else text='Gaven er fordelt. Værten fortsætter til næste spiller.';
    const feedback=add('p',sending?'Sender dit valg …':text,'quizFeedback');feedback.id='quizFeedback';feedback.setAttribute('aria-live','polite');
    document.getElementById('instruction').textContent=text;
    if(q.status==='recipient'){
      const recipients=add('div','','quizAnswers');
      state.players.filter(p=>p.id!==q.playerId&&(state.owners[p.id]||[]).length<giftTarget()).forEach(p=>{const b=document.createElement('button');b.type='button';b.className='btn green';b.textContent=p.name+' · '+(state.owners[p.id]||[]).length+'/'+giftTarget()+' gaver';b.disabled=!can;b.addEventListener('click',()=>sendAction('quizRecipient',{recipient:p.id}));recipients.appendChild(b)});
    }
    document.querySelectorAll('#gifts .gift').forEach(b=>{b.disabled=!(can&&q.status==='gift'&&!b.classList.contains('taken'));});
    document.querySelectorAll('#hostBar .btn').forEach(b=>{b.disabled=!state.awaitNext||state.finished});
    const bonus=document.getElementById('bonusBtn');if(bonus)bonus.disabled=bonus.disabled||!state.awaitNext||state.finished;
  };
})();

/* Retfærdig gavefinale og frivillig tyverirunde. */
(function(){
  const oldStart=hostStartGame,oldFinish=finishGame,oldRenderFinish=renderFinish;
  let stealSending=false;

  hostStartGame=function(){
    if(mode==='host'&&state&&state.players.length&&state.giftCount%state.players.length!==0){
      const rest=state.giftCount%state.players.length;
      alert('For at alle kan få præcis lige mange gaver, skal det samlede antal kunne deles med '+state.players.length+' spillere. Lige nu er der '+state.giftCount+' gaver – tilføj eller fjern '+Math.min(rest,state.players.length-rest)+' gave(r).');
      return;
    }
    return oldStart();
  };

  function repairEqualGiftDistribution(){
    if(!state||!Array.isArray(state.players)||!state.players.length||!Number.isSafeInteger(state.giftCount)||state.giftCount<1||state.giftCount%state.players.length!==0)return false;
    const target=state.giftCount/state.players.length,seen=new Set();
    state.owners=state.owners||{};
    for(const player of state.players){
      const clean=[];
      for(const raw of Array.isArray(state.owners[player.id])?state.owners[player.id]:[]){
        const gift=Number(raw);
        if(Number.isInteger(gift)&&gift>=1&&gift<=state.giftCount&&!seen.has(gift)){seen.add(gift);clean.push(gift)}
      }
      state.owners[player.id]=clean;
    }
    for(const player of state.players)state.owners[player.id].sort((a,b)=>a-b);
    state.taken=state.players.flatMap(player=>state.owners[player.id]).sort((a,b)=>a-b);
    validateGameState();
    const assigned=state.players.flatMap(player=>state.owners[player.id]);
    const valid=assigned.length===state.giftCount&&new Set(assigned).size===state.giftCount&&state.players.every(player=>state.owners[player.id].length===target);
    if(valid){const line='Slutkontrol bestået: '+state.players.length+' spillere har præcis '+target+' gave(r) hver.';if(!state.log||state.log[state.log.length-1]!==line)addLog(line)}
    return valid;
  }

  finishGame=function(){
    if(state)validateGameState();
    if(state&&state.taken.length>=state.giftCount){
      if(!repairEqualGiftDistribution()){
        state.finished=false;
        state.event='⚠ Julecentralen kunne ikke godkende gavefordelingen. Spillet er sat på pause uden at åbne pakkerne.';
        addLog(state.event);
        if(mode==='host')broadcastGame();
        return false;
      }
      state.stealRound={active:false,completed:false,turnIndex:0,turns:0,maxTurns:state.players.length*6,status:'idle',die:null,history:[],minSwaps:2,swapCounts:{},missStreaks:{}};
    }
    return oldFinish();
  };

  function sendFinishState(special){
    renderFinish();cloudSaveState();
    const broadcastSpecial=special&&special.kind==='steal'?null:special;
    if(mode==='host'&&realtimeChannel){
      for(const p of state.players.filter(x=>x.id!=='host'))rtSend('host-message',{target:p.device,type:'state',state:publicStateFor(p.id),special:broadcastSpecial||null});
    }
    if(broadcastSpecial)showSpecial(broadcastSpecial);
  }

  startStealRound=function(){
    if(mode!=='host'||!state||!state.finished)return;
    if(state.players.length<2){alert('Tyverirunden kræver mindst to spillere, så der er nogen at bytte pakker med.');return}
    if(!repairEqualGiftDistribution()){alert('Julecentralens slutkontrol fandt en fejl i gavefordelingen. Tyverirunden er låst, indtil alle gaver kan fordeles lige.');return}
    const equal=state.players.map(p=>(state.owners[p.id]||[]).length);
    if(!equal.length||!equal.every(n=>n===equal[0])||equal[0]<1){alert('Tyverirunden kan først starte, når alle har lige mange gaver.');return}
    state.stealRound={active:true,completed:false,turnIndex:secureRandomInt(state.players.length),turns:0,maxTurns:state.players.length*6,status:'roll',die:null,history:[],minSwaps:2,swapCounts:{},missStreaks:{}};
    for(const p of state.players){state.stealRound.swapCounts[p.id]=0;state.stealRound.missStreaks[p.id]=0}
    const player=state.players[state.stealRound.turnIndex];
    addLog(' Tyverirunden begyndte. '+player.name+' starter.');
    sendFinishState({kind:'steal',emoji:'',title:'TYVERIRUNDEN STARTER!',text:player.name+' starter. Alle skal gennemføre to bytter, og en 1’er åbner pakkevælgeren.'});
  };

  function ensureStealProgress(sr){
    sr.minSwaps=2;sr.swapCounts=sr.swapCounts||{};sr.missStreaks=sr.missStreaks||{};
    for(const p of state.players){if(!Number.isInteger(sr.swapCounts[p.id]))sr.swapCounts[p.id]=0;if(!Number.isInteger(sr.missStreaks[p.id]))sr.missStreaks[p.id]=0}
  }

  function stealProgressComplete(sr){
    ensureStealProgress(sr);return state.players.every(p=>sr.swapCounts[p.id]>=sr.minSwaps);
  }

  function nextStealPlayerIndex(sr){
    ensureStealProgress(sr);
    for(let step=1;step<=state.players.length;step++){
      const index=(sr.turnIndex+step)%state.players.length;
      if(sr.swapCounts[state.players[index].id]<sr.minSwaps)return index;
    }
    return -1;
  }

  endStealRound=function(){
    if(mode!=='host'||!state||!state.stealRound||!state.stealRound.active)return;
    const sr=state.stealRound;ensureStealProgress(sr);
    if(!stealProgressComplete(sr)){
      const missing=state.players.filter(p=>sr.swapCounts[p.id]<sr.minSwaps).map(p=>p.name+' mangler '+(sr.minSwaps-sr.swapCounts[p.id])).join(', ');
      alert('Tyverirunden kan først afsluttes, når alle har gennemført to bytter. '+missing+'.');return;
    }
    if(!repairEqualGiftDistribution()){alert('Afslutningen blev stoppet, fordi gavefordelingen ikke kunne godkendes.');return}
    sr.active=false;sr.completed=true;
    addLog(' Værten afsluttede tyverirunden.');
    sendFinishState({kind:'finish',emoji:'',title:'GAVERNE MÅ ÅBNES!',text:'Alle har lige mange gaver – nu må pakkerne åbnes!'});
  };

  stealRollHost=function(pid,turn){
    const sr=state&&state.stealRound;
    if(mode!=='host'||!state||!state.finished||!sr||!sr.active||sr.status!=='roll'||turn!==sr.turns)return false;
    const player=state.players[sr.turnIndex];
    if(!player||player.id!==pid)return false;
    ensureStealProgress(sr);
    const guaranteed=sr.swapCounts[pid]<sr.minSwaps&&sr.missStreaks[pid]>=2;
    sr.die=guaranteed?1:secureRandomInt(6)+1;
    sr.missStreaks[pid]=sr.die===1?0:sr.missStreaks[pid]+1;
    sr.status=sr.die===1?'gift':'done';
    addLog(' '+player.name+' slog '+sr.die+(sr.die===1?' og skal bytte en gave!':'. Ingen gavebytte denne gang.'));
    sendFinishState({kind:'steal',emoji:sr.die===1?'✨':'❄',title:sr.die===1?'DU SLOG EN 1’ER!':'TERNINGEN VISTE '+sr.die,text:sr.die===1?'Vælg nu en lukket pakke fra en anden spiller.':(sr.missStreaks[pid]>=2?'Næste kast bliver hjulpet frem til en 1’er, så alle får deres to bytter.':'Ingen gavebytte på denne tur.')});
    return true;
  };

  stealGiftHost=function(pid,gift,turn){
    const sr=state&&state.stealRound;
    if(mode!=='host'||!state||!state.finished||!sr||!sr.active||sr.status!=='gift'||sr.die!==1||turn!==sr.turns)return false;
    const thief=state.players[sr.turnIndex];
    if(!thief||thief.id!==pid||!Number.isInteger(gift))return false;
    const victim=state.players.find(p=>p.id!==pid&&(state.owners[p.id]||[]).includes(gift));
    const mine=(state.owners[pid]||[]).slice();
    if(!victim||!mine.length)return false;
    const returned=mine[secureRandomInt(mine.length)];
    state.owners[victim.id]=state.owners[victim.id].filter(g=>g!==gift);
    state.owners[pid]=state.owners[pid].filter(g=>g!==returned);
    state.owners[pid].push(gift);state.owners[victim.id].push(returned);
    sr.history.push({thief:pid,victim:victim.id,gift,returned});
    ensureStealProgress(sr);sr.swapCounts[pid]++;
    addLog(' '+thief.name+' stjal gave #'+gift+' fra '+victim.name+'. En hemmelig pakke blev sendt tilbage.');
    sr.status='done';
    sendFinishState({kind:'steal',emoji:'✨',title:'PAKKEN ER BYTTET!',text:thief.name+' og '+victim.name+' har byttet en hemmelig pakke.'});
    return true;
  };

  hostNextStealTurn=function(){
    const sr=state&&state.stealRound;
    if(mode!=='host'||!sr||!sr.active||sr.status!=='done')return false;
    sr.turns++;
    if(stealProgressComplete(sr)){
      if(!repairEqualGiftDistribution()){alert('Afslutningen blev stoppet, fordi gavefordelingen ikke kunne godkendes.');return false}
      sr.active=false;sr.completed=true;
      sendFinishState({kind:'finish',emoji:'',title:'TYVERIRUNDEN ER SLUT!',text:'Alle har stadig lige mange gaver. Nu må pakkerne åbnes!'});
    }else{
      sr.turnIndex=nextStealPlayerIndex(sr);
      sr.status='roll';sr.die=null;
      const next=state.players[sr.turnIndex];
      const done=sr.swapCounts[next.id]||0;
      sendFinishState({kind:'steal',emoji:'',title:'NÆSTE TERNINGEKAST!',text:next.name+' skal nu forsøge at slå en 1’er til bytte '+(done+1)+' af 2.'});
    }
    return true;
  };

  hostSkipStealTurn=function(){
    const sr=state&&state.stealRound;
    if(mode!=='host'||!sr||!sr.active||!state.players[sr.turnIndex])return false;
    const skipped=state.players[sr.turnIndex];
    addLog('⏭ Værten sprang '+skipped.name+'s tur over.');
    sr.status='done';
    return hostNextStealTurn();
  };

  hostAssistStealRoll=function(){
    const sr=state&&state.stealRound;if(mode!=='host'||!sr||!sr.active||sr.status!=='roll')return false;
    const player=state.players[sr.turnIndex];return player?stealRollHost(player.id,sr.turns):false;
  };

  hostAssistStealGift=function(gift){
    const sr=state&&state.stealRound;if(mode!=='host'||!sr||!sr.active||sr.status!=='gift')return false;
    const player=state.players[sr.turnIndex];return player?stealGiftHost(player.id,Number(gift),sr.turns):false;
  };

  requestStealRoll=async function(){
    const sr=state&&state.stealRound;
    if(stealSending||!sr||!sr.active||sr.status!=='roll'||state.players[sr.turnIndex].id!==myId)return;
    if(mode==='host'){stealRollHost(myId,sr.turns);return}
    stealSending=true;renderFinish();
    const ok=await rtSend('player-action',{roomCode,device:deviceKey(),playerId:myId,sessionKey:mySessionKey,type:'stealRoll',turn:sr.turns,actionId:nextActionId()});
    setTimeout(()=>{stealSending=false;if(state&&state.finished)renderFinish()},ok?1200:0);
  };

  requestSteal=async function(gift){
    const sr=state&&state.stealRound;
    if(stealSending||!sr||!sr.active||sr.status!=='gift'||sr.die!==1||state.players[sr.turnIndex].id!==myId)return;
    if(mode==='host'){stealGiftHost(myId,gift,sr.turns);return}
    stealSending=true;renderFinish();
    const ok=await rtSend('player-action',{roomCode,device:deviceKey(),playerId:myId,sessionKey:mySessionKey,type:'stealGift',gift,turn:sr.turns,actionId:nextActionId()});
    setTimeout(()=>{stealSending=false;if(state&&state.finished)renderFinish()},ok?1200:0);
  };

  renderFinish=function(){
    /* Slutvisningen må altid bygges fra én kanonisk ejerliste. Det forhindrer
       gamle klientdata i at vise en anden fordeling end værten. */
    if(state&&state.finished){
      repairEqualGiftDistribution();
    }
    oldRenderFinish();
    const sr=state.stealRound||{active:false,completed:false};
    const intro=document.getElementById('finishIntro'),panel=document.getElementById('stealPanel');
    const finishScreen=document.getElementById('finish'),edition=finishScreen.querySelector('.finishEdition');
    const start=document.getElementById('stealStartBtn'),end=document.getElementById('stealEndBtn'),fresh=document.getElementById('finishNewGameBtn');
    start.style.display=mode==='host'&&!sr.active&&!sr.completed?'block':'none';
    end.style.display=mode==='host'&&sr.active?'block':'none';
    fresh.style.display=sr.active?'none':'block';
    panel.style.display=sr.active?'block':'none';
    intro.style.display=sr.active?'none':'block';
    finishScreen.classList.toggle('stealActive',!!sr.active);
    edition.textContent=sr.active?'JULECENTRALENS LUKSUS-TYVERIFINALE · V85':'DEN STORE GAVEFINALE · V85';
    if(!sr.active){
      end.disabled=false;end.textContent='AFSLUT TYVERIRUNDEN';
      const target=state.players.length?state.giftCount/state.players.length:0,equal=Number.isInteger(target)&&state.players.every(p=>(state.owners[p.id]||[]).length===target);
      let seal=document.getElementById('fairFinalSeal');
      if(!seal){seal=document.createElement('div');seal.id='fairFinalSeal';seal.className='fairFinalSeal';document.getElementById('scores').before(seal)}
      seal.innerHTML=equal?luxIconMarkup('star')+'<div><b>JULECENTRALENS SLUTKONTROL BESTÅET</b><small>Alle spillere har præcis '+target+' '+(target===1?'gave':'gaver')+' hver</small></div>':luxIconMarkup('settings')+'<div><b>FORDELINGEN SKAL KONTROLLERES</b><small>Pakkerne må ikke åbnes endnu</small></div>';
      seal.classList.toggle('warning',!equal);
      document.getElementById('finishTitle').textContent=sr.completed?'GAVERNE MÅ ÅBNES!':'GAVERNE ER FORDELT!';
      if(sr.completed)intro.innerHTML='<div class="big"></div><h2>TYVERIRUNDEN ER SLUT!</h2><p>Alle har stadig lige mange gaver. Nu må de hemmelige pakker åbnes!</p>';
      return;
    }
    ensureStealProgress(sr);
    const finalSeal=document.getElementById('fairFinalSeal');if(finalSeal)finalSeal.remove();
    document.getElementById('finishTitle').textContent='AT STJÆLE PAKKER';
    const current=state.players[sr.turnIndex],mine=current.id===myId;
    document.getElementById('scores').innerHTML='';
    const currentSwaps=sr.swapCounts[current.id]||0,misses=sr.missStreaks[current.id]||0,complete=stealProgressComplete(sr);
    end.disabled=!complete;end.textContent=complete?'AFSLUT TYVERIRUNDEN':'LÅST · ALLE SKAL BYTTE 2 GANGE';
    const progress='<div class="stealProgress">'+state.players.map(p=>{const count=Math.min(sr.minSwaps,sr.swapCounts[p.id]||0);return '<div class="stealProgressPlayer '+(p.id===current.id?'current':'')+' '+(count>=sr.minSwaps?'complete':'')+'">'+avatarMarkup(p.avatar,'stealProgressAvatar')+'<span><b>'+escapeHtml(p.name)+'</b><small>'+count+' af '+sr.minSwaps+' bytter</small></span><i>'+Array.from({length:sr.minSwaps},(_,i)=>'<em class="'+(i<count?'filled':'')+'"></em>').join('')+'</i></div>'}).join('')+'</div>';
    const step=sr.status==='roll'?1:sr.status==='gift'?2:3;
    const steps='<div class="stealSteps"><span class="'+(step>=1?'active':'')+'"><i>1</i>SLÅ</span><b></b><span class="'+(step>=2?'active':'')+'"><i>2</i>VÆLG</span><b></b><span class="'+(step>=3?'active':'')+'"><i>3</i>BYT</span></div>';
    let html=progress+'<div class="stealTurnHero">'+avatarMarkup(current.avatar,'stealHeroAvatar')+'<div><small>JULECENTRALENS TYVERIFINALE</small><h2>'+(mine?'DET ER DIN TUR, ':'NU SPILLER ')+escapeHtml(current.name).toUpperCase()+'</h2><p>Bytte '+Math.min(currentSwaps+1,2)+' af 2 · '+(currentSwaps===0?'første luksusbytte':'sidste luksusbytte')+'</p></div></div>'+steps;
    if(sr.status==='roll'){
      html+='<div class="stealInstruction"><b>SLÅ EN 1’ER OG ÅBN PAKKEVAULTEN</b><small>'+(misses>=2?'Julecentralens garanti er aktiveret: Dette kast bliver en 1’er.':'Efter to forgæves kast sikrer Julecentralen, at næste kast bliver en 1’er.')+'</small></div><div class="stealDie unrolled">'+luxIconMarkup('die')+'</div>'+(mine&&!stealSending?'<button class="btn stealRollBtn" onclick="requestStealRoll()">'+luxIconMarkup('die')+'<span>SLÅ MED TERNINGEN</span></button>':'<div class="stealWaiting">Venter på '+escapeHtml(current.name)+'s terningekast…</div>')+(mode==='host'&&!mine?'<button class="btn gold stealAssistBtn" onclick="hostAssistStealRoll()">'+luxIconMarkup('die')+'<span>VÆRT: SLÅ FOR '+escapeHtml(current.name).toUpperCase()+'</span></button>':'');
      panel.innerHTML=html;return;
    }
    const stealPips={1:[5],2:[1,9],3:[1,5,9],4:[1,3,7,9],5:[1,3,5,7,9],6:[1,3,4,6,7,9]};
    html+='<div class="stealDie visualDie" role="img" aria-label="Terningen viser '+sr.die+'">'+stealPips[sr.die].map(pos=>'<i class="stealPip" style="grid-area:'+Math.ceil(pos/3)+' / '+((pos-1)%3+1)+'"></i>').join('')+'</div>';
    if(sr.status==='done'){
      html+='<div class="stealResult '+(sr.die===1?'success':'miss')+'"><b>'+(sr.die===1?'BYTTET ER GENNEMFØRT':'TERNINGEN VISTE '+sr.die)+'</b><small>'+(sr.die===1?escapeHtml(current.name)+' har nu gennemført '+(sr.swapCounts[current.id]||0)+' af 2 bytter.':(sr.missStreaks[current.id]>=2?'Næste kast er garanteret til at blive en 1’er.':'Ingen pakke skifter hænder på dette kast.'))+'</small></div>'+(mode==='host'?'<button class="btn gold stealNextBtn" onclick="hostNextStealTurn()">'+luxIconMarkup('star')+'<span>NÆSTE TUR</span></button>':'<div class="stealWaiting">Værten fortsætter til næste spiller…</div>');
      panel.innerHTML=html;return;
    }
    html+='<div class="stealInstruction success"><b>1’EREN ÅBNEDE PAKKEVAULTEN</b><small>'+(mine?'Vælg én lukket gave. En af dine egne pakker sendes automatisk tilbage.':escapeHtml(current.name)+' vælger nu en pakke. Værten kan hjælpe, hvis enheden er offline.')+'</small></div><div class="stealOwners">';
    const packageArt=['julepakke-roed-v41.png','julepakke-groen-v41.png','julepakke-blaa-v41.png'];
    for(const owner of state.players.filter(p=>p.id!==current.id)){
      html+='<div class="stealOwner"><b class="stealOwnerName">'+avatarMarkup(owner.avatar,'stealAvatar')+'<span>'+escapeHtml(owner.name)+'<small>Vælg en hemmelig pakke</small></span></b><div class="stealGifts">';
      for(const gift of (state.owners[owner.id]||[])){const enabled=(mine&&!stealSending)||(mode==='host'&&!mine),action=mode==='host'&&!mine?'hostAssistStealGift('+gift+')':'requestSteal('+gift+')',art=packageArt[(gift-1)%packageArt.length];html+='<button class="stealGift" '+(enabled?'':'disabled')+' onclick="'+action+'"><img src="'+art+'" alt="Lukket julepakke nummer '+gift+'"><span>PAKKE #'+gift+'</span><small>Tryk for at bytte</small></button>'}
      html+='</div></div>';
    }
    panel.innerHTML=html+'</div>';
  };
})();
