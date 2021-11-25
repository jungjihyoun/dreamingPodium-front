// 기록 API 관리
import API from './API';
import axios from 'axios';
import * as APIURL from '../../config';

const getRecord = async (user_id, date) => {
  console.log(user_id, date);
  // 작성된 글 불러오기
  try {
    return await API.get(`/record/get/${user_id}?wdate=${date}`);
  } catch (error) {
    console.warn('기록 불러오기 실패', error);
  }
};

const postRecord = async (user_id, wdate, key_type, content) => {
  console.log(user_id, key_type);
  // 작성된 글
  console.log(user_id, wdate, key_type, content);

  return await API.post(
    `/record/write/${user_id}?wdate=${wdate}&key_type=${key_type}&content=${content}`,
  )
    .then(response => response.status)
    .catch(err => console.war(err));
};

const postImage = async (user_id, image_type, wdate, image) => {
  console.log('## 이미지 테스트 ##', user_id, image_type, wdate, image);

  return axios
    .post(
      `${APIURL.BASE_URL}/test/uploadfile?user_id=${user_id}&image_type=${image_type}&wdate=${wdate}`,
      image,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    )
    .then(res => console.log('success image post', res))
    .catch(err => console.log('fail image post', err));

  // return await API.post('/test/uploadfile', image, {
  //   // headers: {
  //   //   'content-type': 'multipart/form-data',
  //   // },
  //   params: {
  //     user_id,
  //     image_type,
  //     wdate,
  //   },
  // })
  //   .then(response => response.status)
  //   .catch(err => console.warn(err));
  // return await API.post(
  //   `/test/uploadfile?user_id=${user_id}&image_type=${image_type}&wdate=${wdate}`,
  //   image,
  //   {
  //     headers: {
  //       'content-type': 'multipart/form-data',
  //     },
  //   },
  // )
  //   .then(response => response.status)
  //   .catch(err => console.warn(err));
};

// 목표설정 API
const postObjectInit = async (
  user_id,
  objectives,
  requirements,
  efforts,
  routines,
) => {
  console.log(user_id, requirements);
  // console.log(objectives);
  // console.log(JSON.stringify(objectives));
  return await API.post(
    `/objective/create_objectives/${user_id}?objectives=${JSON.stringify(
      objectives,
    )}&requirements=${JSON.stringify(requirements)}&efforts=${JSON.stringify(
      efforts,
    )}&routines=${JSON.stringify(routines)}`,
  )
    .then(response => response.status)
    .catch(err => console.warn(err));
};

const updateObject = async (user_id, keyword, content) => {
  console.log(user_id, keyword, content);

  return await API.post(
    `/objective/update_objectives/${user_id}?keyword=${keyword}&content=${JSON.stringify(
      content,
    )}`,
  )
    .then(response => response.status)
    .catch(err => console.warn(err));
};

export default {
  getRecord,
  postRecord,
  postImage,
  postObjectInit,
  updateObject,
};
