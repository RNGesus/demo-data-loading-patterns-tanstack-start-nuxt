import type * as types from '@api/types'

function getAppTypeIcon(type: types.AppType) {
  if (type === 'web') {
    return '🌐'
  }
  if (type === 'android') {
    return '🤖'
  }
  if (type === 'ios') {
    return '🍏'
  }
  return '🤷'
}

export function AppLink({ app }: { app: types.ProviderApp }) {
  const capitalizedAppType = app.type.replace(/^./, char => char.toUpperCase())
  return (
    <>
      {getAppTypeIcon(app.type)}
      {' '}
      <a href={app.url} target="_blank" rel="noreferrer" title={`${app.name} (${capitalizedAppType})`} className="link">
        {app.name}
      </a>
    </>
  )
}
