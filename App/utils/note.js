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

  return await API.post(`/record/write/${user_id}`, {
    params: {
      wdate: wdate,
      key_type: key_type,
      content: content,
    },
  })
    .then(response => response.status)
    .catch(err => console.warn(err));
};

const postImage = async (user_id, image_type, wdate, image) => {
  // 작성된 글 image form 데이터
  console.log(user_id, image_type, wdate, image);

  return await API.post('/test/uploadfile', image, {
    // headers: {
    //   'content-type': 'multipart/form-data',
    // },
    params: {
      user_id,
      image_type,
      wdate,
    },
  })
    .then(response => response.status)
    .catch(err => console.warn(err));
};

export default {
  getRecord,
  postRecord,
  postImage,
};
