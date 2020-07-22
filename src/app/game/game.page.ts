import { Component, OnInit } from '@angular/core';
import { PopoverController, ToastController } from '@ionic/angular';
// import { popoverController } from 'https://cdn.jsdelivr.net/npm/@ionic/core@next/dist/ionic/index.esm.js';

// import { PopoverComponent } from '../../component/popover/popover.component';


var word = [
  ["Hangman", "That game you are playing right now."],
  ["HTML", "Markup language for creating Web pages."],
  ["CSS", "Wep page styles"],
  ["PHP", "A very popular server scripting language."],
  ["JavaScript", "Make web-page dynamic without reload the web page."],
  [
    "Java",
    "Run 15 billion devices.\nA program can be run in Windows, Linux and Mac"
  ],
  ["Love", "What is ?\nBaby don't hurt me\nDon't hurt me\nNo more"],
  ["Document", "A lot of text in the a file."],
  ["Playground", "There school kids go to."],
  ["Run", "Usain bolt."],
  ["Code", "var hw = 'Hello World';"],
  ["Samsung", "A company create Phone, Tv, Monitor, SDD, Memory chip..."],
  ["Super Mario", "A very popular game in Nintendo 64 that have red hat."],
  ["Star", "Super Mario like to get."],
  ["Clock", "14:12 or 14pm"],
  ["Binary Clock", "A clock that only use 0 or 1."],
  ["Sword", "Link from Zelda have on the hand."],
  ["Girl", "Not boy but ?"],
  ["Boy", "Not girl but ?"],
  ["Female", "Other name as girl."],
  ["Male", "Other name as boy."],
  ["Smartphone", "Something you've always on you."]
]

// Game keyboard
var tastatur = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

