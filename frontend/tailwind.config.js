/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],

  theme: {
    colors:{
      //**Panels**

      pnl_first:'#1C1E22',
      pnl_secondary:'#2D2D2D',
      pnl_third:'#3C3C3C',
      pnl_fourth:'#282828',

      pnl_add_first:'#3C372B',
      pnl_add_first_border:'#E99D02',
      pnl_add_second:'#33373A',
      pnl_add_second_border:'#6B8AAA',
      pnl_add_third:'#38302B',
      pnl_add_third_border:'#C55F10',

      //**Buttons**
      bt_danger:'#FF8197',
      bt_danger_hover:'#FE93A6',
      bt_danger_pressed:'#E04D66',
      bt_primary:'#16CD57',
      bt_primary_hover:'#37E487',
      bt_primary_pressed:'#06A740',
      bt_secondary:'#5A9DF5',
      bt_secondary_hover:'#47BDFF',
      bt_secondary_pressed:'#177DDC',
      bt_selector_value:'rgba(200,200,200,0.1)',
      bt_selector_value_drop:'#3c3c3c',
      bt_disabled:'#37383A',
      bt_upload_box:'rgba(255,255,255,0.02)',

      //**Text**

      txt_main:'#FFFFFF',
      txt_secondary:'#B6B6B6',
      txt_third:'#C1D9E2',
      txt_info:'#93C2FF',
      txt_fourth:'#D0E6EE',
      txt_disabled:'rgba(208,230,238,0.5)',



      //**Indicators**

      txt_ind_main:'#47FFA7',
      txt_ind_secondary:'#FBFF47',
      txt_ind_third:'#47BDFF',
      txt_ind_info:'#FF8197',

    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '960px',
      xl: '1200px',
    },
    extend: {
      width: {
        sm: '640px',
        md: '768px',
        lg: '960px',
        xl: '1200px',
      }
    },
    fontFamily: {
      poppins: [`var(--font-poppins)`, 'sans-serif'],
      sora: [`var(--font-sora)`, 'sans-serif'],
      inter: ['Inter','sans-serif']
    },

  },
  plugins: [],
}