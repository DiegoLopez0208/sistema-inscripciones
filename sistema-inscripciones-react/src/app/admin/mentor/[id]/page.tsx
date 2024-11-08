import MentorProfile from '@/sections/admin/mentor/mentorId';

interface ParamsMentor {
  params: {
    id: string;
  };
}

export default function ProfilePage({ params }: ParamsMentor) {
  return <MentorProfile params={params} />;
}
