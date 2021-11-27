// 기록 API 관리
import API from './API';
import axios from 'axios';
import * as APIURL from '../../config';

const getRecord = async (user_id, date) => {
  console.log(user_id, date);
  // 작성된 글 불러오기
  try {
    return await API.get(`/record/read/${user_id}?wdate=${date}`);
  } catch (error) {
    console.warn('기록 불러오기 실패', error);
  }
};

const getObjective = async user_id => {
  try {
    return await API.get(`/objective/read_objectives/${user_id}`);
  } catch (error) {
    console.warn('오브젝트 불러오기 실패', error);
  }
};

const postRecord = async (user_id, wdate, key_type, content) => {
  // 작성된 글
  //  key_type : "train_detail" : "routines" : "success" : "failure": "feedback": "mind" "physical" "injury"
  // body : array or string
  console.log('API 들어가는 것 ', user_id, wdate, key_type, content);

  return axios
    .post(
      `${APIURL.BASE_URL}/record/write/${user_id}?wdate=${wdate}&key_type=${key_type}`,
      content,
    )
    .then(res => console.log('success post', key_type, res))
    .catch(err => console.log('fail  post', key_type, err));
};

const postImage = async (user_id, image_type, wdate, image) => {
  console.log('## 이미지 테스트 ##', user_id, image_type, wdate, image);

  return axios
    .post(
      `${APIURL.BASE_URL}/images/uploadfile?user_id=${user_id}&image_type=${image_type}&wdate=${wdate}`,
      image,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    )
    .then(res => console.log('success image post', res))
    .catch(err => console.log('fail image post', err));
};

// 목표설정 API
const postObjectInit = async (
  user_id,
  objectives,
  requirements,
  efforts,
  routines,
) => {
  console.log({
    user_id: user_id,
    objectives: objectives,
    requirements: requirements,
    efforts: efforts,
    routines: routines,
  });

  return axios
    .post(`${APIURL.BASE_URL}/objective/create_objectives`, {
      user_id: user_id,
      objectives: objectives,
      requirements: requirements,
      efforts: efforts,
      routines: routines,
    })
    .then(res => console.log('success object post', res))
    .catch(err => console.log('fail object post', err));
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
};
