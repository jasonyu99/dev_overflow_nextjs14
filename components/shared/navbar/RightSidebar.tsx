'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import RenderTag from '../search/RenderTag';

const TopQuestions = () => {
  const hotQuestions = [
    { _id: 1, title: 'How to create a new component in React?' },
    { _id: 2, title: 'Is it only me or the font is bolder than necessary?' },
    {
      _id: 3,
      title:
        'Best practices for data fetching in a Next.js application with Server-Side Rendering (SSR)?',
    },
    { _id: 4, title: 'Async/Await Function Not Handling Errors Properly' },
    { _id: 5, title: 'How to create a new component in React?' },
  ];

  return (
    <div>
      <h3 className="h3-bold text-dark200_light900 ">Top Questions</h3>
      <div className="mt-7 flex w-full flex-col gap-[30px]">
        {hotQuestions.map((question) => {
          return (
            <Link
              key={question._id}
              href={`/questions/${question._id}`}
              className="flex cursor-pointer items-center justify-between gap-7"
            >
              <p className="body-medium text-dark500_light700">
                {question.title}
              </p>
              <Image
                src="assets/icons/chevron-right.svg"
                width={20}
                height={20}
                alt="chevron-right"
                className="invert-colors"
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

const PopularTags = () => {
  const popularTags = [
    { _id: 1, name: 'React', totalQuestions: 100 },
    { _id: 2, name: 'Next.js', totalQuestions: 80 },
    { _id: 3, name: 'TypeScript', totalQuestions: 70 },
    { _id: 4, name: 'JavaScript', totalQuestions: 60 },
    { _id: 5, name: 'Node.js', totalQuestions: 50 },
  ];

  return (
    <div className="mt-16">
      <h3 className="h3-bold text-dark300_light900">Popular Tags</h3>
      <div className="mt-7 flex flex-col gap-4">
        {popularTags.map((tag) => {
          return (
            <RenderTag
              key={tag._id}
              _id={tag._id}
              name={tag.name}
              totalQuestions={tag.totalQuestions}
              showCount
            />
          );
        })}
      </div>
    </div>
  );
};

const RightSidebar = () => {
  return (
    <section className="background-light900_dark200 light-border custom-scrollbar sticky right-0 top-0 flex h-screen w-[350px] flex-col overflow-y-auto border-l p-6 pt-36 shadow-light-300 dark:shadow-none max-xl:hidden">
      <TopQuestions />
      <PopularTags />
    </section>
  );
};

export default RightSidebar;