// Game memory
var select = 0
var wordLeft = []
var fail = 0
var a, wH, tY, eL, resY

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit {

  constructor(
    public popoverController: PopoverController,
    public toastController: ToastController
    ) {}

  ngOnInit() {
  }
  hideGame= false;
      gameStarted=false;
      imageNumber=0;
      livesLeft=6;
      // hint=''
    

  
  playGame() {
      this.gameStarted=true
      // })
      this.test()

  }

  test  ()   {
    const data = this.gId("moveKeybord");
    console.log("data===", data);
    let that=this;
    data.addEventListener(
      "touchmove",
      function(e) {
        wH = window.innerHeight;
        tY = e.touches[0].clientY;
        eL = that.gId("tastatur");
        resY = wH - tY - eL.offsetHeight;
        if (resY < 0) {
          resY = 0;
        } else if (resY > wH / 2) {
          resY = wH / 2;
        }
        eL.style.bottom = resY + "px";
      },
      false
    );
    this.createTastur();
  };

  // Start game
  startGame ()   {
    try {
      
  
      console.log("inside the start game",)
    this.gId("home").className = "h";
    this.gameStarted=true
    // },() {
        this.test()
        
        this.gId("result").className = "h";
        this.newGame();
    // })
    // this.createTastur()
  } catch (error) {
      console.log("error",error)

  }
  };

  // New game
  newGame  ()   {
    this.clearTastatur();
     this.clearPlayer();
    // this.imageNumber=0;
    // this.livesLeft=5;

    this.createWord();
  };

  // Clear keyboard
  clearTastatur  ()   {
    var e = document.getElementsByClassName("b");
    for (a = 0; a < e.length; a++) {
      e[a].setAttribute("data", "");
    }
  };

  // Clear player
  clearPlayer  ()   {
    fail = 0;
    wordLeft = [];
    this.imageNumber=0;
    this.livesLeft=6;
    // this.gId("g0").setAttribute("data", "false");
    // this.gId("g1").setAttribute("data", "false");
    // this.gId("g2").setAttribute("data", "false");
    // this.gId("g3").setAttribute("data", "false");
    // this.gId("g4").setAttribute("data", "false");
    // this.gId("g5").setAttribute("data", "false");
    // this.gId("g5").setAttribute("r", "false");
    // this.gId("g5").setAttribute("l", "false");
    // this.gId("g6").setAttribute("data", "false");
    // this.gId("g6").setAttribute("l", "false");
    // this.gId("g6").setAttribute("r", "false");
    // this.gId("hintButton").setAttribute("data", "false");
    // this.gId("hint").style.display = "none";
  };

  // Get new word
  createWord  ()   {
    var d = this.gId("letter");
    d.innerHTML = "";
    select = Math.floor(Math.random() * word.length);
    for (a = 0; a < word[select][0].length; a++) {
      var x = word[select][0][a].toUpperCase();
      var b = document.createElement("span");
      b.className = "l b-bottom" + (x == " " ? " ls" : "");
      b.innerHTML = "&nbsp";
      b.id = "l" + a;
      d.appendChild(b);

      if (x != " ") {
        if (wordLeft.indexOf(x) == -1) {
          wordLeft.push(x);
        }
      }
    }
  };

  // Create keyboard
  createTastur  ()   {
    console.log("create tatsur");
    var tas = this.gId("keybord");
    tas.innerHTML = "";
    for (a = 0; a < tastatur.length; a++) {
      var b = document.createElement("span");
      b.className = "b";
      b.innerText = tastatur[a];
      b.setAttribute("data", "");
      let that = this;
      b.onclick = function() {
        that.bTas(this);
      };
      tas.appendChild(b);
    }
  };

  // Game check, If show next error / game end
  bTas  (a)   {
    if (a.getAttribute("data") == "") {
      var x = this.isExist(a.innerText);
      a.setAttribute("data", x);
      if (x) {
        if (wordLeft.length == 0) {
          this.gameEnd(true);
        }
      } else {
        this.showNextFail();
      }
    }
  };

  // If letter "X" exist
  isExist  (e)   {
    e = e.toUpperCase();
    var x = wordLeft.indexOf(e);
    if (x != -1) {
      wordLeft.splice(x, 1);
      this.typeWord(e);
      return true;
    }
    return false;
  };

  // Show next fail drawing
  showNextFail  ()   {
    fail++;
    switch (fail) {
      case 1:
        this.imageNumber=1;
        this.livesLeft--;
        // this.gId("g0").setAttribute("data", "true");
        break;

      case 2:
          this.imageNumber=2;
          this.livesLeft--;


        // this.gId("g1").setAttribute("data", "true");
        break;

      case 3:
          this.imageNumber=3;
          this.livesLeft--;


        // this.gId("g2").setAttribute("data", "true");
        break;

      case 4:
          this.imageNumber=4;
          this.livesLeft--;


        // this.gId("g3").setAttribute("data", "true");
        // this.gId("hintButton").setAttribute("data", "true");
        break;

      case 5:
          this.imageNumber=5;
          this.livesLeft--;
        // this.gId("g4").setAttribute("data", "true");
        break;

      // case 6:
      //   this.gId("g5").setAttribute("data", "true");
      //   break;

      // case 7:
      //   this.gId("g5").setAttribute("l", "true");
      //   break;

      // case 8:
      //   this.gId("g5").setAttribute("r", "true");
      //   break;

      // case 9:
      //   this.gId("g6").setAttribute("data", "true");
      //   this.gId("g6").setAttribute("l", "true");
      //   break;

      case 6:
        
        this.imageNumber=6;
        this.livesLeft--;

        // this.gId("g6").setAttribute("r", "true");
        setTimeout(() => {
          
          this.gameEnd(false);
        }, 3000);
        break;
      default:
        break;
    }
  };

  typeWord  (e)   {
    for (a = 0; a < word[select][0].length; a++) {
      if (word[select][0][a].toUpperCase() == e) {
        this.gId("l" + a).innerText = e;
      }
    }
  };

  // Game result
  gameEnd  (e)   {
    this.imageNumber=6;
    var d = this.gId("result");
    d.setAttribute("data", e);
    if (e) {
      this.gId("rT").innerText = "You Win!";
      this.gId("rM").innerHTML =
        "Congratulations, you found the word!<br/><br/>Good Job!";
    } else {
      this.gId("rT").innerText = "You Lose!";
      this.gId("rM").innerHTML =
        'The word was <br/><br/>"' +
        word[select][0].toUpperCase() +
        '"<br/><br/>Better luck next time.';
    }
    d.className = "";
  };

  goBack(e) {
       console.log("go back===",e)
    //    this.gId("home").className = "";
    //    this.gId("result").className = "h";

       this.gameStarted=false;
    // this.clearTastatur();
    // this.clearPlayer();
    // this.createWord();
  }

  // Show hint


  async setShowPopover(show) {
    console.log("inside the setShowPopover")
   
      const toast = await this.toastController.create({
        message: `${word[select][1]}`,
        header: ``,
        color:"success",
        animated:true,
        translucent:true,
      position: 'middle',
     
         duration: 2000
      });
      toast.present();
    // }
      // })
    // if(show)

    // this.showPopover=show;
  }
  hint ()   {
    this.gId("hintText").innerText = word[select][1];
    this.gId("hint").style.display = "block";
  };

  // Exit hint
  hintExit ()   {
    this.gId("hint").style.display = "none";
  };

  // Get HTML ID element by name
  gId  (a)   {
    return document.getElementById(a);
  };


}
