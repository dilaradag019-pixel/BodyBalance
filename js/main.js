//==================================================
// BODYBALANCE
// Version : v0.3 - Awakening
// Part 1 / 3
//==================================================


//--------------------------------------------------
// GLOBAL VARIABLES
//--------------------------------------------------
let breathe = 0;
let pulse = 0;

let bodyBalanceIndex = 84;

// ==========================
// Sağlık Verileri
// ==========================

let heartRate = 72;          // BPM
let waterAmount = 2.3;    // Litre
let sleepHours = 7.7;        // Saat
let stepCount = 7421;        // Adım
let calorieIntake = 1840;    // kcal
let mindScore = 82;          // 0-100

let statusWater = "1.8 / 2.5 L";
let statusSleep = "7 Saat 42 dk";
let statusMovement = "7421";
let statusHeart = "72 BPM";
let statusNutrition = "1840 kcal";
let statusMind = "%82";

let pulseHistory = [
  72,
  74,
  71,
  73,
  75,
  72,
  70
];

let pulseEvaluation = "";

let pulseAnalysis = "";

let appVersion = "v1.0";

let darkTheme = false;
let notifications = true;
let soundOn = true;

let currentScreen = "welcome";

let buttonScale = 1;

let pulseMessages = [

"Merhaba! Ben Pulse. 💙",

"Bugün seni tekrar görmek güzel.",

"Vücudunu keşfetmeye hazır mısın?"

];

let currentMessage = 0;

let shownText = "";
let charIndex = 0;

let playerName = "";
// ------------------------
// Dashboard Animasyonları
// ------------------------

let dashboardAnim = 0;

let iconSize = 55;

//------------------------
// Modül Sistemi
//------------------------

let selectedModule = "";

//------------------------
// Üst Menü
//------------------------

let pulseIcon = {
  x: 305,
  y: 55,
  r: 18
};

let profileIcon = {
  x: 335,
  y: 55,
  r: 18
};

let settingsIcon = {
  x: 365,
  y: 55,
  r: 18
};

let moduleMessage = "";

let userLevel = 1;
let streakDays = 3;
let achievementCount = 0;
let totalWater = 5;

let totalLoginDays = 12;

let motivationText = "Harika gidiyorsun! 💙";

let currentMenu ="";



//--------------------------------------------------
// SETUP
//--------------------------------------------------

function setup() {
  // Canvas'ı oluştur ve bir değişkene ata
  let cnv = createCanvas(min(windowWidth, 390), min(windowHeight, 844));
  
  // Canvas'ı tarayıcıda ortalamak için CSS stilleri
  cnv.style('display', 'block');
  cnv.style('margin', 'auto');
  
  textFont("Arial");
  
  // Arayüz elementlerini sadece bir kez oluştur
  createWelcomeUI();

  generatePulseAnalysis();

  generatePulseEvaluation();

}



//--------------------------------------------------
// RESIZE
//--------------------------------------------------

function windowResized() {
  // 1. Canvas'ı yeniden boyutlandır
  resizeCanvas(
    min(windowWidth, 390),
    min(windowHeight, 844)
  );

  // 2. CSS stillerini tekrar uygula (ortalamanın bozulmaması için)
  // Canvas'ı seçip stilini güncelliyoruz
  let cnv = document.querySelector('canvas');
  if (cnv) {
    cnv.style.display = 'block';
    cnv.style.margin = 'auto';
  }

  // 3. Input ve Butonu doğru konuma taşı
  if (nameInput && startButton) {
    let canvasX = (windowWidth - width) / 2;
    let canvasY = (windowHeight - height) / 2;
    
    // Konumları, canvas'ın yeni durumuna göre güncelle
    nameInput.position(canvasX + 75, canvasY + 418);
    startButton.position(canvasX + 95, canvasY + 520);
  }
}

//--------------------------------------------------
// DRAW
//--------------------------------------------------

function draw(){

  // Animasyonlar
  animateSystem();

  // Dashboard animasyonu
  if(currentScreen=="dashboard"){
    dashboardAnim += 0.04;
  }

  // Ekran yönetimi
  if(currentScreen=="welcome"){

    drawWelcome();

  }

  else if(currentScreen=="dashboard"){

    drawDashboard();

  }

  else if(currentScreen=="module"){

    drawModule();

  }

  else if(currentScreen=="menu"){

    drawMenu();

  }

  else if(currentScreen=="about"){

    drawAbout();

  }


  else if(currentScreen=="pulse"){

   drawPulse();

  }

  else if(currentScreen=="pulseTomorrow"){

    drawPulseTomorrow();

  }

  else if(currentScreen=="saveData"){

   drawSaveData();

  }


}

//--------------------------------------------------
// ANIMATION SYSTEM
//--------------------------------------------------

function animateSystem(){

    breathe += 0.04;

    pulse += 0.12;

    let target = pulseMessages[currentMessage];

    if(frameCount%3==0){

        if(charIndex<target.length){

            charIndex++;

            shownText = target.substring(

                0,

                charIndex

            );

        }

    }

    if(frameCount%240==0){

        nextMessage();

    }

  calculateBodyBalance();
}


//--------------------------------------------------
// WELCOME SCREEN
//--------------------------------------------------

function drawWelcome(){

    drawBackground();

    drawTitle();

    drawAvatar();

    drawNameBox();

    drawButton();

    drawPulseAssistant();

    drawFooter();

}


//==================================================
// PART 1 END
//==================================================
//--------------------------------------------------
// BACKGROUND
//--------------------------------------------------

function drawBackground(){

  for(let y=0; y<height; y++){

    let c = lerpColor(

      color(220,245,232),

      color(250,250,248),

      y/height

    );

    stroke(c);

    line(0,y,width,y);

  }

}


//--------------------------------------------------
// TITLE
//--------------------------------------------------

