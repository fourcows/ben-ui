export interface NoteModel {
  noteId: number;
  content: string;
  labelIds: number[];
  labels: LabelModel[];
  updateTime: string;
}

export interface LabelModel {
  labelId: number;
  labelName: string;
}
