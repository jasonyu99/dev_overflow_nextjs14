import HomeFilters from '@/components/home/HomeFilters';
import Filter from '@/components/shared/search/Filter';
import LocalSearchbar from '@/components/shared/search/LocalSearchbar';
import { Button } from '@/components/ui/button';
import { HomePageFilters } from '@/constants/filters';
// import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import NoResult from '@/components/home/NoResult';

const questions = [
  // {
  //   _id: 1,
  //   title:
  //     'The Lightning Component c:LWC_PizzaTracker generated invalid output for field status. Error How to solve this',
  //   tags: [
  //     { _id: 1, name: 'next.js' },
  //     { _id: 2, name: 'react' },
  //   ],
  //   author: 'John Doe',
  //   upvotes: 10,
  //   answers: 5,
  //   views: 100,
  //   createdAt: '2021-10-10T10:10:10.000Z',
  // },
  // {
  //   _id: 2,
  //   title: 'Redux Toolkit Not Updating State as Expected',
  //   tags: [
  //     { _id: 1, name: 'redux' },
  //     { _id: 2, name: 'react' },
  //   ],
  //   author: 'John Doe',
  //   upvotes: 20,
  //   answers: 2,
  //   views: 200,
  //   createdAt: '2021-10-10T15:10:10.000Z',
  // },
];

export default function Home() {
  return (
    <>
      <div className="flex flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>
        <Link href="/ask-question" className="mx-sm:w-full flex justify-end">
          <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900">
            Ask a Question
          </Button>
        </Link>
      </div>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchbar
          route="/"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search questions..."
          otherClasses="flex-1"
        />
        <Filter
          filters={HomePageFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
          containerClasses="hidden max-md:flex"
        />
      </div>
      <HomeFilters />

      <div className="mt-10 flex w-full flex-col gap-6">
        {questions.length > 0 ? (
          questions.map((question) => 'QuestionCard')
        ) : (
          <NoResult
            title="There's no question to show"
            description="Be the first to break the silence! 🚀 Ask a Question and kickstart the discussion. Our query could be the next big thing others learn from. Get involved! 💡"
            link="/ask-question"
            linkTitle="Ask a Question"
          />
        )}
      </div>

      {/* <div className="py-9">
        <div className="rounded-[10px] bg-light-800 p-9 text-light-500 dark:bg-dark-300">
          <h3>
            The Lightning Component c:LWC_PizzaTracker generated invalid output
            for field status. Error How to solve this
          </h3>
          <Badge className="subtle-medium background-light800_dark300 text-light400_light500 rounded-md border-none px-4 py-2 uppercase">
            {'NEXT.JS'}
          </Badge>
        </div>
      </div> */}
    </>
  );
}