function drawTitle(){

  noStroke();

  textAlign(CENTER);

  fill(35);

  textSize(34);

  textStyle(BOLD);

  text("BodyBalance",width/2,80);

  fill(90);

  textSize(19);

  textStyle(NORMAL);

  text("Hoş Geldin",width/2,120);

  fill(120);

  textSize(15);

  text("Bugün vücudunu keşfetmeye hazır mısın?",width/2,155);

}


//--------------------------------------------------
// AVATAR
//--------------------------------------------------

function drawAvatar(){

  let move = sin(breathe)*3;

  fill(255);

  stroke(220);

  strokeWeight(2);

  circle(width/2,270+move,130);

  // kafa

  noStroke();

  fill(130);

  circle(width/2,248+move,30);

  // gövde

  stroke(130);

  strokeWeight(6);

  line(width/2,278+move,width/2,325+move);

  // kollar

  line(width/2-25,298+move,width/2+25,298+move);

  // atan kalp

  noStroke();

  fill(255,80,80);

  let heart = 16 + sin(pulse)*2;

  circle(width/2-14,288+move,heart);

  circle(width/2-2,288+move,heart);

  triangle(

    width/2-22,
    292+move,

    width/2+6,
    292+move,

    width/2-8,
    308+move

  );

}


//--------------------------------------------------
// NAME BOX
//--------------------------------------------------

function drawNameBox(){

  fill(255);

  stroke(220);

  strokeWeight(2);

  rect(65,410,260,52,15);

  noStroke();

  fill(130);

  textAlign(CENTER);

  textSize(16);

  text("Karakter İsmi",width/2,442);

}


//--------------------------------------------------
// BUTTON
//--------------------------------------------------

function drawButton(){

  let hover =

  mouseX>70 &&
  mouseX<320 &&
  mouseY>520 &&
  mouseY<575;

  push();

  translate(width/2,548);

  scale(hover ? 1.03 : 1);

  rectMode(CENTER);

  noStroke();

  fill(60,170,255);

  rect(0,0,250,55,18);

  fill(255);

  textAlign(CENTER,CENTER);

  textSize(18);

  text("Keşfetmeye Başla",0,2);

  pop();

}


//--------------------------------------------------
// FOOTER
//--------------------------------------------------

function drawFooter(){

  noStroke();

  fill(120);

  textAlign(CENTER);

  textSize(14);

  text("Vücudun seninle konuşuyor.",width/2,790);

}


//--------------------------------------------------
// PART 2 END
//--------------------------------------------------
 
//--------------------------------------------------
// PULSE ASSISTANT
//--------------------------------------------------

function drawPulseAssistant(){

  fill(255);
  stroke(235);
  strokeWeight(1);

  rect(35,610,width-70,90,18);

  noStroke();

  fill(60,170,255);
  circle(60,640,20);

  fill(255);
  textAlign(CENTER,CENTER);
  textSize(12);
  text("P",60,640);

  fill(70);
  textAlign(LEFT,CENTER);
  textSize(14);

  text(
    shownText,
    85,
    640,
    width-120,
    60
  );
}


//--------------------------------------------------
// NEXT MESSAGE
//--------------------------------------------------

function nextMessage(){

  currentMessage++;

  if(currentMessage >= pulseMessages.length){

    currentMessage = 0;

  }

  charIndex = 0;
  shownText = "";

}


//--------------------------------------------------
// DASHBOARD
//--------------------------------------------------


  function drawDashboard() {
  background(238, 248, 243);

  // BAŞLIK
  fill(35);
  noStroke();
  textAlign(CENTER);
  textSize(30);
  textStyle(BOLD);
  text("BodyBalance", width / 2-25, 60);

  textSize(18);
  textStyle(NORMAL);
  fill(90);
  text("Hoş geldin " + playerName + " 💙", width / 2, 95);

  // AVATAR
  drawDashboardAvatar();

  // SAĞLIK İKONLARI
  drawHealthIcons();

  //MENÜ

  drawTopMenu();


  // PULSE PANELİ (Dijital Asistan)
  push(); // Ayarları bu bloğa hapsediyoruz
  rectMode(CORNER); // Panel için sol-üst köşe referanslı çizimi zorunlu kılıyoruz
  
  fill(255);
  stroke(235);
  strokeWeight(1);
  rect(35, height - 140, width - 70, 90, 18);

  noStroke();
  fill(60, 170, 255);
  circle(60, height - 95, 20);

  fill(255);
  textAlign(CENTER, CENTER);
  textSize(12);
  text("P", 60, height - 95);

  fill(70);
  textAlign(LEFT, CENTER);
  textSize(14);
  text(shownText, 85, height - 95, width - 120, 60);
  pop(); // Ayarları önceki haline (CENTER moduna) geri döndürür
}

//--------------------------------------------------
// CARD
//--------------------------------------------------

function drawCard(x, y, icon, title) {
  fill(255);
  stroke(225);
  strokeWeight(2);
  // Kartı biraz daha küçük yapıyoruz (145x110 -> 120x90)
  rect(x, y, 120, 90, 20); 

  noStroke();
  textAlign(CENTER);
  
  // İkonu küçültüyoruz
  textSize(22); 
  text(icon, x + 60, y + 35); 

  fill(60);
  // Yazıyı küçültüyoruz
  textSize(13); 
  text(title, x + 60, y + 70); 
}

//==================================================
// BODYBALANCE
// v0.4 - Identity
// PART 1 / 3
//==================================================

//----------------------------
// Kullanıcı Bilgileri
//----------------------------

let nameInput;
let startButton;


//----------------------------
// HTML Elemanlarını Oluştur
//----------------------------

