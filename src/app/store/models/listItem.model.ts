export class Task {
    id?: string;
    item?: string;
    hasClickedTranslate?: boolean;
    status?: ['PENDING', 'DONE'];
    translatedList?: [];
  }