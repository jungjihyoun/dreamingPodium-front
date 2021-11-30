// 기록 API 관리
import API from './API';
import axios from 'axios';
import * as APIURL from '../../config';

// 작성된 글 API
const getRecord = async (user_id, date, serverToken) => {
  try {
    return await axios.get(
      `${APIURL.BASE_URL}/record/read/${user_id}?wdate=${date}`,
      {
        headers: {
          token: serverToken,
          'Content-Type': 'application/json',
        },
      },
    );
  } catch (error) {
    console.warn('기록을 불러오지 못했습니다. ', error);
  }
};

const postRecord = async (user_id, wdate, key_type, content, serverToken) => {
  console.log(
    ' ######### postrecord API #########',
    user_id,
    '유저 아이디 ',
    content,
    '토큰 ',
    serverToken,
    '보낼 내용 : ',
    content,
  );
  try {
    return await axios.post(
      `${APIURL.BASE_URL}/record/write/${user_id}?wdate=${wdate}&key_type=${key_type}`,
      content,
      {
        headers: {
          token: serverToken,
        },
      },
    );
  } catch (error) {
    console.warn('기록을 저장하지 못했습니다.', error);
  }
};

const postImage = async (user_id, image_type, wdate, image, serverToken) => {
  return axios
    .post(
      `${APIURL.BASE_URL}/images/uploadfile?user_id=${user_id}&image_type=${image_type}&wdate=${wdate}`,
      image,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          token: serverToken,
        },
      },
    )
    .then(res => console.log('이미지를 성공적으로 보냈습니다.'))
    .catch(err => console.log('이미지 전송을 실패했습니다.', err));
};

const deleteImage = async (user_id, image_type, wdate, serverToken, uri) => {
  console.log('전체테스트,', user_id, image_type, wdate, uri, serverToken);
  return await axios
    .post(
      `${APIURL.BASE_URL}/images/delete_image/${user_id}?image_type=${image_type}&wdate=${wdate}`,
      {content: uri},
      {
        headers: {
          token: serverToken,
        },
      },
    )
    .then(res => console.log('이미지를 성공적으로 삭제했습니다.'))
    .catch(err => console.log('이미지 삭제에 실패했습니다.', err));
};

// 목표설정 API
const getObjective = async user_id => {
  try {
    return await API.get(`/objective/read_objectives/${user_id}`);
  } catch (error) {
    console.warn('목표설정을 불러오지 못했습니다. ', error);
  }
};

const postObjectInit = async (
  user_id,
  objectives,
  requirements,
  efforts,
  routines,
) => {
  return axios
    .post(`${APIURL.BASE_URL}/objective/create_objectives`, {
      user_id: user_id,
      objectives: objectives,
      requirements: requirements,
      efforts: efforts,
      routines: routines,
    })
    .then(res => console.log('목표설정을 성공적으로 보냈습니다.', res))
    .catch(err => console.log('목표설정을 저장하지 못했습니다.', err));
};

const updateObject = async (user_id, keyword, content) => {
  console.log(user_id, keyword, content);

  return await API.post(
    `/objective/update_objectives/${user_id}?keyword=${keyword}&content=${content}`,
  )
    .then(response => response.status)
    .catch(err => console.warn(err));
};

export default {
  getRecord,
  getObjective,
  postRecord,
  postImage,
  postObjectInit,
  updateObject,
  deleteImage,
};
