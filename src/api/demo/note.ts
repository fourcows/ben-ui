import { defHttp } from '@/utils/http/axios';
import { NoteModel } from '@/api/demo/model/noteModel';

const url = '/notes';

export const noteListApi = (params) => defHttp.get<NoteModel>({ url, params });

export const addNoteApi = (data: NoteModel) => defHttp.post<NoteModel>({ url, data });

export const updateNoteApi = (data: NoteModel) => defHttp.put<NoteModel>({ url, data });

export const deleteNoteApi = (id: number) => defHttp.delete<void>({ url: `${url}/${id}` });
