/// <reference path='./game.ts' />

namespace bwo {

  export interface Dict<T> {
    [index:string]:T;
  }

  export interface JsonData {
    [index:string]: any;
  }

  export interface Vector2{
    x:number;
    y:number;
  }

  export interface AudioDict{
    [index:string]:HTMLAudioElement;
  }


}
