export default function () {
  return (window.navigator.standalone || window.matchMedia('(display-mode: standalone)').matches)
}
