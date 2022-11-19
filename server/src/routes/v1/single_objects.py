import json
from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse
from bson import json_util
from db import db, DbName
from models.objectid import PyObjectId
from models.response.user import User
from models.response.course import Course
from models.response.question import Question
from models.response.comment import CommentWithoutReplies

router = APIRouter()


@router.get("/user", response_model=User)
async def get_user(user_id: str) -> User:
    user = await db[DbName.USER.value].find_one({"_id": user_id})
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user


@router.get("/course", response_model=Course)
async def get_course(course_id: str) -> Course:
    course = db[DbName.COURSE.value].aggregate([
        {"$match": {"_id": course_id}},
        {"$lookup": {"from": DbName.USER.value, "localField": "professors", "foreignField": "_id", "as": "professors"}},
    ])
    try:
        course = await course.next()
        return course
    except StopAsyncIteration:
        raise HTTPException(status_code=404, detail="Course not found")


@router.get("/question", response_model=Question)
async def get_questions(question_id: PyObjectId) -> Question:
    question = db[DbName.QUESTION.value].aggregate([
        {"$match": {"_id": question_id}},
        {"$lookup": {"from": DbName.USER.value, "localField": "owner", "foreignField": "_id", "as": "owner"}},
        {"$unwind": "$owner"},
        {"$lookup": {"from": DbName.COURSE.value, "localField": "course_id", "foreignField": "_id", "as": "course_id"}},
        {"$unwind": "$course_id"},
        # {"$lookup": {"from": DbName.QUIZ.value, "localField": "quiz_id", "foreignField": "_id", "as": "quiz_id"}},
        # {"$unwind": "$quiz_id"},
    ])
    try:
        question = await question.next()
        return question
    except StopAsyncIteration:
        raise HTTPException(status_code=404, detail="Question not found")


@router.get("/comment", response_model=CommentWithoutReplies)
async def get_answer(comment_id: PyObjectId) -> CommentWithoutReplies:
    comment = db[DbName.COMMENT.value].aggregate([
        {"$match": {"_id": comment_id}},
        {"$lookup": {"from": DbName.USER.value, "localField": "author", "foreignField": "_id", "as": "author"}},
        {"$unwind": "$author"},
    ])
    try:
        comment = await comment.next()
        print(comment)
        return comment
    except StopAsyncIteration:
        raise HTTPException(status_code=404, detail="Comment not found")