function createWelcomeUI() {
  // Canvas'ın sayfadaki konumunu alıyoruz
  let canvasX = (windowWidth - width) / 2;
  let canvasY = (windowHeight - height) / 2;

  // İsim kutusu
  nameInput = createInput("");
  nameInput.position(canvasX + 75, canvasY + 418); // Canvas içi koordinata offset ekliyoruz
  nameInput.size(240, 40);
  nameInput.attribute("placeholder", "İsmini yaz...");
  nameInput.style("border", "2px solid #DDE6E3");
  nameInput.style("border-radius", "12px");
  nameInput.style("padding", "8px");
  nameInput.style("font-size", "16px");

  // Başlat butonu
  startButton = createButton("Keşfetmeye Başla");
  startButton.position(canvasX + 95, canvasY + 520);
  startButton.size(200, 45);
  startButton.style("border", "none");
  startButton.style("border-radius", "14px");
  startButton.style("background", "#3CAAFF");
  startButton.style("color", "white");
  startButton.style("font-size", "16px");
  startButton.style("cursor", "pointer");

  startButton.mousePressed(startApp);
}

//----------------------------
// Uygulamayı Başlat
//----------------------------

function startApp(){

  playerName = nameInput.value().trim();

  if(playerName==""){

    alert("Lütfen önce ismini yaz.");

    return;

  }

  currentScreen="dashboard";

  nameInput.hide();

  startButton.hide();

}

//------------------------
// Dashboard Avatar
//------------------------



function drawDashboardAvatar() {
  let move = sin(breathe) * 3; // Avatarın hafif hareketi
  
  // Kafa
  noStroke(); fill(130); circle(width/2, 248+move, 30);
  // Gövde
  stroke(130); strokeWeight(6); line(width/2, 278+move, width/2, 325+move);
  // Kollar
  line(width/2-25, 298+move, width/2+25, 298+move);

  // Atan Kalp
  noStroke(); fill(255, 80, 80);
  let heart = 16 + sin(pulse)*2;
  circle(width/2-14, 288+move, heart);
  circle(width/2-2, 288+move, heart);
  triangle(width/2-22, 292+move, width/2+6, 292+move, width/2-8, 308+move);
} 

//==================================================
// LIVING DASHBOARD
// Part 1
//==================================================

let healthIcons = [

  { icon:"❤️", x:-70, y:-90, title:"Nabız" },

  { icon:"🧠", x:70, y:-90, title:"Zihin" },

  { icon:"💧", x:-95, y:20, title:"Su" },

  { icon:"🍎", x:-55, y:120, title:"Beslenme" },

  { icon:"😴", x:55, y:120, title:"Uyku" },

  { icon:"🚶", x:95, y:20, title:"Hareket" }

];

function drawHealthIcons() {
  textAlign(CENTER, CENTER);
  for (let i = 0; i < healthIcons.length; i++) {
    let h = healthIcons[i];
    let px = width / 2 + h.x;
    let py = 320 + h.y; // Y konumunu biraz aşağı çektik (300 -> 320)

    fill(255);
    stroke(225);
    strokeWeight(1);
    rectMode(CENTER);
    rect(px, py, 110, 80, 15);

    noStroke();
    fill(40);
    textSize(22);
    text(h.icon, px, py - 5);
    textSize(12);
    text(h.title, px, py + 25);
  }
}

//------------------------
// Kart Kontrolü
//------------------------

function checkModuleClick(){

  for(let i = 0; i < healthIcons.length; i++){

    let h = healthIcons[i];

    let px = width / 2 + h.x;
    let py = 320 + h.y;

    if(

      mouseX > px - 55 &&
      mouseX < px + 55 &&
      mouseY > py - 40 &&
      mouseY < py + 40

    ){

      selectedModule = h.title;

      switch(h.title){

        case "Nabız":
          moduleMessage = "Kalbin bugün harika çalışıyor. ❤️";
          break;

        case "Zihin":
          moduleMessage = "Bugün biraz nefes almaya ne dersin? 🧠";
          break;

        case "Su":
          moduleMessage = "Su içmeyi unutma. 💧";
          break;

        case "Beslenme":
          moduleMessage = "Bugün dengeli beslenelim. 🍎";
          break;

        case "Uyku":
          moduleMessage = "İyi bir uyku yarının enerjisidir. 😴";
          break;

        case "Hareket":
          moduleMessage = "Biraz yürüyüş iyi gelebilir. 🚶";
          break;

      }

      currentScreen = "module";

    }

  }

}

function checkCard(x,y,name){

  if(

    mouseX>x &&
    mouseX<x+110 &&
    mouseY>y &&
    mouseY<y+110

  ){

    selectedModule=name;

    switch(name){

      case "Nabız":
        moduleMessage="Kalbin bugün harika çalışıyor. ❤️";
        break;

      case "Zihin":
        moduleMessage="Bugün biraz nefes almaya ne dersin? 🧠";
        break;

      case "Su":
        moduleMessage="Su içmeyi unutma. 💧";
        break;

      case "Beslenme":
        moduleMessage="Bugün dengeli beslenelim. 🍎";
        break;

      case "Uyku":
        moduleMessage="İyi bir uyku yarının enerjisidir. 😴";
        break;

      case "Hareket":
        moduleMessage="Biraz yürüyüş iyi gelebilir. 🚶";
        break;

    }

    currentScreen="module";

  }

}


