import { AvatarUser, Title, Button } from '@hudl/uniform-web'
import { Tooltip } from '@hudl/uniform-web-tooltip'
import { IconAdd } from '@hudl/uniform-web-icons'

export function MyAthletes() {
  // Get initials from the athletes added during authentication
  const athletes = [
    { name: 'Cheyanne Doe', initials: 'CD' },
    { name: 'Jane Doe', initials: 'JD' },
  ]

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--u-space-half)',
      paddingLeft: 'var(--u-space-one)',
      paddingRight: 'var(--u-space-one)'
    }}>
      <Title as="h3" size="medium" color="default">
        <div style={{
          fontFamily: 'var(--u-font-title)',
          fontSize: 'var(--u-font-size-title-medium)',
          // color: 'var(--u-color-base-foreground)',
        }}>
          My Athletes
        </div>
      </Title>
      <div style={{ display: 'flex', gap: 'var(--u-space-quarter)', alignItems: 'center' }}>
        {athletes.map((athlete) => (
          <Tooltip
            key={athlete.name}
            content={athlete.name}
            type="label"
            position="top"
            asChild
            className="athlete-tooltip"
          >
            <div>
              <AvatarUser
                size="small"
                initials={athlete.initials}
              />
            </div>
          </Tooltip>
        ))}
        <Button
          buttonType="secondary"
          buttonStyle="minimal"
          size="small"
          icon={<IconAdd size="small" />}
          iconPlacement="left"
        >
          Add Athlete
        </Button>
      </div>
    </div>
  )
}
