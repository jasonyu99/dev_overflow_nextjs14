'use server';

import Question from '@/database/question.model';
import { connectToDatabase } from '../mongoose';
import {
  CreateQuestionParams,
  GetQuestionByIdParams,
  GetQuestionsParams,
} from './shared.types';
import User from '@/database/user.model';
import Tag from '@/database/tag.model';
import { revalidatePath } from 'next/cache';

export async function getQuestions(params: GetQuestionsParams) {
  try {
    // connect to DB
    connectToDatabase();

    // get all questions
    const questions = await Question.find({})
      .populate({ path: 'tags', model: Tag })
      .populate({ path: 'author', model: User })
      .sort({ createdAt: -1 });

    return { questions };
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred while fetching questions');
  }
}

export async function createQuestion(params: CreateQuestionParams) {
  try {
    // connect to DB
    connectToDatabase();

    // eslint-disable-next-line
    const { title, content, tags, author, path } = params;

    // create a new question
    const question = await Question.create({
      title,
      content,
      author,
    });

    const tagDocuments = [];

    // create the tags or get them if they already exist
    for (const tag of tags) {
      const existingTag =
        (await Tag.findOneAndUpdate(
          { name: { $regex: new RegExp(`^${tag}$`, 'i') } },
          { $setOnInsert: { name: tag }, $push: { question: question._id } },
          { upsert: true, new: true }
        )) || null;
      tagDocuments.push(existingTag);
    }

    // update the question with the tags
    await Question.findByIdAndUpdate(question._id, {
      $push: { tags: { $each: tagDocuments } },
    });

    // Create an interaction record for the user's ask_question action
    // increment author's reputation by 5 for asking a question
    // revalidate path
    revalidatePath(path);

    return question;
  } catch (error) {}
}

export async function getQuestionById(params: GetQuestionByIdParams) {
  try {
    // connect to DB
    connectToDatabase();

    const { questionId } = params;

    // get the question by id
    const question = await Question.findById(questionId)
      .populate({ path: 'tags', model: Tag, select: '_id name' })
      .populate({
        path: 'author',
        model: User,
        select: '_id clerkId name picture',
      });

    return question;
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred while fetching question');
  }
}
