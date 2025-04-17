'use client';

import { useRouter } from 'next/navigation';

type Props = {
  courseId: number;
  topic: string;
};

const TopicLink = ({ courseId, topic }: Props) => {
  const router = useRouter();

  return (
    <button
      onClick={() =>
        router.push(`/dashboard/courses/${courseId}/${encodeURIComponent(topic)}`)
      }
      className="text-blue-600 hover:underline"
    >
      {topic}
    </button>
  );
};

export default TopicLink;
