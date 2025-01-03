import { Component } from '@angular/core';

@Component({
  selector: 'app-working-in-progress',
  standalone:true,
  imports: [],
  template: `
  <main style="position:relative">
      <section class="advice">
        <h1 class="advice__title font-light">Page under construction</h1>
        <span class="flex align-items-baseline gap-2 text-2xl font-light"><p class="advice__description font-bold text-2xl gradient">< coming soon /> </p> </span>
      </section>
      <section class="city-stuff">
        <ul class="skyscrappers__list">
          <li class="skyscrapper__item skyscrapper-1"></li>
          <li class="skyscrapper__item skyscrapper-2"></li>
          <li class="skyscrapper__item skyscrapper-3"></li>
          <li class="skyscrapper__item skyscrapper-4"></li>
          <li class="skyscrapper__item skyscrapper-5"></li>
        </ul>
        <ul class="tree__container">
          <li class="tree__list">
            <ul class="tree__item tree-1">
              <li class="tree__trunk"></li>
              <li class="tree__leaves"></li>
            </ul>
            <ul class="tree__item tree-2">
              <li class="tree__trunk"></li>
              <li class="tree__leaves"></li>
            </ul>
            <ul class="tree__item tree-3">
              <li class="tree__trunk"></li>
              <li class="tree__leaves"></li>
            </ul>  
            <ul class="tree__item tree-4">
              <li class="tree__trunk"></li>
              <li class="tree__leaves"></li>
            </ul>  
            <ul class="tree__item tree-5">
              <li class="tree__trunk"></li>
              <li class="tree__leaves"></li>
            </ul>  
            <ul class="tree__item tree-6">
              <li class="tree__trunk"></li>
              <li class="tree__leaves"></li>
            </ul>  
            <ul class="tree__item tree-7">
              <li class="tree__trunk"></li>
              <li class="tree__leaves"></li>
            </ul>  
            <ul class="tree__item tree-8">
              <li class="tree__trunk"></li>
              <li class="tree__leaves"></li>
            </ul>  
          </li>
        </ul>
        <ul class="crane__list crane-1">
          <li class="crane__item crane-cable crane-cable-1"></li>
          <li class="crane__item crane-cable crane-cable-2"></li>
          <li class="crane__item crane-cable crane-cable-3"></li>
          <li class="crane__item crane-stand"></li>
          <li class="crane__item crane-weight"></li>
          <li class="crane__item crane-cabin"></li>
          <li class="crane__item crane-arm"></li>
        </ul>
        <ul class="crane__list crane-2">
          <li class="crane__item crane-cable crane-cable-1"></li>
          <li class="crane__item crane-cable crane-cable-2"></li>
          <li class="crane__item crane-cable crane-cable-3"></li>
          <li class="crane__item crane-stand"></li>
          <li class="crane__item crane-weight"></li>
          <li class="crane__item crane-cabin"></li>
          <li class="crane__item crane-arm"></li>
        </ul>
        <ul class="crane__list crane-3">
          <li class="crane__item crane-cable crane-cable-1"></li>
          <li class="crane__item crane-cable crane-cable-2"></li>
          <li class="crane__item crane-cable crane-cable-3"></li>
          <li class="crane__item crane-stand"></li>
          <li class="crane__item crane-weight"></li>
          <li class="crane__item crane-cabin"></li>
          <li class="crane__item crane-arm"></li>
        </ul>
      </section>
    </main>
    `,
  styles: `
    $c-main: hsla(0, 100%, 100%, .75);
    $c-secondary:  #E1B0AD;
    $c-malabars:  #51328a;
    $c-trunk: hsla(23, 18%, 29%, 1);
    $c-white: hsla(0, 255%, 255%, 1);
    $bg-main: hsla(210, 3%, 15%, 1);
    $city-skyscrappers: 5;
    $city-cranes: 3;
    $city-trees: 8;
    $crane-width: 260px;
    $crane-height: calc($crane-width / 1.5);
    $crane-border: 1px;
    $trunk-height: 8px;
    $media900: 900px;
    $media768: 768px;
    $media450: 450px;

    * {
      box-sizing: border-box;
    }

    main {
      height: 100%;

    }


    ul{
      color:transparent !important;
    }

    .crane__list,
    .skyscrappers__list,
    .tree__container {
      position: absolute;
      width: 100%;
      bottom: 0;
    }

    .advice {
      font-family: "Quicksand", sans-serif;
      font-optical-sizing: auto;
      font-weight: 300;
      font-style: normal;
      display: flex;
      height: 50vh;
      width: 100%;
      flex-flow: column nowrap;
      justify-content: center;
      align-items: center;
      color: var(--h3-color)!important;
      &__title {
        font-size: 3rem;
        text-align: center;
      }
      &__description {
        margin-top: 1rem;
        font-size: 2rem;
        text-align: center;
        span:first-child {
          margin-right: -.7rem;
        }
        span:last-child {
          margin-left: -.7rem;
        }
      }
    }

    .advice__description {
        /* Create a text gradient from pink to purple */
        background: linear-gradient(to right, #e82c88, #51328a);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        display: inline;
      }
      
    

    .city-stuff {
      display: flex;
      position: absolute;
      justify-content: center;
      width: 100%;
      height: 100%;
      bottom: 0;
      overflow: hidden;
      box-shadow: inset 0 -60px 0 -30px $c-malabars;
    }

    .skyscrappers__list {
      width: 100%;
      height: calc($crane-height / 2);
      left: 0;
      .skyscrapper__item {
        position: absolute;
        height: inherit;
        bottom: 15%;
        width: calc($crane-height / 4);
        background: linear-gradient(115deg, $c-malabars 73%, darken($c-malabars, 10%) 73%, darken($c-malabars, 10%) 100%);
        &::after {
          content: '';
          position: absolute;
          width: 80%;
          height: 80%;
          left: 10%;
          bottom: 10%;
          background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAGCAYAAAAG5SQMAAAAFElEQVQImWP4////fwYYIJKDEwAAfPsP8eFXG40AAAAASUVORK5CYII=') space;
        }
        &:last-child:not(:only-child) { 
          background: $c-malabars;
        }
      }
      @for $i from 1 through $city-skyscrappers {
        .skyscrapper-#{$i} {
          width: calc($crane-height / calc($i / .7));
          height: calc($crane-height / calc($i / .8));
          right: (15 + ($i * 10)) * 1%; 
          bottom: 0;
          z-index: 10;
          transform: rotate(180deg);
          
          @if $i == 2 {
            bottom: 10%;
            @media screen and (max-width: $media900) { 
              display: none;
            }
          }
          @if $i == 3 {
            height:calc( $crane-height / calc($i / 2));
            @media screen and (max-width: $media900) { 
              display: none;
            }
          }
          @if $i == 4 {
            height:calc( $crane-height / calc($i / 2));
            &::after {
              width: 20%;
              height: 60%;
              left: 25%;
            }
          }
          @if $i == 5 {
            width: 7%;
            right: 67%;
            height: 50%;
            z-index: 11;
            &::after {
              height: 0;
            }
          }
        }
        @media screen and (max-width: $media450) { 
          .skyscrapper-1{
            display: none;
          }
        }
      }
    }

    .crane-cabin, .crane-arm, .crane-picker {
      transform-origin: 80% center;
      animation: crane__movement 12s infinite alternate;
    }

    .crane__list {
      width: $crane-width;
      height: $crane-height;
      z-index: 0;
      perspective: 600px;
      .crane__item {
        position: absolute;
        border: solid 1px $c-malabars;
        border-radius: 2px;
      }
      .crane-cable {
        width: 1px;
        height: 1px;
        border: none;
        outline: 1px solid transparent;
        background: $c-malabars;
        z-index: 0;
      }
      .crane-cable-1 {
        width: 60%;
        top: 0;
        left: 11%;
        transform-origin: right 0;
        animation: cable-1__movement 12s infinite alternate;
      }
      .crane-cable-2 {
        width: 19%;
        top: 0;
        right: 8%;
        transform-origin: top left;
        animation: cable-2__movement 12s infinite alternate;
      }
      .crane-cable-3 {
        height: 30%;
        top: 22%;
        left: 9%;
        transform-origin: right center;
        animation: cable-3__movement 12s ease-in-out infinite alternate;
        &::after {
          content: '';
          display: block;
          position: absolute;
          height: .2em;
          width: 9000%;
          bottom: 0;
          left: -4500%;
          background: lighten($c-malabars, 20%);
          border: $crane-border solid $c-malabars;
        }
      }
      .crane-stand {
        width: 5%;
        height: 100%;
        right: 25%;
        z-index: 1;
        background: linear-gradient(to top, $c-malabars, desaturate(lighten($c-malabars, 30%), 20%));
      }
      .crane-weight {
        width: 8%;
        height: 20%;
        right: 4%;
        top: 12%;
        z-index: 2;
        background: desaturate(lighten($c-malabars, 25%), 10%);
        transform-origin: 0 center;
        animation: crane-weight__movement 12s infinite alternate;
      }
      .crane-cabin {
        width: 12%;
        height: 9%;
        right: 24%;
        top: 20%;
        z-index: 2;
        background: desaturate(lighten($c-malabars, 25%), 10%);
        &::after {
          content: '';
          display: block;
          position: absolute;
          width: 100%;
          height: 10%;
          top: 60%;
          left: 0;
          background: $c-white;
        }
      }
      .crane-arm {
        width: 100%;
        height: 7%;
        top: 15%;
        border-top-left-radius: 10px;
        z-index: 3;
        background: desaturate(lighten($c-malabars, 25%), 10%);
      }
    }

    @for $i from 1 through $city-cranes {
      .crane-#{$i} {
        left: 10 + $i * 10 * 1%; 
        z-index: 10;
        @if $i == 2 {
          bottom: -1rem;
          z-index: -1;
          transform: scale(.75) scaleX(-1); 
          @media screen and (max-width: $media900) { 
            display: none;
          }
        }
        @if $i == 3 {
          bottom: -.5rem;
          transform: scale(.8);
          @media screen and (max-width: $media900) { 
            z-index: -1;
            transform: scale(.75) scaleX(-1);
          }
          @media screen and (max-width: $media900) { 
            display: none;
          }
        }
        @if $i > 1 {
          .crane-cable-3 {
            animation-delay: $i * 1.5s;
          }
        }
      }
    }

    .tree__container {
      width: 100%;
      height: calc($crane-height / 2) - calc($trunk-height * 3);
      left: 0;
      margin-bottom: calc($trunk-height / 2);
    }

    .tree__item {
      display: flex;
      flex-flow: column nowrap;
      position: absolute;
      justify-content: flex-end;
      align-items: center;
      left: 60%;
    }

    .tree__trunk {
      order: 2;
      display: block;
      position: absolute;
      width: calc($trunk-height / 2);
      height: $trunk-height;
      margin-top: $trunk-height;
      border-radius: 2px;
      background: $c-trunk;
    }

    .tree__leaves {
      order: 1;
      position: relative;
      border-top: 0 solid transparent;
      border-right: 4px solid transparent;
      border-bottom: calc($trunk-height * 4) solid $c-malabars;
      border-left: 4px solid transparent;
      &::after {
        content: '';
        position: absolute;
        height: 100%;
        left: -4px;
        border-top: 0;
        border-right: 0;
        border-bottom: calc($trunk-height * 4) solid darken($c-malabars, 10%);
        border-left: 4px solid transparent;
      }
    }

    @for $i from 1 through $city-trees {
      .tree-#{$i} {
        @if $i <= 2 {
          left: 65% + $i;
          @media screen and (max-width: $media768) { 
            display: none
          }
        }
        @if $i > 3 and $i < 6 {
          left: 53% + $i;

        }
        @if $i > 6 {
          left: 44% + $i;
          @media screen and (max-width: $media450) { 
            display: none
          }
        }
      }
    }


    @keyframes cable-1__movement {
      0%, 20% {
        transform: rotateY(0) rotateZ(-10deg);
      }
      70%, 100% {
        transform: rotateY(45deg) rotateZ(-10deg);
      }
    }

    @keyframes cable-2__movement {
      0%, 20% {
        transform: rotateY(0) rotateZ(29deg);
      }
      70%, 100% {
        transform: rotateY(15deg) rotateZ(29deg);
      }
    }

    @keyframes cable-3__movement {
      0% {
        transform: translate(0, 0);
      }
      20% {
        transform: translate(2500%, -18%);
      }
      60% {
        transform: translate(11000%, -25%);
      }
      70% {
        height: 30%;
        transform: translate(9100%, -25%);
      }
      90%, 100% {
        height: 80%;
        transform: translate(9100%, -15%);
      }
    }

    @keyframes crane__movement {
      0%, 20% {
        transform: rotateY(0);
      }
      70%, 100% {
        transform: rotateY(45deg);
      }
    }

    @keyframes crane-weight__movement {
      0%, 20% {
        transform: rotateY(0) translateX(0);
      }
      70%, 100% {
        transform: rotateY(45deg) translateX(-50%);
      }
  
  
}`
})
export class WorkingInProgressComponent {

}