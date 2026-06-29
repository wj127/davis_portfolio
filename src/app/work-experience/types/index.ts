export type WorkParagraphBlock = {
  type: 'paragraph';
  text: string;
};

export type WorkListBlock = {
  type: 'list';
  heading?: string;
  items: string[];
};

export type WorkNoteBlock = {
  type: 'note';
  text: string;
};

export type WorkContentBlock = WorkParagraphBlock | WorkListBlock | WorkNoteBlock;

export type CompanyKey = 'hainok' | 'thm' | 'proptex' | 'inatlas' | 'ub';