function mousePressed(){

  // ==========================
  // DASHBOARD
  // ==========================
  if(currentScreen=="dashboard"){

    // Profil
    if(dist(mouseX,mouseY,profileIcon.x,profileIcon.y)<20){

      currentMenu="profile";
      currentScreen="menu";
      return;

    }

    // Pulse AI
    if(dist(mouseX,mouseY,pulseIcon.x,pulseIcon.y)<20){

      currentScreen="pulse";
      return;

    }

    // Ayarlar
    if(dist(mouseX,mouseY,settingsIcon.x,settingsIcon.y)<20){

      currentMenu="settings";
      currentScreen="menu";
      return;

    }

    // Sağlık Kartları
    for(let i=0;i<healthIcons.length;i++){

      let h=healthIcons[i];

      let px=width/2+h.x;
      let py=320+h.y;

      if(dist(mouseX,mouseY,px,py)<60){

        selectedModule=h.title;

        switch(selectedModule){

          case "Nabız":
            moduleMessage="Kalbin bugün harika çalışıyor. ❤️";
            break;

          case "Zihin":
            moduleMessage="Bugün biraz nefes almaya ne dersin? 🧠";
            break;

          case "Su":
            moduleMessage="Bugünkü su tüketimin hedefe yakın. 💧";
            break;

          case "Beslenme":
            moduleMessage="Bugün dengeli beslenelim. 🍎";
            break;

          case "Uyku":
            moduleMessage="İyi bir uyku yarının enerjisidir. 😴";
            break;

          case "Hareket":
            moduleMessage="Biraz yürüyüş iyi gelebilir. 🚶";
            break;

        }

        currentScreen="module";
        return;

      }

    }

  }

  // ==========================
  // MODÜL DETAYI
  // ==========================
  else if(currentScreen=="module"){

    if(mouseX>20 && mouseX<60 &&
       mouseY>20 && mouseY<60){

      currentScreen="dashboard";
      return;

    }

  }

  // ==========================
  // MENÜ
  // ==========================
  else if(currentScreen=="menu"){

    // Geri
    if(dist(mouseX,mouseY,45,45)<20){

      currentScreen="dashboard";
      return;

    }

    // Hakkında
    if(currentMenu=="settings"){

      if(mouseX>55 && mouseX<220 &&
         mouseY>300 && mouseY<340){

        currentScreen="about";
        return;

      }


      // Verileri Kaydet
     if(mouseX>55 && mouseX<260 &&
     mouseY>340 && mouseY<370){

     currentScreen="saveData";
     return;

    }

    // Verileri Sıfırla
      if(mouseX>55 && mouseX<260 &&
       mouseY>390 && mouseY<420){

       resetUserData();
       return;
      }

    }

  }

  // ==========================
  // HAKKINDA
  // ==========================
  else if(currentScreen=="about"){

    if(dist(mouseX,mouseY,45,45)<20){

      currentScreen="menu";
      return;

    }

  }

  // ==========================
  // PULSE AI
  // ==========================
 else if(currentScreen=="pulse"){

  // Geri butonu
  if(dist(mouseX,mouseY,45,45)<20){

    currentScreen="dashboard";
    return;

  }

  // 📅 Yarın İçin Önerileri Gör butonu
  if(mouseX>width-125 &&
   mouseX<width-20 &&
   mouseY>655 &&
   mouseY<689){

    currentScreen="pulseTomorrow";
    return;

   }
  
 }

  

  // ==========================
  // YARIN İÇİN ÖNERİLER
  // ==========================
   else if(currentScreen=="pulseTomorrow"){

  // Geri butonu
  if(dist(mouseX,mouseY,45,45)<20){

    currentScreen="pulse";
    return;

   }

 } 

  // ==========================
  // VERİLERİ KAYDET
  // ==========================
  else if(currentScreen=="saveData"){

  // Geri
  if(dist(mouseX,mouseY,45,45)<20){

    currentScreen="menu";
    return;

  }

  let startY=160;

  for(let i=0;i<6;i++){

    let y=startY+i*70;

    // -----------------
    // Eksi Butonu
    // -----------------

    if(dist(mouseX,mouseY,width-85,y)<18){

      switch(i){

        case 0:
          heartRate--;
          break;

        case 1:
          waterAmount=max(0,waterAmount-0.1);
          waterAmount=round(waterAmount*10)/10;
          break;

        case 2:
          sleepHours=max(0,sleepHours-0.5);
          break;

        case 3:
          stepCount=max(0,stepCount-500);
          break;

        case 4:
          calorieIntake=max(500,calorieIntake-100);
          break;

        case 5:
          mindScore=max(0,mindScore-5);
          break;

      }

      return;

    }

    // -----------------
    // Artı Butonu
    // -----------------

    if(dist(mouseX,mouseY,width-45,y)<18){

      switch(i){

        case 0:
          heartRate++;
          break;

        case 1:
          waterAmount+=0.1;
          waterAmount=round(waterAmount*10)/10;
          break;

        case 2:
          sleepHours+=0.5;
          break;

        case 3:
          stepCount+=500;
          break;

        case 4:
          calorieIntake+=100;
          break;

        case 5:
          mindScore=min(100,mindScore+5);
          break;

      }

      return;

    }

  }

  // ==========================
  // Kaydet Butonu
  // ==========================

  if(mouseX>width/2-90 &&
     mouseX<width/2+90 &&
     mouseY>615 &&
     mouseY<660){

      saveUserData();

      currentScreen="dashboard";

      return;

    }

  }

}

