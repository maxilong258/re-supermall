export function debounce(fn, wait) {
  let timeout = null
  return function (...args) {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => {
      fn.apply(this, args)
    }, wait);
  }
}