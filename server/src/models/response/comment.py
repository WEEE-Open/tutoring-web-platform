from ..db.comment import CommentBase as _CommentBase
from ..basemodel import BaseModel
from ..objectid import PyObjectId
from pydantic import Field, root_validator
from typing import List, Union
from .user import User


class CommentBase(_CommentBase):
    author: Union[User, str]
    upvotes: int = 0
    downvotes: int = 0

    @root_validator
    def set_upvotes_downvotes(cls, values):
        values["upvotes"] = len(values.get("upvoted_by", []))
        values["downvotes"] = len(values.get("downvoted_by", []))
        return values


class Reply(CommentBase):
    pass


class CommentWithoutReplies(CommentBase):
    question_id: PyObjectId


class Comment(CommentWithoutReplies):
    replies: List[Reply] = []


class Replies(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    replies: List[Reply]