function drawModule(){

  background(240,248,244);

  push();

  rectMode(CORNER);
  textAlign(CENTER,CENTER);

  //==========================
  // Geri Butonu
  //==========================

  fill(255);
  stroke(220);
  strokeWeight(2);
  circle(45,45,40);

  noStroke();
  fill(60);
  textSize(22);
  text("←",45,43);

  //==========================
  // Başlık
  //==========================

  fill(35);
  textSize(28);
  textStyle(BOLD);
  text(selectedModule,width/2,70);
  textStyle(NORMAL);

  //==========================
  // Pulse Kartı
  //==========================

  fill(255);
  stroke(225);
  rect(30,120,width-60,120,18);

  noStroke();

  fill(60,170,255);
  circle(60,160,20);

  fill(255);
  textSize(12);
  text("P",60,160);

  fill(70);
  textAlign(LEFT,TOP);
  textSize(15);

  text(
    moduleMessage,
    90,
    145,
    width-130,
    60
  );

  //==========================
  // Ortaya dön
  //==========================

  textAlign(CENTER,CENTER);

  //==========================
  // Emoji
  //==========================

  let emoji="❤️";

  let statusTitle="";
  let statusValue="";
  let statusInfo="";
  let statusSub="";
  let graphTitle="";
  let graphData = [];
  let graphColor;

  switch(selectedModule){

    case "Nabız":

      emoji="❤️";

      statusTitle="❤️ Bugünkü Ritim";
      statusValue = heartRate + " BPM";
      statusInfo="🟢 Normal Aralık";
      statusSub="Dinlenme Nabzı";

  
      graphTitle="❤️ Son 7 Günlük Ortalama Nabız";

      graphData=[560,542,568,550,535,560,575];
      graphColor=color(255,80,120);

      break;


    case "Su":

      emoji="💧";

      statusTitle="💧 Bugünkü Su";

      statusValue = waterAmount + " / 2.5 L";

      statusInfo="🟢 %72 Tamamlandı";

      statusSub="Günlük Hedef";

    
      graphTitle="💧 Son 7 Günlük Ortalama Su";

      graphData=[565,548,570,552,540,560,572];
      graphColor=color(70,170,255);


      break;


    case "Uyku":

      emoji="😴";

      statusTitle="😴 Bugünkü Uyku";

      statusValue = sleepHours + " Saat";

      statusInfo="🟢 Kaliteli Uyku";

      statusSub="Gece Uykusu";

      graphTitle="😴 Son 7 Günlük Ortalama Uyku";

      graphData=[558,540,565,548,532,560,575];
      graphColor=color(120,90,255);

      break;


    case "Beslenme":

      emoji="🍎";

      statusTitle="🍎 Bugünkü Beslenme";

      statusValue = calorieIntake + " kcal";

      statusInfo="🟢 Dengeli";

      statusSub="Günlük Kalori";

      graphTitle="🍎 Son 7 Günlük Ortalama Beslenme";

      graphData=[570,550,568,548,536,562,578];
       graphColor=color(255,120,120);


      break;


    case "Hareket":

      emoji="🚶";

      statusTitle="🚶 Bugünkü Aktivite";

      statusValue = mindScore + " /100";

      statusInfo="🟢 Aktif";

      statusSub="Günlük Hareket";

      graphTitle="🚶 Son 7 Günlük Ortalama Aktivite";

      graphData=[575,548,570,545,530,560,580];
      graphColor=color(60,200,120);

      break;


    case "Zihin":

      emoji="🧠";

      statusTitle="🧠 Bugünkü Zihin";

      statusValue="%82";

      statusInfo="🟢 Odak İyi";

      statusSub="Zihin Skoru";

      graphTitle="🧠 Son 7 Günlük Ortalama Zihin";

      graphData=[565,545,570,552,538,562,580];
      graphColor=color(180,90,255);
      break;

  }

  //==========================
  // Emoji
  //==========================

  textSize(48);
  text(emoji,width/2,215);

  //==========================
  // Bugünkü Kart
  //==========================

  fill(255);
  stroke(225);
  rect(35,255,width-70,145,18);

  noStroke();

  fill(60);
  textSize(18);
  text(statusTitle,width/2,285);

  fill(45);
  textSize(30);
  text(statusValue,width/2,330);

  fill(100);
  textSize(16);
  text(statusInfo,width/2,365);

  fill(140);
  textSize(14);
  text(statusSub,width/2,392);

  //==========================
  // Grafik Kartı
  //==========================

  fill(255);
  stroke(225);
  rect(35,430,width-70,250,18);

  noStroke();

  fill(60);
  textSize(18);

  text(graphTitle,width/2,465);

  //==========================
  // Grafik
  //==========================

  stroke(graphColor);
  strokeWeight(3);
  noFill();

  let xPoints=[70,112,154,196,238,280,322];

  beginShape();

  for(let i=0;i<7;i++){
   vertex(xPoints[i],graphData[i]);
  }

  endShape();

  fill(graphColor);
  noStroke();

  for(let i=0;i<7;i++){
   circle(xPoints[i],graphData[i],10);
  }

  text("Pzt",70,615);
  text("Sal",112,615);
  text("Çar",154,615);
  text("Per",196,615);
  text("Cum",238,615);
  text("Cmt",280,615);
  text("Paz",322,615);

  pop();

}


function drawDetails() {
  background(238, 248, 243);

  // --- Geri Butonu ---
  stroke(100); line(30, 40, 50, 40); line(30, 40, 40, 30); line(30, 40, 40, 50);

  // --- Başlık ---
  fill(35); noStroke(); textAlign(CENTER); textSize(30); textStyle(BOLD);
  text(selectedModule, width / 2, 50);

  // --- Ana Panel ---
  push();
  rectMode(CORNER); fill(255); stroke(225); rect(30, 90, width - 60, 250, 20);
  pop();

  // --- İÇERİK: Modüle Özel Çizimler ---
  if (selectedModule == "Nabız") { drawPulseDetails(); }
  else if (selectedModule == "Su") { drawWaterDetails(); }
  else if (selectedModule == "Beslenme") { drawNutritionDetails(); }
  else if (selectedModule == "Uyku") { drawSleepDetails(); }
  else if (selectedModule == "Zihin") { drawMindDetails(); }
  else if (selectedModule == "Hareket") { drawMovementDetails(); }
  }



function drawPulseDetails() {
  // Mevcut grafikler
  let bpm = 72 + sin(frameCount * 0.1) * 5; 
  textAlign(CENTER);
  fill(70); textSize(18); text("Anlık Kalp Hızı", width/2, 120);
  textSize(60); textStyle(BOLD); fill(255, 80, 80);
  text(floor(bpm), width/2, 200);
  textSize(20); text("BPM", width/2, 240);
  
  // Öneri Kutusu
  drawRecommendation("Nabız", "Kalp ritmin şu an oldukça dengeli. Derin nefes egzersizleriyle bu dinginliği koruyabilirsin. ❤️");
}

 function drawWaterDetails() {
  // Mevcut grafik
  fill(70); textSize(18); textAlign(CENTER); text("Günlük Su Hedefi", width/2, 120);
  noFill(); stroke(220); strokeWeight(15);
  circle(width/2, 220, 120);
  stroke(60, 170, 255);
  arc(width/2, 220, 120, 120, -PI/2, -PI/2 + PI * 1.5);
  fill(60); noStroke(); textSize(30);
  text("75%", width/2, 230);
  
  // Öneri Kutusu
  drawRecommendation("Su", "Günlük su hedefine ulaşmana çok az kaldı! Bir bardak daha içerek vücudunu canlandırabilirsin. 💧");
}


