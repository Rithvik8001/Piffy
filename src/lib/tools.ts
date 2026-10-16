export type RunsOn = 'device' | 'server'

export type ToolId =
  | 'merge'
  | 'split'
  | 'organize'
  | 'images'
  | 'sign'
  | 'redact'
  | 'protect'
  | 'toimages'
  | 'numbers'
  | 'metadata'

export type Tool = {
  id: ToolId
  label: string
  caption: string
  runsOn: RunsOn
  iconPaths: ReadonlyArray<string>
}

export const TOOLS: ReadonlyArray<Tool> = [
  {
    id: 'merge',
    label: 'Merge',
    caption: 'Combine files into one',
    runsOn: 'device',
    iconPaths: [
      'M9 4h4l3 3v11a2 2 0 01-2 2h-5a2 2 0 01-2-2V6a2 2 0 012-2z',
      'M13 4v3h3M1.5 12h4M4 9.5l1.5 2.5L4 14.5M22.5 12h-4M20 9.5L18.5 12l1.5 2.5',
    ],
  },
  {
    id: 'split',
    label: 'Split and extract',
    caption: 'Pull out the pages you need',
    runsOn: 'device',
    iconPaths: [
      'M5 4h3l2 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z',
      'M16 4h3l2 2v12a2 2 0 01-2 2h-3a2 2 0 01-2-2V6a2 2 0 012-2z',
      'M12 3v2.5M12 8.5v2.5M12 14v2.5M12 19.5V22',
    ],
  },
  {
    id: 'organize',
    label: 'Organize pages',
    caption: 'Delete, reorder, rotate',
    runsOn: 'device',
    iconPaths: [
      'M6 7h5l3 3v9a2 2 0 01-2 2H6a2 2 0 01-2-2V9a2 2 0 012-2z',
      'M11 7v3h3M14.5 3.5a6.5 6.5 0 016 6',
      'M20.5 6v3.5H17',
    ],
  },
  {
    id: 'images',
    label: 'Images to PDF',
    caption: 'Photos and scans into one file',
    runsOn: 'device',
    iconPaths: [
      'M6 3h8l4 4v12a2 2 0 01-2 2H6a2 2 0 01-2-2V5a2 2 0 012-2z',
      'M14 3v4h4',
      'M9 10.5a.5.5 0 100-1 .5.5 0 000 1z',
      'M5 18.5l3.8-4.5 2.7 3 2-2.2 3.5 3.7',
    ],
  },
  {
    id: 'sign',
    label: 'Fill and sign',
    caption: 'Type, draw, place a signature',
    runsOn: 'device',
    iconPaths: [
      'M6 3h8l4 4v12a2 2 0 01-2 2H6a2 2 0 01-2-2V5a2 2 0 012-2z',
      'M14 3v4h4M7.5 9h5M7.5 12h3',
      'M7 17c1.2-2.4 2.2-2.6 2.6-1 .3 1.3 1 1.3 1.8-.3.6-1.3 1.4-1.3 1.9 0 .4 1.2 1.1 1.4 1.9.3.5-.7 1-.9 1.8-.6',
    ],
  },
  {
    id: 'redact',
    label: 'Redact',
    caption: 'Remove text for real, not just cover it',
    runsOn: 'device',
    iconPaths: [
      'M6 3h8l4 4v12a2 2 0 01-2 2H6a2 2 0 01-2-2V5a2 2 0 012-2z',
      'M14 3v4h4M7.5 9h6M7.5 17h4',
      'M7.5 13h9',
    ],
  },
  {
    id: 'protect',
    label: 'Protect and unlock',
    caption: 'Add or remove a password',
    runsOn: 'device',
    iconPaths: [
      'M5 3h8l4 4v4.5H5.5A1.5 1.5 0 014 10V5a2 2 0 011-2z',
      'M13 3v4h4M4 11v8a2 2 0 002 2h4',
      'M12.5 16.3a1.8 1.8 0 011.8-1.8h5.4a1.8 1.8 0 011.8 1.8v2.9a1.8 1.8 0 01-1.8 1.8h-5.4a1.8 1.8 0 01-1.8-1.8z',
      'M14.5 14.5v-1.8a2.5 2.5 0 015 0v1.8M17 17.3v1',
    ],
  },
  {
    id: 'toimages',
    label: 'PDF to images',
    caption: 'Export pages as PNG or JPG',
    runsOn: 'device',
    iconPaths: [
      'M4 4h8l3 3v4',
      'M12 4v3h3',
      'M4 4v14a2 2 0 002 2h4',
      'M12 13h8a1 1 0 011 1v6a1 1 0 01-1 1h-8a1 1 0 01-1-1v-6a1 1 0 011-1z',
      'M14.5 16a.5.5 0 100-1 .5.5 0 000 1zM12 20l2.5-2.8 1.8 1.8 1.5-1.5L21 20',
    ],
  },
  {
    id: 'numbers',
    label: 'Page numbers',
    caption: 'Stamp numbers in any corner',
    runsOn: 'device',
    iconPaths: [
      'M6 3h8l4 4v12a2 2 0 01-2 2H6a2 2 0 01-2-2V5a2 2 0 012-2z',
      'M14 3v4h4M7.5 9h6M7.5 12h4',
      'M12.5 18.5l1.5-1v1M16.5 17.5h1.5l-1.5 1.5h1.5',
    ],
  },
  {
    id: 'metadata',
    label: 'Metadata cleaner',
    caption: 'Strip author, title, hidden info',
    runsOn: 'device',
    iconPaths: [
      'M6 3h8l4 4v12a2 2 0 01-2 2H6a2 2 0 01-2-2V5a2 2 0 012-2z',
      'M14 3v4h4',
      'M8 11h8M8 14.5h5',
      'M15.5 17.5l3 3M18.5 17.5l-3 3',
    ],
  },
]
