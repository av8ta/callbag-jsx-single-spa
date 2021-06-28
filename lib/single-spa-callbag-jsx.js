export default options => {
  function bootstrap(props) {
    return Promise.resolve().then(() => {
      // One-time initialization code goes here
      console.log('bootstrapped!')
    })
  }
  function mount(props) {
    return Promise.resolve().then(() => {
      const { name, rootComponent } = props
      const target = domElementGetter(name)
      document.body.appendChild(target)
      rootComponent(target)
      console.log(`${name} mounted!`)
    })
  }
  function unmount(props) {
    return Promise.resolve().then(() => {
      const { name } = props
      const target = domElementGetter(name)
      target.parentNode.removeChild(target)

      console.log(`${name} unmounted!`)
    })
  }

  function domElementGetter(id) {
    const target = document.getElementById(id)
    if (target) return target
    const el = document.createElement('div')
    el.setAttribute('id', id)
    return el
  }

  const lifecycles = {
    bootstrap: bootstrap.bind(null, options),
    mount: mount.bind(null, options),
    unmount: unmount.bind(null, options)
  }
  return lifecycles
}