// Beslenme Detayı
function drawNutritionDetails() {
  drawGauge("Günlük Puan", 80, 100);
  drawRecommendation("Beslenme", "Sebze ağırlıklı beslenmen harika! Bugün bir porsiyon meyve ekleyebilirsin. 🍎");
}

// Uyku Detayı
function drawSleepDetails() {
  fill(70); textSize(20); textAlign(CENTER); text("7 Saat 40 Dakika", width/2, 180);
  drawRecommendation("Uyku", "Uykun oldukça verimli görünüyor. Düzenini korumaya devam et. 😴");
}

// Zihin Detayı
function drawMindDetails() {
  fill(70); textSize(20); textAlign(CENTER); text("Ruh Hali: Çok İyi 😊", width/2, 180);
  drawRecommendation("Zihin", "Bugün meditasyon yapmak için harika bir gün. 🧠");
}

// Hareket Detayı
function drawMovementDetails() {
  fill(70); textSize(20); textAlign(CENTER); text("4.235 Adım", width/2, 180);
  drawRecommendation("Hareket", "Hedefine ulaşmana az kaldı, küçük bir yürüyüş yapabilirsin! 🚶");
}

// --- YARDIMCI ÇİZİM ARAÇLARI ---

function drawGauge(label, val, max) {
  fill(70); textSize(18); textAlign(CENTER); text(label, width/2, 150);
  noFill(); stroke(220); strokeWeight(10); circle(width/2, 220, 100);
  stroke(100, 200, 100); arc(width/2, 220, 100, 100, -PI/2, -PI/2 + PI * 2 * (val/max));
  fill(50); noStroke(); textSize(25); text(val, width/2, 230);
}

function drawRecommendation(title, textContent) {
  push();
  rectMode(CORNER);
  
  // Öneri Kutusu
  fill(250, 250, 250); 
  stroke(230);
  strokeWeight(1);
  rect(30, 360, width - 60, 120, 15);
  
  // Metin ayarlarını burada sıfırlıyoruz
  noStroke();
  fill(60); 
  textAlign(LEFT, TOP); // Metni kutunun sol üstünden başlat
  textSize(14);
  
  // Metni tek seferde yazdır
  text(title + " Önerisi:\n\n" + textContent, 45, 375, width - 90, 100);
  pop();
}

function drawTopMenu(){

  textAlign(CENTER,CENTER);
  textSize(20);

  noStroke();
  fill(70);

  // Pulse AI
  text(
    "🧠",
    pulseIcon.x,
    pulseIcon.y
  );

  // Profil
  text(
    "👤",
    profileIcon.x,
    profileIcon.y
  );

  // Ayarlar
  text(
    "⚙️",
    settingsIcon.x,
    settingsIcon.y
  );

}

function drawMenu(){

  push();

  rectMode(CORNER);
  textAlign(CENTER, CENTER);

  background(240,248,244);

  // Geri Butonu
  fill(255);
  stroke(220);
  strokeWeight(2);

  circle(45,45,40);

  noStroke();
  fill(60);
  textSize(22);

  text("←",45,43);

  // Başlık
  fill(40);
  textSize(28);
  textStyle(BOLD);

  if(currentMenu=="profile"){
    text("Profil",width/2,70);
  }else{
    text("Ayarlar",width/2,70);
  }

  textStyle(NORMAL);

  // Beyaz Panel
  fill(255);
  stroke(225);

  rect(30,110,width-60,650,20);

  noStroke();

  // ==========================
  // PROFİL
  // ==========================

  if(currentMenu=="profile"){

    textAlign(LEFT,TOP);

    fill(40);
    textSize(20);
    text("👤 " + playerName,55,150);

    textSize(16);

    text("⭐ Seviye : " + userLevel,55,205);

    text("🔥 Seri : " + streakDays + " Gün",55,245);

    text("🏆 Başarı : " + achievementCount,55,285);

    text("💧 Bugünkü Su : " + totalWater + " / 8 Bardak",55,325);

    text("📅 Toplam Giriş : " + totalLoginDays,55,365);

    fill(100);
    textSize(15);

    text(
   motivationText,
   55,
   430
   );



  }

  // ==========================
  // AYARLAR
  // ==========================

  else{

    textAlign(LEFT,TOP);

    fill(40);

    textSize(18);

    let leftX = 60;
    let textX = 95;
    let rightX = 300;

    let startY = 150;
    let gap = 50;

    
    textSize(20);

    text("🎨", leftX, startY);
    text("Tema", textX, startY);
    text(darkTheme ? "Açık" : "Kapalı", rightX, startY);

    text("🔔", leftX, startY + gap);
    text("Bildirimler", textX, startY + gap);
    text(notifications ? "Açık" : "Kapalı", rightX, startY + gap);

    text("🔊", leftX, startY + gap*2);
    text("Ses", textX, startY + gap*2);
    text(soundOn ? "Açık" : "Kapalı", rightX, startY + gap*2);

    text("📱", leftX, startY + gap*3);
    text("Hakkında", textX, startY + gap*3);

    text("💾", leftX, startY + gap*4);
    text("Verileri Kaydet", textX, startY + gap*4);

    text("🗑", leftX, startY + gap*5);
    text("Verileri Sıfırla", textX, startY + gap*5);

    fill(120);
    textSize(14);
    text("BodyBalance v1.0",60,630);

    
  }

  pop();

}

