import { SCREEN_BACKGROUND } from './consts.js'

import addressReuse from '../assets/svg/address-reuse.svg?raw'
import maintenance from '../assets/svg/maintenance.svg?raw'

const TEMPLATES = {
  INFO_ACTION: 'info-action-template',
}

export const screens = {
  connecting: { background: SCREEN_BACKGROUND.SYSTEM },
  booting: { background: SCREEN_BACKGROUND.SYSTEM },
  maintenanceRequired: {
    background: SCREEN_BACKGROUND.SYSTEM,
    template: TEMPLATES.INFO_ACTION,
    icon: maintenance,
    title: 'MAINTENANCE_REQUIRED',
    p1: 'TOUCH_BUTTON',
  },
  addressReuse: {
    background: SCREEN_BACKGROUND.CASH_IN,
    template: TEMPLATES.INFO_ACTION,
    icon: addressReuse,
    title: 'ADDRESS_REUSE_TITLE',
    p1: 'ADDRESS_REUSE_P1',
    p2: 'ADDRESS_REUSE_P2',
  },
  blockedCustomer: {
    background: SCREEN_BACKGROUND.BOTH,
    template: TEMPLATES.INFO_ACTION,
    title: 'BLOCKED_CUSTOMER_TITLE',
    p1: 'BLOCKED_CUSTOMER_P1',
  },
  verifying: {
    template: TEMPLATES.INFO_ACTION,
    icon: addressReuse,
    background: SCREEN_BACKGROUND.BOTH,
    title: 'Verifying photo...',
    p1: 'This could take a few seconds.',
  }
}