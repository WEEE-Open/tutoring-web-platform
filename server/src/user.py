from pydantic import BaseModel, Field
from typing import List


class UserInfo(BaseModel):
    id: str
    username: str
    profile_picture: str


from course import CourseInfo
from question import QuestionInfo
from answer import AnswerInfo


class User(BaseModel):
    id: str = Field(alias="_id")
    email: str
    username: str
    name: str
    surname: str
    profile_picture: str
    is_active: bool = False
    is_professor: bool = False
    is_admin: bool = False
    related_courses: List[CourseInfo] = []
    my_Questions: List[QuestionInfo] = []
    my_Answers: List[AnswerInfo] = []
    my_BookmarkedQuestions: List[QuestionInfo] = []
    last_session: float
    credibility_rate: float = -1.0
    simulation_result: List[float] = []