function drawAbout(){

  background(240,248,244);

  rectMode(CORNER);

  //=========================
  // Geri Butonu
  //=========================

  fill(255);
  stroke(220);
  strokeWeight(2);
  circle(45,45,40);

  noStroke();
  fill(60);
  textAlign(CENTER,CENTER);
  textSize(22);
  text("←",45,43);

  //=========================
  // Başlık
  //=========================

  fill(40);
  textSize(28);
  textStyle(BOLD);
  text("Hakkında",width/2,70);

  textStyle(NORMAL);

  //=========================
  // Bilgi Kartı
  //=========================

  fill(255);
  stroke(225);
  rect(30,110,width-60,550,20);

  noStroke();
  textAlign(CENTER,CENTER);

  // Logo
  textSize(28);
  fill(50);
  text("💙 BodyBalance",width/2,170);

  // Alt başlık
  textSize(16);
  fill(120);
  text("Kişisel Sağlık Asistanı",width/2,205);

  // Versiyon
  textSize(17);
  fill(90);
  text("Versiyon " + appVersion,width/2,235);

  // Geliştirici
  fill(50);
  textSize(18);
  text("Geliştirici",width/2,300);

  textSize(20);
  text("Dilara Dağ",width/2,335);

  // Açıklama
  fill(100);
  textSize(15);

  text(
    "BodyBalance,\n\n" +
    "Sağlıklı yaşam alışkanlıklarını\n" +
    "takip etmene yardımcı olan\n" +
    "kişisel sağlık asistanıdır.",
    width/2,
    430
  );

  // Telif
  fill(140);
  textSize(14);
  text("© 2026 BodyBalance",width/2,610);

}


function drawPulse(){

  background(240,248,244);

  push();

  rectMode(CORNER);
  textAlign(CENTER, CENTER);

  // ==========================
  // Geri Butonu
  // ==========================
  fill(255);
  stroke(220);
  strokeWeight(2);
  circle(45,45,40);

  noStroke();
  fill(60);

  textAlign(CENTER,CENTER);
  textSize(22);
  text("←",45,43);

  // ==========================
  // Başlık
  // ==========================
  fill(40);
  textSize(24);
  textStyle(BOLD);

  text("Pulse AI",width/2,60);

  textStyle(NORMAL);

  // ==========================
  // BodyBalance Index Kartı
  // ==========================

  fill(255);
  stroke(225);
  strokeWeight(1);

  rect(35,90,width-70,145,20);

  noStroke();

  fill(90);
  textSize(16);

  text("Bugünkü BodyBalance Index",width/2,122);

  fill(45);
  textSize(42);

  text(bodyBalanceIndex + " /100",width/2,165);

  fill(60,190,120);
  rect(width/2-50,188,100,30,15);

  fill(255);
  textSize(15);

  text("Dengede",width/2,203);


  // ==========================
  // Pulse AI Analizi
  // ==========================

  fill(255);
  stroke(225);
  strokeWeight(1);

  rect(35,255,width-70,170,20);

  noStroke();

  fill(55);
  textAlign(CENTER,CENTER);

  textSize(18);
  text("🧠 Pulse AI Analizi",width/2,282);

  fill(95);
  textSize(15);

  text(
    pulseAnalysis,
    width/2,
    350
  );

  // ==========================
  // Pulse AI Değerlendirmesi
  // ==========================

  fill(255);
  stroke(225);
  strokeWeight(1);

  rect(35,445,width-70,250,20);

  noStroke();

  fill(55);
  textAlign(CENTER,TOP);

  textSize(18);
  text("💙 Pulse AI Değerlendirmesi",width/2,465);

  fill(95);
  textSize(14);

  text(
  pulseEvaluation,
  width/2,
  500
  );

  // Buton
  fill(70,130,255);
  noStroke();

  rect(width-125,655,105,34,18);

  fill(255);
  textAlign(CENTER,CENTER);
  textSize(13);

  text(
  "📅 Yarının Planı",
  width-72,
  672
  );
  pop();

}

function drawPulseTomorrow(){

  background(240,248,244);

  push();

  rectMode(CORNER);
  textAlign(CENTER,CENTER);

  // Geri Butonu
  fill(255);
  stroke(220);
  strokeWeight(2);
  circle(45,45,40);

  noStroke();
  fill(60);
  textSize(22);
  text("←",45,43);

  // Başlık
  fill(40);
  textSize(24);
  textStyle(BOLD);
  text("📅 Yarının Planı",width/2,60);

  textStyle(NORMAL);

  // Kart
  fill(255);
  stroke(225);
  rect(35,100,width-70,520,20);

  noStroke();

  fill(60);
  textSize(18);
  text("Pulse AI Önerileri",width/2,140);

  fill(95);
  textSize(15);

  text(
  "💧 Su tüketimini 2.5 litreye tamamla.\n\n"+
  "😴 En az 8 saat uyumaya çalış.\n\n"+
  "🚶 9000 adım hedefini yakala.\n\n"+
  "🍎 Dengeli beslenmeye devam et.\n\n"+
  "🧠 Gün içinde kısa molalar ver.\n\n"+
  "❤️ Bu hedeflerle BodyBalance Index'in\n"+
  "yarın daha yüksek olabilir.",
  width/2,
  340
  );

  pop();

}


function generatePulseAnalysis(){

  pulseAnalysis=

 "💧 Günlük su tüketimin hedefe yakın.\n\n"+

 "😴 Uyku düzenin dengeli.\n\n"+

 "🚶 Hareket seviyeni biraz artırman önerilir.\n\n"+

 "📈 Genel sağlık alışkanlıkların olumlu ilerliyor.";

}

