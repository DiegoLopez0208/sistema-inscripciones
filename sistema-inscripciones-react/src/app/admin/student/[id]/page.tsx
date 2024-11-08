import StudentProfile from "@/sections/admin/student/StudentId"

interface ParamsStudentId {
  params: {
    id: string
  }
}

export default function StudentIdPage({ params }: ParamsStudentId) {
  return <StudentProfile params={params} />
}
