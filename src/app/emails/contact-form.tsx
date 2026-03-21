import { Body, Container, Head, Heading, Hr, Html, Link, Preview, Section, Text } from '@react-email/components';

type ContactFormEmailProps = {
  senderEmail: string;
  message: string;
};

export const ContactFormEmail = ({ senderEmail, message }: ContactFormEmailProps) => (
  <Html>
    <Head />
    <Preview>New contact form message from {senderEmail}</Preview>
    <Body style={bodyStyle}>
      <Container style={containerStyle}>
        <Section style={headerStyle}>
          <Heading as='h1' style={headingStyle}>
            New Contact Message
          </Heading>
        </Section>

        <Section style={contentStyle}>
          <Text style={labelStyle}>From</Text>
          <Text style={valueStyle}>
            <Link href={`mailto:${senderEmail}`} style={linkStyle}>
              {senderEmail}
            </Link>
          </Text>

          <Hr style={dividerStyle} />

          <Text style={labelStyle}>Message</Text>
          <Text style={messageStyle}>{message}</Text>
        </Section>

        <Section style={footerStyle}>
          <Text style={footerTextStyle}>
            Sent via the contact form at{' '}
            <Link href='https://mrdavis.me' style={linkStyle}>
              mrdavis.me
            </Link>
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

const bodyStyle: React.CSSProperties = {
  backgroundColor: '#f4f4f5',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  margin: 0,
  padding: '40px 0',
};

const containerStyle: React.CSSProperties = {
  backgroundColor: '#ffffff',
  borderRadius: '12px',
  border: '1px solid #e4e4e7',
  maxWidth: '560px',
  margin: '0 auto',
  overflow: 'hidden',
};

const headerStyle: React.CSSProperties = {
  backgroundColor: '#18181b',
  padding: '32px 40px',
};

const headingStyle: React.CSSProperties = {
  color: '#ffffff',
  fontSize: '22px',
  fontWeight: 700,
  margin: 0,
  letterSpacing: '-0.02em',
};

const contentStyle: React.CSSProperties = {
  padding: '32px 40px',
};

const labelStyle: React.CSSProperties = {
  color: '#71717a',
  fontSize: '12px',
  fontWeight: 600,
  textTransform: 'uppercase' as const,
  letterSpacing: '0.05em',
  margin: '0 0 4px',
};

const valueStyle: React.CSSProperties = {
  color: '#18181b',
  fontSize: '16px',
  margin: '0 0 8px',
};

const linkStyle: React.CSSProperties = {
  color: '#2563eb',
  textDecoration: 'none',
};

const dividerStyle: React.CSSProperties = {
  borderColor: '#e4e4e7',
  margin: '20px 0',
};

const messageStyle: React.CSSProperties = {
  color: '#27272a',
  fontSize: '15px',
  lineHeight: '1.6',
  margin: 0,
  whiteSpace: 'pre-wrap',
};

const footerStyle: React.CSSProperties = {
  backgroundColor: '#fafafa',
  borderTop: '1px solid #e4e4e7',
  padding: '20px 40px',
};

const footerTextStyle: React.CSSProperties = {
  color: '#a1a1aa',
  fontSize: '12px',
  margin: 0,
  textAlign: 'center' as const,
};

export default ContactFormEmail;
