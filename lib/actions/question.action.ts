'use server';

import { connectToDatabase } from '../mongoose';

export async function createQuestion(data: any) {
  try {
    // connect to DB
    connectToDatabase();
  } catch (error) {}
}
