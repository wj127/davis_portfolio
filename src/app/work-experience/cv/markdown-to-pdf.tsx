import { Document, Page, Text, View, StyleSheet, renderToBuffer } from '@react-pdf/renderer';
import { marked, type Token, type Tokens } from 'marked';

const styles = StyleSheet.create({
  page: {
    paddingVertical: 48,
    paddingHorizontal: 56,
    fontSize: 10.5,
    lineHeight: 1.5,
    color: '#1a1a1a',
    fontFamily: 'Helvetica',
  },
  heading1: {
    fontSize: 22,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 8,
    color: '#111111',
  },
  heading2: {
    fontSize: 14,
    fontFamily: 'Helvetica-Bold',
    marginTop: 16,
    marginBottom: 6,
    paddingBottom: 3,
    borderBottomWidth: 1,
    borderBottomColor: '#d0d0d0',
    color: '#111111',
  },
  heading3: {
    fontSize: 11.5,
    fontFamily: 'Helvetica-Bold',
    marginTop: 10,
    marginBottom: 4,
    color: '#222222',
  },
  paragraph: {
    marginBottom: 8,
    textAlign: 'justify',
  },
  listItem: {
    flexDirection: 'row',
    marginBottom: 3,
    paddingLeft: 6,
  },
  bullet: {
    width: 12,
  },
  listItemContent: {
    flex: 1,
  },
  blockquote: {
    marginBottom: 8,
    paddingLeft: 10,
    borderLeftWidth: 2,
    borderLeftColor: '#c0c0c0',
    color: '#444444',
  },
  divider: {
    marginVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  code: {
    fontFamily: 'Courier',
    fontSize: 9.5,
    backgroundColor: '#f4f4f4',
    padding: 6,
    marginBottom: 8,
  },
});

// Map marked's inline tokens to nested <Text> nodes so bold/italic/links keep their
// styling inside a single paragraph flow.
const renderInline = (tokens: Token[] | undefined, keyPrefix: string) => {
  if (!tokens) return [];

  return tokens.map((token, index) => {
    const key = `${keyPrefix}-${index}`;

    switch (token.type) {
      case 'strong':
        return (
          <Text key={key} style={{ fontFamily: 'Helvetica-Bold' }}>
            {renderInline((token as Tokens.Strong).tokens, key)}
          </Text>
        );
      case 'em':
        return (
          <Text key={key} style={{ fontFamily: 'Helvetica-Oblique' }}>
            {renderInline((token as Tokens.Em).tokens, key)}
          </Text>
        );
      case 'codespan':
        return (
          <Text key={key} style={{ fontFamily: 'Courier' }}>
            {(token as Tokens.Codespan).text}
          </Text>
        );
      case 'link':
        return (
          <Text key={key} style={{ color: '#2563eb' }}>
            {renderInline((token as Tokens.Link).tokens, key)}
          </Text>
        );
      case 'br':
        return <Text key={key}>{'\n'}</Text>;
      case 'del':
        return (
          <Text key={key} style={{ textDecoration: 'line-through' }}>
            {renderInline((token as Tokens.Del).tokens, key)}
          </Text>
        );
      default:
        return <Text key={key}>{'text' in token ? token.text : ''}</Text>;
    }
  });
};

const renderListItem = (item: Tokens.ListItem, ordered: boolean, position: number, key: string) => {
  const marker = ordered ? `${position + 1}.` : '\u2022';

  return (
    <View key={key} style={styles.listItem} wrap={false}>
      <Text style={styles.bullet}>{marker}</Text>
      <Text style={styles.listItemContent}>{renderInline(item.tokens, key)}</Text>
    </View>
  );
};

const renderBlock = (token: Token, key: string) => {
  switch (token.type) {
    case 'heading': {
      const heading = token as Tokens.Heading;
      const headingStyle =
        heading.depth <= 1 ? styles.heading1 : heading.depth === 2 ? styles.heading2 : styles.heading3;
      return (
        <Text key={key} style={headingStyle}>
          {renderInline(heading.tokens, key)}
        </Text>
      );
    }
    case 'paragraph': {
      const paragraph = token as Tokens.Paragraph;
      return (
        <Text key={key} style={styles.paragraph}>
          {renderInline(paragraph.tokens, key)}
        </Text>
      );
    }
    case 'list': {
      const list = token as Tokens.List;
      return (
        <View key={key}>
          {list.items.map((item, index) => renderListItem(item, list.ordered, index, `${key}-${index}`))}
        </View>
      );
    }
    case 'blockquote': {
      const blockquote = token as Tokens.Blockquote;
      return (
        <View key={key} style={styles.blockquote}>
          {blockquote.tokens.map((child, index) => renderBlock(child, `${key}-${index}`))}
        </View>
      );
    }
    case 'code': {
      const code = token as Tokens.Code;
      return (
        <Text key={key} style={styles.code}>
          {code.text}
        </Text>
      );
    }
    case 'hr':
      return <View key={key} style={styles.divider} />;
    case 'space':
      return null;
    default:
      return null;
  }
};

export const markdownToPdfBuffer = async (markdown: string) => {
  const tokens = marked.lexer(markdown);

  const documentElement = (
    <Document>
      <Page size='A4' style={styles.page}>
        {tokens.map((token, index) => renderBlock(token, `block-${index}`))}
      </Page>
    </Document>
  );

  return renderToBuffer(documentElement);
};
