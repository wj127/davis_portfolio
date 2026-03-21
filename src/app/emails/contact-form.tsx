import { Html, Head, Preview, Body, Container, Section, Heading, Text, Hr } from '@react-email/components';

type ContactFormEmailProps = {
  senderEmail: string;
  message: string;
};

const emailStyles = {
  body: {
    backgroundColor: '#131313',
    fontFamily: "'Source Code Pro', 'Courier New', monospace",
    margin: '0',
    padding: '0',
  },
  container: {
    maxWidth: '560px',
    margin: '0 auto',
    padding: '40px 20px',
  },
  card: {
    backgroundColor: '#1b1b1b',
    border: '1px solid #353535',
    borderTop: '4px solid #4169e1',
    padding: '32px 24px',
  },
  title: {
    color: '#e2e2e2',
    fontSize: '24px',
    fontWeight: 400 as const,
    letterSpacing: '-0.02em',
    margin: '0 0 4px',
  },
  subtitle: {
    color: '#7bd1fa',
    fontSize: '10px',
    letterSpacing: '0.15em',
    textTransform: 'uppercase' as const,
    margin: '0 0 24px',
  },
  hr: {
    borderColor: '#353535',
    margin: '24px 0',
  },
  label: {
    color: '#8e909f',
    fontSize: '10px',
    letterSpacing: '0.15em',
    textTransform: 'uppercase' as const,
    margin: '0 0 8px',
  },
  senderEmail: {
    color: '#b6c4ff',
    fontSize: '16px',
    margin: '0 0 20px',
  },
  messageBox: {
    backgroundColor: '#2a2a2a',
    border: '1px solid #434654',
    padding: '16px',
  },
  messageText: {
    color: '#e2e2e2',
    fontSize: '14px',
    lineHeight: '1.6',
    margin: '0',
    whiteSpace: 'pre-wrap' as const,
  },
  timestamp: {
    color: 'rgba(142, 144, 159, 0.6)',
    fontSize: '10px',
    margin: '0',
  },
};

export default function ContactFormEmail({ senderEmail, message }: ContactFormEmailProps) {
  return (
    <Html lang='en'>
      <Head />
      <Preview>New contact from {senderEmail}</Preview>
      <Body style={emailStyles.body}>
        <Container style={emailStyles.container}>
          <Section style={emailStyles.card}>
            <Heading style={emailStyles.title}>NEW_CONTACT</Heading>
            <Text style={emailStyles.subtitle}>Protocol: Incoming_Transmission</Text>
            <Hr style={emailStyles.hr} />
            <Text style={emailStyles.label}>IDENTITY_POINTER</Text>
            <Text style={emailStyles.senderEmail}>{senderEmail}</Text>
            <Text style={emailStyles.label}>PAYLOAD_DATA</Text>
            <Section style={emailStyles.messageBox}>
              <Text style={emailStyles.messageText}>{message}</Text>
            </Section>
            <Hr style={emailStyles.hr} />
            <Text style={emailStyles.timestamp}>U_STAMP: {new Date().toISOString()}</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
