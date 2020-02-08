import {
  trigger,
  state,
  style,
  transition,
  animate,
  keyframes,
  group
} from '@angular/animations';


export const AppAnimations = [
  trigger('divState', [
    state('normal', style({
      'background-color': 'red',
      transform: 'translateX(0)'
    })),
    state('highlighted', style({
      'background-color': 'blue',
      transform: 'translateX(100px)'
    })),
    transition('normal <=> highlighted', animate(300)),
    // transition('highlighted => normal', animate(800))
  ]),

  trigger('wildState', [
    state('normal', style({
      'background-color': 'red',
      transform: 'translateX(0) scale(1)',
      borderRadius: '0px',
    })),
    state('highlighted', style({
      'background-color': 'blue',
      transform: 'translateX(100px) scale(1)',
      borderRadius: '0px',
    })),
    state('shrunken', style({
      'background-color': 'green',
      transform: 'translateX(0) scale(0.5)',
      borderRadius: '0px',
    })),
    transition('normal => highlighted', animate(300)),
    transition('highlighted => normal', animate(800)),
    transition('shrunken <=> *', [
      style({ // * apply styles without transition
        'background-color': 'orange'
      }),
      animate(5000, style({ // * intermediate styles with transition
        'background-color': 'blue'
      })),
      animate(5000, style({ // * next intermediate styles
        borderRadius: '50px',
        'background-color': 'red'
      })),
      animate(5000) // * shrunken styles will be applied here
    ])
  ]),

  trigger('list1', [
    state('in', style({ // * in - dummy name
      opacity: 1,
      transform: 'translateX(0)'
    })),
    transition('void => *', [ // * void - element not exist
      style({
        opacity: 0,
        transform: 'translateX(-100px)'
      }),
      animate(300)
    ]),
    transition('* => void', [
      animate(300, style({
        transform: 'translateX(100px)',
        opacity: 0
      }))
    ])
  ]),

  trigger('list2', [
    state('in', style({
      opacity: 1,
      transform: 'translateX(0)'
    })),
    transition('void => *', [
      animate(1000, keyframes([
        style({
          transform: 'translateX(-100px)',
          opacity: 0,
          offset: 0
        }),
        style({
          transform: 'translateX(-50px)',
          opacity: 0.5,
          offset: 0.3 // * this part of animation will take 30% of time
        }),
        style({
          transform: 'translateX(-20px)',
          opacity: 1,
          offset: 0.8 // * will apply this styles after 800ms (80%)
        }),
        style({
          transform: 'translateX(0px)',
          opacity: 1,
          offset: 1 // * will apply this styles after 1000ms (100%)
        })
      ]))
    ]),
    transition('* => void', [
      group([ // * perform 2 animation on one time with different transition
        animate(300, style({
          color: 'red'
        })),
        animate(800, style({
          transform: 'translateX(100px)',
          opacity: 0
        }))
      ])
    ])
  ]),
];
