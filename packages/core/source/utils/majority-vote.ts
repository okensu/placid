import { Agent, run, tool } from '@openai/agents';
import z from 'zod';

export async function majorityVote<T extends Object>(results: Array<T>): Promise<T> {
  let mostConsistentResult: T | null = null;

  const pickTool = tool({
    name: 'pick',
    description: 'Use this tool to pick the most consistent result.',
    parameters: z.object({
      result_number: z.number()
    }),
    execute: ({ result_number }) => {
      mostConsistentResult = results[result_number - 1];
    }
  });

  const votingAgent = new Agent({
    name: 'voting_agent',
    instructions: 'You pick the most consistent result.',
    tools: [
      pickTool
    ],
    modelSettings: {
      toolChoice: 'required'
    },
    toolUseBehavior: 'stop_on_first_tool'
  });

  const resultsText = results
    .map((result, index) => `${index + 1}: ${result.toString()}`)
    .join('\n\n');

  while (mostConsistentResult === null) {
    await run(votingAgent, `Results to pick from:\n\n${resultsText}`);
  }

  return mostConsistentResult;
}
