/**
 * Which project the home slider shows. Module state survives client navigations, so coming back from a
 * project lands on its card and the cover can morph back into it. A full page load starts from the first.
 */
let current = 0

export const sliderMemory = {
  get: () => current,
  set: (index: number) => {
    current = index
  },
}
