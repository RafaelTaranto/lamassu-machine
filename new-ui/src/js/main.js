import Alpine from 'alpinejs'
import AlpineI18n from 'alpinejs-i18n'
import { screens } from './screens'
import translation from './translation'
import { SCREEN_BACKGROUND } from './consts.js'

window.Alpine = Alpine

let locale = 'en'
document.addEventListener('alpine-i18n:ready', function () {
  window.AlpineI18n.create(locale, translation, { debug: false })
})

Alpine.data('app', () => ({
  template: null,
  currentScreen: null,
  direction: 'cashOut',
  screens: screens,
  init () {
    this.switchScreen('connecting')
  },
  switchScreen (screen) {
    this.TITLE = window.AlpineI18n.t(screens[screen].title)
    this.P1 = window.AlpineI18n.t(screens[screen].p1)
    this.P2 = window.AlpineI18n.t(screens[screen].p2)
    this.P3 = window.AlpineI18n.t(screens[screen].p3)
    this.ICON = screens[screen].icon
    this.template = screens[screen].template || screen
    this.currentScreen = screen
  },
  changeLanguage () {
    locale = locale === 'es' ? 'en' : 'es'
    window.AlpineI18n.locale = locale
  },
  bodyClassPicker (screen) {
    const screenBackground = screens[screen].background

    if (screenBackground === SCREEN_BACKGROUND.BOTH){
      return this.direction === 'cashOut' ? SCREEN_BACKGROUND.CASH_OUT : SCREEN_BACKGROUND.CASH_IN
    }

    return screenBackground
  }
}))

Alpine.plugin(AlpineI18n)
Alpine.start()
