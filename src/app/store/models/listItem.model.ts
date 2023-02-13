export interface CourseItem {
    id: string;
    item: string;
    hasClickedTranslate: boolean;
    status: ['PENDING', 'DONE'];
    translatedList: [];
  }