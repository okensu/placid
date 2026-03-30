import { majorityVote } from './majority-vote';

/* 
 * TODO: Add parallelThreads parameter
 *       Add voteBatchSize parameter
 */
export async function selfConsistentRun<T extends Object>({
  generate,
  resultsToGenerate,
  vote
}: {
  generate: () => Promise<T>,
  resultsToGenerate: number,
  vote?: (samples: Array<T>) => Promise<T>
}): Promise<T> {
  const results = [];

  for (let i = 0; i < resultsToGenerate; i++) {
    const result = await generate();

    results.push(result);
  }

  const selfConsistentResult = (vote)
    ? await vote(results)
    : await majorityVote(results);

  return selfConsistentResult;
}
