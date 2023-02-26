import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment'

const instantiateStickyMedia = () => {
    new StickyMedia()
}

// On route change
export function onRouteDidUpdate({ location, previousLocation }) {
    // Don't execute if we are still on the same page; the lifecycle may be fired
    // because the hash changes (e.g. when navigating between headings)
    if (location.pathname === previousLocation?.pathname) return
    setTimeout(instantiateStickyMedia, 100)
}

// On load
if (ExecutionEnvironment.canUseDOM) {
    window.addEventListener('load', () => {
        // Remove stale video info
        localStorage.removeItem('videoID')
        localStorage.removeItem('videoModalFlag')
        localStorage.removeItem('videoModalTime')
        localStorage.setItem('videoModalView', 'fullscreen-mode')

        setTimeout(instantiateStickyMedia, 100)
    })
}
