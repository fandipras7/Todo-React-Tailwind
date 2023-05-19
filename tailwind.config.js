/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        '18': '18px',
        '26': '26px',
        '31': '31px',
        '38': '38px',
        '43': '43px',
        '50': '50px',
        '65': '65px',
        '220': '220px'
      },
      colors: {
        'color-primary': 'var(--color-primary)',
        'white': 'var(--white)',
        'background': 'var(--background)',
        'background-2': 'var(--background-2)',
        'secondary': 'var(--secondary)'
      },
      width: {
        '14': '14px',
        '150': '150px',
        '159': '159px',
        '205': '205px',
        '235': '235px',
        '415': '415px',
        '490': '490px',
        '830': '830px'
      },
      minWidth:{
        '71': '71px',
        '233': '233px',
      },
      height: {
        '14': '14px',
        '52': '52px',
        '54': '54px',
        '58': '58px',
        '105': '105px',
        '234': '234px',
        '203': '203px',
        '355': '355px',
        '403': '403px',
        '604': '604px',
      },
      minHeight: {
        '604': '604px',
        '768': '768px'
      },
      fontSize: {
        '12': '12px',
        '14': '14px',
        '16': '16px',
        '17': '17px',
        '18': '18px',
        '36': '36px'
      },
      lineHeight: {
        '18': '18px',
        '21': '21px',
        '27': '27px',
        '54': '54px'
      },
      borderRadius: {
        '45': '45px'
      }
    },
  },
  plugins: [],
}

