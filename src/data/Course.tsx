
export type Topic = {
  id: number;
  title: string;
  type: 'video' | 'reading';
  duration: string;
  content?: string;
  videoUrl?: string;
};

export type Module = {
  id: number;
  title: string;
  topics: Topic[];
};

export type Course = {
  id: number;
  title: string;
  description: string;
  modules: Module[];
};

export const courses: Course[] = [
  {
    id: 1,
    title: 'Virtual Assistant Basics',
    description: 'Learn the fundamentals of becoming a successful virtual assistant',
    modules: [
      {
        id: 1,
        title: 'Getting Started',
        topics: [
          {
            id: 1,
            title: 'Introduction to Virtual Assistance',
            type: 'video',
            duration: '15 min',
            videoUrl: 'https://www.youtube.com/embed/xyz123'
          },
          {
            id: 2,
            title: 'Essential Tools Overview',
            type: 'reading',
            duration: '10 min',
            content: 'Detailed guide about essential VA tools...'
          }
        ]
      },
      {
        id: 2,
        title: 'Core Skills',
        topics: [
          {
            id: 3,
            title: 'Effective Communication',
            type: 'video',
            duration: '20 min',
            videoUrl: 'https://www.youtube.com/embed/abc456'
          },
          {
            id: 4,
            title: 'Time Management Techniques',
            type: 'reading',
            duration: '12 min',
            content: 'Learn how to manage multiple tasks...'
          }
        ]
      }
    ]
  },
  {
    id: 2,
    title: 'Social Media Management',
    description: 'Master social media strategies for businesses',
    modules: [
      {
        id: 1,
        title: 'Content Creation',
        topics: [
          {
            id: 1,
            title: 'Content Planning Strategies',
            type: 'video',
            duration: '18 min',
            videoUrl: 'https://www.youtube.com/embed/def789'
          }
        ]
      }
    ]
  }
];