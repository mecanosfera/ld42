/// <reference path='./game.ts' />

namespace bwo {

  export class UI{

    game:Game;
    grid:Grid;

    constructor(game:Game){
      this.game = game;
      $('#play_li').click(()=>{
        this.hideTitlescreen();
        this.game.start();
      });
    }

    logo():void{

      this.title();
    }

    title():void{
      $('#title_screen').show();
    }

    hideTitlescreen():void{
      $('#title_screen').hide();
    }

  }



}
