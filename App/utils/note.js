// 기록 API 관리
import API from './API';

const getRecord = async (user_id, date) => {
  // 작성된 글 불러오기
  try {
    return await API.get(`/record/get/${user_id}?date=${date}`);
  } catch (error) {
    console.log('기록 불러오기 실패', error);
  }
};

const postRecord = async (user_id, wdate, key_type, content) => {
  // 작성된 글
  console.log(user_id, wdate, key_type, content);
  return await API.post(`/record/write/${user_id}`, null, {
    params: {
      wdate,
      key_type,
      content,
    },
  })
    .then(response => response.status)
    .catch(err => console.warn(err));
};

export default {
  getRecord,
  postRecord,
};
