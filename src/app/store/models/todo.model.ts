export interface TranslatedHistory {
  translatedItem: string;
  language: string;
  timestamp: string;
}

export interface Todo {
  id: string;
  item: string;
  hasClickedTranslate: boolean;
  status: 'PENDING'| 'DONE';
  translatedList: TranslatedHistory | [];
}

export interface CreateTodo {
  item: string;
}