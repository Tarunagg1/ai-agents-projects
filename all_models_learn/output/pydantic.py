from pydantic  import BaseModel, EmailStr, Field
from typing import Optional

class Student(BaseModel):
    name: str = "Tarun"
    age: Optional[int] = None
    email: EmailStr
    cgpa: float = Field(gt=0, lt=10, description="CGPA must be between 0 and 10")



new_student = {"age": 21, "email": "ihihui@gmail.com", "cgpa": 9.1}

student = Student(**new_student)

print(dict(student))

student_json = student.model_dump_json();

print(student_json)


