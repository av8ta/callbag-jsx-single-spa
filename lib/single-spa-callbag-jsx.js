export default options => {
  function bootstrap(props) {
    return Promise.resolve().then(() => {
      // One-time initialization code goes here
      console.log('bootstrapped!')
    })
  }
  function mount(props) {
    return Promise.resolve().then(() => {
      // Do framework UI rendering here
      const { target, rootComponent } = props
      rootComponent(target)
      console.log('mounted!')
    })
  }
  function unmount(props) {
    return Promise.resolve().then(() => {
      // Do framework UI unrendering here
      console.log('unloaded!')
    })
  }
  const lifecycles = {
    bootstrap: bootstrap.bind(null, options),
    mount: mount.bind(null, options),
    unmount: unmount.bind(null, options)
  }
  return lifecycles
}
