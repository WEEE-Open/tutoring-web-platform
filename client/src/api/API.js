import CourseObj from "../entities/CourseObj";
import ReplyObj from "../entities/ReplyObj";

const prefix = "http://localhost:8000/v1";

// header API
const postLogout = async () => {
  return new Promise((resolve, reject) => {
    fetch(prefix + "/logout", { method: "POST" })
      .then((res) => {
        if (res.ok) {
          resolve(null);
        } else {
          reject("Generic Error");
        }
      })
      .catch((err) => {
        reject("Server Error");
      });
  });
};

// Courses related APIs
const getMyCourses = async () => {
  return new Promise((resolve, reject) => {
    fetch(prefix + "/mycourses")
      .then((res) => {
        if (res.status === 404) {
          resolve([]);
        }
        res
          .json()
          .then((json) =>
            resolve(json.map((myCourses) => CourseObj.from(myCourses)))
          )
          .catch((err) => reject("Generic Error"));
      })
      .catch((err) => reject("Unavailable"));
  });
};

const getCourses = async () => {
  return new Promise((resolve, reject) => {
    fetch(prefix + "/courses")
      .then((res) => {
        if (res.status === 404) {
          resolve([]);
        } else if (res.status === 401) {
          reject("Authentication Error");
        } else if (res.ok) {
          res
            .json()
            .then((json) =>
              resolve(json.map((courses) => CourseObj.from(courses)))
            )
            .catch((err) => reject(err));
        } else {
          reject("Generic Error");
        }
      })
      .catch((err) => reject("Unavailable"));
  });
};

const getReplies = async (comment_id, page = 1, itemsPerPage = -1) => {
  return new Promise((resolve, reject) => {
    fetch(prefix + "/replies?comment_id=" + comment_id + "&page=" + page + "&itemsPerPage=" + itemsPerPage)
      .then((res) => {
        if (res.status === 404) {
          resolve([]);
        } else if (res.status === 401) {
          reject("Authentication Error");
        } else if (res.ok) {
          res
            .json()
            .then((json) =>
              resolve(json.replies.map((replies) => ReplyObj.from(replies)))
            )
            .catch((err) => reject(err));
        } else {
          reject("Generic Error");
        }
      })
      .catch((err) => reject("Unavailable"));
  });
}

const searchCourses = async (query) => {
  return new Promise((resolve, reject) => {
    fetch(prefix + "/searchCourses?query=" + query)
      .then((res) => {
        if (res.status === 404) {
          resolve([]);
        } else if (res.status === 401) {
          reject("Authentication Error");
        } else if (res.ok) {
          res
            .json()
            .then((json) =>
              resolve(json.map((courses) => CourseObj.from(courses)))
            )
            .catch((err) => reject("Generic Error"));
        } else {
          reject("Generic Error");
        }
      })
      .catch((err) => reject("Unavailable"));
  });
};

const searchQuestion = async () => {
  return new Promise((resolve, reject) => {
    fetch(prefix + "/searchQuestion")
      .then((res) => {
        if (res.status === 404) {
          resolve([]);
        } else if (res.status === 401) {
          reject("Authentication Error");
        } else if (res.ok) {
          res
            .json()
            .then((json) =>
              resolve(json.map((courses) => CourseObj.from(courses)))
            )
            .catch((err) => reject("Generic Error"));
        } else {
          reject("Generic Error");
        }
      })
      .catch((err) => reject("Unavailable"));
  });
};

const searchDiscussion = async () => {
  return new Promise((resolve, reject) => {
    fetch(prefix + "/searchDiscussion")
      .then((res) => {
        if (res.status === 404) {
          resolve([]);
        } else if (res.status === 401) {
          reject("Authentication Error");
        } else if (res.ok) {
          res
            .json()
            .then((json) =>
              resolve(json.map((courses) => CourseObj.from(courses)))
            )
            .catch((err) => reject("Generic Error"));
        } else {
          reject("Generic Error");
        }
      })
      .catch((err) => reject("Unavailable"));
  });
};

const API = {
  getCourses,
  getMyCourses,
  getReplies,
  searchCourses,
  searchQuestion,
  searchDiscussion,
};
export default API;
