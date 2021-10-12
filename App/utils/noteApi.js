import {get, post} from './api';

// middleware에서의 함수와 구분을 위해 _ 추가
const _fetchNoteData = params => {
  return yahooClient
    .get(``, {params: params})
    .then(res => {
      return res;
    })
    .catch(err => {
      if (err.response) return err.response;
    });
};

export {_fetchNoteData};
