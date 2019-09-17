export default function resumeContext (context) {
  if (context.state !== 'running') {
    window.addEventListener('click', () => {
      if (context.state !== 'running') context.resume()
      console.log(context.state)
    })

    window.addEventListener('touch', () => {
      if (context.state !== 'running') context.resume()
      console.log(context.state)
    })
  }
}
