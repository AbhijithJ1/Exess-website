/**
 * EnergyBus — Lightweight singleton event bus for the ExESS Living System.
 *
 * Events emitted:
 *   'section:approach'  { sectionId, targetY }  — section top edge entering viewport
 *   'section:activate'  { sectionId, targetY }  — section 15% visible (triggers burst)
 *   'section:exit'      { sectionId }            — section scrolled past
 */
const _listeners = {}

const EnergyBus = {
  on(event, fn) {
    if (!_listeners[event]) _listeners[event] = []
    _listeners[event].push(fn)
  },
  off(event, fn) {
    if (_listeners[event]) {
      _listeners[event] = _listeners[event].filter((f) => f !== fn)
    }
  },
  emit(event, data) {
    if (_listeners[event]) {
      _listeners[event].forEach((fn) => {
        try { fn(data) } catch (e) { console.warn('[EnergyBus]', e) }
      })
    }
  },
}

export default EnergyBus