function generatePulseEvaluation(){

  pulseEvaluation =

  "Mevcut sağlık verilerine göre\n"+
  "genel yaşam alışkanlıkların\n"+
  "dengeli görünmektedir.\n\n"+

  "Özellikle su tüketimin ve\n"+
  "uyku düzenin olumlu ilerliyor.\n\n"+

  "Hareket seviyende yapılacak\n"+
  "küçük iyileştirmeler,\n"+
  "genel sağlık puanını\n"+
  "destekleyebilir.";

}  

function saveUserData(){

  let data={

    water: statusWater,
    sleep: statusSleep,
    movement: statusMovement,
    heart: statusHeart,
    nutrition: statusNutrition,
    mind: statusMind

  };

  localStorage.setItem(
    "BodyBalanceData",
    JSON.stringify(data)
  );

  alert("✔ Veriler başarıyla kaydedildi.");

  updatePulseAI();

}

function resetUserData(){

  localStorage.removeItem("BodyBalanceData");

  alert("🗑 Veriler silindi.");

}

function calculateBodyBalance(){

  let heartScore = 95;

  let waterScore = (waterAmount / 2.5) * 100;
  waterScore = constrain(waterScore,0,100);

  let sleepScore = (sleepHours / 8) * 100;
  sleepScore = constrain(sleepScore,0,100);

  let movementScore = (stepCount / 10000) * 100;
  movementScore = constrain(movementScore,0,100);

  let nutritionScore = 85;

  bodyBalanceIndex = round(
    (
      heartScore +
      waterScore +
      sleepScore +
      movementScore +
      nutritionScore +
      mindScore
    ) / 6
  );

}

function drawSaveData(){

  background(240,248,244);

  push();

  rectMode(CORNER);
  textAlign(CENTER,CENTER);

  //==========================
  // Geri Butonu
  //==========================

  fill(255);
  stroke(220);
  strokeWeight(2);

  circle(45,45,40);

  noStroke();
  fill(60);

  textSize(22);
  text("←",45,43);

  //==========================
  // Başlık
  //==========================

  fill(40);

  textSize(28);
  textStyle(BOLD);

  text("Verileri Kaydet",width/2,70);

  textStyle(NORMAL);

  //==========================
  // Ana Kart
  //==========================

  fill(255);
  stroke(225);

  rect(25,110,width-50,560,20);

  noStroke();

  let names=[
    "❤️ Nabız",
    "💧 Su",
    "😴 Uyku",
    "🚶 Hareket",
    "🍎 Beslenme",
    "🧠 Zihin"
  ];

  let values=[
    heartRate+" BPM",
    waterAmount+" L",
    sleepHours+" Saat",
    stepCount+" Adım",
    calorieIntake+" kcal",
    mindScore+" /100"
  ];

  for(let i=0;i<6;i++){

    let y=160+i*70;

    fill(55);

    textAlign(LEFT,CENTER);

    textSize(18);

    text(names[i],45,y);

    // -

    fill(230);

    circle(width-85,y,26);

    fill(60);

    textAlign(CENTER,CENTER);

    textSize(20);

    text("-",width-85,y-2);

    // Değer

    fill(45);

    textSize(17);

    text(values[i],width/2,y);

    // +

    fill(60,170,255);

    circle(width-45,y,26);

    fill(255);

    textSize(20);

    text("+",width-45,y-2);

  }

  //==========================
  // Kaydet Butonu
  //==========================

  fill(60,170,255);

  rect(width/2-90,615,180,45,18);

  fill(255);

  textSize(18);

  text("💾 Kaydet",width/2,638);


  pop();

}

function updatePulseAI(){

  pulseAnalysis="";
  pulseEvaluation="";

  // =====================
  // Nabız
  // =====================

  if(heartRate>=60 && heartRate<=90){

    pulseAnalysis+="❤️ Nabzın normal aralıkta.\n";

  }else{

    pulseAnalysis+="❤️ Nabız değerin normal aralığın dışında görünüyor.\n";

  }

  // =====================
  // Su
  // =====================

  if(waterAmount>=2){

    pulseAnalysis+="💧 Su tüketimin oldukça iyi.\n";

  }else{

    pulseAnalysis+="💧 Bugün biraz daha su içebilirsin.\n";

  }

  // =====================
  // Uyku
  // =====================

  if(sleepHours>=8){

    pulseAnalysis+="😴 Uyku süren yeterli.\n";

  }else{

    pulseAnalysis+="😴 Uyku süren biraz düşük.\n";

  }

  // =====================
  // Hareket
  // =====================

  if(stepCount>=8000){

    pulseAnalysis+="🚶 Günlük hareket hedefini yakalamışsın.\n";

  }else{

    pulseAnalysis+="🚶 Biraz daha hareket etmek faydalı olabilir.\n";

  }

  // =====================
  // Beslenme
  // =====================

  if(calorieIntake>=1600 && calorieIntake<=2300){

    pulseAnalysis+="🍎 Beslenmen dengeli görünüyor.\n";

  }else{

    pulseAnalysis+="🍎 Beslenme düzenini gözden geçirebilirsin.\n";

  }

  // =====================
  // Zihin
  // =====================

  if(mindScore>=80){

    pulseAnalysis+="🧠 Zihinsel durumun oldukça iyi.\n";

  }else{

    pulseAnalysis+="🧠 Kendine biraz dinlenme zamanı ayırabilirsin.\n";

  }

  // =====================
  // Genel Yorum
  // =====================

  if(bodyBalanceIndex>=90){

    pulseEvaluation=
    "Bugünkü sağlık verilerin oldukça dengeli. Aynı düzeni sürdürerek yüksek performansını koruyabilirsin.";

  }

  else if(bodyBalanceIndex>=75){

    pulseEvaluation=
    "Genel sağlık durumun iyi görünüyor. Küçük iyileştirmelerle BodyBalance Index puanını daha da yükseltebilirsin.";

  }

  else{

    pulseEvaluation=
    "Bugünkü verilerin gelişime açık görünüyor. Su tüketimini artırman, düzenli uyuman ve hareket seviyeni yükseltmen yararlı olacaktır.";

  }

}