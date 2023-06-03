import { Button } from '@components/atoms/button';
import { Text } from '@components/atoms/text';

export default function Atom() {
  return (
    <div style={{ display: "flex" }}>
      <Button
        style={{
          display: 'flex',
          flexDirection: 'column',
          padding: '24px 32px',
          gap: '4px',
          width: '100%',
          maxWidth: '532px',
          height: '120px',
          background: '#434076',
          borderRadius: '16px',
          color: 'white'
        }}>
        <Text
          style={{ fontWeight: '500', fontSize: '24px', lineHeight: '36px' }}
          title="Absen"
        />
        <Text
          style={{ fontWeight: '400', fontSize: '16px', lineHeight: '24px' }}
          title="Lorem ipsum dolor sit amet,"
        />
      </Button>
      <Button
        style={{
          display: 'flex',
          flexDirection: 'column',
          padding: '24px 32px',
          gap: '4px',
          width: '100%',
          maxWidth: '532px',
          height: '120px',
          background: '#434076',
          borderRadius: '16px',
          color: 'white'
        }}>
        <Text
          style={{ fontWeight: '500', fontSize: '24px', lineHeight: '36px' }}
          title="Absen"
        />
        <Text
          style={{ fontWeight: '400', fontSize: '16px', lineHeight: '24px' }}
          title="Lorem ipsum dolor sit amet,"
        />
      </Button>
    </div>
  );
}
