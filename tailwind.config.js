// /** @type {import('tailwindcss').Config} */
// export const content = ["./App.{js,jsx,ts,tsx}", ".components/**/*.{js,jsx,ts,tsx}",
//   "./pages/**/*.{js,jsx,ts,tsx}", "./layout/**/**/*.{js,jsx,ts,tsx}"];
// export const presets = [require('nativewind/preset')];
// export const theme = {
//   extend: {
//     colors: {
//       graycolor: '#f2f2f2',
//       bluecolor: '#066ff9'
//     },
//     borderRadius: {
//       custom: '30px'
//     },
//     fontFamily: {
//       inter: 'inter',
//       intermedium: 'inter-medium',
//       interbold: 'inter-bold',
//       sorasemibold: 'sora-semibold'
//     }
//   },
// };
// export const plugins = [];
/** @type {import('tailwindcss').Config} */
import nativewindPreset from 'nativewind/preset';

export const content = [
  "./App.{js,jsx,ts,tsx}",
  ".components/**/*.{js,jsx,ts,tsx}",
  "./pages/**/*.{js,jsx,ts,tsx}",
  "./layout/**/**/*.{js,jsx,ts,tsx}"
];

export const presets = [nativewindPreset];

export const theme = {
  extend: {
    colors: {
      graycolor: '#f2f2f2',
      bluecolor: '#066ff9',
    },
    borderRadius: {
      custom: '30px',
    },
    fontFamily: {
      inter: 'inter',
      intermedium: 'inter-medium',
      interbold: 'inter-bold',
      sorasemibold: 'sora-semibold',
    },
  },
};

export const plugins = [];
